<template>
  <div class="card flex justify-end px-4 p-0">
    <Drawer
      v-model:visible="visible"
      position="right"
      class="w-80"
      modal
      dismissable
    >
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center"
      >
        <button
          class="pi pi-arrow-left p-2 rounded-lg bg-blue-500 text-white absolute left-0"
          @click="toggleVisible"
        ></button>
        <div class="text-3xl text-white pt-2 font-bold mb-4">
          {{ props.user.name }}'s Parks
        </div>
        <div class="text-2xl text-lime-600 font-bold">Want to Go's</div>
        <div
          v-for="location in newLocations"
          :key="location.id"
          class="flex px-2"
        >
          <div class="flex text-lg font-bold text-white">
            <span class="pi pi-map-marker mr-2"></span>
            {{ location.name }}
          </div>
        </div>

        <div class="text-2xl text-amber-600 font-bold">Been There's</div>
        <div
          v-for="location in oldLocations"
          :key="location.id"
          class="flex px-2"
        >
          <div class="flex text-lg font-bold text-white">
            <span class="pi pi-map-marker mr-2"></span>
            {{ location.name }}
          </div>
        </div>
      </div>
    </Drawer>

    <div v-if="!visible">
      <div class="text-white absolute top-3 right-14 text-2xl">My Parks</div>
      <button
        class="pi pi-align-justify p-2 absolute top-3 right-3 rounded-lg bg-blue-500 text-white"
        @click="toggleVisible"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Drawer from "primevue/drawer";
import { User } from "@/models/User";
import { ref } from "vue";

// Import the user from the main screen.
const props = defineProps<{
  user: User;
}>();

const newLocations = ref<typeof props.user.newLocations>([]);
const oldLocations = ref<typeof props.user.existingLocations>([]);

// Initialize the locations with the user's new locations.
newLocations.value = props.user.newLocations;
oldLocations.value = props.user.existingLocations;

const visible = ref(false);

const toggleVisible = () => {
  visible.value = !visible.value;
};
</script>
