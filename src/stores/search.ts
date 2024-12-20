import { defineStore } from 'pinia'
import type { Links } from '@web3-storage/parse-link-header'

export const useSearchStore = defineStore('search', {
    state: () => ({
        search: null as Links | null
    }),
    actions: {
        addLinks(links: Links | null) {
            this.search = links
        },
        clearLinks() {
            this.search = null
        },
        getNext() {
            if (this.search && "next" in this.search) {
                return this.search.next;
            }
            return null;
        },
        hasNext() {
            return this.search && "next" in this.search;
        }
    },
    persist: false,
})