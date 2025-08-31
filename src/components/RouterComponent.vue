<template>
  <div class="flex flex-row justify-start items-center space-x-4 p-4">
    <div
      class="flex space-y-2"
      v-for="page in computeAvailableRoutes"
      :key="page.name"
    >
      <router-link
        :to="{ name: page.name }"
        class="text-white text-2xl hover:text-blue-200"
      >
        {{ page.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from "@/stores/useLoggedInUserStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes();

import { computed } from "vue";

const computeAvailableRoutes = computed(() => {
  const userStore = useLoggedInUserStore();
  if (userStore.user) {
    // Create a new array for display, do not mutate routes
    const filteredRoutes = routes.filter((route) => route.name !== "Login");
    // Add a display-only Logout route (not a real RouteRecordNormalized)
    return [...filteredRoutes];
  } else {
    return [];
  }
});

onMounted(() => {
  console.log("Available routes:", computeAvailableRoutes.value);
});
</script>
