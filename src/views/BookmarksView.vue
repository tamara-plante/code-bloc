<script setup lang="ts">
import { useBookmarkStore } from '@/stores/bookmark';
import GitHubCard from '@/components/GitHubCard.vue';

const bookmarkStore = useBookmarkStore()

</script>

<template>
    <main class="flex flex-col justify-center w-full mb-7">
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 mx-7">
            <GitHubCard v-for="repo in bookmarkStore.getBookmarks()" :key="repo.id" :repo="repo" />
        </div>
    </main>
</template>

<style scoped>
</style>
