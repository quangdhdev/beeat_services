import { useApiQuery, useApiMutation } from '../useApiQuery';
import { api } from '../../lib/api';

// Cart query keys
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
};

// Get cart items
export function useCartQuery(enabled = true) {
  return useApiQuery(
    [...cartKeys.items()], // Spread into new array to make mutable
    () => api.cart.getCart(),
    {
      enabled,
      staleTime: 30 * 1000, // 30 seconds
    }
  );
}

// Add to cart mutation
export function useAddToCartMutation() {
  return useApiMutation(
    (courseId: string) => api.cart.addToCart(courseId),
    {
      invalidateQueries: [
        [...cartKeys.items()], // Spread into new array to make mutable
      ],
    }
  );
}

// Remove from cart mutation
export function useRemoveFromCartMutation() {
  return useApiMutation(
    (courseId: string) => api.cart.removeFromCart(courseId),
    {
      invalidateQueries: [
        [...cartKeys.items()], // Spread into new array to make mutable
      ],
    }
  );
}

// Update cart quantity mutation
export function useUpdateCartQuantityMutation() {
  return useApiMutation(
    ({ courseId, quantity }: { courseId: string; quantity: number }) =>
      api.cart.updateQuantity(courseId, quantity),
    {
      invalidateQueries: [
        [...cartKeys.items()], // Spread into new array to make mutable
      ],
    }
  );
}

// Clear cart mutation
export function useClearCartMutation() {
  return useApiMutation(
    () => api.cart.clearCart(),
    {
      invalidateQueries: [
        [...cartKeys.items()], // Spread into new array to make mutable
      ],
    }
  );
}