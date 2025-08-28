import { httpRequest, ApiResponse } from "./httpRequest";
import { Course } from "../types/Course";

// Course API endpoints
export const courseApi = {
  // Get all courses
  getAllCourses: async (): Promise<ApiResponse<Course[]>> => {
    return httpRequest.get("/courses");
  },

  // Get course by ID
  getCourseById: async (id: string): Promise<ApiResponse<Course>> => {
    return httpRequest.get(`/courses/${id}`);
  },

  // Get user's enrolled courses
  getEnrolledCourses: async (): Promise<ApiResponse<Course[]>> => {
    return httpRequest.get("/courses/enrolled");
  },

  // Enroll in a course
  enrollCourse: async (
    courseId: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.post("/courses/enroll", { courseId });
  },

  // Update course progress
  updateProgress: async (
    courseId: string,
    lessonId: string,
    completed: boolean
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.patch("/courses/progress", {
      courseId,
      lessonId,
      completed,
    });
  },

  // Get course progress
  getCourseProgress: async (
    courseId: string
  ): Promise<ApiResponse<{ progress: number; completedLessons: string[] }>> => {
    return httpRequest.get(`/courses/${courseId}/progress`);
  },
};

// User API endpoints
export const userApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<unknown>> => {
    return httpRequest.get("/user/profile");
  },

  // Update user profile
  updateProfile: async (
    profileData: unknown
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.put("/user/profile", profileData);
  },

  // Upload profile avatar
  uploadAvatar: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ avatarUrl: string }>> => {
    return httpRequest.upload("/user/avatar", file, onProgress);
  },

  // Update password
  updatePassword: async (
    passwordData: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.put("/user/password", passwordData);
  },
};

// Cart API endpoints
export const cartApi = {
  // Get cart items
  getCart: async (): Promise<ApiResponse<unknown[]>> => {
    return httpRequest.get("/cart");
  },

  // Add item to cart
  addToCart: async (
    courseId: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.post("/cart/add", { courseId });
  },

  // Remove item from cart
  removeFromCart: async (
    courseId: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.delete(`/cart/remove/${courseId}`);
  },

  // Update cart item quantity
  updateQuantity: async (
    courseId: string,
    quantity: number
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.patch("/cart/quantity", { courseId, quantity });
  },

  // Clear cart
  clearCart: async (): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.delete("/cart/clear");
  },
};

// Payment API endpoints
export const paymentApi = {
  // Create payment intent
  createPaymentIntent: async (
    items: unknown
  ): Promise<ApiResponse<{ clientSecret: string; amount: number }>> => {
    return httpRequest.post("/payment/create-intent", { items });
  },

  // Confirm payment
  confirmPayment: async (
    paymentIntentId: unknown
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.post("/payment/confirm", { paymentIntentId });
  },

  // Get payment history
  getPaymentHistory: async (): Promise<ApiResponse<unknown[]>> => {
    return httpRequest.get("/payment/history");
  },
};

// Analytics API endpoints
export const analyticsApi = {
  // Track course view
  trackCourseView: async (
    courseId: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.post("/analytics/course-view", { courseId });
  },

  // Track lesson completion
  trackLessonCompletion: async (
    courseId: string,
    lessonId: string,
    timeSpent: number
  ): Promise<ApiResponse<{ message: string }>> => {
    return httpRequest.post("/analytics/lesson-completion", {
      courseId,
      lessonId,
      timeSpent,
    });
  },

  // Get learning analytics
  getLearningAnalytics: async (): Promise<ApiResponse<unknown>> => {
    return httpRequest.get("/analytics/learning");
  },
};

// Search API endpoints
export const searchApi = {
  // Search courses
  searchCourses: async (
    query: string,
    filters?: Record<string, unknown>
  ): Promise<ApiResponse<Course[]>> => {
    return httpRequest.get("/search/courses", {
      params: { q: query, ...filters },
    });
  },

  // Get search suggestions
  getSearchSuggestions: async (
    query: string
  ): Promise<ApiResponse<string[]>> => {
    return httpRequest.get("/search/suggestions", { params: { q: query } });
  },
};

// Export all APIs
export const api = {
  course: courseApi,
  user: userApi,
  cart: cartApi,
  payment: paymentApi,
  analytics: analyticsApi,
  search: searchApi,
};

export default api;
