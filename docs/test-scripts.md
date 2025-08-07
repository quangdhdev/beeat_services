# BeeAt API Test Scripts

This document outlines comprehensive test cases for the BeeAt automation testing learning platform API.

## Test Environment Setup

### Prerequisites
- Node.js and npm installed
- Nx workspace configured
- PostgreSQL database running
- Supabase project configured
- Environment variables set in `.env`

### Running Tests

#### Prerequisites Setup
```bash
# 1. Navigate to project root
cd /Users/quangdh/Workspace/beeat/code/beeat_be

# 2. Install dependencies (if not already done)
npm install

# 3. Copy environment configuration
cp .env.example .env

# 4. Configure environment variables in .env
NODE_ENV=test
DATABASE_URL=postgresql://user:pass@localhost:5432/beeat_test
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
HOST=localhost
PORT=3000

# 5. Setup database
npx prisma generate
npx prisma migrate dev

# 6. Start API server (keep running in separate terminal)
npx nx serve apis
```

#### Basic Test Execution
```bash
# Run all E2E tests
npx nx test apis-e2e

# Run all unit tests
npx nx test

# Run with verbose output
npx nx test apis-e2e --verbose

# Run in watch mode (re-runs on file changes)
npx nx test apis-e2e --watch

# Run with coverage report
npx nx test apis-e2e --coverage
```

#### Targeted Test Execution
```bash
# Run specific test suites
npx nx test apis-e2e --testNamePattern="Authentication"
npx nx test apis-e2e --testNamePattern="Course API"
npx nx test apis-e2e --testNamePattern="User API"
npx nx test apis-e2e --testNamePattern="Cart API"
npx nx test apis-e2e --testNamePattern="Search API"
npx nx test apis-e2e --testNamePattern="Integration"

# Run specific test files
npx nx test apis-e2e src/apis/auth.spec.ts
npx nx test apis-e2e src/apis/courses.spec.ts
npx nx test apis-e2e src/apis/users.spec.ts
npx nx test apis-e2e src/apis/cart.spec.ts
npx nx test apis-e2e src/apis/search.spec.ts
npx nx test apis-e2e src/apis/integration.spec.ts

# Run specific test cases by ID
npx nx test apis-e2e --testNamePattern="AUTH_001"
npx nx test apis-e2e --testNamePattern="COURSE_001"
npx nx test apis-e2e --testNamePattern="USER_001"
npx nx test apis-e2e --testNamePattern="CART_001"

# Run high priority tests only
npx nx test apis-e2e --testNamePattern="AUTH_001|AUTH_006|COURSE_001|COURSE_009|USER_001"
```

#### Specialized Test Runs
```bash
# Performance tests
npx nx test apis-e2e --testNamePattern="PERF_|Performance"

# Security tests
npx nx test apis-e2e --testNamePattern="SEC_|Security"

# End-to-end integration tests
npx nx test apis-e2e --testNamePattern="E2E_"

# Error handling tests
npx nx test apis-e2e --testNamePattern="ERROR_"

# Run tests with specific timeout (for slow tests)
npx nx test apis-e2e --testTimeout=60000
```

#### Debug and Development
```bash
# Run with debug output
DEBUG=true npx nx test apis-e2e --verbose

# Run with Node.js debugging
node --inspect-brk node_modules/.bin/nx test apis-e2e

# Run single test with maximum verbosity
npx nx test apis-e2e --testNamePattern="AUTH_001" --verbose --no-cache

# Run without cache (useful for debugging)
npx nx test apis-e2e --no-cache

# Show console.log output in tests
npx nx test apis-e2e --verbose --silent=false
```

#### Continuous Integration
```bash
# CI-friendly test run (no watch, with coverage)
npx nx test apis-e2e --ci --coverage --watchAll=false

# Run tests with JUnit output (for CI reporting)
npx nx test apis-e2e --reporters=default --reporters=jest-junit

# Run tests with specific environment
NODE_ENV=test npx nx test apis-e2e
```

#### Troubleshooting Commands
```bash
# Check if API server is running
curl http://localhost:3000/health

# Test database connectivity
npx prisma studio

# Reset database if needed
npx prisma migrate reset

# Check environment variables
echo $DATABASE_URL
cat .env | grep SUPABASE

# Kill process on port 3000 if needed
lsof -ti:3000 | xargs kill -9

# Alternative: Use different port
PORT=3001 npx nx serve apis
```

