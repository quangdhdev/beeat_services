# BeeAt Admin API Reference

This document provides a comprehensive reference for all admin APIs used in the BeeAt automation testing learning platform admin dashboard.

## Table of Contents

- [Authentication (Admin)](#authentication-admin)
- [Dashboard APIs](#dashboard-apis)
- [User Management APIs](#user-management-apis)
- [Course Management APIs](#course-management-apis)
- [Order Management APIs](#order-management-apis)
- [Analytics APIs](#analytics-apis)
- [Content Management APIs](#content-management-apis)
- [System Settings APIs](#system-settings-apis)
- [Instructor Management APIs](#instructor-management-apis)
- [Common Response Formats](#common-response-formats)
- [Error Codes](#error-codes)

---

## Authentication (Admin)

Admin authentication uses Supabase Auth with enhanced security features including Row Level Security (RLS), role-based access control, and Multi-Factor Authentication (MFA).

### Admin Login with Supabase
**Implementation:** Uses `supabase.auth.signInWithPassword()`

**Frontend Implementation:**
```javascript
import { supabase } from '@/lib/supabase'

// Admin login with enhanced security
const adminSignIn = async (email, password, mfaCode) => {
  try {
    // Primary authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    // Check if user has admin role in app_metadata or user_metadata
    const { user } = data
    const adminRoles = user.app_metadata?.role || user.user_metadata?.role
    
    if (!['super_admin', 'content_manager', 'customer_support', 'analytics_viewer', 'instructor_manager'].includes(adminRoles)) {
      throw new Error('Insufficient admin privileges')
    }
    
    // Handle MFA if enabled
    if (user.app_metadata?.mfa_enabled && !mfaCode) {
      return { requiresMFA: true, challengeId: user.id }
    }
    
    if (mfaCode) {
      const { error: mfaError } = await supabase.auth.verifyOtp({
        token: mfaCode,
        type: 'totp'
      })
      if (mfaError) throw mfaError
    }
    
    return { 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name,
        role: adminRoles,
        permissions: user.app_metadata?.permissions || [],
        lastLogin: user.last_sign_in_at,
        avatar: user.user_metadata?.avatar_url
      },
      session: data.session
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

**Response Format:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "string",
    "fullName": "string",
    "role": "super_admin|content_manager|customer_support|analytics_viewer|instructor_manager",
    "permissions": ["string"],
    "lastLogin": "datetime",
    "avatar": "string|null"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "string",
    "expires_in": "number",
    "token_type": "bearer"
  }
}
```

### Enable Multi-Factor Authentication (MFA)
**Implementation:** Uses Supabase MFA with TOTP

**Frontend Implementation:**
```javascript
// Enable TOTP MFA for admin
const enableAdminMFA = async () => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Admin TOTP'
    })
    
    if (error) throw error
    
    return {
      success: true,
      data: {
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        uri: data.totp.uri,
        factorId: data.id
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/svg+xml;base64,...",
    "secret": "string",
    "uri": "otpauth://totp/...",
    "factorId": "uuid"
  }
}
```

### Verify MFA Setup
**Implementation:** Uses Supabase MFA verification

**Frontend Implementation:**
```javascript
// Verify TOTP setup
const verifyAdminMFA = async (factorId, code) => {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code
    })
    
    if (error) throw error
    
    return { success: true, verified: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### Admin Session Management
**Implementation:** Uses Supabase session management with RLS

**Database Setup:**
```sql
-- Admin roles table with RLS
CREATE TABLE admin_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_manager', 'customer_support', 'analytics_viewer', 'instructor_manager')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for admin access
CREATE POLICY "Admin can view own profile" ON admin_profiles
  FOR SELECT USING (auth.uid() = id);
```

### Admin JWT Token Structure
Supabase generates JWT tokens with the following structure for admin users:

```json
{
  "aud": "authenticated",
  "exp": 1640995200,
  "sub": "uuid",
  "email": "admin@beeat.com",
  "phone": "",
  "app_metadata": {
    "provider": "email",
    "providers": ["email"],
    "role": "super_admin",
    "permissions": ["users:read", "users:write", "courses:write"]
  },
  "user_metadata": {
    "full_name": "Admin User",
    "avatar_url": "string"
  },
  "role": "authenticated",
  "aal": "aal2",
  "amr": [
    {
      "method": "password",
      "timestamp": 1640995200
    },
    {
      "method": "totp",
      "timestamp": 1640995200
    }
  ],
  "session_id": "uuid"
}
```

---

## Dashboard APIs

### Get Dashboard Overview
**Endpoint:** `GET /admin/dashboard/overview`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
period: string (optional) - "today"|"week"|"month"|"year" (default: "month")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalUsers": {
        "count": "number",
        "change": "number",
        "changeType": "increase|decrease"
      },
      "totalCourses": {
        "count": "number",
        "published": "number",
        "draft": "number"
      },
      "monthlyRevenue": {
        "amount": "number",
        "change": "number",
        "changeType": "increase|decrease"
      },
      "activeEnrollments": {
        "count": "number",
        "change": "number"
      },
      "supportTickets": {
        "open": "number",
        "resolved": "number",
        "total": "number"
      }
    },
    "charts": {
      "revenueChart": [
        {
          "month": "string",
          "revenue": "number",
          "orders": "number"
        }
      ],
      "userRegistrations": [
        {
          "date": "string",
          "count": "number"
        }
      ],
      "courseCompletions": [
        {
          "category": "string",
          "completionRate": "number"
        }
      ]
    },
    "recentActivity": [
      {
        "id": "uuid",
        "type": "user_registration|course_purchase|course_completion|support_ticket",
        "description": "string",
        "user": {
          "id": "uuid",
          "name": "string",
          "email": "string"
        },
        "timestamp": "datetime"
      }
    ]
  }
}
```

### Get System Status
**Endpoint:** `GET /admin/dashboard/system-status`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy|warning|critical",
    "services": {
      "database": {
        "status": "online|offline",
        "responseTime": "number (ms)",
        "connections": "number"
      },
      "storage": {
        "status": "online|offline",
        "usage": "number (percentage)",
        "totalSpace": "number (GB)"
      },
      "email": {
        "status": "online|offline",
        "queueSize": "number"
      },
      "payment": {
        "status": "online|offline",
        "lastTransaction": "datetime"
      }
    },
    "alerts": [
      {
        "id": "uuid",
        "type": "warning|error|info",
        "message": "string",
        "timestamp": "datetime"
      }
    ]
  }
}
```

---

## User Management APIs

### Get All Users
**Endpoint:** `GET /admin/users`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 20, max: 100)
search: string (optional) - Search by name, email, phone
status: string (optional) - "active"|"suspended"|"pending"|"banned"
userType: string (optional) - "student"|"instructor"
registrationDate: string (optional) - "today"|"week"|"month"|"year"
sortBy: string (optional) - "name"|"email"|"registrationDate"|"lastLogin"
sortOrder: string (optional) - "asc"|"desc"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "fullName": "string",
        "email": "string",
        "phone": "string|null",
        "avatar": "string|null",
        "status": "active|suspended|pending|banned",
        "userType": "student|instructor",
        "registrationDate": "datetime",
        "lastLogin": "datetime|null",
        "emailVerified": "boolean",
        "coursesEnrolled": "number",
        "coursesCompleted": "number",
        "totalSpent": "number",
        "location": {
          "country": "string",
          "city": "string"
        }
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    },
    "summary": {
      "totalUsers": "number",
      "activeUsers": "number",
      "suspendedUsers": "number",
      "newUsersThisMonth": "number"
    }
  }
}
```

### Get User Details
**Endpoint:** `GET /admin/users/{userId}`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
userId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "string",
      "email": "string",
      "phone": "string|null",
      "avatar": "string|null",
      "bio": "string|null",
      "status": "active|suspended|pending|banned",
      "userType": "student|instructor",
      "registrationDate": "datetime",
      "lastLogin": "datetime|null",
      "emailVerified": "boolean",
      "preferences": {
        "language": "string",
        "timezone": "string",
        "notifications": {
          "email": "boolean",
          "courseUpdates": "boolean",
          "promotions": "boolean"
        }
      },
      "location": {
        "country": "string",
        "city": "string",
        "ipAddress": "string"
      }
    },
    "statistics": {
      "coursesEnrolled": "number",
      "coursesCompleted": "number",
      "certificatesEarned": "number",
      "totalLearningTime": "number (minutes)",
      "averageRating": "number",
      "totalSpent": "number",
      "lastPurchase": "datetime|null"
    },
    "enrollments": [
      {
        "courseId": "uuid",
        "courseTitle": "string",
        "enrollmentDate": "datetime",
        "progress": "number (0-100)",
        "completionDate": "datetime|null",
        "certificateEarned": "boolean"
      }
    ],
    "orders": [
      {
        "id": "uuid",
        "date": "datetime",
        "total": "number",
        "status": "completed|pending|cancelled|refunded",
        "items": "number"
      }
    ],
    "activityLog": [
      {
        "id": "uuid",
        "action": "login|logout|course_enrollment|course_completion|purchase",
        "description": "string",
        "timestamp": "datetime",
        "ipAddress": "string"
      }
    ]
  }
}
```

### Update User Status
**Endpoint:** `PUT /admin/users/{userId}/status`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
userId: uuid (required)
```

**Request Body:**
```json
{
  "status": "active|suspended|banned (required)",
  "reason": "string (optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "User status updated successfully",
    "user": {
      "id": "uuid",
      "status": "string",
      "updatedAt": "datetime"
    }
  }
}
```

### Bulk User Operations
**Endpoint:** `POST /admin/users/bulk-action`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "action": "suspend|activate|delete|send_email (required)",
  "userIds": ["uuid"],
  "data": {
    "reason": "string (optional)",
    "emailSubject": "string (for send_email)",
    "emailContent": "string (for send_email)"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Bulk action completed successfully",
    "processed": "number",
    "failed": "number",
    "results": [
      {
        "userId": "uuid",
        "status": "success|failed",
        "error": "string|null"
      }
    ]
  }
}
```

---

## Course Management APIs

### Get All Courses (Admin)
**Endpoint:** `GET /admin/courses`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 20)
status: string (optional) - "all"|"published"|"draft"|"archived"|"pending_review"
category: string (optional)
instructor: string (optional) - Instructor ID
search: string (optional)
sortBy: string (optional) - "title"|"created_date"|"enrollment_count"|"revenue"|"rating"
sortOrder: string (optional) - "asc"|"desc"
dateRange: string (optional) - "today"|"week"|"month"|"year"
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
        "status": "published|draft|archived|pending_review",
        "category": "string",
        "level": "string",
        "price": "number",
        "originalPrice": "number|null",
        "instructor": {
          "id": "uuid",
          "name": "string",
          "avatar": "string"
        },
        "statistics": {
          "enrollmentCount": "number",
          "completionRate": "number",
          "averageRating": "number",
          "totalRevenue": "number",
          "reviewCount": "number"
        },
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "publishedAt": "datetime|null"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    },
    "summary": {
      "totalCourses": "number",
      "publishedCourses": "number",
      "draftCourses": "number",
      "pendingReview": "number"
    }
  }
}
```

### Get Course Details (Admin)
**Endpoint:** `GET /admin/courses/{courseId}`

**Headers:**
```
Authorization: Bearer {admin_token}
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
    "course": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "longDescription": "string",
      "thumbnail": "string",
      "status": "published|draft|archived|pending_review",
      "category": "string",
      "level": "beginner|intermediate|advanced",
      "language": "string",
      "price": "number",
      "originalPrice": "number|null",
      "duration": "string",
      "instructor": {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "avatar": "string",
        "bio": "string"
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
              "type": "video|text|quiz",
              "isPreview": "boolean",
              "videoUrl": "string|null",
              "content": "string|null"
            }
          ]
        }
      ],
      "skills": ["string"],
      "requirements": ["string"],
      "settings": {
        "enrollmentLimit": "number|null",
        "certificateEnabled": "boolean",
        "discussionEnabled": "boolean",
        "downloadableResources": "boolean"
      },
      "seo": {
        "metaTitle": "string",
        "metaDescription": "string",
        "keywords": ["string"]
      },
      "statistics": {
        "enrollmentCount": "number",
        "completionCount": "number",
        "completionRate": "number",
        "averageRating": "number",
        "totalRevenue": "number",
        "reviewCount": "number",
        "totalLessons": "number",
        "totalDuration": "number (minutes)"
      },
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "publishedAt": "datetime|null"
    },
    "reviews": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "name": "string",
          "avatar": "string"
        },
        "rating": "number (1-5)",
        "comment": "string",
        "createdAt": "datetime"
      }
    ],
    "enrollments": [
      {
        "userId": "uuid",
        "userName": "string",
        "enrollmentDate": "datetime",
        "progress": "number (0-100)",
        "lastAccessed": "datetime"
      }
    ]
  }
}
```

### Create Course
**Endpoint:** `POST /admin/courses`

**Headers:**
```
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "longDescription": "string (required)",
  "category": "string (required)",
  "level": "beginner|intermediate|advanced (required)",
  "language": "string (required)",
  "price": "number (required)",
  "originalPrice": "number (optional)",
  "instructorId": "uuid (required)",
  "thumbnail": "string (optional)",
  "skills": ["string"],
  "requirements": ["string"],
  "curriculum": [
    {
      "title": "string (required)",
      "lessons": [
        {
          "title": "string (required)",
          "type": "video|text|quiz (required)",
          "duration": "string (required)",
          "isPreview": "boolean (default: false)",
          "content": "string (optional)"
        }
      ]
    }
  ],
  "settings": {
    "enrollmentLimit": "number (optional)",
    "certificateEnabled": "boolean (default: true)",
    "discussionEnabled": "boolean (default: true)",
    "downloadableResources": "boolean (default: false)"
  },
  "seo": {
    "metaTitle": "string (optional)",
    "metaDescription": "string (optional)",
    "keywords": ["string"]
  },
  "status": "draft|published (default: draft)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Course created successfully",
    "course": {
      "id": "uuid",
      "title": "string",
      "status": "string",
      "createdAt": "datetime"
    }
  }
}
```

### Update Course Status
**Endpoint:** `PUT /admin/courses/{courseId}/status`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
courseId: uuid (required)
```

**Request Body:**
```json
{
  "status": "published|draft|archived|pending_review (required)",
  "reason": "string (optional)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Course status updated successfully",
    "course": {
      "id": "uuid",
      "status": "string",
      "updatedAt": "datetime"
    }
  }
}
```

---

## Order Management APIs

### Get All Orders
**Endpoint:** `GET /admin/orders`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 20)
status: string (optional) - "all"|"pending"|"completed"|"cancelled"|"refunded"
paymentMethod: string (optional) - "card"|"momo"|"banking"
dateRange: string (optional) - "today"|"week"|"month"|"year"
customDateFrom: string (optional) - "YYYY-MM-DD"
customDateTo: string (optional) - "YYYY-MM-DD"
minAmount: number (optional)
maxAmount: number (optional)
search: string (optional) - Search by order ID, customer name, email
sortBy: string (optional) - "date"|"amount"|"customer"|"status"
sortOrder: string (optional) - "asc"|"desc"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "string",
        "customer": {
          "id": "uuid",
          "name": "string",
          "email": "string",
          "avatar": "string"
        },
        "items": [
          {
            "courseId": "uuid",
            "courseTitle": "string",
            "price": "number",
            "quantity": "number"
          }
        ],
        "summary": {
          "subtotal": "number",
          "discount": "number",
          "tax": "number",
          "total": "number"
        },
        "payment": {
          "method": "card|momo|banking",
          "status": "pending|completed|failed|refunded",
          "transactionId": "string",
          "paidAt": "datetime|null"
        },
        "status": "pending|completed|cancelled|refunded",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number"
    },
    "summary": {
      "totalOrders": "number",
      "totalRevenue": "number",
      "pendingOrders": "number",
      "completedOrders": "number",
      "refundedOrders": "number"
    }
  }
}
```

### Get Order Details
**Endpoint:** `GET /admin/orders/{orderId}`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
orderId: uuid (required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "uuid",
      "orderNumber": "string",
      "customer": {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "phone": "string",
        "avatar": "string",
        "registrationDate": "datetime",
        "totalOrders": "number",
        "totalSpent": "number"
      },
      "items": [
        {
          "id": "uuid",
          "courseId": "uuid",
          "courseTitle": "string",
          "courseThumbnail": "string",
          "instructor": "string",
          "price": "number",
          "originalPrice": "number",
          "quantity": "number",
          "discount": "number"
        }
      ],
      "billing": {
        "fullName": "string",
        "email": "string",
        "address": "string",
        "city": "string",
        "zipCode": "string",
        "country": "string"
      },
      "summary": {
        "subtotal": "number",
        "discount": "number",
        "tax": "number",
        "total": "number"
      },
      "payment": {
        "method": "card|momo|banking",
        "status": "pending|completed|failed|refunded",
        "transactionId": "string",
        "gatewayResponse": "object",
        "paidAt": "datetime|null",
        "refundedAt": "datetime|null",
        "refundAmount": "number|null",
        "refundReason": "string|null"
      },
      "status": "pending|completed|cancelled|refunded",
      "notes": "string|null",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    },
    "timeline": [
      {
        "id": "uuid",
        "action": "created|paid|completed|refunded|cancelled",
        "description": "string",
        "performedBy": {
          "id": "uuid",
          "name": "string",
          "type": "customer|admin"
        },
        "timestamp": "datetime"
      }
    ]
  }
}
```

### Process Refund
**Endpoint:** `POST /admin/orders/{orderId}/refund`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
orderId: uuid (required)
```

**Request Body:**
```json
{
  "amount": "number (required)",
  "reason": "string (required)",
  "refundType": "full|partial (required)",
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Refund processed successfully",
    "refund": {
      "id": "uuid",
      "orderId": "uuid",
      "amount": "number",
      "status": "processing|completed|failed",
      "transactionId": "string",
      "processedAt": "datetime"
    }
  }
}
```

---

## Analytics APIs

### Get Revenue Analytics
**Endpoint:** `GET /admin/analytics/revenue`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
period: string (optional) - "today"|"week"|"month"|"quarter"|"year" (default: "month")
customDateFrom: string (optional) - "YYYY-MM-DD"
customDateTo: string (optional) - "YYYY-MM-DD"
groupBy: string (optional) - "day"|"week"|"month" (default: "day")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": "number",
      "totalOrders": "number",
      "averageOrderValue": "number",
      "revenueGrowth": "number (percentage)",
      "orderGrowth": "number (percentage)"
    },
    "chartData": [
      {
        "date": "string",
        "revenue": "number",
        "orders": "number",
        "refunds": "number"
      }
    ],
    "breakdown": {
      "byPaymentMethod": [
        {
          "method": "card|momo|banking",
          "revenue": "number",
          "orders": "number",
          "percentage": "number"
        }
      ],
      "byCategory": [
        {
          "category": "string",
          "revenue": "number",
          "orders": "number",
          "percentage": "number"
        }
      ],
      "topCourses": [
        {
          "courseId": "uuid",
          "title": "string",
          "revenue": "number",
          "orders": "number"
        }
      ]
    }
  }
}
```

### Get User Analytics
**Endpoint:** `GET /admin/analytics/users`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
period: string (optional) - "today"|"week"|"month"|"quarter"|"year" (default: "month")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalUsers": "number",
      "activeUsers": "number",
      "newUsers": "number",
      "userGrowth": "number (percentage)",
      "retentionRate": "number (percentage)"
    },
    "registrations": [
      {
        "date": "string",
        "count": "number"
      }
    ],
    "demographics": {
      "byCountry": [
        {
          "country": "string",
          "users": "number",
          "percentage": "number"
        }
      ],
      "byAge": [
        {
          "ageGroup": "18-24|25-34|35-44|45-54|55+",
          "users": "number",
          "percentage": "number"
        }
      ]
    },
    "engagement": {
      "averageSessionTime": "number (minutes)",
      "averageCoursesPerUser": "number",
      "completionRate": "number (percentage)"
    }
  }
}
```

