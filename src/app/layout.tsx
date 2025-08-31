import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markhor Bots",
  description: "Markhor Bots is a Discord bot that helps you with your server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter}.variable} antialiased`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
