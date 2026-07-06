import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const kiro = localFont({
  src: "../../public/assets/fonts/kiro/Kiro W03 Bold/Kiro W03 Bold.ttf",
  variable: "--font-kiro-local",
  display: "swap",
});

const jakobenz = localFont({
  src: "../../public/assets/fonts/Jakobenz Font/jakobenz-51lq8.otf",
  variable: "--font-jakobenz-local",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "MAINEY ($MAIN) | The Most Chill Capybara on Solana",
  description: "Welcome to the home of MAINEY ($MAIN), the most chill capybara meme coin on Solana. Discover our fair launch, LP locked tokenomics, roadmap, and join our active community.",
  keywords: ["MAINEY", "MAINEY Capybara", "Solana", "Meme coin", "$MAIN", "Community Token", "Solana memes", "Capybara coin", "Raydium Solana"],
  authors: [{ name: "MAINEY Community" }],
  creator: "MAINEY Community",
  publisher: "MAINEY Community",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MAINEY ($MAIN) | The Most Chill Capybara on Solana",
    description: "Welcome to the home of MAINEY ($MAIN), the most chill capybara meme coin on Solana. 0% taxes, 100% locked LP, and pure community vibes!",
    url: "/",
    siteName: "MAINEY",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "MAINEY Logo - The Most Chill Capybara on Solana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MAINEY ($MAIN) | The Most Chill Capybara on Solana",
    description: "Welcome to the home of MAINEY ($MAIN), the most chill capybara meme coin on Solana. 0% taxes, 100% locked LP, and pure community vibes!",
    images: ["/logo.png"],
    creator: "@MAINEYTHECAPY",
    site: "@MAINEYTHECAPY",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable} ${kiro.variable} ${jakobenz.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block" />
      </head>
      <body className="antialiased selection:bg-brand-orange selection:text-white bg-background text-foreground min-h-screen font-sans">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
