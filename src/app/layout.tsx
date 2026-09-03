import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus Finder - Find the Right College & Stay for Your Future",
  description:
    "Discover verified colleges, fee structures, verified placement packages, campus facilities, authentic reviews, and student accommodations (hostels & PGs) in Mangalore & Karnataka.",
  keywords: [
    "College discovery",
    "Mangalore colleges",
    "NITK Surathkal",
    "St Aloysius",
    "Yenepoya University",
    "Engineering colleges",
    "Medical colleges",
    "Hostels in Mangalore",
    "PGs in Mangalore",
    "Education counsellor",
  ],
  authors: [{ name: "Campus Finder Education Team" }],
  openGraph: {
    title: "Campus Finder - Find the Right College for Your Future",
    description:
      "Explore colleges, courses, fees, placements, reviews and verified accommodation in Mangalore.",
    type: "website",
    locale: "en_IN",
    siteName: "Campus Finder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}
