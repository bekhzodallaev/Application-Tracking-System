import { AuthLayout } from "../components/AuthLayout";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join AppTrackr to start tracking your career journey"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
