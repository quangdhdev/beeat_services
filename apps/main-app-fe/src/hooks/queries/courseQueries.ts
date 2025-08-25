import { useApiQuery, useApiMutation } from "../useApiQuery";
import { api } from "../../lib/api";

// Course query keys
export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: string) => [...courseKeys.details(), id] as const,
  enrolled: () => [...courseKeys.all, "enrolled"] as const,
  progress: (id: string) => [...courseKeys.all, "progress", id] as const,
};

// Get all courses
export function useCoursesQuery(filters?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: string;
  level?: string;
}) {
  return useApiQuery(
    [...courseKeys.list(filters || {})],
    () => api.course.getAllCourses(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Get course by ID
export function useCourseQuery(id: string, enabled = true) {
  return useApiQuery(
    [...courseKeys.detail(id)],
    () => api.course.getCourseById(id),
    {
      enabled: enabled && !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
}

// Get enrolled courses
export function useEnrolledCoursesQuery(filters?: {
  status?: string;
  search?: string;
}) {
  return useApiQuery(
    [...courseKeys.enrolled(), filters || {}],
    () => api.course.getEnrolledCourses(),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
}

// Get course progress
export function useCourseProgressQuery(courseId: string, enabled = true) {
  return useApiQuery(
    [...courseKeys.progress(courseId)],
    () => api.course.getCourseProgress(courseId),
    {
      enabled: enabled && !!courseId,
      staleTime: 30 * 1000, // 30 seconds
    }
  );
}

// Enroll in course mutation
export function useEnrollCourseMutation() {
  return useApiMutation(
    (courseId: string) => api.course.enrollCourse(courseId),
    {
      invalidateQueries: [[...courseKeys.enrolled()], ["user", "profile"]],
    }
  );
}

// Update course progress mutation
export function useUpdateProgressMutation(courseId: string) {
  return useApiMutation(
    ({
      courseId,
      lessonId,
      completed,
    }: {
      courseId: string;
      lessonId: string;
      completed: boolean;
    }) => api.course.updateProgress(courseId, lessonId, completed),
    {
      invalidateQueries: [
        [...courseKeys.progress(courseId)],
        [...courseKeys.enrolled()],
      ],
    }
  );
}
