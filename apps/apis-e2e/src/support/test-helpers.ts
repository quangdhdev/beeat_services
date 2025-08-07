import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { createClient } from '@supabase/supabase-js';

// Types for test data
export interface TestUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  token?: string;
}

export interface TestCourse {
  id: string;
  title: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
}

// Test data
export const testUsers: Record<string, TestUser> = {
  user1: {
    id: 'test-user-1',
    email: 'test1@example.com',
    password: 'testpassword123',
    fullName: 'Test User One',
  },
  user2: {
    id: 'test-user-2',
    email: 'test2@example.com',
    password: 'testpassword123',
    fullName: 'Test User Two',
  },
  newUser: {
    id: '',
    email: 'newuser@example.com',
    password: 'newpassword123',
    fullName: 'New Test User',
  }
};

export const testCourses: Record<string, TestCourse> = {
  course1: {
    id: 'test-course-1',
    title: 'Automation Testing Basics',
    price: 299000,
    level: 'Beginner',
    category: 'Automation'
  },
  course2: {
    id: 'test-course-2',
    title: 'Advanced Selenium',
    price: 599000,
    level: 'Advanced',
    category: 'Automation'
  }
};

// Supabase client for auth operations
const supabaseUrl = process.env.SUPABASE_URL || 'https://test-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'test_anon_key';
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Make HTTP request with error handling
 */
export async function makeRequest<T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> {
  try {
    return await axios.request(config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response as AxiosResponse<ApiResponse<T>>;
    }
    throw error;
  }
}

/**
 * Create authorization header with JWT token
 */
export function authHeader(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`
  };
}

/**
 * Generate unique email for testing
 */
export function generateUniqueEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Wait for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Authenticate user and return token
 */
export async function authenticateUser(email: string, password: string): Promise<string> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.session) {
    throw new Error(`Authentication failed: ${error?.message}`);
  }

  return data.session.access_token;
}

/**
 * Register new user and return token
 */
export async function registerUser(
  email: string, 
  password: string, 
  fullName: string
): Promise<string> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error || !data.session) {
    throw new Error(`Registration failed: ${error?.message}`);
  }

  return data.session.access_token;
}

/**
 * Clean up test user
 */
export async function cleanupUser(token: string): Promise<void> {
  try {
    await supabase.auth.admin.deleteUser(token);
  } catch (error) {
    // Ignore cleanup errors
  }
}

/**
 * Validate API response structure
 */
export function validateApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): void {
  expect(response.data).toBeDefined();
  expect(typeof response.data.success).toBe('boolean');
  
  if (response.data.success) {
    expect(response.data.data).toBeDefined();
  } else {
    expect(response.data.error).toBeDefined();
    expect(response.data.error?.code).toBeDefined();
    expect(response.data.error?.message).toBeDefined();
  }
}

/**
 * Validate pagination structure
 */
export function validatePagination(pagination: any): void {
  expect(pagination).toBeDefined();
  expect(typeof pagination.currentPage).toBe('number');
  expect(typeof pagination.totalPages).toBe('number');
  expect(typeof pagination.totalItems).toBe('number');
  expect(typeof pagination.hasNext).toBe('boolean');
  expect(typeof pagination.hasPrev).toBe('boolean');
}

/**
 * Create multipart form data for file upload
 */
export function createFormData(file: Buffer, filename: string, fieldName = 'file'): FormData {
  const formData = new FormData();
  const blob = new Blob([file], { type: 'image/jpeg' });
  formData.append(fieldName, blob, filename);
  return formData;
}

/**
 * Generate test file buffer
 */
export function generateTestFile(sizeInBytes = 1024): Buffer {
  return Buffer.alloc(sizeInBytes, 'test data');
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Assert error response
 */
export function expectError(
  response: AxiosResponse<ApiResponse>,
  statusCode: number,
  errorCode?: string
): void {
  expect(response.status).toBe(statusCode);
  expect(response.data.success).toBe(false);
  expect(response.data.error).toBeDefined();
  
  if (errorCode) {
    expect(response.data.error?.code).toBe(errorCode);
  }
}

/**
 * Assert success response
 */
export function expectSuccess<T>(
  response: AxiosResponse<ApiResponse<T>>,
  statusCode = 200
): T {
  expect(response.status).toBe(statusCode);
  expect(response.data.success).toBe(true);
  expect(response.data.data).toBeDefined();
  
  return response.data.data!;
}

/**
 * Setup test database with seed data
 */
export async function setupTestData(): Promise<void> {
  // This would typically seed the database with test data
  // For now, we'll assume the API handles test data creation
  console.log('Setting up test data...');
}

/**
 * Clean up test database
 */
export async function cleanupTestData(): Promise<void> {
  // This would typically clean up test data from the database
  console.log('Cleaning up test data...');
}