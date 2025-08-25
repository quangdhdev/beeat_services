/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { ApiError } from '../lib/httpRequest';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T = unknown>(
  apiFunction: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = async (...args: unknown[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiFunction(...args);
      //@ts-expect-error
      const data = response.data || response;
      
      setState({
        data,
        loading: false,
        error: null,
      });
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      
      setState({
        data: null,
        loading: false,
        error: apiError,
      });
      
      if (onError) {
        onError(apiError);
      }
      
      throw apiError;
    }
  };

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    reset,
    refetch: execute,
  };
}

// Specialized hook for mutations (POST, PUT, DELETE)
export function useMutation<T = unknown>(
  apiFunction: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  return useApi<T>(apiFunction, { ...options, immediate: false });
}

// Hook for handling form submissions with API calls
export function useFormSubmit<T = unknown>(
  apiFunction: (data: unknown) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { execute, loading, error, reset } = useMutation<T>(apiFunction, options);

  const handleSubmit = async (formData: unknown) => {
      const result = await execute(formData);
      return result;
  };

  return {
    handleSubmit,
    loading,
    error,
    reset,
  };
}

export default useApi;