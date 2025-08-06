# BeeAt API Reference

This document provides a comprehensive reference for all APIs used in the BeeAt automation testing learning platform.

## Table of Contents

- [Authentication (Supabase)](#authentication-supabase)
- [Course APIs](#course-apis)
- [User APIs](#user-apis)
- [Cart APIs](#cart-apis)
- [Payment APIs](#payment-apis)
- [Analytics APIs](#analytics-apis)
- [Search APIs](#search-apis)
- [Progress APIs](#progress-apis)
- [Common Response Formats](#common-response-formats)
- [Error Codes](#error-codes)

---

## Authentication (Supabase)

Authentication in BeeAt is handled directly through the Supabase client library, not through custom API endpoints. All authentication operations use Supabase's built-in authentication system.

### Sign Up
**Method:** `supabase.auth.signUp()`

**Description:** Register a new user account using Supabase Auth

**Parameters:**
```typescript
{
  email: string,
  password: string,
  options: {
    data: {
      full_name: string
    }
  }
}
```

**Response:**
```typescript
{
  data: {
    user: User | null,
    session: Session | null
  },
  error: AuthError | null
}
```

**Used in:** Register Page (`/register`)

---

### Sign In
**Method:** `supabase.auth.signInWithPassword()`

**Description:** Authenticate user with email and password

**Parameters:**
```typescript
{
  email: string,
  password: string
}
```

**Response:**
```typescript
{
  data: {
    user: User | null,
    session: Session | null
  },
  error: AuthError | null
}
```

**Used in:** Login Page (`/login`)

---

### Forgot Password
**Method:** `supabase.auth.resetPasswordForEmail()`

**Description:** Send password reset email

**Parameters:**
```typescript
{
  email: string,
  options: {
    redirectTo: string
  }
}
```

**Response:**
```typescript
{
  data: {},
  error: AuthError | null
}
```

**Used in:** Forgot Password Page (`/forgot-password`)

---

### Reset Password
**Method:** `supabase.auth.updateUser()`

**Description:** Update user password (called after email verification)

**Parameters:**
```typescript
{
  password: string
}
```

**Response:**
```typescript
{
  data: {
    user: User | null
  },
  error: AuthError | null
}
```

**Used in:** Reset Password Page (`/reset-password`)

---

### Sign Out
**Method:** `supabase.auth.signOut()`

**Description:** Sign out the current user

**Parameters:** None

**Response:**
```typescript
{
  error: AuthError | null
}
```

**Used in:** Header Component, AuthContext

### Session Management
**Method:** `supabase.auth.getSession()` / `supabase.auth.onAuthStateChange()`

**Description:** Get current session and listen for auth state changes

**Response:**
```typescript
{
  data: {
    session: Session | null
  },
  error: AuthError | null
}
```

**Used in:** AuthContext for managing authentication state

---

## Course APIs

### Get All Courses
**Endpoint:** `GET /courses`

**Description:** Retrieve all available courses with pagination

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 12, max: 50)
category: string (optional)
level: string (optional) - "Beginner"|"Intermediate"|"Advanced"
sortBy: string (optional) - "newest"|"popular"|"rating"|"price"
sortOrder: string (optional) - "asc"|"desc"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "longDescription": "string",
        "thumbnail": "string (url)",
        "price": "number",
        "originalPrice": "number|null",
        "rating": "number (0-5)",
        "studentsCount": "number",
        "duration": "string",
        "level": "string",
        "category": "string",
        "language": "string",
        "lastUpdated": "datetime",
        "instructor": {
          "id": "uuid",
          "name": "string",
          "bio": "string",
          "avatar": "string",
          "rating": "number",
          "studentsCount": "number"
        },
        "skills": ["string"],
        "requirements": ["string"]
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    }
  }
}
```

**Used in:** 
- Home Page (`/`) - Featured courses
- Course List Page (`/courses`) - All courses

---

### Get Course by ID
**Endpoint:** `GET /courses/{courseId}`

**Description:** Get detailed information about a specific course

**Path Parameters:**
```
courseId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "longDescription": "string",
      "thumbnail": "string",
      "price": "number",
      "originalPrice": "number|null",
      "rating": "number",
      "studentsCount": "number",
      "duration": "string",
      "level": "string",
      "category": "string",
      "language": "string",
      "lastUpdated": "datetime",
      "instructor": {
        "id": "uuid",
        "name": "string",
        "bio": "string",
        "avatar": "string",
        "rating": "number",
        "studentsCount": "number"
      },
      "curriculum": [
        {
          "id": "uuid",
          "title": "string",
          "lessons": [
            {
              "id": "uuid",
              "title": "string",
              "duration": "string",
              "isPreview": "boolean",
              "videoUrl": "string|null",
              "resources": ["string"]
            }
          ]
        }
      ],
      "skills": ["string"],
      "requirements": ["string"],
      "totalLessons": "number",
      "isEnrolled": "boolean"
    }
  }
}
```

**Used in:** Course Detail Page (`/course/{id}`)

---

### Get Enrolled Courses
**Endpoint:** `GET /courses/enrolled`

**Description:** Get all courses the user is enrolled in

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
```
status: string (optional) - "all"|"in-progress"|"completed"|"not-started"
page: number (default: 1)
limit: number (default: 10)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid",
        "title": "string",
        "instructor": "string",
        "thumbnail": "string",
        "progress": "number (0-100)",
        "totalLessons": "number",
        "completedLessons": "number",
        "lastAccessed": "datetime",
        "duration": "string",
        "category": "string",
        "enrolledDate": "datetime",
        "certificateEarned": "boolean",
        "certificateUrl": "string|null"
      }
    ],
    "stats": {
      "totalCourses": "number",
      "inProgress": "number",
      "completed": "number",
      "certificatesEarned": "number"
    }
  }
}
```

**Used in:** My Courses Page (`/my-courses`)

---

### Enroll in Course
**Endpoint:** `POST /courses/{courseId}/enroll`

**Description:** Enroll user in a course

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
```
courseId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Successfully enrolled in course",
    "enrollment": {
      "id": "uuid",
      "courseId": "uuid",
      "userId": "uuid",
      "enrolledAt": "datetime",
      "progress": 0
    }
  }
}
```

**Used in:** Course Detail Page (`/course/{id}`)

---

## User APIs

### Get User Profile
**Endpoint:** `GET /user/profile`

**Description:** Get current user's profile information

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "phone": "string|null",
      "bio": "string|null",
      "avatar": "string|null",
      "createdAt": "datetime",
      "lastLoginAt": "datetime",
      "preferences": {
        "language": "string",
        "timezone": "string",
        "notifications": {
          "email": "boolean",
          "courseUpdates": "boolean",
          "promotions": "boolean",
          "weeklyDigest": "boolean"
        }
      }
    }
  }
}
```

