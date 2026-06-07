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
  title: "Z.ai Code Scaffold - AI-Powered Development",
  description: "Modern Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Z.ai Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
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
