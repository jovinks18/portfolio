import type { Metadata } from "next";
import { Fraunces, DM_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

// Cinematic display + UI fonts for the scroll experience
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-condensed",
});

// "Host Grotesk" isn't available via next/font on this Next version,
// so the UI font uses DM Sans (already loaded) under the grotesk variable.
const grotesk = DM_Sans({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Jovin Sivakumar",
  description:
    "Jovin Sivakumar — recent Berkeley Haas graduate working across customer, product, and operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${condensed.variable} ${grotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
