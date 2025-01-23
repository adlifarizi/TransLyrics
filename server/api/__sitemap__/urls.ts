import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

interface Artist {
    id: string
    slug: string
}

interface Album {
    id: string
    slug: string
}

interface Song {
    id: string
    slug: string
}

export default defineSitemapEventHandler(async () => {
    try {
        const config = useRuntimeConfig()
        const backendApiUrl = config.public.backendApiUrl

        // Lakukan request paralel untuk artists, albums, dan songs
        const [artistsResponse, albumsResponse, songsResponse] = await Promise.all([
            $fetch<{ data: Artist[] }>(`${backendApiUrl}/artists`),
            $fetch<{ data: Album[] }>(`${backendApiUrl}/albums`),
            $fetch<{ data: Song[] }>(`${backendApiUrl}/songs`),
        ])

        const artists = artistsResponse.data
        const albums = albumsResponse.data
        const songs = songsResponse.data

        // Buat sitemap untuk setiap kategori
        const artistUrls: SitemapUrlInput[] = artists.map((item) => ({
            loc: `/artists/${item.id}/${item.slug}`,
            _sitemap: 'artists',
        }))

        const albumUrls: SitemapUrlInput[] = albums.map((item) => ({
            loc: `/albums/${item.id}/${item.slug}`,
            _sitemap: 'albums',
        }))

        const songUrls: SitemapUrlInput[] = songs.map((item) => ({
            loc: `/songs/${item.id}/${item.slug}`,
            _sitemap: 'songs',
        }))

        // Gabungkan semua URL
        const sitemapUrls = [...artistUrls, ...albumUrls, ...songUrls]

        return sitemapUrls
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return []
    }
})
