// Core types for the BeeAt Admin Dashboard

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'pending' | 'banned';
  userType: 'student' | 'instructor';
  registrationDate: string;
  lastLogin?: string;
  emailVerified: boolean;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalSpent: number;
  location: {
    country: string;
    city: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'archived' | 'pending_review';
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  originalPrice?: number;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  statistics: {
    enrollmentCount: number;
    completionRate: number;
    averageRating: number;
    totalRevenue: number;
    reviewCount: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  items: Array<{
    courseId: string;
    courseTitle: string;
    price: number;
    quantity: number;
  }>;
  summary: {
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  };
  payment: {
    method: 'card' | 'momo' | 'banking';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId: string;
    paidAt?: string;
  };
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'content_manager' | 'customer_support' | 'analytics_viewer' | 'instructor_manager';
  permissions: string[];
  lastLogin?: string;
  avatar?: string;
}

export interface DashboardMetrics {
  totalUsers: {
    count: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  totalCourses: {
    count: number;
    published: number;
    draft: number;
  };
  monthlyRevenue: {
    amount: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
  activeEnrollments: {
    count: number;
    change: number;
  };
  supportTickets: {
    open: number;
    resolved: number;
    total: number;
  };
}

export interface ChartData {
  revenueChart: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  userRegistrations: Array<{
    date: string;
    count: number;
  }>;
  courseCompletions: Array<{
    category: string;
    completionRate: number;
  }>;
}

export interface RecentActivity {
  id: string;
  type: 'user_registration' | 'course_purchase' | 'course_completion' | 'support_ticket';
  description: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  timestamp: string;
}