### Get Course Analytics
**Endpoint:** `GET /admin/analytics/courses`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
period: string (optional) - "today"|"week"|"month"|"quarter"|"year" (default: "month")
category: string (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalCourses": "number",
      "publishedCourses": "number",
      "totalEnrollments": "number",
      "averageCompletionRate": "number (percentage)",
      "averageRating": "number"
    },
    "performance": {
      "topCourses": [
        {
          "courseId": "uuid",
          "title": "string",
          "enrollments": "number",
          "completionRate": "number",
          "rating": "number",
          "revenue": "number"
        }
      ],
      "byCategory": [
        {
          "category": "string",
          "courses": "number",
          "enrollments": "number",
          "completionRate": "number",
          "averageRating": "number"
        }
      ]
    },
    "trends": [
      {
        "date": "string",
        "enrollments": "number",
        "completions": "number"
      }
    ]
  }
}
```

---

## Content Management APIs

### Get Pages
**Endpoint:** `GET /admin/content/pages`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "pages": [
      {
        "id": "uuid",
        "slug": "string",
        "title": "string",
        "type": "homepage|about|terms|privacy|faq",
        "status": "published|draft",
        "lastModified": "datetime",
        "modifiedBy": {
          "id": "uuid",
          "name": "string"
        }
      }
    ]
  }
}
```