#### Test Output Examples
```bash
# Successful run
 PASS  src/apis/auth.spec.ts (12.345s)
  Authentication API Tests
    ✓ AUTH_001: should register user with valid data (234ms)
    ✓ AUTH_006: should authenticate with valid credentials (156ms)

Test Suites: 6 passed, 6 total
Tests:       103 passed, 103 total
Time:        45.678s

# Failed test with details
 FAIL  src/apis/courses.spec.ts
  ✕ COURSE_001: should get courses without parameters (567ms)
    
    Expected status: 200
    Received status: 500
    
    Response: {"success":false,"error":{"code":"SYSTEM_001","message":"Database connection failed"}}
```

---

## Authentication Tests

### Sign Up Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| AUTH_001 | Valid user registration | `{ email: "test@example.com", password: "password123", options: { data: { full_name: "John Doe" } } }` | Success response with user and session | 200 | High |
| AUTH_002 | Duplicate email registration | Existing email | Error: Email already exists | 409 | High |
| AUTH_003 | Invalid email format | `{ email: "invalid-email", password: "password123" }` | Validation error | 400 | Medium |
| AUTH_004 | Weak password | `{ email: "test@example.com", password: "123" }` | Password too weak error | 400 | Medium |
| AUTH_005 | Missing required fields | `{ email: "test@example.com" }` | Required field missing error | 400 | High |

### Sign In Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| AUTH_006 | Valid credentials | `{ email: "test@example.com", password: "password123" }` | Success response with session | 200 | High |
| AUTH_007 | Invalid email | `{ email: "nonexistent@example.com", password: "password123" }` | Invalid credentials error | 401 | High |
| AUTH_008 | Invalid password | `{ email: "test@example.com", password: "wrongpassword" }` | Invalid credentials error | 401 | High |
| AUTH_009 | Unverified account | Unverified user credentials | Account not verified error | 401 | Medium |
| AUTH_010 | Suspended account | Suspended user credentials | Account suspended error | 403 | Medium |

### Password Reset Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| AUTH_011 | Valid password reset request | `{ email: "test@example.com", options: { redirectTo: "https://app.beeat.com/reset" } }` | Success response | 200 | High |
| AUTH_012 | Invalid email for reset | `{ email: "nonexistent@example.com" }` | User not found error | 404 | Medium |
| AUTH_013 | Password update with valid token | `{ password: "newpassword123" }` | Success response | 200 | High |
| AUTH_014 | Password update with expired token | Expired reset token | Token expired error | 401 | High |

---

## Course API Tests

### Get All Courses Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| COURSE_001 | Get courses without parameters | `GET /courses` | Paginated course list with default settings | 200 | High |
| COURSE_002 | Get courses with pagination | `GET /courses?page=2&limit=5` | Second page with 5 courses | 200 | High |
| COURSE_003 | Filter by category | `GET /courses?category=automation` | Courses in automation category | 200 | Medium |
| COURSE_004 | Filter by level | `GET /courses?level=Beginner` | Beginner level courses | 200 | Medium |
| COURSE_005 | Sort by newest | `GET /courses?sortBy=newest&sortOrder=desc` | Courses sorted by creation date descending | 200 | Medium |
| COURSE_006 | Sort by rating | `GET /courses?sortBy=rating&sortOrder=desc` | Courses sorted by rating descending | 200 | Medium |
| COURSE_007 | Invalid page parameter | `GET /courses?page=-1` | Validation error | 400 | Low |
| COURSE_008 | Exceeded limit parameter | `GET /courses?limit=100` | Validation error or capped at max limit | 400 | Low |

### Get Course by ID Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| COURSE_009 | Valid course ID | `GET /courses/{valid-uuid}` | Complete course details with curriculum | 200 | High |
| COURSE_010 | Invalid course ID format | `GET /courses/invalid-uuid` | Validation error | 400 | Medium |
| COURSE_011 | Non-existent course ID | `GET /courses/{non-existent-uuid}` | Course not found error | 404 | High |
| COURSE_012 | Course with enrollment status (authenticated) | `GET /courses/{uuid}` with auth token | Course details with isEnrolled flag | 200 | High |

