import {
  makeRequest,
  authHeader,
  generateUniqueEmail,
  authenticateUser,
  registerUser,
  expectError,
  expectSuccess,
  validatePagination,
  isValidUUID,
  testCourses,
  generateUUID
} from '../support/test-helpers';

describe('Course API Tests', () => {
  let authToken: string;
  let testUserId: string;
  let enrolledCourseId: string;

  beforeAll(async () => {
    // Register and authenticate a test user
    const email = generateUniqueEmail();
    const password = 'testpassword123';
    authToken = await registerUser(email, password, 'Test User');
  });

  describe('Get All Courses Tests', () => {
    it('COURSE_001: should get courses without parameters', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses'
      });

      const data = expectSuccess(response);
      expect(data.courses).toBeDefined();
      expect(Array.isArray(data.courses)).toBe(true);
      expect(data.pagination).toBeDefined();
      validatePagination(data.pagination);

      // Validate course structure
      if (data.courses.length > 0) {
        const course = data.courses[0];
        expect(course.id).toBeDefined();
        expect(isValidUUID(course.id)).toBe(true);
        expect(course.title).toBeDefined();
        expect(course.price).toBeDefined();
        expect(course.level).toBeDefined();
        expect(course.instructor).toBeDefined();
      }
    });

    it('COURSE_002: should get courses with pagination', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?page=1&limit=5'
      });

      const data = expectSuccess(response);
      expect(data.courses.length).toBeLessThanOrEqual(5);
      expect(data.pagination.currentPage).toBe(1);
      expect(data.pagination.itemsPerPage).toBe(5);
    });

    it('COURSE_003: should filter courses by category', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?category=automation'
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.category.toLowerCase()).toContain('automation');
        });
      }
    });

    it('COURSE_004: should filter courses by level', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?level=Beginner'
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.level).toBe('Beginner');
        });
      }
    });

    it('COURSE_005: should sort courses by newest', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?sortBy=newest&sortOrder=desc'
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 1) {
        // Check if dates are in descending order
        for (let i = 0; i < data.courses.length - 1; i++) {
          const current = new Date(data.courses[i].lastUpdated);
          const next = new Date(data.courses[i + 1].lastUpdated);
          expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
        }
      }
    });

    it('COURSE_006: should sort courses by rating', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?sortBy=rating&sortOrder=desc'
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 1) {
        // Check if ratings are in descending order
        for (let i = 0; i < data.courses.length - 1; i++) {
          expect(data.courses[i].rating).toBeGreaterThanOrEqual(data.courses[i + 1].rating);
        }
      }
    });

    it('COURSE_007: should reject invalid page parameter', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?page=-1'
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('COURSE_008: should handle exceeded limit parameter', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?limit=100'
      });

      // Should either return error or cap at max limit
      if (response.status === 400) {
        expectError(response, 400, 'VALIDATION_001');
      } else {
        const data = expectSuccess(response);
        expect(data.courses.length).toBeLessThanOrEqual(50); // Max limit from API spec
      }
    });
  });

  describe('Get Course by ID Tests', () => {
    let validCourseId: string;

    beforeAll(async () => {
      // Get a valid course ID from the courses list
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?limit=1'
      });

      const data = expectSuccess(response);
      if (data.courses.length > 0) {
        validCourseId = data.courses[0].id;
      } else {
        validCourseId = testCourses.course1.id; // Fallback to test data
      }
    });

    it('COURSE_009: should get course details with valid ID', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: `/courses/${validCourseId}`
      });

      const data = expectSuccess(response);
      expect(data.course).toBeDefined();
      expect(data.course.id).toBe(validCourseId);
      expect(data.course.curriculum).toBeDefined();
      expect(Array.isArray(data.course.curriculum)).toBe(true);
      expect(data.course.skills).toBeDefined();
      expect(data.course.requirements).toBeDefined();
      expect(data.course.totalLessons).toBeDefined();
      expect(data.course.isEnrolled).toBeDefined();
    });

    it('COURSE_010: should reject invalid course ID format', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/invalid-uuid'
      });

      expectError(response, 400, 'VALIDATION_008');
    });

    it('COURSE_011: should return 404 for non-existent course ID', async () => {
      const nonExistentId = generateUUID();
      const response = await makeRequest({
        method: 'GET',
        url: `/courses/${nonExistentId}`
      });

      expectError(response, 404, 'COURSE_001');
    });

    it('COURSE_012: should show enrollment status for authenticated user', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: `/courses/${validCourseId}`,
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(typeof data.course.isEnrolled).toBe('boolean');
    });
  });

  describe('Get Enrolled Courses Tests', () => {
    beforeAll(async () => {
      // Enroll in a course for testing
      const coursesResponse = await makeRequest({
        method: 'GET',
        url: '/courses?limit=1'
      });

      if (coursesResponse.data?.data?.courses?.length > 0) {
        enrolledCourseId = coursesResponse.data.data.courses[0].id;
        
        await makeRequest({
          method: 'POST',
          url: `/courses/${enrolledCourseId}/enroll`,
          headers: authHeader(authToken)
        });
      }
    });

    it('COURSE_013: should get all enrolled courses with auth', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/enrolled',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.courses).toBeDefined();
      expect(Array.isArray(data.courses)).toBe(true);
      expect(data.stats).toBeDefined();
      expect(data.stats.totalCourses).toBeDefined();

      // Validate enrolled course structure
      if (data.courses.length > 0) {
        const course = data.courses[0];
        expect(course.progress).toBeDefined();
        expect(course.totalLessons).toBeDefined();
        expect(course.completedLessons).toBeDefined();
        expect(course.enrolledDate).toBeDefined();
      }
    });

    it('COURSE_014: should filter enrolled courses by status', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/enrolled?status=in-progress',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.progress).toBeGreaterThan(0);
          expect(course.progress).toBeLessThan(100);
        });
      }
    });

    it('COURSE_015: should filter enrolled courses by completed status', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/enrolled?status=completed',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.progress).toBe(100);
          expect(course.completedAt).toBeDefined();
        });
      }
    });

    it('COURSE_016: should reject request without auth token', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/enrolled'
      });

      expectError(response, 401, 'AUTH_004');
    });

    it('COURSE_017: should paginate enrolled courses', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses/enrolled?page=1&limit=5',
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.courses.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Course Enrollment Tests', () => {
    let unenrolledCourseId: string;

    beforeAll(async () => {
      // Find a course that the user is not enrolled in
      const coursesResponse = await makeRequest({
        method: 'GET',
        url: '/courses?limit=10'
      });

      if (coursesResponse.data?.data?.courses) {
        const course = coursesResponse.data.data.courses.find((c: any) => 
          c.id !== enrolledCourseId
        );
        unenrolledCourseId = course?.id || generateUUID();
      }
    });

    it('COURSE_018: should enroll in course with valid auth', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: `/courses/${unenrolledCourseId}/enroll`,
        headers: authHeader(authToken)
      });

      const data = expectSuccess(response);
      expect(data.message).toContain('enrolled');
      expect(data.enrollment).toBeDefined();
      expect(data.enrollment.courseId).toBe(unenrolledCourseId);
      expect(data.enrollment.progress).toBe(0);
    });

    it('COURSE_019: should reject enrollment without auth', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: `/courses/${unenrolledCourseId}/enroll`
      });

      expectError(response, 401, 'AUTH_004');
    });

    it('COURSE_020: should reject duplicate enrollment', async () => {
      const response = await makeRequest({
        method: 'POST',
        url: `/courses/${enrolledCourseId}/enroll`,
        headers: authHeader(authToken)
      });

      expectError(response, 409, 'COURSE_003');
    });

    it('COURSE_021: should reject enrollment for non-existent course', async () => {
      const nonExistentId = generateUUID();
      const response = await makeRequest({
        method: 'POST',
        url: `/courses/${nonExistentId}/enroll`,
        headers: authHeader(authToken)
      });

      expectError(response, 404, 'COURSE_001');
    });

    it('COURSE_022: should handle enrollment limit reached', async () => {
      // This test would require a course with limited enrollment
      // For demo purposes, we'll simulate the scenario
      const limitedCourseId = 'limited-enrollment-course-id';
      
      const response = await makeRequest({
        method: 'POST',
        url: `/courses/${limitedCourseId}/enroll`,
        headers: authHeader(authToken)
      });

      // Could be either course not found or enrollment limit error
      expect([404, 409]).toContain(response.status);
      
      if (response.status === 409) {
        expectError(response, 409, 'COURSE_004');
      }
    });
  });

  describe('Course Data Validation Tests', () => {
    it('should validate course response structure', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?limit=1'
      });

      const data = expectSuccess(response);
      
      if (data.courses.length > 0) {
        const course = data.courses[0];
        
        // Required fields
        expect(course.id).toBeDefined();
        expect(course.title).toBeDefined();
        expect(course.description).toBeDefined();
        expect(course.price).toBeDefined();
        expect(course.level).toBeDefined();
        expect(course.category).toBeDefined();
        expect(course.instructor).toBeDefined();
        
        // Data types
        expect(typeof course.price).toBe('number');
        expect(typeof course.rating).toBe('number');
        expect(typeof course.studentsCount).toBe('number');
        expect(['Beginner', 'Intermediate', 'Advanced']).toContain(course.level);
        
        // URL validations
        if (course.thumbnail) {
          expect(course.thumbnail).toMatch(/^https?:\/\//);
        }
        
        // Rating range
        expect(course.rating).toBeGreaterThanOrEqual(0);
        expect(course.rating).toBeLessThanOrEqual(5);
      }
    });

    it('should validate curriculum structure', async () => {
      const coursesResponse = await makeRequest({
        method: 'GET',
        url: '/courses?limit=1'
      });

      if (coursesResponse.data?.data?.courses?.length > 0) {
        const courseId = coursesResponse.data.data.courses[0].id;
        
        const response = await makeRequest({
          method: 'GET',
          url: `/courses/${courseId}`
        });

        const data = expectSuccess(response);
        
        if (data.course.curriculum.length > 0) {
          const section = data.course.curriculum[0];
          
          expect(section.id).toBeDefined();
          expect(section.title).toBeDefined();
          expect(section.lessons).toBeDefined();
          expect(Array.isArray(section.lessons)).toBe(true);
          
          if (section.lessons.length > 0) {
            const lesson = section.lessons[0];
            expect(lesson.id).toBeDefined();
            expect(lesson.title).toBeDefined();
            expect(lesson.duration).toBeDefined();
            expect(typeof lesson.isPreview).toBe('boolean');
          }
        }
      }
    });
  });

  describe('Course Performance Tests', () => {
    it('PERF_001: should load course list within performance threshold', async () => {
      const startTime = Date.now();
      
      const response = await makeRequest({
        method: 'GET',
        url: '/courses?limit=12'
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expectSuccess(response);
      expect(responseTime).toBeLessThan(500); // 500ms threshold from test specs
    });

    it('should handle concurrent course requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        makeRequest({
          method: 'GET',
          url: '/courses?limit=5'
        })
      );

      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expectSuccess(response);
      });

      // All should return within reasonable time
      expect(responses).toHaveLength(10);
    });
  });
});