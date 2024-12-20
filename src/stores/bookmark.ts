import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Repo } from '@/components/GitHubCard.vue';


export const useBookmarkStore = defineStore('bookmark', {
    state: () => ({
        bookmarks: {} as Record<number,Repo>
    }),
    actions: {
        addBookmark(id: number, repo: Repo) {
            this.bookmarks[id] = repo;
        },
        removeBookmark(id: number) {
            if (id in this.bookmarks) {
                // remove
                delete this.bookmarks[id];
                return true;
            }
            return false;
        },
        updateBookmark(id: number) {

        },
        getBookmarks() {
            return {...this.bookmarks};
        }
    },
    persist: true,
})