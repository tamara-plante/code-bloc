<script setup lang="ts">
import { ref, watch, type ComponentObjectPropsOptions } from 'vue';
import GitHubCard from './GitHubCard.vue';
import type { Repo } from './GitHubCard.vue';
import { getRepos, getReposByUrl } from '@/api/getRepos';
import { useBookmarkStore } from '@/stores/bookmark';
import { useSearchStore } from '@/stores/search';
import { useInfiniteScroll } from '@vueuse/core';
import type { SearchValues } from '@/views/HomeView.vue';
import IconUpArrow from './icons/IconUpArrow.vue';

const props = defineProps<{search: string, language: string, star: number, goodIssues: boolean, helpWanted: boolean}>()
const searchValue = ref<string>("");

const bookmarkStore = useBookmarkStore();
const bookmarks = bookmarkStore.getBookmarks();
const searchStore = useSearchStore();

const result = ref<Repo[]>([])
const fetchingData = ref<boolean>(false);

watch(() => props.search, async (newValue, oldValue) => {
    console.log("Watch search", newValue);
    searchStore.clearLinks()
    searchValue.value = newValue;
    result.value = await handleSearch()
})

const handleSearch = async(): Promise<Repo[]> => {
    console.log("Search", props.search);
    const repos = await getRepos(props.search, props.language, props.star, props.goodIssues, props.helpWanted);
    repos.filter(i => i.isFavorite = i.id in bookmarks)
    return repos;
}

defineExpose({handleSearch})

const getReposOnScroll = async() => {
    const next = searchStore.getNext()
    fetchingData.value = true;

    if (next) {
        try {
            const repos = await getReposByUrl(next.url);
            repos.filter(i => i.isFavorite = i.id in bookmarks)
            result.value.push(...repos);
        }
        catch (err) {
            console.log(err);
        }
    }
    fetchingData.value = false;
}

useInfiniteScroll(
    document,
    async () => {
        if (searchValue.value !== "" && !fetchingData.value && searchStore.hasNext()){
            console.log("Trying to fetch more...");
            await getReposOnScroll();
        }
    },
    { distance: 20 }
)
</script>

<template>
    <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 mx-7">
        <GitHubCard v-for="repo in result" :key="repo.id" :repo="repo" />
    </div>
    <div v-show="fetchingData" class="flex justify-center h-32">
        <span class="loading loading-dots loading-lg text-info"></span>
    </div>
    <div class="flex justify-center items-center" v-show="result.length > 10" id="to-top">
        <a href="#top"><IconUpArrow /></a>
    </div>
</template>

<style scoped>
.loading {
    scale: 1.5;
}
#to-top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    z-index: 20;
    background-color: rgb(0, 0, 0);
}
#to-top:hover {
    background-color:rgb(40, 81, 136);
    transition: background-color 0.3s ease;
}
#to-top svg {
    scale: 1.3;
}
</style>