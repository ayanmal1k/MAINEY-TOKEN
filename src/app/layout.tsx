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
  title: "MAINEY | Premium Digital Experience",
  description: "A premium interactive web experience crafted with Next.js, Tailwind CSS, GSAP, and Framer Motion.",
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
