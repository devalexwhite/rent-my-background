import LogoImage from "../components/logoImage";

export default function SignupConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center min-w-screen">
      <LogoImage className="h-20 mb-8 w-auth" />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        You've got mail!
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Check your email for a confirmation to finish logging in.
      </p>
    </div>
  );
}
