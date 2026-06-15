import { AuthLayout } from "../components/AuthLayout";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Choose a secure password to keep your account safe"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
