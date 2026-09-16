import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CVForge — ATS CV Builder Khusus Fresh Graduate',
  description:
    'Buat CV ATS-friendly profesional standar A4 khusus fresh graduate dan mahasiswa. 100% gratis, tanpa login/register, live preview real-time, dan siap download PDF.',
  keywords: [
    'CV ATS',
    'CV Fresh Graduate',
    'ATS Resume Builder',
    'CV Builder Indonesia',
    'Template CV ATS',
    'Download CV PDF A4',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">{children}</body>
    </html>
  );
}