**Used in:** Settings Page (`/settings`)

---

### Update User Profile
**Endpoint:** `PUT /user/profile`

**Description:** Update user profile information

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "fullName": "string (optional)",
  "phone": "string (optional)",
  "bio": "string (optional)",
  "preferences": {
    "language": "string (optional)",
    "timezone": "string (optional)",
    "notifications": {
      "email": "boolean (optional)",
      "courseUpdates": "boolean (optional)",
      "promotions": "boolean (optional)",
      "weeklyDigest": "boolean (optional)"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Profile updated successfully",
    "user": {
      "id": "uuid",
      "email": "string",
      "fullName": "string",
      "phone": "string|null",
      "bio": "string|null",
      "avatar": "string|null",
      "updatedAt": "datetime"
    }
  }
}
```

**Used in:** Settings Page (`/settings`)

---

### Upload Avatar
**Endpoint:** `POST /user/avatar`

**Description:** Upload user profile avatar

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body:**
```
file: File (required, max 5MB, jpg/png/gif)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Avatar uploaded successfully",
    "avatarUrl": "string (url)"
  }
}
```

**Used in:** Settings Page (`/settings`)

---

### Change Password
**Endpoint:** `PUT /user/password`

**Description:** Change user password

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 6 chars)",
  "confirmPassword": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully"
  }
}
```

