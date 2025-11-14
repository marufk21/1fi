import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Fi - Featured Smartphones",
  description: "Explore the latest smartphones with EMI plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:py-12 xl:px-12">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
