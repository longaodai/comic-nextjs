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
      <head>
        <meta
          name="google-site-verification"
          content="YIPcCFWAgu_AWHcZ1_q1L_a2NSP6ES3KFU3lFYZFrys"
        />
      </head>
      <GoogleAnalyticsTracking />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
