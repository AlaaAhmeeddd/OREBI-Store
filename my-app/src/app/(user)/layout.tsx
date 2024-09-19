import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin']})
export const metadata: Metadata = {
  title: "OREBI Store",
  description: "Your trusted online shopping store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