### Get Enrolled Courses Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| COURSE_013 | Get all enrolled courses | `GET /courses/enrolled` with auth | List of enrolled courses with progress | 200 | High |
| COURSE_014 | Filter by status - in progress | `GET /courses/enrolled?status=in-progress` | In-progress courses only | 200 | Medium |
| COURSE_015 | Filter by status - completed | `GET /courses/enrolled?status=completed` | Completed courses only | 200 | Medium |
| COURSE_016 | Enrolled courses without auth | `GET /courses/enrolled` without token | Unauthorized error | 401 | High |
| COURSE_017 | Pagination for enrolled courses | `GET /courses/enrolled?page=1&limit=5` | Paginated enrolled courses | 200 | Medium |

### Course Enrollment Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| COURSE_018 | Valid enrollment | `POST /courses/{uuid}/enroll` with auth | Success enrollment response | 200 | High |
| COURSE_019 | Enrollment without auth | `POST /courses/{uuid}/enroll` without token | Unauthorized error | 401 | High |
| COURSE_020 | Duplicate enrollment | Enroll in already enrolled course | Already enrolled error | 409 | High |
| COURSE_021 | Non-existent course enrollment | `POST /courses/{invalid-uuid}/enroll` | Course not found error | 404 | Medium |
| COURSE_022 | Enrollment limit reached | Enroll when course is full | Enrollment limit reached error | 409 | Low |

---

## User API Tests

### User Profile Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| USER_001 | Get user profile | `GET /user/profile` with auth | Complete user profile data | 200 | High |
| USER_002 | Get profile without auth | `GET /user/profile` without token | Unauthorized error | 401 | High |
| USER_003 | Update user profile | `PUT /user/profile` with valid data | Updated profile response | 200 | High |
| USER_004 | Update with invalid data | `PUT /user/profile` with invalid phone | Validation error | 400 | Medium |
| USER_005 | Update profile without auth | `PUT /user/profile` without token | Unauthorized error | 401 | High |

### Avatar Upload Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| USER_006 | Valid image upload | JPG file under 5MB with auth | Success with avatar URL | 200 | High |
| USER_007 | Oversized file upload | File over 5MB | File too large error | 400 | Medium |
| USER_008 | Invalid file type | TXT file upload | Invalid file type error | 400 | Medium |
| USER_009 | Upload without auth | File upload without token | Unauthorized error | 401 | High |

### Password Change Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| USER_010 | Valid password change | Valid current and new passwords | Success response | 200 | High |
| USER_011 | Wrong current password | Incorrect current password | Invalid credentials error | 401 | High |
| USER_012 | Weak new password | New password less than 6 chars | Password too weak error | 400 | Medium |
| USER_013 | Mismatched confirmation | Different new password and confirmation | Validation error | 400 | Medium |

---

## Cart API Tests

### Get Cart Items Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| CART_001 | Get cart with items | `GET /cart` with auth | Cart items and summary | 200 | High |
| CART_002 | Get empty cart | `GET /cart` with auth (empty cart) | Empty cart response | 200 | High |
| CART_003 | Get cart without auth | `GET /cart` without token | Unauthorized error | 401 | High |

### Add to Cart Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| CART_004 | Add valid course | `POST /cart/add` with valid courseId | Success response | 200 | High |
| CART_005 | Add non-existent course | `POST /cart/add` with invalid courseId | Course not found error | 404 | Medium |
| CART_006 | Add duplicate course | Add already added course | Course already in cart error | 409 | Medium |
| CART_007 | Add enrolled course | Add course user is enrolled in | Already enrolled error | 409 | Medium |
| CART_008 | Add without auth | `POST /cart/add` without token | Unauthorized error | 401 | High |

### Update Cart Item Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| CART_009 | Update item quantity | `PUT /cart/items/{id}` with valid quantity | Success response | 200 | High |
| CART_010 | Update with invalid quantity | Quantity less than 1 | Validation error | 400 | Medium |
| CART_011 | Update non-existent item | Invalid cart item ID | Item not found error | 404 | Medium |
| CART_012 | Update without auth | `PUT /cart/items/{id}` without token | Unauthorized error | 401 | High |

