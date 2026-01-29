import type { LoginResponse, LoginRequest, RegisterRequest, User } from '../types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // This is now handled directly in AuthContext
    throw new Error('Use AuthContext login method instead');
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    // This is now handled directly in AuthContext  
    throw new Error('Use AuthContext register method instead');
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    // Mock implementation
    return { message: 'Password reset email sent' };
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    // Mock implementation
    return { message: 'Password reset successful' };
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
};