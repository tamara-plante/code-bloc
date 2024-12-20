<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import ToggleBookmark from '@/components/ToggleBookmark.vue';
import GitHubCard from '@/components/GitHubCard.vue';

interface Repo {
    id: number;
    full_name: string;
    description: string;
    language: string;
    html_url: string;
    forks_count: number;
    open_issues_count: number;
    stargazers_count: number;
    watchers_count: number;
    updated_at: string;
    license: {
        name: string;
    };
    isFavorite: boolean;
}

const result = ref<Repo[]>([]);


function handleSearch(searchValue: string) {
    const queryString = 'q=' + encodeURIComponent(`${searchValue} license:MIT license:Apache-2.0 license:GPL-3.0 good-first-issues:>0`);
    fetch(`https://api.github.com/search/repositories?${queryString}`)
        .then(res => {
            console.log(res.headers.get("Link"))
            return res;
        })
        .then(res => res.json())
        .then(res => {
            console.log("rest", res)
            result.value = res.items
            console.log("test", result.value)
        })
}

const numbers = (current: number) => computed(() => {
    let newNumber = current.toString();
    if (current > 999) {
        newNumber = (current / 1000).toFixed(1) + "K";
    }
    return newNumber;
})
const dates = (current: string) => computed(() => {
    const date = new Date(current);
    return date.toLocaleDateString();
})

</script>

<template>
  <main class="flex flex-col justify-center w-full mb-7">
    <div class="mb-7 flex justify-center h-32">
        <SearchBar @searchValue="handleSearch" />
    </div>

    <!--
    <main>
        <h1>Infinite scrolling</h1>
        <Suspense>
            <InfiniteScroll />
            <template #fallback><p>Loading...</p></template>
        </Suspense>
        <p>Made with lalala</p>
    </main>-->

    <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-7 mx-7">
        <GitHubCard v-for="repo in result" :key="repo.id" :repo="repo" />
        <!--<div v-for="repo in result" class="card parent bg-neutral w-full shadow-xl">
            <div class="card-body">
                <div class="flex justify-between">
                    <div class="badge badge-secondary mb-3">{{ repo.language ?? "Unknown" }}</div>
                    <div class="flex items-center gap-4">
                        <a :href=repo.html_url target="_blank" rel="noopener" class="btn-toggle">
                            <i><IconGithub /></i>
                        </a>
                        <ToggleBookmark @isFavorite="repo.isFavorite = $event" :class="{'btn-toggle': !repo.isFavorite}" />
                    </div>
                </div>
                <h2 class="card-title mb-2">
                {{ repo.full_name }}
                </h2>
                <p>{{ repo.description }}</p>
                <div class="divider"></div>
                <div class="stats stats-vertical lg:stats-horizontal shadow w-full mb-5">

                    <div class="stat place-items-center">
                        <div class="stat-title text-primary">Stargazers</div>
                        <div class="stat-value text-primary">{{ numbers(repo.stargazers_count) }}</div>
                    </div>

                    <div class="stat place-items-center">
                        <div class="stat-title text-accent">Open Issues</div>
                        <div class="stat-value text-accent">{{ numbers(repo.open_issues_count) }}</div>
                    </div>

                    <div class="stat place-items-center">
                        <div class="stat-title">Forks</div>
                        <div class="stat-value">{{ numbers(repo.forks_count) }}</div>
                    </div>
                </div>
                <div class="card-actions justify-between items-end">
                    <div class="badge badge-outline-neutral">{{ repo.license.name }}</div>
                    <div class="badge badge-outline-neutral">{{ dates(repo.updated_at) }}</div>
                </div>
            </div>
        </div>-->
    </div>
  </main>
</template>

<style scoped>


</style>
