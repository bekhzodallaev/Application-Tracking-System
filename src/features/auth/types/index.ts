
export type FieldErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type AuthFormState =
  | { errors: FieldErrors }
  | { success: boolean; message?: string }
  | undefined;

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string | string[];
}
