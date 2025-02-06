import type { Metadata } from "next";
import { Roboto, Maven_Pro } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top-button";

import "./globals.css";

const siteUrl = process.env.NEXT_SITE_URL;
const siteName = process.env.NEXT_SITE_NAME

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-maven",
});

export const metadata: Metadata = {
  title: {
    template: '%s | TransLyrics - Japanese Song Lyrics & Translations',
    default: 'TransLyrics - Japanese Song Lyrics & Translations',
  },
  description: 'Discover Japanese songs with accurate lyrics and translations to English, Romaji, and Indonesian. Explore albums, artists, and songs with detailed information on TransLyrics.',
  openGraph: {
    title: 'TransLyrics - Japanese Song Lyrics & Translations',
    description: 'Find Japanese songs, artists, and albums with lyrics and translations into English, Romaji, and Indonesian. TransLyrics brings the beauty of Japanese music closer to you.',
    url: `${siteUrl}`,
    siteName: `${siteName}`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TransLyrics - Japanese Song Lyrics & Translations',
    description: 'Explore Japanese music with lyrics and translations in multiple languages. Find your favorite songs, albums, and artists on TransLyrics.',
  },
  metadataBase: new URL(`${siteUrl}`)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
      </head>
      <body className={`${roboto.variable} ${mavenPro.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
