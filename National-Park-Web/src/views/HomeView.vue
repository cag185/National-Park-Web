<template>
  <div class="text-center">
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" @click="getParkData">
      Click here to load the dashboard
    </button>
  </div>
</template>

<script setup lang="ts">
// Create a method to load the park API data.
const getParkData = () => {
  // @todo - make API call.
  console.log('Calling API...')
}
</script>
