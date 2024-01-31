export type AuthForm = {
  email: string;
  password: string;
  username: string;
};

export type AuthFormState = {
  isAuthFormOpen: boolean;
  errorMessage: string | undefined;
  purpose: AuthPurpose | null;
} & AuthForm;

export type AuthPurpose = "log" | "register";
