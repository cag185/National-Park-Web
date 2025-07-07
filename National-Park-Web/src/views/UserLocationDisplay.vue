<template>
  <div class="card flex justify-end px-4 p-0">
    <Drawer v-model:visible="visible" position="right" class="w-80" modal dismissable>
      <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center bg-lime-700">
        <button
          class="pi pi-arrow-left p-2 rounded-lg bg-blue-500 text-white absolute left-0"
          @click="toggleVisible"
        ></button>
        <div class="text-3xl text-black pt-2 font-bold mb-4">{{ props.user.name }}'s Parks</div>
        <div class="text-2xl text-black font-bold">Want to Go's</div>
        <div v-for="location in newLocations" class="flex px-2">
          <div class="flex text-lg font-bold text-black">
            <span class="pi pi-map-marker mr-2"></span>
            {{ location.name }}
          </div>
        </div>

        <div class="text-2xl text-black font-bold">Been There's</div>
        <div v-for="location in oldLocations" class="flex px-2">
          <div class="flex text-lg font-bold text-black">
            <span class="pi pi-map-marker mr-2"></span>
            {{ location.name }}
          </div>
        </div>
      </div>
    </Drawer>

    <button
      v-if="!visible"
      class="pi pi-align-justify p-2 absolute top-3 right-3 rounded-lg bg-blue-500 text-white"
      @click="toggleVisible"
    ></button>
  </div>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import { User } from '@/models/User'
import { ref } from 'vue'

// Import the user from the main screen.
const props = defineProps<{
  user: User
}>()

const newLocations = ref<typeof props.user.newLocations>([])
const oldLocations = ref<typeof props.user.existingLocations>([])

// Initialize the locations with the user's new locations.
newLocations.value = props.user.newLocations
oldLocations.value = props.user.existingLocations

const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
}
</script>
