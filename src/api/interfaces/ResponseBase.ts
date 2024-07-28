export interface ResponseBase<T> {
  data: T;
  status: number;
  message: string;
}