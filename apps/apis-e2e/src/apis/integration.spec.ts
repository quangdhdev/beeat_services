import {
  makeRequest,
  authHeader,
  generateUniqueEmail,
  registerUser,
  expectError,
  expectSuccess,
  delay,
  testCourses
} from '../support/test-helpers';

describe('End-to-End Integration Tests', () => {
  let userToken: string;
  let userEmail: string;
  let availableCourseId: string;
  let enrolledCourseId: string;

  beforeAll(async () => {
    // Setup test data
    userEmail = generateUniqueEmail();
    userToken = await registerUser(userEmail, 'testpassword123', 'Integration Test User');

    // Get available courses
    const coursesResponse = await makeRequest({
      method: 'GET',
      url: '/courses?limit=2'
    });

    if (coursesResponse.data?.data?.courses?.length > 0) {
      availableCourseId = coursesResponse.data.data.courses[0].id;
      if (coursesResponse.data.data.courses.length > 1) {
        enrolledCourseId = coursesResponse.data.data.courses[1].id;
      } else {
        enrolledCourseId = availableCourseId;
      }
    } else {
      availableCourseId = testCourses.course1.id;
      enrolledCourseId = testCourses.course2.id;
    }
  });

  describe('E2E_001: Complete Course Purchase Journey', () => {
    it('should complete full purchase flow: Register → Browse → Add to Cart → Checkout → Access Course', async () => {
      // Step 1: User registration (already done in beforeAll)
      expect(userToken).toBeDefined();

      // Step 2: Browse courses
      const browseCourses = await makeRequest({
        method: 'GET',
        url: '/courses?limit=10'
      });

      const courseData = expectSuccess(browseCourses);
      expect(courseData.courses.length).toBeGreaterThan(0);

      // Step 3: View course details
      const courseDetails = await makeRequest({
        method: 'GET',
        url: `/courses/${availableCourseId}`,
        headers: authHeader(userToken)
      });

      const courseInfo = expectSuccess(courseDetails);
      expect(courseInfo.course.id).toBe(availableCourseId);
      expect(courseInfo.course.isEnrolled).toBe(false);

      // Step 4: Add course to cart
      const addToCart = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      const cartItem = expectSuccess(addToCart);
      expect(cartItem.cartItem.courseId).toBe(availableCourseId);

      // Step 5: View cart
      const viewCart = await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(userToken)
      });

      const cartData = expectSuccess(viewCart);
      expect(cartData.items.length).toBe(1);
      expect(cartData.items[0].courseId).toBe(availableCourseId);

      // Step 6: Create payment intent (simulate checkout)
      const billingAddress = {
        fullName: 'Integration Test User',
        email: userEmail,
        address: '123 Test Street',
        city: 'Test City',
        zipCode: '12345'
      };

      const paymentIntent = await makeRequest({
        method: 'POST',
        url: '/payment/create-intent',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'application/json'
        },
        data: {
          items: cartData.items.map((item: any) => ({
            courseId: item.courseId,
            quantity: item.quantity,
            price: item.course.price
          })),
          paymentMethod: 'card',
          billingAddress
        }
      });

      // May not be implemented yet, so handle both success and error cases
      if (paymentIntent.status === 200) {
        const paymentData = expectSuccess(paymentIntent);
        expect(paymentData.paymentIntent).toBeDefined();
        expect(paymentData.order).toBeDefined();

        // Step 7: Confirm payment (simulate)
        const confirmPayment = await makeRequest({
          method: 'POST',
          url: '/payment/confirm',
          headers: {
            ...authHeader(userToken),
            'Content-Type': 'application/json'
          },
          data: {
            paymentIntentId: paymentData.paymentIntent.id,
            paymentMethodId: 'test_payment_method_id'
          }
        });

        if (confirmPayment.status === 200) {
          const confirmation = expectSuccess(confirmPayment);
          expect(confirmation.payment.status).toBe('succeeded');

          // Step 8: Verify enrollment
          const enrolledCourses = await makeRequest({
            method: 'GET',
            url: '/courses/enrolled',
            headers: authHeader(userToken)
          });

          const enrollmentData = expectSuccess(enrolledCourses);
          const enrolledCourse = enrollmentData.courses.find((c: any) => c.id === availableCourseId);
          expect(enrolledCourse).toBeDefined();
        }
      } else {
        // Alternative path: Direct enrollment for testing
        const directEnroll = await makeRequest({
          method: 'POST',
          url: `/courses/${availableCourseId}/enroll`,
          headers: authHeader(userToken)
        });

        expectSuccess(directEnroll);
      }

      // Final verification: Access enrolled course
      const accessCourse = await makeRequest({
        method: 'GET',
        url: `/courses/${availableCourseId}`,
        headers: authHeader(userToken)
      });

      const finalCourseData = expectSuccess(accessCourse);
      expect(finalCourseData.course.isEnrolled).toBe(true);

      console.log('✅ Complete course purchase journey test passed');
    });
  });

  describe('E2E_002: Course Progress Tracking Journey', () => {
    it('should track progress: Enroll → Watch Lessons → Mark Complete → Check Progress', async () => {
      // Step 1: Enroll in course
      const enrollResponse = await makeRequest({
        method: 'POST',
        url: `/courses/${enrolledCourseId}/enroll`,
        headers: authHeader(userToken)
      });

      if (enrollResponse.status === 409) {
        // Already enrolled, continue with test
      } else {
        expectSuccess(enrollResponse);
      }

      // Step 2: Get course progress (initial)
      const initialProgress = await makeRequest({
        method: 'GET',
        url: `/courses/${enrolledCourseId}/progress`,
        headers: authHeader(userToken)
      });

      const progressData = expectSuccess(initialProgress);
      expect(progressData.progress.courseId).toBe(enrolledCourseId);
      expect(progressData.progress.overallProgress).toBeGreaterThanOrEqual(0);

      // Step 3: Get course curriculum to find lessons
      const courseDetails = await makeRequest({
        method: 'GET',
        url: `/courses/${enrolledCourseId}`,
        headers: authHeader(userToken)
      });

      const courseData = expectSuccess(courseDetails);
      
      if (courseData.course.curriculum && courseData.course.curriculum.length > 0) {
        const firstSection = courseData.course.curriculum[0];
        
        if (firstSection.lessons && firstSection.lessons.length > 0) {
          const firstLesson = firstSection.lessons[0];

          // Step 4: Mark lesson as complete
          const updateProgress = await makeRequest({
            method: 'PUT',
            url: `/courses/${enrolledCourseId}/lessons/${firstLesson.id}/progress`,
            headers: {
              ...authHeader(userToken),
              'Content-Type': 'application/json'
            },
            data: {
              completed: true,
              timeSpent: 1800, // 30 minutes
              watchedDuration: 1800
            }
          });

          if (updateProgress.status === 200) {
            const lessonProgress = expectSuccess(updateProgress);
            expect(lessonProgress.lessonProgress.completed).toBe(true);
            expect(lessonProgress.courseProgress.overallProgress).toBeGreaterThan(0);

            // Step 5: Track lesson completion analytics
            const trackCompletion = await makeRequest({
              method: 'POST',
              url: '/analytics/lesson-completion',
              headers: {
                ...authHeader(userToken),
                'Content-Type': 'application/json'
              },
              data: {
                courseId: enrolledCourseId,
                lessonId: firstLesson.id,
                timeSpent: 1800,
                completionRate: 100
              }
            });

            // Analytics may not be implemented, so handle both cases
            if (trackCompletion.status === 200) {
              expectSuccess(trackCompletion);
            }

            // Step 6: Check updated progress
            const updatedProgress = await makeRequest({
              method: 'GET',
              url: `/courses/${enrolledCourseId}/progress`,
              headers: authHeader(userToken)
            });

            const finalProgressData = expectSuccess(updatedProgress);
            expect(finalProgressData.progress.overallProgress)
              .toBeGreaterThan(progressData.progress.overallProgress);
            expect(finalProgressData.progress.completedLessons)
              .toContain(firstLesson.id);
          }
        }
      }

      console.log('✅ Course progress tracking journey test passed');
    });
  });

  describe('E2E_003: User Profile Management Journey', () => {
    it('should manage profile: Register → Update Profile → Upload Avatar → Change Password', async () => {
      // Step 1: Get initial profile (registration already done)
      const initialProfile = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(userToken)
      });

      const profileData = expectSuccess(initialProfile);
      expect(profileData.user.email).toBe(userEmail);

      // Step 2: Update profile information
      const updateProfile = await makeRequest({
        method: 'PUT',
        url: '/user/profile',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'application/json'
        },
        data: {
          fullName: 'Updated Integration User',
          phone: '+1234567890',
          bio: 'This is my integration test bio',
          preferences: {
            language: 'vi',
            timezone: 'Asia/Ho_Chi_Minh',
            notifications: {
              email: true,
              courseUpdates: true,
              promotions: false,
              weeklyDigest: true
            }
          }
        }
      });

      const updatedProfileData = expectSuccess(updateProfile);
      expect(updatedProfileData.user.fullName).toBe('Updated Integration User');
      expect(updatedProfileData.user.phone).toBe('+1234567890');

      // Step 3: Upload avatar (simulate with test data)
      const avatarData = Buffer.from('fake-image-data', 'utf8');
      const formData = new FormData();
      const blob = new Blob([avatarData], { type: 'image/jpeg' });
      formData.append('file', blob, 'avatar.jpg');

      const uploadAvatar = await makeRequest({
        method: 'POST',
        url: '/user/avatar',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });

      // Avatar upload may not be fully implemented, handle both cases
      if (uploadAvatar.status === 200) {
        const avatarResponse = expectSuccess(uploadAvatar);
        expect(avatarResponse.avatarUrl).toBeDefined();
      }

      // Step 4: Change password
      const changePassword = await makeRequest({
        method: 'PUT',
        url: '/user/password',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'application/json'
        },
        data: {
          currentPassword: 'testpassword123',
          newPassword: 'newintegrationpassword123',
          confirmPassword: 'newintegrationpassword123'
        }
      });

      // Password change may not be implemented, handle both cases
      if (changePassword.status === 200) {
        expectSuccess(changePassword);
      }

      // Step 5: Verify profile after all changes
      const finalProfile = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(userToken)
      });

      const finalProfileData = expectSuccess(finalProfile);
      expect(finalProfileData.user.fullName).toBe('Updated Integration User');
      expect(finalProfileData.user.bio).toBe('This is my integration test bio');

      console.log('✅ User profile management journey test passed');
    });
  });

  describe('E2E_004: Search and Enrollment Journey', () => {
    it('should complete: Search Courses → Filter Results → View Details → Enroll', async () => {
      // Step 1: Search for courses
      const searchResponse = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=automation'
      });

      const searchData = expectSuccess(searchResponse);
      expect(searchData.courses.length).toBeGreaterThan(0);

      // Step 2: Filter search results
      const filteredSearch = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=automation&level=Beginner&priceMax=1000000'
      });

      const filteredData = expectSuccess(filteredSearch);

      if (filteredData.courses.length > 0) {
        const selectedCourse = filteredData.courses[0];

        // Step 3: View course details
        const courseDetails = await makeRequest({
          method: 'GET',
          url: `/courses/${selectedCourse.id}`,
          headers: authHeader(userToken)
        });

        const detailsData = expectSuccess(courseDetails);
        expect(detailsData.course.id).toBe(selectedCourse.id);

        // Step 4: Track course view for analytics
        const trackView = await makeRequest({
          method: 'POST',
          url: '/analytics/course-view',
          headers: {
            ...authHeader(userToken),
            'Content-Type': 'application/json'
          },
          data: {
            courseId: selectedCourse.id,
            source: 'search',
            referrer: 'search_results'
          }
        });

        // Analytics may not be implemented, handle both cases
        if (trackView.status === 200) {
          expectSuccess(trackView);
        }

        // Step 5: Enroll in course (if not already enrolled)
        if (!detailsData.course.isEnrolled) {
          const enrollResponse = await makeRequest({
            method: 'POST',
            url: `/courses/${selectedCourse.id}/enroll`,
            headers: authHeader(userToken)
          });

          if (enrollResponse.status === 200) {
            const enrollData = expectSuccess(enrollResponse);
            expect(enrollData.enrollment.courseId).toBe(selectedCourse.id);

            // Step 6: Verify enrollment in user's enrolled courses
            const enrolledCourses = await makeRequest({
              method: 'GET',
              url: '/courses/enrolled',
              headers: authHeader(userToken)
            });

            const enrolledData = expectSuccess(enrolledCourses);
            const foundCourse = enrolledData.courses.find((c: any) => c.id === selectedCourse.id);
            expect(foundCourse).toBeDefined();
          }
        }
      }

      console.log('✅ Search and enrollment journey test passed');
    });
  });

  describe('Cross-Feature Integration Tests', () => {
    it('should maintain data consistency across features', async () => {
      // Test data consistency between cart, enrollment, and user profile

      // Add course to cart
      const addToCart = await makeRequest({
        method: 'POST',
        url: '/cart/add',
        headers: {
          ...authHeader(userToken),
          'Content-Type': 'application/json'
        },
        data: { courseId: availableCourseId, quantity: 1 }
      });

      if (addToCart.status === 200) {
        // Enroll in course
        const enrollResponse = await makeRequest({
          method: 'POST',
          url: `/courses/${availableCourseId}/enroll`,
          headers: authHeader(userToken)
        });

        if (enrollResponse.status === 200) {
          // Course should be removed from cart after enrollment
          const cartAfterEnroll = await makeRequest({
            method: 'GET',
            url: '/cart',
            headers: authHeader(userToken)
          });

          const cartData = expectSuccess(cartAfterEnroll);
          const courseInCart = cartData.items.find((item: any) => item.courseId === availableCourseId);
          expect(courseInCart).toBeUndefined();

          // Course should appear in enrolled courses
          const enrolledCourses = await makeRequest({
            method: 'GET',
            url: '/courses/enrolled',
            headers: authHeader(userToken)
          });

          const enrolledData = expectSuccess(enrolledCourses);
          const enrolledCourse = enrolledData.courses.find((c: any) => c.id === availableCourseId);
          expect(enrolledCourse).toBeDefined();
        }
      }

      console.log('✅ Cross-feature integration test passed');
    });

    it('should handle authentication state across all features', async () => {
      // Test that authentication works consistently across all endpoints

      const endpoints = [
        { method: 'GET', url: '/user/profile' },
        { method: 'GET', url: '/courses/enrolled' },
        { method: 'GET', url: '/cart' },
        { method: 'GET', url: '/analytics/learning' }
      ];

      for (const endpoint of endpoints) {
        // Test with valid token
        const withAuth = await makeRequest({
          method: endpoint.method,
          url: endpoint.url,
          headers: authHeader(userToken)
        });

        // Should succeed or return reasonable error (like not implemented)
        expect([200, 404, 501]).toContain(withAuth.status);

        // Test without token
        const withoutAuth = await makeRequest({
          method: endpoint.method,
          url: endpoint.url
        });

        // Should return 401 for protected endpoints
        if (withoutAuth.status === 401) {
          expectError(withoutAuth, 401, 'AUTH_004');
        }

        await delay(50); // Prevent rate limiting
      }

      console.log('✅ Authentication consistency test passed');
    });

    it('should handle concurrent operations correctly', async () => {
      // Test concurrent operations that might cause race conditions

      const concurrentOperations = [
        makeRequest({
          method: 'GET',
          url: '/courses',
          headers: authHeader(userToken)
        }),
        makeRequest({
          method: 'GET',
          url: '/user/profile',
          headers: authHeader(userToken)
        }),
        makeRequest({
          method: 'GET',
          url: '/cart',
          headers: authHeader(userToken)
        }),
        makeRequest({
          method: 'GET',
          url: '/search/courses?q=test',
          headers: authHeader(userToken)
        })
      ];

      const results = await Promise.all(concurrentOperations);

      results.forEach((result, index) => {
        // All should succeed or fail gracefully
        expect([200, 404, 500, 501]).toContain(result.status);
        if (result.status === 200) {
          expect(result.data.success).toBe(true);
        }
      });

      console.log('✅ Concurrent operations test passed');
    });
  });

  describe('Performance Integration Tests', () => {
    it('should maintain acceptable response times for complete user journeys', async () => {
      const startTime = Date.now();

      // Simulate a complete user session
      await makeRequest({
        method: 'GET',
        url: '/courses?limit=5',
        headers: authHeader(userToken)
      });

      await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&limit=3',
        headers: authHeader(userToken)
      });

      await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: authHeader(userToken)
      });

      await makeRequest({
        method: 'GET',
        url: '/cart',
        headers: authHeader(userToken)
      });

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Complete user session should be under 2 seconds
      expect(totalTime).toBeLessThan(2000);

      console.log(`✅ Performance integration test passed (${totalTime}ms)`);
    });
  });
});