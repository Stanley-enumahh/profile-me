import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { TopNav } from "@/components/topNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile Me",
  description: "Create and share your personal profile page easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#001C37]`}>
        {" "}
        <Providers>
          <TopNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
