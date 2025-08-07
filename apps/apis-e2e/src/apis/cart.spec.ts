import {
  makeRequest,
  authHeader,
  generateUniqueEmail,
  registerUser,
  expectError,
  expectSuccess,
  generateUUID,
  testCourses
} from '../support/test-helpers';

describe('Cart API Tests', () => {
  let authToken: string;
  let availableCourseId: string;
  let cartItemId: string;

  beforeAll(async () => {
    // Register and authenticate a test user
    const userEmail = generateUniqueEmail();
    authToken = await registerUser(userEmail, 'testpassword123', 'Cart Test User');

    // Get an available course for cart operations
    const coursesResponse = await makeRequest({
      method: 'GET',
      url: '/courses?limit=1'
    });

    if (coursesResponse.data?.data?.courses?.length > 0) {
      availableCourseId = coursesResponse.data.data.courses[0].id;
    } else {
      availableCourseId = testCourses.course1.id; // Fallback
    }
  });

  afterEach(async () => {
    // Clean up cart after each test
    try {
      await makeRequest({
        method: 'DELETE',
        url: '/cart/clear',
        headers: authHeader(authToken)
      });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Get Cart Items Tests', () => {
    it('CART_001: should get cart with items', async () => {
      // First add an item to cart
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      const response = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.items).toBeDefined();
      expect(Array.isArray(data.items)).toBe(true);
      expect(data.summary).toBeDefined();

      // Validate cart item structure
      if (data.items.length > 0) {
        const item = data.items[0];
        expect(item.id).toBeDefined();
        expect(item.courseId).toBe(availableCourseId);
        expect(item.course).toBeDefined();
        expect(item.quantity).toBe(1);
        expect(item.addedAt).toBeDefined();

        // Validate course details in cart
        expect(item.course.title).toBeDefined();
        expect(item.course.price).toBeDefined();
        expect(item.course.instructor).toBeDefined();
      }

      // Validate summary structure
      expect(typeof data.summary.totalItems).toBe('number');
      expect(typeof data.summary.subtotal).toBe('number');
      expect(typeof data.summary.total).toBe('number');
    });

    it('CART_002: should get empty cart', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.items).toBeDefined();
      expect(Array.isArray(data.items)).toBe(true);
      expect(data.items).toHaveLength(0);
      expect(data.summary.totalItems).toBe(0);
      expect(data.summary.total).toBe(0);
    });

    it('CART_003: should reject cart request without auth', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/cart'
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Add to Cart Tests', () => {
    it('CART_004: should add valid course to cart', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: {
          courseId: availableCourseId,
          quantity: 1
        }
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('added');
      expect(data.cartItem).toBeDefined();
      expect(data.cartItem.id).toBeDefined();
      expect(data.cartItem.courseId).toBe(availableCourseId);
      expect(data.cartItem.quantity).toBe(1);

      cartItemId = data.cartItem.id; // Store for later tests
    });

    it('CART_005: should reject non-existent course', async () => {
      const nonExistentCourseId = generateUUID();

      const response = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: {
          courseId: nonExistentCourseId,
          quantity: 1
        }
      });

      expectError(response, 404, 'COURSE_001');
    });

    it('CART_006: should reject duplicate course addition', async () => {
      // Add course first time
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      // Try to add same course again
      const response = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      expectError(response, 409, 'CART_001');
    });

    it('CART_007: should reject adding enrolled course', async () => {
      // First enroll in a course
      const enrollResponse = await makeRequest({
        method: 'POST',
        url: `/courses/${availableCourseId}/enroll`,
        headers: authHeader(authToken)
      });

      if (enrollResponse.status === 200) {
        // Try to add enrolled course to cart
        const response = await makeRequest({
          method: 'POST',
          url: '/cart/add',
          headers: {
            ...authHeader(authToken),
            'Content-Type': 'application/json'
          },
          data: { courseId: availableCourseId, quantity: 1 }
        });

        expectError(response, 409, 'COURSE_003');
      }
    });

    it('CART_008: should reject add to cart without auth', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          courseId: availableCourseId,
          quantity: 1
        }
      });

      expectError(response, 401, 'AUTH_004');
    });

    it('should handle default quantity', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: {
          courseId: availableCourseId
          // No quantity specified - should default to 1
        }
      });

      const data = expectSuccess(response);
      expect(data.cartItem.quantity).toBe(1);
    });
  });

  describe('Update Cart Item Tests', () => {
    beforeEach(async () => {
      // Add an item to cart for testing updates
      const addResponse = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      if (addResponse.data?.data?.cartItem?.id) {
        cartItemId = addResponse.data.data.cartItem.id;
      }
    });

    it('CART_009: should update item quantity', async () => {
      const response = await makeRequest({
        method: 'PUT',
        url: `/cart/items/${cartItemId}`,
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { quantity: 2 }
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('updated');
      expect(data.cartItem).toBeDefined();
      expect(data.cartItem.id).toBe(cartItemId);
      expect(data.cartItem.quantity).toBe(2);
    });

    it('CART_010: should reject invalid quantity', async () => {
      const response = await makeRequest({
        method: 'PUT',
        url: `/cart/items/${cartItemId}`,
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { quantity: 0 } // Invalid - less than 1
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('CART_011: should reject non-existent item update', async () => {
      const nonExistentItemId = generateUUID();

      const response = await makeRequest({
        method: 'PUT',
        url: `/cart/items/${nonExistentItemId}`,
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { quantity: 2 }
      });

      expectError(response, 404, 'CART_002');
    });

    it('CART_012: should reject update without auth', async () => {
      const response = await makeRequest({
        method: 'PUT',
        url: `/cart/items/${cartItemId}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: { quantity: 2 }
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Remove from Cart Tests', () => {
    beforeEach(async () => {
      // Add an item to cart for testing removal
      const addResponse = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      if (addResponse.data?.data?.cartItem?.id) {
        cartItemId = addResponse.data.data.cartItem.id;
      }
    });

    it('CART_013: should remove valid item from cart', async () => {
      const response = await makeRequest({
        method: 'DELETE',
        url: `/cart/items/${cartItemId}`,
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('removed');

      // Verify item is actually removed
      const cartResponse = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const cartData = expectSuccess(cartResponse);
      const removedItem = cartData.items.find((item: any) => item.id === cartItemId);
      expect(removedItem).toBeUndefined();
    });

    it('CART_014: should handle removal of non-existent item', async () => {
      const nonExistentItemId = generateUUID();

      const response = await makeRequest({
        method: 'DELETE',
        url: `/cart/items/${nonExistentItemId}`,
        headers: authHeader(authToken)
      });

      expectError(response, 404, 'CART_002');
    });

    it('CART_015: should reject removal without auth', async () => {
      const response = await makeRequest({
        method: 'DELETE',
        url: `/cart/items/${cartItemId}`
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Clear Cart Tests', () => {
    beforeEach(async () => {
      // Add multiple items to cart for testing clear
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });
    });

    it('CART_016: should clear cart with items', async () => {
      const response = await makeRequest({
        method: 'DELETE',
        url: '/cart/clear',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('cleared');

      // Verify cart is actually empty
      const cartResponse = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const cartData = expectSuccess(cartResponse);
      expect(cartData.items).toHaveLength(0);
      expect(cartData.summary.totalItems).toBe(0);
    });

    it('CART_017: should clear empty cart', async () => {
      // First clear the cart
      await makeRequest({
        method: 'DELETE',
        url: '/cart/clear',
        headers: authHeader(authToken)
      });

      // Try to clear again
      const response = await makeRequest({
        method: 'DELETE',
        url: '/cart/clear',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('cleared');
    });

    it('CART_018: should reject clear without auth', async () => {
      const response = await makeRequest({
        method: 'DELETE',
        url: '/cart/clear'
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Cart Data Validation Tests', () => {
    it('should validate cart summary calculations', async () => {
      // Add multiple items with known prices
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 2 }
      });

      const response = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      
      if (data.items.length > 0) {
        let expectedSubtotal = 0;
        let expectedTotalItems = 0;

        data.items.forEach((item: any) => {
          expectedSubtotal += item.course.price * item.quantity;
          expectedTotalItems += item.quantity;
        });

        expect(data.summary.subtotal).toBe(expectedSubtotal);
        expect(data.summary.totalItems).toBe(expectedTotalItems);

        // Total should include any discounts/savings
        expect(data.summary.total).toBeDefined();
        expect(typeof data.summary.total).toBe('number');
      }
    });

    it('should validate cart item structure', async () => {
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      const response = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      
      if (data.items.length > 0) {
        const item = data.items[0];

        // Required fields
        expect(item.id).toBeDefined();
        expect(item.courseId).toBeDefined();
        expect(item.course).toBeDefined();
        expect(item.quantity).toBeDefined();
        expect(item.addedAt).toBeDefined();

        // Data types
        expect(typeof item.quantity).toBe('number');
        expect(item.quantity).toBeGreaterThan(0);

        // Course details
        expect(item.course.title).toBeDefined();
        expect(typeof item.course.price).toBe('number');
        expect(item.course.thumbnail).toBeDefined();

        // Date validation
        expect(new Date(item.addedAt).toString()).not.toBe('Invalid Date');
      }
    });

    it('should handle quantity validation edge cases', async () => {
      const testCases = [
        { quantity: -1, shouldPass: false },
        { quantity: 0, shouldPass: false },
        { quantity: 1, shouldPass: true },
        { quantity: 10, shouldPass: true },
        { quantity: 'invalid', shouldPass: false }
      ];

      for (const testCase of testCases) {
        const response = await makeRequest({
          method: 'POST',
          url: '/cart/add',
          headers: {
            ...authHeader(authToken),
            'Content-Type': 'application/json'
          },
          data: {
            courseId: generateUUID(), // Use different course ID each time
            quantity: testCase.quantity
          }
        });

        if (testCase.shouldPass) {
          // Should either succeed or fail for course not found (not quantity)
          expect([200, 404]).toContain(response.status);
        } else {
          expectError(response, 400, 'VALIDATION_001');
        }

        // Clear cart between tests
        await makeRequest({
          method: 'DELETE',
          url: '/cart/clear',
          headers: authHeader(authToken)
        });
      }
    });
  });

  describe('Cart Performance Tests', () => {
    it('PERF_004: should handle cart operations within performance threshold', async () => {
      const startTime = Date.now();

      // Perform multiple cart operations
      await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(authToken)
      });

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      expect(totalTime).toBeLessThan(400); // 400ms threshold from test specs
    });

    it('should handle concurrent cart operations', async () => {
      const operations = [
        makeRequest({
          method: 'GET',
          url: '/cart',
          headers: authHeader(authToken)
        }),
        makeRequest({
          method: 'POST',
          url: '/cart/add',
          headers: {
            ...authHeader(authToken),
            'Content-Type': 'application/json'
          },
          data: { courseId: availableCourseId, quantity: 1 }
        })
      ];

      const results = await Promise.all(operations);
      
      // At least the GET should succeed
      expect(results[0].status).toBe(200);
    });
  });
});