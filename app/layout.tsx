import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './comp/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Software Cost Estimator',
  description: 'This is a software cost estimator SaaS tool created by Mary Ogedengbe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.className} bg-lime-950`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