### Update Page Content
**Endpoint:** `PUT /admin/content/pages/{pageId}`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
pageId: uuid (required)
```

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "metaTitle": "string (optional)",
  "metaDescription": "string (optional)",
  "status": "published|draft (optional)"
}
```

### Get Announcements
**Endpoint:** `GET /admin/content/announcements`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "announcements": [
      {
        "id": "uuid",
        "title": "string",
        "content": "string",
        "type": "info|warning|success|error",
        "targetAudience": "all|students|instructors",
        "status": "active|inactive|scheduled",
        "startDate": "datetime",
        "endDate": "datetime|null",
        "createdAt": "datetime"
      }
    ]
  }
}
```

### Create Announcement
**Endpoint:** `POST /admin/content/announcements`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "type": "info|warning|success|error (required)",
  "targetAudience": "all|students|instructors (required)",
  "startDate": "datetime (required)",
  "endDate": "datetime (optional)"
}
```

---

## System Settings APIs

### Get General Settings
**Endpoint:** `GET /admin/settings/general`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "settings": {
      "siteName": "string",
      "siteDescription": "string",
      "logo": "string",
      "favicon": "string",
      "contactEmail": "string",
      "supportEmail": "string",
      "socialMedia": {
        "facebook": "string",
        "twitter": "string",
        "linkedin": "string",
        "youtube": "string"
      },
      "maintenance": {
        "enabled": "boolean",
        "message": "string",
        "allowedIPs": ["string"]
      }
    }
  }
}
```

### Update General Settings
**Endpoint:** `PUT /admin/settings/general`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "siteName": "string (optional)",
  "siteDescription": "string (optional)",
  "contactEmail": "string (optional)",
  "supportEmail": "string (optional)",
  "socialMedia": {
    "facebook": "string (optional)",
    "twitter": "string (optional)",
    "linkedin": "string (optional)",
    "youtube": "string (optional)"
  },
  "maintenance": {
    "enabled": "boolean (optional)",
    "message": "string (optional)",
    "allowedIPs": ["string"]
  }
}
```

