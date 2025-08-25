/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../lib/httpRequest';

// Generic query hook
export function useApiQuery<T = unknown>(
  queryKey: (string | number | boolean | object)[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
    refetchInterval?: number;
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
  }
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      //@ts-expect-error
      return response?.data || response;
    },
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    refetchInterval: options?.refetchInterval,
    meta: {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
  });
}

// Generic mutation hook
export function useApiMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
    onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
    invalidateQueries?: (string | number | boolean | object)[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);
      //@ts-expect-error
      return response?.data || response;
    },
    onSuccess: (data, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
}

// Form submission hook with React Query
export function useFormMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
    invalidateQueries?: (string | number | boolean | object)[][];
  }
) {
  const mutation = useApiMutation(mutationFn, options);

  const handleSubmit = async (formData: TVariables) => {
      const result = await mutation.mutateAsync(formData);
      return result;
  };

  return {
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}