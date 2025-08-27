 
import { FastifyRequest } from "fastify";

export const jwtDecode = (request: FastifyRequest) => {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      // Decode JWT token (without verification for now)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const payload = JSON.parse(jsonPayload);

      return payload;
    } catch (error) {
      request.log.warn('Failed to parse JWT token for full name extraction', error);
    }
  }
}