### Remove from Cart Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| CART_013 | Remove valid item | `DELETE /cart/items/{id}` | Success response | 200 | High |
| CART_014 | Remove non-existent item | Invalid cart item ID | Item not found error | 404 | Medium |
| CART_015 | Remove without auth | `DELETE /cart/items/{id}` without token | Unauthorized error | 401 | High |

### Clear Cart Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| CART_016 | Clear cart with items | `DELETE /cart/clear` | Success response | 200 | High |
| CART_017 | Clear empty cart | `DELETE /cart/clear` on empty cart | Success response | 200 | Medium |
| CART_018 | Clear without auth | `DELETE /cart/clear` without token | Unauthorized error | 401 | High |

---

## Payment API Tests

### Create Payment Intent Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| PAYMENT_001 | Valid payment intent | Valid items and billing address | Payment intent and order created | 200 | High |
| PAYMENT_002 | Empty items array | Empty items in request | Validation error | 400 | Medium |
| PAYMENT_003 | Invalid billing address | Missing required address fields | Validation error | 400 | Medium |
| PAYMENT_004 | Create without auth | Payment intent without token | Unauthorized error | 401 | High |

### Confirm Payment Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| PAYMENT_005 | Valid payment confirmation | Valid payment intent and method IDs | Payment succeeded, courses enrolled | 200 | High |
| PAYMENT_006 | Invalid payment intent | Non-existent payment intent ID | Payment not found error | 404 | Medium |
| PAYMENT_007 | Failed payment method | Invalid payment method ID | Payment failed error | 400 | Medium |
| PAYMENT_008 | Already processed payment | Confirm already processed payment | Payment already processed error | 409 | Medium |

### Payment History Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| PAYMENT_009 | Get payment history | `GET /payment/history` with auth | Paginated payment history | 200 | High |
| PAYMENT_010 | Filter by status | `GET /payment/history?status=succeeded` | Succeeded payments only | 200 | Medium |
| PAYMENT_011 | History pagination | `GET /payment/history?page=2&limit=5` | Second page of payments | 200 | Medium |
| PAYMENT_012 | History without auth | `GET /payment/history` without token | Unauthorized error | 401 | High |

---

## Progress API Tests

### Get Course Progress Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| PROGRESS_001 | Get enrolled course progress | `GET /courses/{id}/progress` with auth | Course progress details | 200 | High |
| PROGRESS_002 | Get non-enrolled course progress | Progress for non-enrolled course | Course not enrolled error | 403 | Medium |
| PROGRESS_003 | Progress without auth | `GET /courses/{id}/progress` without token | Unauthorized error | 401 | High |
| PROGRESS_004 | Non-existent course progress | Progress for invalid course ID | Course not found error | 404 | Medium |

### Update Lesson Progress Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| PROGRESS_005 | Mark lesson complete | `PUT /courses/{id}/lessons/{id}/progress` with completed: true | Lesson marked complete, course progress updated | 200 | High |
| PROGRESS_006 | Update lesson time spent | Valid timeSpent and watchedDuration | Progress updated successfully | 200 | High |
| PROGRESS_007 | Invalid lesson ID | Non-existent lesson ID | Lesson not found error | 404 | Medium |
| PROGRESS_008 | Update without enrollment | Progress update for non-enrolled course | Course not enrolled error | 403 | Medium |

---

## Analytics API Tests

### Track Course View Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| ANALYTICS_001 | Track course view (authenticated) | `POST /analytics/course-view` with courseId and auth | Success response | 200 | Medium |
| ANALYTICS_002 | Track course view (anonymous) | `POST /analytics/course-view` without auth | Success response | 200 | Medium |
| ANALYTICS_003 | Track with invalid course ID | Non-existent courseId | Course not found error | 404 | Low |
| ANALYTICS_004 | Track with source and referrer | Valid courseId, source, and referrer | Success response | 200 | Low |

### Track Lesson Completion Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| ANALYTICS_005 | Track lesson completion | Valid courseId, lessonId, timeSpent | Success response | 200 | Medium |
| ANALYTICS_006 | Track without auth | `POST /analytics/lesson-completion` without token | Unauthorized error | 401 | High |
| ANALYTICS_007 | Track invalid lesson | Non-existent lessonId | Lesson not found error | 404 | Low |

