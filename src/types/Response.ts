export interface ApiResponse<data> {
  status: number;
  message: string;
  data: data;
}
