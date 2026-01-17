export interface Option {
  label: string;
  value: string | number;
  [key: string]: any; // Allow extra data
}
