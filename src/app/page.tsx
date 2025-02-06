export const dynamic = "force-dynamic";

import { Metadata } from 'next';

import CallToAction from '@/components/home/call-to-action';
import FeaturedArtists from '@/components/home/featured-artists';
import Hero from '@/components/home/hero';
import NewlyAdded from '@/components/home/newly-added';

const siteUrl = process.env.NEXT_SITE_URL;
const siteName = process.env.NEXT_SITE_NAME

export const metadata: Metadata = {
  title: 'TransLyrics - Japanese Song Lyrics & Translations',
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

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedArtists />
      <NewlyAdded />
      <CallToAction />
    </div>
  );
}
