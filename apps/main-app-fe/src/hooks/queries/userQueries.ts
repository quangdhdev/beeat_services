import { useApiQuery, useApiMutation } from '../useApiQuery';
import { api } from '../../lib/api';

// User query keys
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  analytics: () => [...userKeys.all, 'analytics'] as const,
};

// Get user profile
export function useUserProfileQuery(enabled = true) {
  return useApiQuery(
    [...userKeys.profile()],
    () => api.user.getProfile(),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Update user profile mutation
export function useUpdateProfileMutation() {
  return useApiMutation(
    (profileData: unknown) => api.user.updateProfile(profileData),
    {
      invalidateQueries: [
        [...userKeys.profile()],
      ],
    }
  );
}

// Upload avatar mutation
export function useUploadAvatarMutation() {
  return useApiMutation(
    ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) =>
      api.user.uploadAvatar(file, onProgress),
    {
      invalidateQueries: [
        [...userKeys.profile()],
      ],
    }
  );
}