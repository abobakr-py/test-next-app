export interface ResetPasswordFormData {
  emailOrPhone: string;
  otp: string;
  password: string;
  repeatPassword: string;
}
export interface ResetPasswordResponse {
  status: number;
  message: string;
}
