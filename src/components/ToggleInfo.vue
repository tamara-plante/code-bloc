<script setup lang="ts">
import { ref } from 'vue';
import IconInfoOff from './icons/IconInfoOff.vue';
import IconInfoOn from './icons/IconInfoOn.vue';

const emit = defineEmits(["isActive"])

const isActive = ref<boolean>(false);

function handleToggle() {
    isActive.value = !isActive.value;
    emit("isActive", isActive.value)
}

</script>

<template>
    <button type="button" @click="handleToggle">
        <IconInfoOn v-if="isActive" />
        <IconInfoOff v-else />
    </button>
</template>

<style scoped>
button svg {
    color: lightsteelblue;
    scale: 1.1;
}
</style>