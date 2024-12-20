<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import SearchBar from '@/components/SearchBar.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import SearchFeatures from '@/components/SearchFeatures.vue';

export interface SearchValues {
    search?: string;
    language?: string;
    star?: string;
    isGoodIssues?: boolean;
    isHelpWanted?: boolean;
}

const searchFeaturesRef = useTemplateRef("search-features-ref")

const searchValues = ref<SearchValues>({})
const search = ref<string>("")
let language = ref<string>("")
const star = ref<number>(0)
const isGoodIssues = ref<boolean>(false)
const isHelpWanted = ref<boolean>(false)

function handleSearch(searchValue: string) {
    search.value = searchValue
    // Real search submit
    const searchFeatures = searchFeaturesRef.value;
    if (searchFeatures) {
        language.value = searchFeatures.languageInput
        star.value = searchFeatures.starInput
        isGoodIssues.value = searchFeatures.isGoodIssuesInput
        isHelpWanted.value = searchFeatures.isHelpWantedInput
    }
}
function handleLanguage(languageValue: string) {
    language.value = languageValue
}
function handleStar(starValue: number) {
    star.value = starValue
}
function handleGoodIssues(goodIssues: boolean) {
    isGoodIssues.value = goodIssues
}
function handleHelpWanted(helpWanted: boolean) {
    isHelpWanted.value = helpWanted
}

</script>

<template>
  <main class="flex flex-col items-center justify-center w-fullmb-7">
    <div class="mb-7 flex flex-col justify-center h-48 w-full my-7">
        <SearchBar @searchValue="handleSearch" class="mb-6" />
        <SearchFeatures ref="search-features-ref" />
    </div>

    <Suspense>
        <InfiniteScroll :search="search" :language="language" :star="star" :goodIssues="isGoodIssues" :helpWanted="isHelpWanted" />
        <template #fallback><p>Loading...</p></template>
    </Suspense>
    <!--<div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-7 mx-7">
        <GitHubCard v-for="repo in result" :key="repo.id" :repo="repo" />-->
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
    <!--</div>-->
  </main>
</template>

<style scoped>


</style>