### Get Payment Settings
**Endpoint:** `GET /admin/settings/payment`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "settings": {
      "currency": "string",
      "taxRate": "number",
      "gateways": {
        "stripe": {
          "enabled": "boolean",
          "publicKey": "string",
          "webhookSecret": "string"
        },
        "momo": {
          "enabled": "boolean",
          "partnerCode": "string",
          "accessKey": "string"
        }
      },
      "refundPolicy": {
        "enabled": "boolean",
        "periodDays": "number",
        "conditions": "string"
      }
    }
  }
}
```

---

## Instructor Management APIs

### Get All Instructors
**Endpoint:** `GET /admin/instructors`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 20)
status: string (optional) - "active"|"pending"|"suspended"
search: string (optional)
sortBy: string (optional) - "name"|"joinDate"|"courseCount"|"rating"|"revenue"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "instructors": [
      {
        "id": "uuid",
        "fullName": "string",
        "email": "string",
        "avatar": "string",
        "bio": "string",
        "status": "active|pending|suspended",
        "joinDate": "datetime",
        "statistics": {
          "courseCount": "number",
          "studentCount": "number",
          "averageRating": "number",
          "totalRevenue": "number",
          "reviewCount": "number"
        },
        "specializations": ["string"],
        "socialLinks": {
          "website": "string",
          "linkedin": "string",
          "twitter": "string"
        }
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

### Get Instructor Applications
**Endpoint:** `GET /admin/instructors/applications`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "uuid",
        "applicant": {
          "fullName": "string",
          "email": "string",
          "phone": "string"
        },
        "qualifications": {
          "education": "string",
          "experience": "string",
          "certifications": ["string"],
          "portfolio": "string"
        },
        "documents": [
          {
            "type": "resume|certificate|portfolio",
            "filename": "string",
            "url": "string"
          }
        ],
        "status": "pending|approved|rejected",
        "submittedAt": "datetime",
        "reviewedAt": "datetime|null",
        "reviewedBy": {
          "id": "uuid",
          "name": "string"
        },
        "notes": "string|null"
      }
    ]
  }
}
```

