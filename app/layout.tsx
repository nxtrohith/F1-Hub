import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import PixelBlast from "@/components/PixelBlast";
import NavBar from "@/components/NavBar";
import ScrollToTop from "@/components/ScrollToTop";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 2026",
  description: "The Hub of 2026 F1 Season",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
        <NavBar />

  <div className="absolute inset-0 -z-10 min-h-screen">
    <PixelBlast
    variant="circle"
    pixelSize={6}
    color="#EE3F3F"
    patternScale={3}
    patternDensity={1.0}
    pixelSizeJitter={0.5}
    enableRipples
    rippleSpeed={0.4}
    rippleThickness={0.02}
    rippleIntensityScale={1.5}
    liquid={true}
    liquidStrength={0.12}
    liquidRadius={1.2}
    liquidWobbleSpeed={5}
    speed={0.6}
    edgeFade={0.25}
    transparent
  />
  </div>

        <main>
          {children}
        </main>
        <ScrollToTop />
      </body>
    </html>
  );
}
