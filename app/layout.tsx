import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "@/components/header";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScottyCon 2024",
  description: "Digital Booklet for ScottyCon 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-scottycon-background`}>
        <Image
          src="/scottyconBackground.png"
          alt="ScottyCon 2024 Background"
          fill={true}
          quality={95}
          priority={true}
          className="z-[-999] object-cover" // Set the z-index to extremely low value so it's always in the background
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
