@php echo '<'.'?'.'xml version="1.0" encoding="UTF-8"?>'."\n"; @endphp
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ config('app.url') }}</loc>
        <lastmod>{{ Carbon\Carbon::now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ config('app.url') }}/artists</loc>
        <lastmod>{{ Carbon\Carbon::now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ config('app.url') }}/albums</loc>
        <lastmod>{{ Carbon\Carbon::now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ config('app.url') }}/songs</loc>
        <lastmod>{{ Carbon\Carbon::now()->toIso8601String() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    @foreach ($artists as $artist)
    <url>
        <loc>{{ config('app.url') }}/artists/{{ $artist->id }}/{{ $artist->slug }}</loc>
        <lastmod>{{ $artist->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    @endforeach
    @foreach ($albums as $album)
    <url>
        <loc>{{ config('app.url') }}/albums/{{ $album->id }}/{{ $album->slug }}</loc>
        <lastmod>{{ $album->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    @endforeach
    @foreach ($songs as $song)
    <url>
        <loc>{{ config('app.url') }}/songs/{{ $song->id }}/{{ $song->slug }}</loc>
        <lastmod>{{ $song->updated_at->toIso8601String() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    @endforeach
</urlset>