import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InstallPrompt from "@/components/install";
import OfflineDisplay from "@/components/offlineDisplay";

const quicksand = Quicksand({ subsets: ["latin"] });

const APP_NAME = "ScottyCon 2024";
const APP_DEFAULT_TITLE = "ScottyCon 2024";
const APP_TITLE_TEMPLATE = "%s | ScottyCon 2024";
const APP_DESCRIPTION = "Digital Booklet for ScottyCon 2024";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#CFE7E4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} bg-scottycon-background min-h-screen flex flex-col`}
      >
        <Image
          src="/images/scottyconBackground.png"
          alt="ScottyCon 2024 Background"
          fill={true}
          quality={95}
          priority={true}
          className="z-[-999] object-cover" // Set the z-index to extremely low value so it's always in the background
        />
        <InstallPrompt />
        <Header />
        <OfflineDisplay />
        {children}
        <Footer />
      </body>
    </html>
  );
}
