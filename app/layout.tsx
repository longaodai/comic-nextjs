import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
