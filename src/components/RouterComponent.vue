<template>
  <div class="flex flex-row justify-start items-center space-x-4 p-4">
    <div class="flex space-y-2" v-for="page in pageNames" :key="page.name">
      <router-link
        :to="{ name: page.name }"
        class="text-white text-3xl hover:text-blue-200"
      >
        {{ page.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes();

const pageNames = routes;

onMounted(() => {
  console.log("Available routes:", routes);
});
</script>
