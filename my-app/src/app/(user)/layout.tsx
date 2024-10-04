import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css"
import MainBtn from "@/components/MainBtn";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin']})
export const metadata: Metadata = {
  title: "Orebi Store",
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
        className={`${inter.className} relative`}
      >
        <Navbar />
        <MainBtn />
        {children}
        <Footer />
      </body>
    </html>
  );
}
