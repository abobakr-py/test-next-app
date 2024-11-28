export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginResponse {
  status: number;
  accessToken: string;
  user: object;
  message: string;
}
