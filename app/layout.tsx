import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import { GoogleAnalyticsTracking } from '@/components/ui/GoogleAnalytics';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalyticsTracking />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
