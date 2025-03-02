import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export const metadata: Metadata = {
  title: "e-CDNGradeMS",
  description: "Grading management system for Colegio De Naujan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans} ${geistMono} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}