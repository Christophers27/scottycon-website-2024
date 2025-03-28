import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "@/components/header";
import { FavoritesProvider } from "@/context/favoritesContext";
import Footer from "@/components/footer";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScottyCon 2025",
  description: "Digital Booklet for ScottyCon 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased relative min-h-screen`}>
        <FavoritesProvider>
          <div className="fixed inset-0 -z-10">
            <Image
              src="/main-visual.png"
              alt="ScottyCon 2025"
              fill
              quality={75}
              className="object-cover"
            />
          </div>
          <Header />
          {children}
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
