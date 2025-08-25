import { useApiQuery } from "../useApiQuery";
import { api } from "../../lib/api";

// Search query keys
export const searchKeys = {
  all: ["search"] as const,
  courses: (query: string, filters?: Record<string, unknown>) => [
    ...searchKeys.all,
    "courses",
    query,
    filters || {},
  ],
  suggestions: (query: string) =>
    [...searchKeys.all, "suggestions", query] as const,
};

// Search courses
export function useSearchCoursesQuery(
  query: string,
  filters?: Record<string, unknown> | undefined,
  enabled = true
) {
  return useApiQuery(
    [...searchKeys.courses(query, filters)],
    () => api.search.searchCourses(query, filters),
    {
      enabled: enabled && !!query && query.length > 2,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
}

// Get search suggestions
export function useSearchSuggestionsQuery(query: string, enabled = true) {
  return useApiQuery(
    [...searchKeys.suggestions(query)],
    () => api.search.getSearchSuggestions(query),
    {
      enabled: enabled && !!query && query.length > 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}