### Get Learning Analytics Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| ANALYTICS_008 | Get monthly analytics | `GET /analytics/learning` with auth | Learning statistics and trends | 200 | High |
| ANALYTICS_009 | Get yearly analytics | `GET /analytics/learning?period=year` | Yearly learning data | 200 | Medium |
| ANALYTICS_010 | Analytics without auth | `GET /analytics/learning` without token | Unauthorized error | 401 | High |

---

## Search API Tests

### Search Courses Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| SEARCH_001 | Basic course search | `GET /search/courses?q=automation` | Relevant courses matching query | 200 | High |
| SEARCH_002 | Search with filters | `GET /search/courses?q=testing&level=Beginner&priceMax=1000` | Filtered search results | 200 | High |
| SEARCH_003 | Empty search query | `GET /search/courses?q=` | Validation error | 400 | Medium |
| SEARCH_004 | Search with pagination | `GET /search/courses?q=testing&page=2&limit=10` | Second page of search results | 200 | Medium |
| SEARCH_005 | No results search | `GET /search/courses?q=nonexistentcourse` | Empty results with success response | 200 | Low |

### Search Suggestions Tests

| Test Case ID | Description | Input | Expected Output | Status Code | Priority |
|-------------|-------------|--------|-----------------|-------------|----------|
| SEARCH_006 | Get suggestions | `GET /search/suggestions?q=auto` | Relevant search suggestions | 200 | Medium |
| SEARCH_007 | Suggestions with limit | `GET /search/suggestions?q=test&limit=3` | Maximum 3 suggestions | 200 | Low |
| SEARCH_008 | Empty suggestions query | `GET /search/suggestions?q=` | Validation error | 400 | Low |

---

## Performance and Load Tests

### API Performance Tests

| Test Case ID | Description | Load Condition | Expected Response Time | Success Criteria |
|-------------|-------------|---------------|----------------------|------------------|
| PERF_001 | Course list loading | 50 concurrent requests | < 500ms | 95% success rate |
| PERF_002 | Search functionality | 30 concurrent searches | < 800ms | 90% success rate |
| PERF_003 | User authentication | 20 concurrent logins | < 300ms | 100% success rate |
| PERF_004 | Cart operations | 40 concurrent cart updates | < 400ms | 95% success rate |

### Database Performance Tests

| Test Case ID | Description | Load Condition | Expected Response Time | Success Criteria |
|-------------|-------------|---------------|----------------------|------------------|
| DB_001 | Course queries with filters | 100 concurrent queries | < 200ms | 95% success rate |
| DB_002 | User progress updates | 50 concurrent updates | < 150ms | 100% success rate |
| DB_003 | Complex search queries | 30 concurrent searches | < 600ms | 90% success rate |

---

## Security Tests

### Authentication Security Tests

| Test Case ID | Description | Attack Vector | Expected Behavior |
|-------------|-------------|---------------|------------------|
| SEC_001 | SQL Injection in login | Malicious SQL in email/password fields | Input sanitized, no DB access |
| SEC_002 | JWT token tampering | Modified JWT tokens | Token validation fails, 401 error |
| SEC_003 | Brute force login | Multiple failed login attempts | Rate limiting activated |
| SEC_004 | XSS in profile fields | Script tags in user input | Input sanitized, scripts blocked |

### Authorization Tests

| Test Case ID | Description | Test Scenario | Expected Behavior |
|-------------|-------------|---------------|------------------|
| SEC_005 | Unauthorized course access | Access enrolled courses without auth | 401 Unauthorized error |
| SEC_006 | Cross-user data access | User A tries to access User B's cart | 403 Forbidden error |
| SEC_007 | Admin endpoint access | Regular user accessing admin functions | 403 Forbidden error |
| SEC_008 | Expired token usage | Using expired JWT tokens | 401 Unauthorized error |

### Data Validation Tests

| Test Case ID | Description | Attack Vector | Expected Behavior |
|-------------|-------------|---------------|------------------|
| SEC_009 | File upload validation | Upload executable files as avatar | File type validation, upload blocked |
| SEC_010 | Input length validation | Extremely long strings in API calls | Input length limits enforced |
| SEC_011 | JSON payload validation | Malformed JSON payloads | 400 Bad Request with validation errors |
| SEC_012 | Parameter tampering | Modified course IDs in enrolled courses | Authorization check, access denied |

