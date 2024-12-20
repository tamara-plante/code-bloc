<script setup lang="ts">
import { ref } from 'vue';
import getUsers from "@/api/getUsers.ts";
import { useInfiniteScroll } from '@vueuse/core';

const listEl = ref(null);

const usersToShow = 15;

const usersList = ref(await getUsers(usersToShow, 0));

const fetchingData = ref<boolean>(false);

const getUsersOnScroll = async() => {
    try {
        fetchingData.value = true;
        const newUsers = await getUsers(usersToShow, usersList.value.length);
        usersList.value.push(...newUsers);
        fetchingData.value = false;

    }
    catch (err) {
        console.log(err);
    }
}

useInfiniteScroll(
    listEl,
    async () => {
        await getUsersOnScroll();
    },
    { distance: 10 }
)

</script>

<template>
    <div>
        <ul ref="listEl">
            <li v-for="user in usersList">
                {{ user.firstName }}
            </li>
            <p v-show="fetchingData">
                Fetching more!!
            </p>
        </ul>
    </div>
</template>

<style scoped>
</style>