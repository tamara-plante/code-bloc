import type { Repo } from '@/components/GitHubCard.vue';
import { parseLinkHeader } from '@web3-storage/parse-link-header'
import type { Links } from '@web3-storage/parse-link-header'
import { useSearchStore } from '@/stores/search';

export const getRepos = async(searchValue: string): Promise<Repo[]> => {
    const queryString = 'q=' + encodeURIComponent(`${searchValue} in:name,description,topics license:MIT license:Apache-2.0 license:GPL-3.0 good-first-issues:>0`);

    const repos: Repo[] = await fetch(`https://api.github.com/search/repositories?${queryString}`)
        .then(res => {
            const searchStore = useSearchStore();
            const linkHeader = res.headers.get("Link")
            searchStore.clearLinks();

            if (linkHeader !== null) {
                const parsed = parseLinkHeader(linkHeader);
                // Save to store
                searchStore.addLinks(parsed);
            }
            return res;
        })
        .then(res => res.json())
        .then(res => res.items)
        .catch(err => console.log(err));
    return repos;
}

export const getReposByUrl = async(url: string): Promise<Repo[]> => {
    const searchStore = useSearchStore();

    const repos: Repo[] = await fetch(url)
        .then(res => {
            const linkHeader = res.headers.get("Link")
            searchStore.clearLinks();

            if (linkHeader !== null) {
                const parsed = parseLinkHeader(linkHeader);
                // Save to store
                searchStore.addLinks(parsed);
            }
            return res;
        })
        .then(res => res.json())
        .then(res => res.items)
        .catch(err => console.log(err));

    return repos;
}

//const getRepos = async(searchValue?: string, goodFirst?: number, helpWanted?: number, language?: string, stars?: number)
