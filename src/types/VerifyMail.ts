export interface VerifyMailFormData {
  email: string;
  otp: string;
}
export interface VerifyMailResponse {
  status: number;
  accessToken: string;
  user: object;
  message: string;
}