**Used in:** Settings Page (`/settings`)

---

## Cart APIs

### Get Cart Items
**Endpoint:** `GET /cart`

**Description:** Get all items in user's cart

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "courseId": "uuid",
        "course": {
          "id": "uuid",
          "title": "string",
          "instructor": "string",
          "thumbnail": "string",
          "price": "number",
          "originalPrice": "number|null"
        },
        "quantity": "number",
        "addedAt": "datetime"
      }
    ],
    "summary": {
      "totalItems": "number",
      "subtotal": "number",
      "totalOriginalPrice": "number",
      "totalSavings": "number",
      "total": "number"
    }
  }
}
```

**Used in:** Cart Page (`/cart`)

---

### Add to Cart
**Endpoint:** `POST /cart/add`

**Description:** Add a course to cart

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "courseId": "uuid (required)",
  "quantity": "number (optional, default: 1)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Course added to cart successfully",
    "cartItem": {
      "id": "uuid",
      "courseId": "uuid",
      "quantity": "number",
      "addedAt": "datetime"
    }
  }
}
```

**Used in:** Course Detail Page (`/course/{id}`)

---

### Update Cart Item Quantity
**Endpoint:** `PUT /cart/items/{itemId}`

**Description:** Update quantity of item in cart

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
```
itemId: uuid (required)
```

**Request Body:**
```json
{
  "quantity": "number (required, min: 1)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Cart item updated successfully",
    "cartItem": {
      "id": "uuid",
      "quantity": "number",
      "updatedAt": "datetime"
    }
  }
}
```

**Used in:** Cart Page (`/cart`)

---

### Remove from Cart
**Endpoint:** `DELETE /cart/items/{itemId}`

**Description:** Remove item from cart

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
```
itemId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Item removed from cart successfully"
  }
}
```

**Used in:** Cart Page (`/cart`)

---

### Clear Cart
**Endpoint:** `DELETE /cart/clear`

**Description:** Remove all items from cart

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Cart cleared successfully"
  }
}
```

**Used in:** Cart Page (`/cart`), Checkout Page (`/checkout`)

---

## Payment APIs

### Create Payment Intent
**Endpoint:** `POST /payment/create-intent`

**Description:** Create payment intent for checkout

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "items": [
    {
      "courseId": "uuid",
      "quantity": "number",
      "price": "number"
    }
  ],
  "paymentMethod": "string", // "card"|"momo"|"banking"
  "billingAddress": {
    "fullName": "string",
    "email": "string",
    "address": "string",
    "city": "string",
    "zipCode": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentIntent": {
      "id": "uuid",
      "clientSecret": "string",
      "amount": "number",
      "currency": "VND",
      "status": "requires_payment_method"
    },
    "order": {
      "id": "uuid",
      "totalAmount": "number",
      "status": "pending"
    }
  }
}
```

**Used in:** Checkout Page (`/checkout`)

---

### Confirm Payment
**Endpoint:** `POST /payment/confirm`

**Description:** Confirm payment and complete order

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "paymentIntentId": "uuid (required)",
  "paymentMethodId": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "uuid",
      "status": "succeeded",
      "amount": "number",
      "paidAt": "datetime"
    },
    "order": {
      "id": "uuid",
      "status": "completed",
      "courses": ["uuid"],
      "completedAt": "datetime"
    },
    "message": "Payment successful! You now have access to your courses."
  }
}
```

**Used in:** Checkout Page (`/checkout`)

---

### Get Payment History
**Endpoint:** `GET /payment/history`

**Description:** Get user's payment history

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 10)
status: string (optional) - "succeeded"|"failed"|"pending"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "uuid",
        "amount": "number",
        "currency": "string",
        "status": "string",
        "paymentMethod": "string",
        "courses": [
          {
            "id": "uuid",
            "title": "string",
            "price": "number"
          }
        ],
        "createdAt": "datetime",
        "paidAt": "datetime|null"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    }
  }
}
```

