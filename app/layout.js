import "./globals.css";

export const metadata = {
  title: "EMS - Enterprise Management System",
  description: "Enterprise Identity, Role-based Access, and Analytics Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
