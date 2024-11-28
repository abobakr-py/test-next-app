export interface FetchProfileResponse {
  status: number;
  id: string;
  cover_photo: string;
  profile_photo: string;
  username: string;
  phone: string;
  email: string;
  certificate_name: string;
  countryCode: string;
}
export interface EditProfileResponse {
  status: number;
  message: string;
  data: object;
}
export interface AllData {
  email: string;
  phone: string;
  username: string;
  countryCode?: string;
  certificate_name?: string;
}
export interface EditProfileFormData {
  data: any;
  profile_photo?: any;
}
export interface ChangePasswordFormData {
  oldPassword: string;
  password: string;
  repeatPassword: string;
}
export interface ChangePasswordResponse {
  status: number;
  message: string;
}
