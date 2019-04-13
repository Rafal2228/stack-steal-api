export interface StackResponse<T> {
  has_more: boolean;
  items: T;
  quota_max: number;
  quota_remaining: number;
}