### Approve/Reject Instructor Application
**Endpoint:** `PUT /admin/instructors/applications/{applicationId}`

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Path Parameters:**
```
applicationId: uuid (required)
```

**Request Body:**
```json
{
  "status": "approved|rejected (required)",
  "notes": "string (optional)",
  "revenueShare": "number (required for approved, 0-100)"
}
```

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

### Admin Authentication Errors
- `ADMIN_AUTH_001`: Invalid admin credentials
- `ADMIN_AUTH_002`: Admin account suspended
- `ADMIN_AUTH_003`: Two-factor authentication required
- `ADMIN_AUTH_004`: Invalid two-factor code
- `ADMIN_AUTH_005`: Admin session expired
- `ADMIN_AUTH_006`: Insufficient permissions

### Admin Operation Errors
- `ADMIN_OP_001`: Resource not found
- `ADMIN_OP_002`: Operation not permitted
- `ADMIN_OP_003`: Bulk operation failed
- `ADMIN_OP_004`: Invalid status transition
- `ADMIN_OP_005`: Dependency constraint violation

### System Errors
- `ADMIN_SYS_001`: Database connection error
- `ADMIN_SYS_002`: External service unavailable
- `ADMIN_SYS_003`: File upload failed
- `ADMIN_SYS_004`: Email delivery failed
- `ADMIN_SYS_005`: Cache operation failed

