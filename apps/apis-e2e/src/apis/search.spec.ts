import {
  makeRequest,
  expectError,
  expectSuccess,
  validatePagination,
  delay
} from '../support/test-helpers';

describe('Search API Tests', () => {
  describe('Search Courses Tests', () => {
    it('SEARCH_001: should search courses with basic query', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=automation'
      });

      const data = expectSuccess(response);
      expect(data.courses).toBeDefined();
      expect(Array.isArray(data.courses)).toBe(true);
      expect(data.pagination).toBeDefined();
      expect(data.filters).toBeDefined();

      validatePagination(data.pagination);

      // Validate search result structure
      if (data.courses.length > 0) {
        const course = data.courses[0];
        expect(course.id).toBeDefined();
        expect(course.title).toBeDefined();
        expect(course.relevanceScore).toBeDefined();
        expect(typeof course.relevanceScore).toBe('number');
        expect(course.relevanceScore).toBeGreaterThanOrEqual(0);
        expect(course.relevanceScore).toBeLessThanOrEqual(1);

        // Check if results are relevant to search query
        const searchTerm = 'automation';
        const isRelevant = 
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.category.toLowerCase().includes(searchTerm);
        expect(isRelevant).toBe(true);
      }
    });

    it('SEARCH_002: should search courses with filters', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=testing&level=Beginner&priceMax=1000000'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.level).toBe('Beginner');
          expect(course.price).toBeLessThanOrEqual(1000000);
        });
      }

      // Validate filters structure
      expect(data.filters.categories).toBeDefined();
      expect(data.filters.levels).toBeDefined();
      expect(data.filters.priceRange).toBeDefined();
      expect(data.filters.priceRange.min).toBeDefined();
      expect(data.filters.priceRange.max).toBeDefined();
    });

    it('SEARCH_003: should reject empty search query', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q='
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('SEARCH_004: should paginate search results', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=testing&page=1&limit=5'
      });

      const data = expectSuccess(response);
      expect(data.courses.length).toBeLessThanOrEqual(5);
      expect(data.pagination.currentPage).toBe(1);
      expect(data.pagination.itemsPerPage).toBe(5);

      // Test second page if there are more results
      if (data.pagination.hasNext) {
        const page2Response = await makeRequest({
          method: 'GET',
          url: '/search/courses?q=testing&page=2&limit=5'
        });

        const page2Data = expectSuccess(page2Response);
        expect(page2Data.pagination.currentPage).toBe(2);
      }
    });

    it('SEARCH_005: should handle no results search gracefully', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=nonexistentcoursexyz123'
      });

      const data = expectSuccess(response);
      expect(data.courses).toBeDefined();
      expect(Array.isArray(data.courses)).toBe(true);
      expect(data.courses).toHaveLength(0);
      expect(data.pagination.totalItems).toBe(0);
    });

    it('should search with category filter', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&category=automation'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.category.toLowerCase()).toContain('automation');
        });
      }
    });

    it('should search with price range filters', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&priceMin=100000&priceMax=500000'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.price).toBeGreaterThanOrEqual(100000);
          expect(course.price).toBeLessThanOrEqual(500000);
        });
      }
    });

    it('should search with rating filter', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&rating=4'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.rating).toBeGreaterThanOrEqual(4);
        });
      }
    });

    it('should search with duration filter', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&duration=short'
      });

      const data = expectSuccess(response);
      // Duration filtering logic would be validated based on actual implementation
    });

    it('should sort search results by relevance', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=automation&sortBy=relevance'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 1) {
        // Check if results are sorted by relevance score (descending)
        for (let i = 0; i < data.courses.length - 1; i++) {
          expect(data.courses[i].relevanceScore)
            .toBeGreaterThanOrEqual(data.courses[i + 1].relevanceScore);
        }
      }
    });

    it('should sort search results by rating', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&sortBy=rating'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 1) {
        // Check if results are sorted by rating (descending by default)
        for (let i = 0; i < data.courses.length - 1; i++) {
          expect(data.courses[i].rating)
            .toBeGreaterThanOrEqual(data.courses[i + 1].rating);
        }
      }
    });

    it('should sort search results by price', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&sortBy=price'
      });

      const data = expectSuccess(response);

      if (data.courses.length > 1) {
        // Check if results are sorted by price (ascending by default)
        for (let i = 0; i < data.courses.length - 1; i++) {
          expect(data.courses[i].price)
            .toBeLessThanOrEqual(data.courses[i + 1].price);
        }
      }
    });
  });

  describe('Search Suggestions Tests', () => {
    it('SEARCH_006: should get search suggestions', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q=auto'
      });

      const data = expectSuccess(response);
      expect(data.suggestions).toBeDefined();
      expect(Array.isArray(data.suggestions)).toBe(true);

      if (data.suggestions.length > 0) {
        const suggestion = data.suggestions[0];
        expect(suggestion.text).toBeDefined();
        expect(suggestion.type).toBeDefined();
        expect(suggestion.count).toBeDefined();
        
        expect(typeof suggestion.text).toBe('string');
        expect(['course', 'instructor', 'category', 'skill']).toContain(suggestion.type);
        expect(typeof suggestion.count).toBe('number');
        
        // Suggestion should contain the query term
        expect(suggestion.text.toLowerCase()).toContain('auto');
      }
    });

    it('SEARCH_007: should limit suggestions count', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q=test&limit=3'
      });

      const data = expectSuccess(response);
      expect(data.suggestions.length).toBeLessThanOrEqual(3);
    });

    it('SEARCH_008: should reject empty suggestions query', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q='
      });

      expectError(response, 400, 'VALIDATION_001');
    });

    it('should handle suggestions for different types', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q=automation'
      });

      const data = expectSuccess(response);

      if (data.suggestions.length > 0) {
        // Check if we get different types of suggestions
        const types = data.suggestions.map((s: any) => s.type);
        const uniqueTypes = [...new Set(types)];
        
        // Should have at least course suggestions
        expect(types).toContain('course');
      }
    });

    it('should respect maximum limit for suggestions', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q=test&limit=15' // Over max limit of 10
      });

      const data = expectSuccess(response);
      expect(data.suggestions.length).toBeLessThanOrEqual(10); // Max from API spec
    });

    it('should handle suggestions with no results', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/suggestions?q=nonexistentquerxyz123'
      });

      const data = expectSuccess(response);
      expect(data.suggestions).toBeDefined();
      expect(Array.isArray(data.suggestions)).toBe(true);
      expect(data.suggestions).toHaveLength(0);
    });
  });

  describe('Search Performance Tests', () => {
    it('PERF_002: should return search results within performance threshold', async () => {
      const startTime = Date.now();

      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=automation testing'
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expectSuccess(response);
      expect(responseTime).toBeLessThan(800); // 800ms threshold from test specs
    });

    it('should handle concurrent search requests', async () => {
      const searchQueries = [
        'automation',
        'testing',
        'selenium',
        'javascript',
        'python'
      ];

      const requests = searchQueries.map(query =>
        makeRequest({
          method: 'GET',
          url: `/search/courses?q=${query}`
        })
      );

      const startTime = Date.now();
      const responses = await Promise.all(requests);
      const endTime = Date.now();

      responses.forEach(response => {
        expectSuccess(response);
      });

      // All concurrent requests should complete in reasonable time
      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(2000); // 2 seconds for all concurrent requests
    });

    it('should handle complex search queries efficiently', async () => {
      const complexQuery = 'automation testing selenium webdriver javascript python beginner';
      
      const startTime = Date.now();

      const response = await makeRequest({
        method: 'GET',
        url: `/search/courses?q=${encodeURIComponent(complexQuery)}&level=Beginner&priceMax=1000000&sortBy=relevance`
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expectSuccess(response);
      expect(responseTime).toBeLessThan(1000); // Complex queries should still be under 1s
    });
  });

  describe('Search Data Validation Tests', () => {
    it('should validate search result structure', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test'
      });

      const data = expectSuccess(response);

      // Top-level structure
      expect(data.courses).toBeDefined();
      expect(data.pagination).toBeDefined();
      expect(data.filters).toBeDefined();

      if (data.courses.length > 0) {
        const course = data.courses[0];

        // Required course fields
        expect(course.id).toBeDefined();
        expect(course.title).toBeDefined();
        expect(course.description).toBeDefined();
        expect(course.price).toBeDefined();
        expect(course.level).toBeDefined();
        expect(course.category).toBeDefined();
        expect(course.instructor).toBeDefined();
        expect(course.relevanceScore).toBeDefined();

        // Data types
        expect(typeof course.price).toBe('number');
        expect(typeof course.rating).toBe('number');
        expect(typeof course.studentsCount).toBe('number');
        expect(typeof course.relevanceScore).toBe('number');

        // Instructor structure
        expect(course.instructor.name).toBeDefined();
        expect(course.instructor.avatar).toBeDefined();
      }

      // Filters structure
      expect(Array.isArray(data.filters.categories)).toBe(true);
      expect(Array.isArray(data.filters.levels)).toBe(true);
      expect(typeof data.filters.priceRange.min).toBe('number');
      expect(typeof data.filters.priceRange.max).toBe('number');
    });

    it('should handle special characters in search query', async () => {
      const specialQueries = [
        'test+automation',
        'test & automation',
        'automation/testing',
        'test-driven',
        'C# testing'
      ];

      for (const query of specialQueries) {
        const response = await makeRequest({
          method: 'GET',
          url: `/search/courses?q=${encodeURIComponent(query)}`
        });

        expectSuccess(response);
        
        // Add small delay between requests to avoid rate limiting
        await delay(100);
      }
    });

    it('should validate search query length limits', async () => {
      const veryLongQuery = 'a'.repeat(1000); // Very long search query

      const response = await makeRequest({
        method: 'GET',
        url: `/search/courses?q=${encodeURIComponent(veryLongQuery)}`
      });

      // Should either succeed with truncated query or fail with validation error
      if (response.status === 400) {
        expectError(response, 400, 'VALIDATION_001');
      } else {
        expectSuccess(response);
      }
    });

    it('should handle numeric search queries', async () => {
      const numericQueries = ['2024', '100', '4.5'];

      for (const query of numericQueries) {
        const response = await makeRequest({
          method: 'GET',
          url: `/search/courses?q=${query}`
        });

        expectSuccess(response);
        await delay(100);
      }
    });

    it('should validate filter combinations', async () => {
      const response = await makeRequest({
        method: 'GET',
        url: '/search/courses?q=test&level=Beginner&category=automation&priceMin=0&priceMax=500000&rating=4&sortBy=rating&limit=10'
      });

      expectSuccess(response);

      const data = response.data.data;
      if (data.courses.length > 0) {
        data.courses.forEach((course: any) => {
          expect(course.level).toBe('Beginner');
          expect(course.price).toBeGreaterThanOrEqual(0);
          expect(course.price).toBeLessThanOrEqual(500000);
          expect(course.rating).toBeGreaterThanOrEqual(4);
        });
      }
    });
  });
});