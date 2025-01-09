<template>
    <div class="w-full py-4 bg-transparent px-4 md:px-6 lg:px-8 xl:px-10">

        <!-- Container -->
        <div class="flex flex-col lg:flex-row gap-6">

            <!-- Left (Stats Overview, Last Added Section) -->
            <div class="w-full">
                <SectionStatsOverview :loading="loading" :artistsCount="lastAddedArtists.length"
                    :albumsCount="lastAddedAlbums.length" :songsCount="lastAddedSongs.length" />
                <SectionLastAdded :loading="loading" :artist="lastAddedArtists[0]" :album="lastAddedAlbums[0]"
                    :song="lastAddedSongs[0]" />
            </div>

            <!-- Right (Rankings & Comments) -->
            <div class="w-full">
                <SectionRanking :artists="artistRanking" :albums="albumRanking" :songs="songRanking" />
                <SectionLatestComment :comments="comments" />
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import SectionStatsOverview from './SectionStatsOverview.vue';
import SectionLastAdded from './SectionLastAdded.vue';
import SectionRanking from './SectionRanking.vue';
import SectionLatestComment from './SectionLatestComment.vue';

const lastAddedArtists = ref([]);
const lastAddedAlbums = ref([]);
const lastAddedSongs = ref([]);
const artistRanking = ref([]);
const albumRanking = ref([]);
const songRanking = ref([]);
const comments = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    try {
        loading.value = true;
        error.value = null;

        const endpoints = [
            { key: 'lastAddedArtists', url: '/api/admin/artists?sort_by=newest' },
            { key: 'lastAddedAlbums', url: '/api/admin/albums?sort_by=newest' },
            { key: 'lastAddedSongs', url: '/api/admin/songs?sort_by=newest' },
            { key: 'artistRanking', url: '/api/admin/artists?sort_by=views' },
            { key: 'albumRanking', url: '/api/admin/albums?sort_by=views' },
            { key: 'songRanking', url: '/api/admin/songs?sort_by=views' },
            { key: 'comments', url: '/api/admin/comments?sort_by=newest' },
        ];

        const token = localStorage.getItem('token');
        const requests = endpoints.map(endpoint =>
            axios.get(endpoint.url, { headers: { Authorization: `Bearer ${token}` } })
        );

        const responses = await Promise.all(requests);

        responses.forEach((response, index) => {
            const { key } = endpoints[index];
            if (response.status === 200 && response.data.success) {
                // Update the corresponding ref based on the key
                if (key === 'lastAddedArtists') lastAddedArtists.value = response.data.data;
                if (key === 'lastAddedAlbums') lastAddedAlbums.value = response.data.data;
                if (key === 'lastAddedSongs') lastAddedSongs.value = response.data.data;
                if (key === 'artistRanking') artistRanking.value = response.data.data;
                if (key === 'albumRanking') albumRanking.value = response.data.data;
                if (key === 'songRanking') songRanking.value = response.data.data;
                if (key === 'comments') comments.value = response.data.data;
            }
        });
    } catch (err) {
        error.value = 'Error fetching data';
    } finally {
        loading.value = false;
    }
};

// Call fetchData when the component is mounted
onMounted(fetchData);
</script>
