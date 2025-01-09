<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="title" content="TransLyrics - Temukan Lirik dan Terjemahan Lagu Favorit Anda">
        <meta name="description" content="Translyrics - Platform terjemahan lirik lagu Jepang yang bisa dinyanyikan dalam Bahasa Indonesia, Inggris, dan Romaji">
        <meta name="keywords" content="lirik lagu, terjemahan lagu, TransLyrics, musik">
        <meta name="author" content="TransLyrics">

        <title>TransLyrics</title>

        <link rel="icon" href="{{ asset('storage/images/favicon.png') }}" type="image/png">

        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- Box Icons -->
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

        <!-- Styles / Scripts -->
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app"></div>

        @vite('resources/js/app.js')
    </body>
</html>
