export interface ErrorState {
  username: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
}
export interface SignUpFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
}
export interface SignUpResponse {
  status: number;
  accessToken: string;
  message: string;
}
