import { useApiQuery, useApiMutation } from '../useApiQuery';
import { api } from '../../lib/api';

// Payment query keys
export const paymentKeys = {
  all: ['payment'] as const,
  history: () => [...paymentKeys.all, 'history'] as const,
};

// Get payment history
export function usePaymentHistoryQuery(enabled = true) {
  return useApiQuery(
    [...paymentKeys.history()],
    () => api.payment.getPaymentHistory(),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Create payment intent mutation
export function useCreatePaymentIntentMutation() {
  return useApiMutation(
    (paymentData: unknown) => api.payment.createPaymentIntent(paymentData)
  );
}

// Confirm payment mutation
export function useConfirmPaymentMutation() {
  return useApiMutation(
      (confirmData: unknown) => api.payment.confirmPayment(confirmData),
    {
      invalidateQueries: [
        [...paymentKeys.history()],
        ['cart', 'items'],
        ['courses', 'enrolled'],
      ],
    }
  );
}