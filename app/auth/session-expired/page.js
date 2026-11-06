import SessionExpiredPage from "@/authprocess/pages/AUTH_07_SessionExpired/SessionExpiredPage";

export const metadata = {
  title: "Session Expired | EMS Portal",
  description: "Session inactivity timeout notification and re-authentication.",
};

export default function Page() {
  return <SessionExpiredPage />;
}