**Used in:** Settings Page (`/settings`) - Billing section

---

## Progress APIs

### Get Course Progress
**Endpoint:** `GET /courses/{courseId}/progress`

**Description:** Get user's progress for a specific course

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
```
courseId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "progress": {
      "courseId": "uuid",
      "userId": "uuid",
      "overallProgress": "number (0-100)",
      "completedLessons": ["uuid"],
      "currentLesson": "uuid|null",
      "timeSpent": "number (seconds)",
      "lastAccessedAt": "datetime",
      "startedAt": "datetime",
      "completedAt": "datetime|null",
      "certificateEarned": "boolean",
      "certificateUrl": "string|null"
    },
    "lessons": [
      {
        "id": "uuid",
        "title": "string",
        "duration": "string",
        "completed": "boolean",
        "completedAt": "datetime|null",
        "timeSpent": "number (seconds)"
      }
    ]
  }
}
```

**Used in:** 
- My Courses Page (`/my-courses`)
- Learning Page (`/learn/{id}`)

---

### Update Lesson Progress
**Endpoint:** `PUT /courses/{courseId}/lessons/{lessonId}/progress`

**Description:** Update progress for a specific lesson

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
```
courseId: uuid (required)
lessonId: uuid (required)
```

**Request Body:**
```json
{
  "completed": "boolean (required)",
  "timeSpent": "number (optional, seconds)",
  "watchedDuration": "number (optional, seconds)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Lesson progress updated successfully",
    "lessonProgress": {
      "lessonId": "uuid",
      "completed": "boolean",
      "completedAt": "datetime|null",
      "timeSpent": "number"
    },
    "courseProgress": {
      "overallProgress": "number (0-100)",
      "completedLessons": "number",
      "totalLessons": "number"
    }
  }
}
```

**Used in:** Learning Page (`/learn/{id}`)

---

## Analytics APIs

### Track Course View
**Endpoint:** `POST /analytics/course-view`

**Description:** Track when a user views a course

**Headers:**
```
Authorization: Bearer {access_token} (optional)
```

**Request Body:**
```json
{
  "courseId": "uuid (required)",
  "source": "string (optional)", // "search"|"category"|"recommendation"|"direct"
  "referrer": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Course view tracked successfully"
  }
}
```

**Used in:** Course Detail Page (`/course/{id}`)

---

### Track Lesson Completion
**Endpoint:** `POST /analytics/lesson-completion`

