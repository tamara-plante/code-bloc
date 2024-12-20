<script setup lang="ts">
import { computed, ref } from 'vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import ToggleInfo from '@/components/ToggleInfo.vue';
import ToggleBookmark from '@/components/ToggleBookmark.vue';
import { useBookmarkStore } from '@/stores/bookmark'

export interface Repo {
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

const bookmarkStore = useBookmarkStore();
const props = defineProps<{repo: Repo}>();
const repo = ref(props.repo);

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

function handleFavorite(isFavorite: boolean, repo: Repo) {
    repo.isFavorite = isFavorite;

    if (isFavorite) {
        // Add bookmark
        bookmarkStore.addBookmark(repo.id, repo);
    }
    else {
        bookmarkStore.removeBookmark(repo.id);
    }
}

function toggleCard(event: Event, repo: Repo) {
    console.log(event);

}

</script>

<template>
    <div class="card parent bg-neutral w-full shadow-xl">
        <div class="card-body">
            <div class="flex justify-between">
                <div class="badge badge-secondary mb-3">{{ repo.language ?? "Unknown" }}</div>
                <div class="flex items-center gap-4">
                    <a :href=repo.html_url target="_blank" rel="noopener" class="btn-toggle">
                        <i><IconGithub /></i>
                    </a>
                    <button class="btn-toggle" @click="toggleCard($event, repo)"><i><ToggleInfo /></i></button>
                    <ToggleBookmark :isFavorite="repo.isFavorite"  @isFavorite="handleFavorite($event, repo)" :class="{'btn-toggle': !repo.isFavorite}" />
                </div>
            </div>
            <h2 class="card-title mb-2">{{ repo.full_name }}</h2>
            <p>{{ repo.description }}</p>
            <div class="divider"></div>

            <div class="stats sm:stats-vertical md:stats-horizontal lg:stats-horizontal w-full shadow w-full mb-5">
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
    </div>
</template>

<style scoped>
.card:hover {
    /*border: 1px solid grey;*/
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    scale: 1.1;
    z-index: 5;
    background-color: rgba(184, 205, 245, 0.199);
    transition: scale 0.2s ease, background-color 0.5s ease;
    /*transition-delay: 0.2s;*/
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    scale: 1.3;
}
i svg {
    color: lightsteelblue;
}

.btn-toggle {
    opacity: 0;
}

.card:hover .btn-toggle {
    opacity: 1;
    transition: opacity 0.3s ease;
}

</style>