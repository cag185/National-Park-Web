<template>
  <div class="py-4 text-5xl mb-4 text-white text-center">
    You have been logged out.
  </div>
</template>

<script setup lang="ts">
import { useLoggedInUserStore } from "@/stores/useLoggedInUserStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

console.log("Logging out...");

onMounted(() => {
  //load in the user store.
  const userStore = useLoggedInUserStore();
  // Clear the user data.
  userStore.clearUser();
  // Redirect to login page.
  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 2000);
});
</script>
