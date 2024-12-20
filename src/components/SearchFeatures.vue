<script setup lang="ts">
import { ref } from 'vue';


let languageInput = ref<string>("")
let starInput = ref<number>(0)
let isGoodIssuesInput = ref<boolean>(false)
let isHelpWantedInput = ref<boolean>(true)

defineExpose({
    languageInput,
    starInput,
    isGoodIssuesInput,
    isHelpWantedInput
})


</script>

<template>
    <div class="flex flex-wrap gap-7 justify-center items-center">
        <label class="form-control w-1/5">
            <div class="label">
                <span class="label-text-alt">Languages ( comma-separated )</span>
            </div>
            <input v-model="languageInput" type="text" placeholder="Java,C# ..." class="input input-bordered input-sm" />
            <div class="label">
            </div>
        </label>

        <label class="form-control w-1/12">
            <div class="label">
                <span class="label-text-alt">Stars ( >than )</span>
            </div>
            <input v-model="starInput" type="number" placeholder="0" class="input input-bordered input-sm" />
            <div class="label">
            </div>
        </label>

        <div class="form-control w-52">
            <label class="label cursor-pointer">
                <span class="label-text" :class="{'text-primary': isGoodIssuesInput}">Good First Issues</span>
                <input v-model="isGoodIssuesInput" type="checkbox" class="toggle toggle-primary " checked />
            </label>
        </div>
        <div class="form-control w-44">
            <label class="label cursor-pointer">
                <span class="label-text" :class="{'text-accent': isHelpWantedInput}">Help Wanted</span>
                <input v-model="isHelpWantedInput" type="checkbox" class="toggle toggle-accent" checked />
            </label>
        </div>
    </div>
</template>

<style scoped>
</style>