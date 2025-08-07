import {
  makeRequest,
  authHeader,
  generateUniqueEmail,
  registerUser,
  expectError,
  expectSuccess,
  generateTestFile,
  createFormData,
  isValidEmail
} from '../support/test-helpers';

describe('User API Tests', () => {
  let authToken: string;
  let userEmail: string;
  let originalProfile: any;

  beforeAll(async () => {
    // Register and authenticate a test user
    userEmail = generateUniqueEmail();
    const password = 'testpassword123';
    authToken = await registerUser(userEmail, password, 'Test User Profile');
  });

  describe('User Profile Tests', () => {
    it('USER_001: should get user profile with auth', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.user).toBeDefined();
      expect(data.user.id).toBeDefined();
      expect(data.user.email).toBe(userEmail);
      expect(data.user.fullName).toBeDefined();
      expect(data.user.createdAt).toBeDefined();
      expect(data.user.preferences).toBeDefined();
      
      // Store original profile for later tests
      originalProfile = data.user;

      // Validate profile structure
      expect(data.user.preferences.language).toBeDefined();
      expect(data.user.preferences.timezone).toBeDefined();
      expect(data.user.preferences.notifications).toBeDefined();
      expect(typeof data.user.preferences.notifications.email).toBe('boolean');
      expect(typeof data.user.preferences.notifications.courseUpdates).toBe('boolean');
    });

    it('USER_002: should reject profile request without auth', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile'
      });

      expectError(response, 401, 'AUTH_004');
    });

    it('USER_003: should update user profile with valid data', async () => {
      const updateData = {
        fullName: 'Updated Test User',
        phone: '+1234567890',
        bio: 'This is my updated bio',
        preferences: {
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: false,
            courseUpdates: true,
            promotions: false,
            weeklyDigest: true
          }
        }
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: updateData
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('updated');
      expect(data.user).toBeDefined();
      expect(data.user.fullName).toBe(updateData.fullName);
      expect(data.user.phone).toBe(updateData.phone);
      expect(data.user.bio).toBe(updateData.bio);
      expect(data.user.updatedAt).toBeDefined();
    });

    it('USER_004: should reject profile update with invalid data', async () => {
      const invalidData = {
        fullName: 'Valid Name',
        phone: 'invalid-phone-format', // Invalid phone
        email: 'invalid-email' // Invalid email format
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: invalidData
      });

      expectError(response, 400, 'VALIDATION_003');
    });

    it('USER_005: should reject profile update without auth', async () => {
      const updateData = {
        fullName: 'Unauthorized Update'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          'Content-Type': 'application/json'
        },
        data: updateData
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Avatar Upload Tests', () => {
    it('USER_006: should upload valid image file', async () => {
      const imageBuffer = generateTestFile(1024 * 100); // 100KB image
      const formData = createFormData(imageBuffer, 'avatar.jpg', 'file');

      const response = await makeRequest({
        method: 'POST',
        url: '/user/avatar',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('uploaded');
      expect(data.avatarUrl).toBeDefined();
      expect(data.avatarUrl).toMatch(/^https?:\/\//);
    });

    it('USER_007: should reject oversized file upload', async () => {
      const largeImageBuffer = generateTestFile(6 * 1024 * 1024); // 6MB - over limit
      const formData = createFormData(largeImageBuffer, 'large-avatar.jpg', 'file');

      const response = await makeRequest({
        method: 'POST',
        url: '/user/avatar',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      expectError(response, 400, 'VALIDATION_004');
    });

    it('USER_008: should reject invalid file type', async () => {
      const textBuffer = Buffer.from('This is not an image file', 'utf8');
      const formData = createFormData(textBuffer, 'not-image.txt', 'file');

      const response = await makeRequest({
        method: 'POST',
        url: '/user/avatar',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      expectError(response, 400, 'VALIDATION_005');
    });

    it('USER_009: should reject avatar upload without auth', async () => {
      const imageBuffer = generateTestFile(1024);
      const formData = createFormData(imageBuffer, 'avatar.jpg', 'file');

      const response = await makeRequest({
        method: 'POST',
        url: '/user/avatar',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('Password Change Tests', () => {
    it('USER_010: should change password with valid data', async () => {
      const passwordData = {
        currentPassword: 'testpassword123',
        newPassword: 'newtestpassword123',
        confirmPassword: 'newtestpassword123'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: passwordData
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('changed');

      // Verify we can still access protected routes with the same token
      const profileResponse = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(authToken)
      });

      expectSuccess(profileResponse);
    });

    it('USER_011: should reject password change with wrong current password', async () => {
      const passwordData = {
        currentPassword: 'wrongcurrentpassword',
        newPassword: 'newtestpassword123',
        confirmPassword: 'newtestpassword123'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: passwordData
      });

      expectError(response, 401, 'AUTH_001');
    });

    it('USER_012: should reject weak new password', async () => {
      const passwordData = {
        currentPassword: 'newtestpassword123', // From previous test
        newPassword: '123', // Too weak
        confirmPassword: '123'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: passwordData
      });

      expectError(response, 400, 'AUTH_006');
    });

    it('USER_013: should reject mismatched password confirmation', async () => {
      const passwordData = {
        currentPassword: 'newtestpassword123',
        newPassword: 'anothernewpassword123',
        confirmPassword: 'differentpassword123' // Doesn't match
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: passwordData
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('should reject password change without auth', async () => {
      const passwordData = {
        currentPassword: 'newtestpassword123',
        newPassword: 'finalnewpassword123',
        confirmPassword: 'finalnewpassword123'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          'Content-Type': 'application/json'
        },
        data: passwordData
      });

      expectError(response, 401, 'AUTH_004');
    });
  });

  describe('User Data Validation Tests', () => {
    it('should validate user profile data structure', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      const user = data.user;

      // Required fields
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.fullName).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.preferences).toBeDefined();

      // Data types
      expect(typeof user.id).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.fullName).toBe('string');
      expect(isValidEmail(user.email)).toBe(true);

      // Dates
      expect(new Date(user.createdAt).toString()).not.toBe('Invalid Date');
      if (user.lastLoginAt) {
        expect(new Date(user.lastLoginAt).toString()).not.toBe('Invalid Date');
      }

      // Preferences structure
      expect(user.preferences.notifications).toBeDefined();
      expect(typeof user.preferences.notifications.email).toBe('boolean');
      expect(typeof user.preferences.notifications.courseUpdates).toBe('boolean');
    });

    it('should handle partial profile updates', async () => {
      const partialUpdate = {
        bio: 'Updated bio only'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: partialUpdate
      });

      const data = expectSuccess(response);
      expect(data.user.bio).toBe(partialUpdate.bio);

      // Other fields should remain unchanged
      expect(data.user.email).toBe(userEmail);
      expect(data.user.fullName).toBeDefined();
    });

    it('should validate phone number formats', async () => {
      const testCases = [
        { phone: '+1234567890', shouldPass: true },
        { phone: '1234567890', shouldPass: true },
        { phone: '+1-234-567-8900', shouldPass: true },
        { phone: '123', shouldPass: false },
        { phone: 'not-a-phone', shouldPass: false },
        { phone: '+1234567890123456789', shouldPass: false } // Too long
      ];

      for (const testCase of testCases) {
        const response = await makeRequest({
          method: 'PUT',
          url: '/user/profile',
          headers: {
            ...authHeader(authToken),
            'Content-Type': 'application/json'
          },
          data: { phone: testCase.phone }
        });

        if (testCase.shouldPass) {
          expectSuccess(response);
        } else {
          expectError(response, 400, 'VALIDATION_003');
        }
      }
    });
  });

  describe('User Security Tests', () => {
    it('SEC_004: should sanitize XSS attempts in profile fields', async () => {
      const maliciousData = {
        fullName: '<script>alert("xss")</script>Test User',
        bio: '<img src="x" onerror="alert(1)">Bio content',
        phone: '<script>console.log("hack")</script>1234567890'
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: maliciousData
      });

      // Should either succeed with sanitized data or fail validation
      if (response.status === 200) {
        const data = expectSuccess(response);
        // Script tags should be removed/escaped
        expect(data.user.fullName).not.toContain('<script>');
        expect(data.user.bio).not.toContain('<img src="x" onerror=');
      } else {
        expectError(response, 400);
      }
    });

    it('SEC_006: should prevent cross-user data access', async () => {
      // Create another user
      const anotherUserEmail = generateUniqueEmail();
      const anotherToken = await registerUser(anotherUserEmail, 'password123', 'Another User');

      // Try to access original user's profile with another user's token
      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(anotherToken)
      });

      const data = expectSuccess(response);
      // Should get the second user's profile, not the first user's
      expect(data.user.email).toBe(anotherUserEmail);
      expect(data.user.email).not.toBe(userEmail);
    });

    it('SEC_010: should enforce input length validation', async () => {
      const longString = 'a'.repeat(10000); // Very long string

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: {
          fullName: longString,
          bio: longString
        }
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('should validate email uniqueness (if supported)', async () => {
      // Try to update to an existing email
      const existingEmail = generateUniqueEmail();
      await registerUser(existingEmail, 'password123', 'Existing User');

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: {
          email: existingEmail
        }
      });

      // Should either be forbidden (if email updates are not allowed)
      // or conflict (if email already exists)
      expect([400, 403, 409]).toContain(response.status);
    });
  });

  describe('User Preferences Tests', () => {
    it('should update notification preferences', async () => {
      const preferencesUpdate = {
        preferences: {
          notifications: {
            email: false,
            courseUpdates: true,
            promotions: false,
            weeklyDigest: true
          }
        }
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: preferencesUpdate
      });

      const data = expectSuccess(response);
      expect(data.user.preferences.notifications.email).toBe(false);
      expect(data.user.preferences.notifications.courseUpdates).toBe(true);
    });

    it('should update language and timezone preferences', async () => {
      const preferencesUpdate = {
        preferences: {
          language: 'vi',
          timezone: 'Asia/Ho_Chi_Minh'
        }
      };

      const response = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(authToken),
          'Content-Type': 'application/json'
        },
        data: preferencesUpdate
      });

      const data = expectSuccess(response);
      expect(data.user.preferences.language).toBe('vi');
      expect(data.user.preferences.timezone).toBe('Asia/Ho_Chi_Minh');
    });
  });
});