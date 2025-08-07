import { makeRequest, expectSuccess } from '../support/test-helpers';

describe('API Health Check', () => {
  it('should return API health status', async () => {
    const response = await makeRequest({
      method: 'GET',
      url: '/health'
    });

    expectSuccess(response);
    
    // Health endpoint should return status and documentation URL
    expect(response.data.data.status).toBeDefined();
    
    // In development, should include Swagger URL
    if (process.env.NODE_ENV !== 'production') {
      expect(response.data.data.docsUrl).toBeDefined();
    }
  });

  it('should return 404 for non-existent endpoints', async () => {
    const response = await makeRequest({
      method: 'GET',
      url: '/non-existent-endpoint'
    });

    expect(response.status).toBe(404);
  });

  it('should handle CORS properly', async () => {
    const response = await makeRequest({
      method: 'OPTIONS',
      url: '/courses'
    });

    // Should allow CORS preflight
    expect([200, 204]).toContain(response.status);
  });

  it('should validate API base structure', async () => {
    const response = await makeRequest({
      method: 'GET',
      url: '/health'
    });

    expectSuccess(response);

    // Validate standard API response structure
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
  });
});
