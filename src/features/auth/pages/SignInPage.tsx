import { AuthLayout } from "../components/AuthLayout";
import { SignInForm } from "../components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <SignInForm />
    </AuthLayout>
  );
}
