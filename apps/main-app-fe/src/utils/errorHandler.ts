import { ApiError } from '../lib/httpRequest';

export class ErrorHandler {
  static handle(error: ApiError | Error, context?: string): void {
    console.error(`Error in ${context || 'Unknown context'}:`, error);

    // Log to external service in production
    if (import.meta.env.PROD) {
      // You can integrate with services like Sentry, LogRocket, etc.
      // Sentry.captureException(error);
    }
  }

  static getErrorMessage(error: ApiError | Error): string {
    if ('status' in error) {
      // It's an ApiError
      switch (error.status) {
        case 400:
          return error.message || 'Yêu cầu không hợp lệ';
        case 401:
          return 'Bạn cần đăng nhập để thực hiện hành động này';
        case 403:
          return 'Bạn không có quyền thực hiện hành động này';
        case 404:
          return 'Không tìm thấy tài nguyên yêu cầu';
        case 409:
          return error.message || 'Xung đột dữ liệu';
        case 422:
          return error.message || 'Dữ liệu không hợp lệ';
        case 429:
          return 'Quá nhiều yêu cầu. Vui lòng thử lại sau';
        case 500:
          return 'Lỗi máy chủ. Vui lòng thử lại sau';
        case 503:
          return 'Dịch vụ tạm thời không khả dụng';
        default:
          return error.message || 'Đã xảy ra lỗi không mong muốn';
      }
    }

    // It's a regular Error
    return error.message || 'Đã xảy ra lỗi không mong muốn';
  }

  static isNetworkError(error: ApiError | Error): boolean {
    return error.message.includes('Network Error') || 
           error.message.includes('timeout') ||
           ('code' in error && error.code === 'NETWORK_ERROR');
  }

  static isAuthError(error: ApiError | Error): boolean {
    return 'status' in error && (error.status === 401 || error.status === 403);
  }

  static showToast(error: ApiError | Error): void {
    const message = this.getErrorMessage(error);
    
    // You can integrate with toast libraries like react-hot-toast, react-toastify, etc.
    console.error(`Toast: ${message}`);
    
    // Example with react-hot-toast:
    // toast.error(message);
  }
}

export default ErrorHandler;