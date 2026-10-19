import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura-Fit — Your Fashion Assistant & Virtual Try-On',
  description:
    'Upload your photo, get personalized outfit recommendations, and try them on virtually with Aura-Fit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f7f5f2] text-dark-900 antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
