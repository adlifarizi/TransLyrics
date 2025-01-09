<template>
    <div class="flex flex-col mb-4 gap-4 w-full">
        <!-- Last Added Artist -->
        <div>
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('admin.lastAddedArtist')
                }}</p>

            <div v-if="loading">
                <AdminArtistCardShimmer />
            </div>

            <div v-else>
                <AdminArtistCard v-if="artist" :key="artist.id" :artist="artist" />
                <p v-else class="text-gray-500">{{ $t('error.artistNotAvailable') }}</p>
            </div>

        </div>

        <!-- Last Added Album -->
        <div>
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('admin.lastAddedAlbum') }}
            </p>

            <div v-if="loading">
                <AdminAlbumCardShimmer />
            </div>

            <div v-else>
                <AdminAlbumCard v-if="album" :key="album.id" :album="album" />
                <p v-else class="text-gray-500">{{ $t('error.albumNotAvailable') }}</p>
            </div>

        </div>

        <!-- Last Added Song -->
        <div>
            <p class="text-lg md:text-xl lg:text-2xl font-bold text-dark truncate mb-2">{{ $t('admin.lastAddedSong') }}
            </p>

            <div v-if="loading">
                <AdminSongCardShimmer />
            </div>

            <div v-else>
                <AdminSongCard v-if="song" :key="song.id" :song="song" />
                <p v-else class="text-gray-500">{{ $t('error.songNotAvailable') }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AdminArtistCard from '../../../shared/cards/AdminArtistCard.vue';
import AdminArtistCardShimmer from '../../../shared/cards/AdminArtistCardShimmer.vue';
import AdminAlbumCard from '../../../shared/cards/AdminAlbumCard.vue';
import AdminAlbumCardShimmer from '../../../shared/cards/AdminAlbumCardShimmer.vue';
import AdminSongCard from '../../../shared/cards/AdminSongCard.vue';
import AdminSongCardShimmer from '../../../shared/cards/AdminSongCardShimmer.vue';

// Define the props using `defineProps`
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    artist: {
        type: Object,
        required: false,
    },
    album: {
        type: Object,
        required: false,
    },
    song: {
        type: Object,
        required: false,
    },
});
</script>
