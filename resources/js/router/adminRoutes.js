// src/router/adminRoutes.js
import axios from 'axios';

import Login from '../templates/admin/views/Login.vue';
import Dashboard from '../templates/admin/views/Dashboard.vue';
import ManageArtist from '../templates/admin/views/ManageArtist.vue';
import ArtistForm from '../templates/admin/views/ArtistForm.vue';
import ManageAlbum from '../templates/admin/views/ManageAlbum.vue';
import AlbumForm from '../templates/admin/views/AlbumForm.vue';
import ManageSong from '../templates/admin/views/ManageSong.vue';
import SongForm from '../templates/admin/views/SongForm.vue';
import LyricsEditor from '../templates/admin/views/LyricsEditor.vue';
import ManageComment from '../templates/admin/views/ManageComment.vue';

// Helper function for authentication and authorization
const authGuard = (to, from, next) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return next({ name: 'Login' });
    }

    axios.get('/api/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.data.success && response.data.data.is_admin) {
                return next();
            } else {
                localStorage.removeItem('token');
                return next({ name: 'Login' });
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
            return next({ name: 'Login' });
        });
};

const adminRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/artists',
        name: 'ManageArtist',
        component: ManageArtist,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/artists/add',
        name: 'AddArtist',
        component: ArtistForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/artists/edit/:id',
        name: 'EditArtist',
        component: ArtistForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/albums',
        name: 'ManageAlbum',
        component: ManageAlbum,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/albums/add',
        name: 'AddAlbum',
        component: AlbumForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/albums/edit/:id',
        name: 'EditAlbum',
        component: AlbumForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/songs',
        name: 'ManageSong',
        component: ManageSong,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/songs/add',
        name: 'AddSong',
        component: SongForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/songs/edit/:id',
        name: 'EditSong',
        component: SongForm,
        beforeEnter: authGuard,
    },
    {
        path: '/admin/songs/lyrics/:id',
        name: 'LyricsEditor',
        component: LyricsEditor,
        beforeEnter: authGuard,
    },

    {
        path: '/admin/comments',
        name: 'ManageComment',
        component: ManageComment,
        beforeEnter: authGuard,
    },
];

export default adminRoutes;