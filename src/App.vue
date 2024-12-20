<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="h-32 mb-5">
            <div class="flex justify-center">
                <div class="circle"><img src="@/assets/code-bloc-white.png" alt="code bloc logo"></div>
            </div>
            <div class="wrapper">
                <nav class="flex justify-center gap-9 pb-5">
                    <RouterLink to="/" active-class="text-secondary underline">Home</RouterLink>
                    <RouterLink to="/bookmarks" active-class="text-secondary underline">Bookmarks</RouterLink>
                    <RouterLink to="/about" active-class="text-secondary underline">About</RouterLink>
                </nav>
            </div>
        </header>

        <RouterView class="router-view flex-1" v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </div>
</template>

<style scoped>

header img {
    width: 80%;
    max-width: 300px;
    margin: auto;
}

nav a {
    font-size: 1rem;
}

.circle {
    background-color: black;
    height: 90px;
    width: 150px;
    border-radius: 0 0 90px 90px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
