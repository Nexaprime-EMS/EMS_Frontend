import OtpVerificationPage from "@/authprocess/pages/AUTH_04_OTPVerification/OtpVerificationPage";

export const metadata = {
  title: "OTP Verification | EMS Portal",
  description: "Verify your one-time authentication code for secure sign in.",
};

export default function Page() {
  return <OtpVerificationPage />;
}
