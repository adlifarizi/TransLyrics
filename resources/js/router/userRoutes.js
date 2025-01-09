// src/router/userRoutes.js
import Home from '../templates/user/views/Home.vue';
import Artists from '../templates/user/views/Artists.vue';
import Albums from '../templates/user/views/Albums.vue';
import Songs from '../templates/user/views/Songs.vue';
import ArtistDetail from '../templates/user/views/ArtistDetail.vue';
import AlbumDetail from '../templates/user/views/AlbumDetail.vue';
import SongDetail from '../templates/user/views/SongDetail.vue';
import Search from '../templates/user/views/Search.vue';
import About from '../templates/user/views/About.vue';
import NotFound from '../templates/user/views/NotFound.vue';

const userRoutes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/artists', name: 'Artists', component: Artists },
    { path: '/albums', name: 'Albums', component: Albums },
    { path: '/songs', name: 'Songs', component: Songs },
    { path: '/artists/:id/:slug', name: 'ArtistDetail', component: ArtistDetail },
    { path: '/albums/:id/:slug', name: 'AlbumDetail', component: AlbumDetail },
    { path: '/songs/:id/:slug', name: 'SongDetail', component: SongDetail },
    { path: '/search', name: 'Search', component: Search },
    { path: '/about', name: 'About', component: About },
    { path: '/:pathMatch(.*)*', name: 'Not Found', component: NotFound },
];

export default userRoutes;
