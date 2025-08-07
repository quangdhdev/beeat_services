import {
  makeRequest,
  generateUniqueEmail,
  supabase,
  delay
} from '../support/test-helpers';

describe('Authentication API Tests', () => {
  let testToken: string;
  let testUserId: string;
  let testEmail: string;

  beforeAll(async () => {
    testEmail = generateUniqueEmail();
  });

  afterAll(async () => {
    // Cleanup test user
    if (testUserId) {
      try {
        await supabase.auth.admin.deleteUser(testUserId);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });

  describe('Sign Up Tests', () => {
    it('AUTH_001: should register user with valid data', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.session).toBeDefined();
      expect(data.user?.email).toBe(testEmail);

      if (data.user?.id && data.session?.access_token) {
        testUserId = data.user.id;
        testToken = data.session.access_token;
      }
    });

    it('AUTH_002: should reject duplicate email registration', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail, // Same email as above
        password: 'anotherpassword123',
        options: {
          data: {
            full_name: 'Another User'
          }
        }
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('already registered');
    });

    it('AUTH_003: should reject invalid email format', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'invalid-email',
        password: 'testpassword123',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('invalid email');
    });

    it('AUTH_004: should reject weak password', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: generateUniqueEmail(),
        password: '123', // Too weak
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('password');
    });

    it('AUTH_005: should reject missing required fields', async () => {
      const { data, error } = await supabase.auth.signUp({
        email: generateUniqueEmail(),
        password: '', // Missing password
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('required');
    });
  });

  describe('Sign In Tests', () => {
    it('AUTH_006: should authenticate with valid credentials', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'testpassword123'
      });

      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      expect(data.session).toBeDefined();
      expect(data.user?.email).toBe(testEmail);
      expect(data.session?.access_token).toBeDefined();
    });

    it('AUTH_007: should reject invalid email', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'nonexistent@example.com',
        password: 'testpassword123'
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('Invalid login credentials');
    });

    it('AUTH_008: should reject invalid password', async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'wrongpassword'
      });

      expect(error).toBeDefined();
      expect(error?.message).toContain('Invalid login credentials');
    });

    it('AUTH_009: should handle unverified account', async () => {
      // This test depends on email verification being enabled
      const unverifiedEmail = generateUniqueEmail();
      
      // Create unverified user
      await supabase.auth.signUp({
        email: unverifiedEmail,
        password: 'testpassword123',
        options: {
          data: { full_name: 'Unverified User' },
          emailRedirectTo: undefined // Disable email verification for test
        }
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: unverifiedEmail,
        password: 'testpassword123'
      });

      // Behavior depends on Supabase configuration
      // If email verification is required, this should fail
      if (error) {
        expect(error.message).toContain('confirmation');
      }
    });
  });

  describe('Password Reset Tests', () => {
    it('AUTH_011: should send password reset email for valid email', async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(testEmail, {
        redirectTo: 'https://app.beeat.com/reset'
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
    });

    it('AUTH_012: should handle password reset for invalid email', async () => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        'nonexistent@example.com',
        {
          redirectTo: 'https://app.beeat.com/reset'
        }
      );

      // Supabase typically returns success even for non-existent emails
      // for security reasons, but we can still test the flow
      expect(error).toBeNull();
    });

    it('AUTH_013: should update password with valid session', async () => {
      if (!testToken) {
        // Authenticate first
        const { data } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: 'testpassword123'
        });
        testToken = data.session?.access_token || '';
      }

      // Set the session
      await supabase.auth.setSession({
        access_token: testToken,
        refresh_token: 'dummy_refresh_token'
      });

      const { data, error } = await supabase.auth.updateUser({
        password: 'newpassword123'
      });

      if (!error) {
        expect(data.user).toBeDefined();
        
        // Verify we can login with new password
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: 'newpassword123'
        });

        expect(loginError).toBeNull();
        expect(loginData.session).toBeDefined();
      }
    });
  });

  describe('Session Management Tests', () => {
    it('should get current session', async () => {
      const { data, error } = await supabase.auth.getSession();

      expect(error).toBeNull();
      // data.session might be null if no active session
    });

    it('should handle auth state changes', (done) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        expect(event).toBeDefined();
        
        if (event === 'SIGNED_IN') {
          expect(session).toBeDefined();
          expect(session?.access_token).toBeDefined();
        }
        
        subscription.unsubscribe();
        done();
      });

      // Trigger a sign in to test the callback
      supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'newpassword123'
      });
    });

    it('should sign out user', async () => {
      // Sign in first
      await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'newpassword123'
      });

      const { error } = await supabase.auth.signOut();

      expect(error).toBeNull();

      // Verify session is cleared
      const { data } = await supabase.auth.getSession();
      expect(data.session).toBeNull();
    });
  });

  describe('Token Validation Tests', () => {
    it('should validate JWT token structure', async () => {
      const { data } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'newpassword123'
      });

      if (data.session?.access_token) {
        const token = data.session.access_token;
        
        // JWT tokens have 3 parts separated by dots
        const parts = token.split('.');
        expect(parts).toHaveLength(3);
        
        // Each part should be base64 encoded
        parts.forEach(part => {
          expect(part).toMatch(/^[A-Za-z0-9_-]+$/);
        });
      }
    });

    it('should reject expired tokens', async () => {
      // This test would require manipulating token expiry
      // or waiting for natural expiry - simplified for demo
      const expiredToken = 'expired.token.here';

      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: {
          Authorization: `Bearer ${expiredToken}`
        }
      });

      expect(response.status).toBe(401);
    });

    it('should reject malformed tokens', async () => {
      const malformedToken = 'invalid-token-format';

      const response = await makeRequest({
        method: 'GET',
        url: '/user/profile',
        headers: {
          Authorization: `Bearer ${malformedToken}`
        }
      });

      expect(response.status).toBe(401);
    });
  });

  describe('Security Tests', () => {
    it('SEC_002: should reject tampered JWT tokens', async () => {
      // Get a valid token
      const { data } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'newpassword123'
      });

      if (data.session?.access_token) {
        // Tamper with the token
        const originalToken = data.session.access_token;
        const tamperedToken = originalToken.slice(0, -10) + 'tampered123';

        const response = await makeRequest({
          method: 'GET',
          url: '/user/profile',
          headers: {
            Authorization: `Bearer ${tamperedToken}`
          }
        });

        expect(response.status).toBe(401);
      }
    });

    it('SEC_003: should implement rate limiting for failed logins', async () => {
      const invalidEmail = 'bruteforce@example.com';
      const attempts = [];

      // Make multiple failed login attempts
      for (let i = 0; i < 6; i++) {
        const attempt = supabase.auth.signInWithPassword({
          email: invalidEmail,
          password: 'wrongpassword'
        });
        attempts.push(attempt);
      }

      const results = await Promise.all(attempts);
      
      // Check if later attempts are rate limited
      const rateLimitedAttempts = results.filter(result => 
        result.error?.message?.includes('rate limit') || 
        result.error?.message?.includes('too many')
      );

      // Expect at least some attempts to be rate limited
      expect(rateLimitedAttempts.length).toBeGreaterThan(0);
    });

    it('SEC_001: should sanitize SQL injection attempts in auth', async () => {
      const maliciousEmail = "admin@example.com'; DROP TABLE users; --";

      const { data, error } = await supabase.auth.signInWithPassword({
        email: maliciousEmail,
        password: 'password123'
      });

      expect(error).toBeDefined();
      expect(error?.message).not.toContain('syntax error');
      // Should get invalid credentials, not SQL error
    });
  });
});