---

## Error Handling Tests

### Network Error Tests

| Test Case ID | Description | Simulation | Expected Behavior |
|-------------|-------------|------------|------------------|
| ERROR_001 | Database connection failure | Disconnect database | 503 Service Unavailable |
| ERROR_002 | External service timeout | Supabase service timeout | Graceful timeout handling |
| ERROR_003 | High memory usage | Memory-intensive operations | Request throttling or 503 error |
| ERROR_004 | Disk space full | Full storage during file upload | 507 Insufficient Storage |

### Validation Error Tests

| Test Case ID | Description | Invalid Input | Expected Error Response |
|-------------|-------------|---------------|----------------------|
| ERROR_005 | Missing required fields | Incomplete user registration | 400 with specific field errors |
| ERROR_006 | Invalid data types | String in numeric field | 400 with type validation error |
| ERROR_007 | Out of range values | Negative price values | 400 with range validation error |
| ERROR_008 | Invalid UUID format | Malformed course ID | 400 with format validation error |

---

## Integration Tests

### End-to-End User Journey Tests

| Test Case ID | Description | Test Steps | Success Criteria |
|-------------|-------------|------------|------------------|
| E2E_001 | Complete course purchase | Register → Browse → Add to Cart → Checkout → Access Course | All steps complete successfully |
| E2E_002 | Course progress tracking | Enroll → Watch Lessons → Mark Complete → Check Progress | Progress accurately tracked |
| E2E_003 | User profile management | Register → Update Profile → Upload Avatar → Change Password | All profile operations successful |
| E2E_004 | Search and enrollment | Search Courses → Filter Results → View Details → Enroll | Course successfully enrolled |

### Third-party Integration Tests

| Test Case ID | Description | Integration Point | Expected Behavior |
|-------------|-------------|------------------|------------------|
| INT_001 | Supabase authentication | User registration/login | Seamless auth integration |
| INT_002 | Supabase storage | File upload operations | Files stored and accessible |
| INT_003 | Payment gateway | Payment processing | Payments processed correctly |
| INT_004 | Email notifications | Password reset emails | Emails delivered successfully |

---

## Test Data Management

### Test Database Setup
```sql
-- Create test users
INSERT INTO auth.users (id, email, full_name, created_at) VALUES 
('test-user-1', 'test1@example.com', 'Test User One', NOW()),
('test-user-2', 'test2@example.com', 'Test User Two', NOW());

-- Create test courses
INSERT INTO courses (id, title, price, level, category) VALUES 
('test-course-1', 'Automation Testing Basics', 299000, 'Beginner', 'Automation'),
('test-course-2', 'Advanced Selenium', 599000, 'Advanced', 'Automation');

-- Create test enrollments
INSERT INTO enrollments (user_id, course_id, enrolled_at) VALUES 
('test-user-1', 'test-course-1', NOW());
```

### Test Environment Configuration
```bash
# Environment variables for testing
NODE_ENV=test
DATABASE_URL=postgresql://test:test@localhost:5433/beeat_test
SUPABASE_URL=https://test-project.supabase.co
SUPABASE_ANON_KEY=test_anon_key
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpassword123
```

---

## Test Execution Strategy

### Test Phases
1. **Unit Tests** - Individual function testing
2. **Integration Tests** - API endpoint testing  
3. **E2E Tests** - Full user journey testing
4. **Performance Tests** - Load and stress testing
5. **Security Tests** - Vulnerability assessment

### Test Priorities
- **High Priority**: Authentication, core business logic, data integrity
- **Medium Priority**: User interface, search functionality, analytics
- **Low Priority**: Edge cases, performance optimizations, advanced features

### Continuous Integration
```yaml
# GitHub Actions workflow for automated testing
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npx nx test
      - name: Run E2E tests
        run: npx nx test apis-e2e
```

---

## Test Reporting

### Coverage Requirements
- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: All API endpoints covered
- **E2E Tests**: Critical user journeys covered

### Test Documentation
- Test results exported to JUnit XML format
- Coverage reports generated in HTML format
- Performance test results tracked over time
- Security scan reports archived for compliance