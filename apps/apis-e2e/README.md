# BeeAt API End-to-End Tests

This directory contains comprehensive end-to-end tests for the BeeAt API, covering all major endpoints and user journeys.

## Test Structure

### Test Files Organization

```
src/
├── apis/
│   ├── apis.spec.ts        # API health checks and basic functionality
│   ├── auth.spec.ts        # Authentication and security tests  
│   ├── courses.spec.ts     # Course management API tests
│   ├── users.spec.ts       # User profile and account management tests
│   ├── cart.spec.ts        # Shopping cart functionality tests
│   ├── search.spec.ts      # Search and filtering API tests
│   └── integration.spec.ts # End-to-end user journey tests
└── support/
    ├── test-helpers.ts     # Common utilities and helper functions
    ├── test-setup.ts       # Test environment configuration
    ├── global-setup.ts     # Global test setup (if needed)
    └── global-teardown.ts  # Global test cleanup (if needed)
```

### Test Categories

1. **Unit API Tests**: Individual endpoint testing
2. **Integration Tests**: Cross-feature functionality testing  
3. **Security Tests**: Authentication, authorization, and input validation
4. **Performance Tests**: Response time and load testing
5. **End-to-End Tests**: Complete user journey testing

## Running Tests

### Prerequisites

1. **Environment Setup**:
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Set required environment variables
   DATABASE_URL=postgresql://user:pass@localhost:5432/beeat_test
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. **Database Setup**:
   ```bash
   # Run database migrations
   npx prisma migrate dev
   
   # Generate Prisma client
   npx prisma generate
   ```

3. **Start API Server**:
   ```bash
   # Start development server
   npx nx serve apis
   ```

### Test Execution

```bash
# Run all E2E tests
npx nx test apis-e2e

# Run specific test file
npx nx test apis-e2e --testNamePattern="Authentication"

# Run with coverage
npx nx test apis-e2e --coverage

# Run in watch mode
npx nx test apis-e2e --watch

# Run with verbose output
npx nx test apis-e2e --verbose
```

### Test Configuration

The tests are configured in `jest.config.ts` with:

- **Test Environment**: Node.js
- **Transform**: SWC for TypeScript compilation
- **Setup Files**: Axios configuration and test utilities
- **Timeout**: 30 seconds for integration tests
- **Coverage**: Enabled for test quality metrics

## Test Implementation

### Test Case Coverage

Based on `docs/test-scripts.md`, the following test cases are implemented:

#### Authentication Tests (15 cases)
- ✅ User registration validation
- ✅ Login credential verification  
- ✅ Password reset functionality
- ✅ JWT token validation
- ✅ Security attack prevention

#### Course API Tests (22 cases)  
- ✅ Course listing and pagination
- ✅ Course details retrieval
- ✅ Enrollment management
- ✅ Progress tracking
- ✅ Access control validation

#### User Management Tests (13 cases)
- ✅ Profile CRUD operations
- ✅ Avatar upload handling
- ✅ Password change validation
- ✅ Preference management
- ✅ Input sanitization

#### Cart Management Tests (15 cases)
- ✅ Cart item operations
- ✅ Quantity management
- ✅ Cart persistence
- ✅ Checkout preparation
- ✅ Business logic validation

#### Search Functionality Tests (8 cases)
- ✅ Course search with filters
- ✅ Auto-suggestion system
- ✅ Pagination and sorting
- ✅ Performance optimization
- ✅ Query validation

#### Integration Tests (4 major journeys)
- ✅ Complete purchase flow
- ✅ Learning progress tracking
- ✅ Profile management workflow
- ✅ Search-to-enrollment journey

### Test Utilities

The `test-helpers.ts` file provides:

```typescript
// HTTP request handling
makeRequest(config) // Axios wrapper with error handling
authHeader(token) // Authorization header helper

// User management  
registerUser(email, password, name) // User registration
authenticateUser(email, password) // User authentication
cleanupUser(token) // Test user cleanup

// Data generation
generateUniqueEmail() // Unique email generation
generateUUID() // UUID generation
generateTestFile(size) // Test file creation

// Validation utilities
expectSuccess(response, statusCode) // Success assertion
expectError(response, statusCode, errorCode) // Error assertion
validatePagination(pagination) // Pagination validation
isValidUUID(uuid) // UUID format validation
```

### Test Data Management

Test data is managed through:

1. **Predefined Test Data**: Static course and user data for consistent testing
2. **Dynamic Generation**: Unique emails and IDs to prevent conflicts  
3. **Cleanup Procedures**: Automatic cleanup after each test suite
4. **Isolation**: Each test runs independently with fresh data

## Security Testing

Security tests cover:

- **Authentication**: JWT tampering, expired tokens, brute force attacks
- **Authorization**: Cross-user data access, privilege escalation
- **Input Validation**: SQL injection, XSS, parameter tampering  
- **Rate Limiting**: API abuse prevention
- **Data Sanitization**: Malicious input handling

## Performance Testing

Performance tests validate:

- **Response Times**: API endpoint response time thresholds
- **Concurrent Requests**: Multi-user simulation
- **Database Queries**: Query optimization validation
- **Memory Usage**: Resource consumption monitoring

## Continuous Integration

Tests are designed for CI/CD integration:

```yaml
# Example GitHub Actions workflow
name: E2E Tests
on: [push, pull_request]
jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run E2E tests
        run: npx nx test apis-e2e
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```

## Troubleshooting

### Common Issues

1. **Database Connection**:
   ```bash
   # Check database is running
   npx prisma studio
   
   # Reset database if needed
   npx prisma migrate reset
   ```

2. **API Server**:
   ```bash
   # Verify server is running on correct port
   curl http://localhost:3000/health
   ```

3. **Environment Variables**:
   ```bash
   # Verify environment variables are set
   echo $DATABASE_URL
   echo $SUPABASE_URL
   ```

4. **Test Failures**:
   ```bash
   # Run specific failing test with verbose output
   npx nx test apis-e2e --testNamePattern="failing-test-name" --verbose
   ```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment
export DEBUG=true
export LOG_LEVEL=debug

# Run tests with detailed output
npx nx test apis-e2e --verbose
```

## Contributing

When adding new tests:

1. Follow existing naming conventions (`TEST_ID: description`)
2. Use test helpers for consistency
3. Include both positive and negative test cases
4. Add appropriate cleanup procedures
5. Update this README with new test coverage

## Test Coverage Goals

- **API Endpoints**: 100% coverage of documented endpoints
- **User Journeys**: All critical paths covered
- **Error Scenarios**: All error codes tested
- **Security**: All attack vectors validated
- **Performance**: All SLA requirements verified

## Monitoring and Reporting

Test results are tracked for:

- **Success Rate**: Percentage of passing tests
- **Response Times**: API performance metrics
- **Coverage**: Code and feature coverage percentages
- **Regression**: New failures in existing functionality