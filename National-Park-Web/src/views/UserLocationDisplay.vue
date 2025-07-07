<template>
  <div class="card flex justify-end p-4">
    <Drawer :visible="visible" class="bg-white" position="right">
      <template v-if="visible">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </template>
    </Drawer>
    <button class="pi pi-arrow-right p-2 rounded-lg bg-blue-500 text-white" @click="toggleVisible">
      <!-- <span class="pi pi-arrow-right"></span> -->
    </button>
  </div>
</template>

<script setup lang="ts">
// imports.
import Drawer from 'primevue/drawer'
import { ref } from 'vue'

// create a var for holding the state of the drawer.
const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
}
</script>