**Description:** Track lesson completion for analytics

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "courseId": "uuid (required)",
  "lessonId": "uuid (required)",
  "timeSpent": "number (required, seconds)",
  "completionRate": "number (0-100)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Lesson completion tracked successfully"
  }
}
```

**Used in:** Learning Page (`/learn/{id}`)

---

### Get Learning Analytics
**Endpoint:** `GET /analytics/learning`

**Description:** Get user's learning analytics and statistics

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
```
period: string (optional) - "week"|"month"|"year"|"all" (default: "month")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analytics": {
      "totalTimeSpent": "number (seconds)",
      "coursesCompleted": "number",
      "lessonsCompleted": "number",
      "certificatesEarned": "number",
      "currentStreak": "number (days)",
      "longestStreak": "number (days)",
      "averageSessionTime": "number (seconds)",
      "learningGoals": {
        "daily": "number (minutes)",
        "weekly": "number (minutes)",
        "achieved": "boolean"
      },
      "progressByCategory": [
        {
          "category": "string",
          "coursesEnrolled": "number",
          "coursesCompleted": "number",
          "timeSpent": "number (seconds)"
        }
      ],
      "recentActivity": [
        {
          "type": "string", // "lesson_completed"|"course_enrolled"|"certificate_earned"
          "courseTitle": "string",
          "lessonTitle": "string|null",
          "timestamp": "datetime"
        }
      ]
    }
  }
}
```

**Used in:** My Courses Page (`/my-courses`) - Dashboard section

---

## Search APIs

### Search Courses
**Endpoint:** `GET /search/courses`

**Description:** Search for courses with filters

**Query Parameters:**
```
q: string (required) - Search query
category: string (optional)
level: string (optional) - "Beginner"|"Intermediate"|"Advanced"
priceMin: number (optional)
priceMax: number (optional)
rating: number (optional) - Minimum rating (1-5)
duration: string (optional) - "short"|"medium"|"long"
language: string (optional)
sortBy: string (optional) - "relevance"|"rating"|"price"|"newest"|"popular"
page: number (default: 1)
limit: number (default: 12)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "thumbnail": "string",
        "price": "number",
        "originalPrice": "number|null",
        "rating": "number",
        "studentsCount": "number",
        "duration": "string",
        "level": "string",
        "category": "string",
        "instructor": {
          "name": "string",
          "avatar": "string"
        },
        "relevanceScore": "number (0-1)"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    },
    "filters": {
      "categories": ["string"],
      "levels": ["string"],
      "priceRange": {
        "min": "number",
        "max": "number"
      }
    }
  }
}
```

**Used in:** 
- Course List Page (`/courses`)
- Header search (all pages)

---

### Get Search Suggestions
**Endpoint:** `GET /search/suggestions`

**Description:** Get search suggestions for autocomplete

**Query Parameters:**
```
q: string (required) - Partial search query
limit: number (default: 5, max: 10)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      {
        "text": "string",
        "type": "string", // "course"|"instructor"|"category"|"skill"
        "count": "number" // Number of results for this suggestion
      }
    ]
  }
}
```

**Used in:** Header search component (all pages)

---

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "string (optional)"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

### Pagination Format
```json
{
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number",
    "itemsPerPage": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

---

## Error Codes

### Authentication Errors
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Account not verified
- `AUTH_003`: Account suspended
- `AUTH_004`: Token expired
- `AUTH_005`: Invalid token
- `AUTH_006`: Password too weak
- `AUTH_007`: Email already exists

### Course Errors
- `COURSE_001`: Course not found
- `COURSE_002`: Course not available
- `COURSE_003`: Already enrolled
- `COURSE_004`: Enrollment limit reached
- `COURSE_005`: Course prerequisites not met

### Payment Errors
- `PAYMENT_001`: Payment failed
- `PAYMENT_002`: Invalid payment method
- `PAYMENT_003`: Insufficient funds
- `PAYMENT_004`: Payment already processed
- `PAYMENT_005`: Invalid billing information

### Validation Errors
- `VALIDATION_001`: Required field missing
- `VALIDATION_002`: Invalid email format
- `VALIDATION_003`: Invalid phone number
- `VALIDATION_004`: File too large
- `VALIDATION_005`: Invalid file type

### System Errors
- `SYSTEM_001`: Internal server error
- `SYSTEM_002`: Service unavailable
- `SYSTEM_003`: Database connection error
- `SYSTEM_004`: Rate limit exceeded

---

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

---

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer {access_token}
```

The token is automatically managed by the HttpRequest class when using Supabase authentication.

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **Search endpoints**: 30 requests per minute per user
- **General endpoints**: 100 requests per minute per user
- **File upload endpoints**: 10 requests per minute per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Versioning

The API uses URL versioning. Current version is `v1`:

```
Base URL: https://api.beeat.com/v1
```

When breaking changes are introduced, a new version will be created while maintaining backward compatibility for existing versions.