---

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized (Invalid/Missing Token)
- `403`: Forbidden (Insufficient Permissions)
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

---

## Authentication

All admin endpoints require a valid Supabase JWT token in the Authorization header:

```
Authorization: Bearer {supabase_jwt_token}
```

### Supabase Admin Token Features:
- **JWT-based authentication**: Uses Supabase-generated JWT tokens
- **Configurable expiration**: Default 1 hour, configurable via Supabase settings
- **Row Level Security (RLS)**: Database-level security policies
- **Role-based permissions**: Stored in `app_metadata.role` and `app_metadata.permissions`
- **Multi-Factor Authentication**: TOTP support for enhanced security
- **Session management**: Automatic token refresh
- **Activity logging**: Built-in with Supabase Auth

### Token Validation Process:
1. **JWT Signature**: Verified using Supabase JWT secret
2. **Expiration Check**: Token must not be expired
3. **Role Verification**: User must have valid admin role in metadata
4. **Permission Check**: Action-specific permissions validated
5. **RLS Policies**: Database queries filtered by user context

### Admin Role Hierarchy:
- `super_admin`: Full system access
- `content_manager`: Course and content management
- `customer_support`: User support and basic analytics
- `analytics_viewer`: Read-only analytics access
- `instructor_manager`: Instructor oversight and approval

---

## Rate Limiting

Admin API endpoints have specific rate limits:

- **Authentication endpoints**: 10 requests per minute per IP
- **Read operations**: 200 requests per minute per admin
- **Write operations**: 100 requests per minute per admin
- **Bulk operations**: 10 requests per minute per admin
- **File uploads**: 20 requests per minute per admin

Rate limit headers:
```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X-RateLimit-Reset: 1640995200
X-RateLimit-Type: admin
```

---

## Audit Logging

All admin actions are automatically logged with:
- Admin user ID and role
- Action performed
- Resource affected
- Timestamp
- IP address
- User agent
- Request/response data (sanitized)

Audit logs are retained for 2 years and can be accessed via:
`GET /admin/audit-logs`

---

## Webhooks

Admin system supports webhooks for external integrations:

### Available Events
- `user.created`
- `user.suspended`
- `course.published`
- `order.completed`
- `refund.processed`
- `instructor.approved`

### Webhook Configuration
`POST /admin/settings/webhooks`

```json
{
  "url": "https://your-system.com/webhook",
  "events": ["user.created", "order.completed"],
  "secret": "your-webhook-secret"
}
```

---

This comprehensive admin API reference provides all the endpoints needed to build a full-featured admin dashboard for the BeeAt platform.