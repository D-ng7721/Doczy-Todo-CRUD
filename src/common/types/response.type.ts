export type ResponseEntity<T> = {
  success: boolean;
  error?: string;
  data: T;
};
