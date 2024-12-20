<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const emit = defineEmits(["searchValue"])
const searchInput = useTemplateRef("searchInput")

const focused = ref(false)
const searchValue = ref("")

function search() {
    emit("searchValue", searchValue.value)
    searchValue.value = ""
}

function reset() {
    searchValue.value = ""
    searchInput.value?.focus()
}

</script>
<template>
    <form @submit.prevent="search" @reset="reset">
        <div class="join">
            <label class="input input-bordered flex min-w-72 w-96 items-center gap-2 join-item" :class="focused && 'input-secondary'">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70">
                    <path
                    fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd" />
                </svg>
                <input 
                    ref="searchInput"
                    v-model.trim="searchValue" 
                    @focus="focused = true" 
                    @blur="focused = false" 
                    type="text" 
                    class="grow" 
                    placeholder="Search open-source repos..."
                />
                <button type="reset" class="badge badge-neutral" v-if="searchValue">clear</button>
            </label>
            <button 
                type="submit" 
                class="btn btn-secondary btn-outline join-item" 
                :disabled="!focused && !searchValue"
            >
                Search
            </button>
        </div>
    </form>
</template>