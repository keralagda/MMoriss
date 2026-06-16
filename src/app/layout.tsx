import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://munroemorris.com"),
  title: "Munroe Morris Service Villa | Luxury Backwater Resort in Munroe Island, Kerala",
  description: "Experience premium luxury at Munroe Morris Service Villa, nestled in the serene backwaters of Munroe Island, Kollam, Kerala. Enjoy authentic Ayurveda wellness, houseboat cruises, and traditional Kerala hospitality.",
  keywords: ["Munroe Morris", "Service Villa", "Munroe Island Resort", "Kollam Backwater Resort", "Kerala Luxury Villa", "Ayurveda Wellness Kerala", "Houseboat Cruise Kerala", "Munroe Island Homestay"],
  authors: [{ name: "Munroe Morris Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Munroe Morris Service Villa - Luxury Backwater Resort in Kerala",
    description: "Book your luxury stay at Munroe Morris Service Villa in Munroe Island, Kerala. Authentic Ayurveda, houseboat cruises, and premium accommodations.",
    url: "https://munroemorris.com",
    siteName: "Munroe Morris Service Villa",
    type: "website",
    images: [
      {
        url: "/images/birds-view.jpg",
        width: 1200,
        height: 800,
        alt: "Munroe Morris Service Villa Aerial View",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Munroe Morris Service Villa | Luxury Backwater Resort in Kerala",
    description: "Experience premium luxury at Munroe Morris Service Villa in Munroe Island, Kerala.",
    images: ["/images/birds-view.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let primaryColor = "";
  let secondaryColor = "";
  let favicon = "";
  
  try {
    const settings = await db.setting.findMany({
      where: {
        key: {
          in: ["primary_color", "secondary_color", "brand_favicon"]
        }
      }
    });
    
    settings.forEach(setting => {
      if (setting.key === "primary_color") primaryColor = setting.value;
      if (setting.key === "secondary_color") secondaryColor = setting.value;
      if (setting.key === "brand_favicon") favicon = setting.value;
    });
  } catch (error) {
    console.error("Failed to load layout branding settings:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {favicon && <link rel="icon" href={favicon} />}
        {(primaryColor || secondaryColor) && (
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              ${primaryColor ? `--primary: ${primaryColor} !important; --ring: ${primaryColor} !important;` : ""}
              ${secondaryColor ? `--secondary: ${secondaryColor} !important;` : ""}
            }
            .light {
              ${primaryColor ? `--primary: ${primaryColor} !important; --ring: ${primaryColor} !important;` : ""}
              ${secondaryColor ? `--secondary: ${secondaryColor} !important;` : ""}
            }
          `}} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
