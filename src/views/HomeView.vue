<template>
  <div class="flex justify-center p-4">
    <div
      class="flex text-white justify-center rounded-3xl w-1/2 text-5xl p-4 py-8"
    >
      Welcome to the National Park App!
    </div>
  </div>
  <div class="absolute top-0 -z-1">
    <img
      src="@/assets/background.jpg"
      alt="National Park Banner"
      class="fixed top-0 left-0 w-screen h-screen bg-cover object-cover opacity-60"
    />
  </div>
  <div class="flex justify-center flex-row space-x-4">
    <div class="text-center">
      <button v-if="!loaded" class="button" @click="getParkData()">
        Click here to load the parks
      </button>
    </div>

    <div v-if="loaded" class="text-center">
      <button class="alt-button" @click="goToMap()">
        Click to check out the Park Map
      </button>
    </div>
  </div>

  <UserLocationDisplay :user="user" />
  <div
    v-if="loaded"
    class="flex flex-col justify-center items-center pt-8 space-y-8"
  >
    <input
      type="text"
      class="bg-white rounded-2xl p-1 w-1/4 text-center"
      v-model="searchText"
      placeholder="Search a Park Name"
    />
    <div
      v-for="location in locations"
      :key="location.name"
      class="border p-4 bg-white rounded-xl ring-5 ring-lime-700/75 border-gray-300 w-1/2 h-1/2 flex flex-col space-y-4"
    >
      <h2 class="text-xl text-black font-bold">{{ location.name }}</h2>
      <p class="text-black">{{ location.description }}</p>
      <div class="flex justify-center items-center">
        <ImageCarousel :images="location.imageUrls ?? []" />
      </div>
      <p class="text-sm text-black-500 mt-2">
        Latitude: {{ location.latitude }}, Longitude: {{ location.longitude }}
      </p>
      <div class="flex flex-row justify-center items-center pt-2 space-x-4">
        <button class="beenThere" @click="addBeenThere(location)">
          Add to Been There
        </button>
        <button class="wantToGo" @click="addWantTo(location)">
          Add to Want to Go
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports.
import { ref, onMounted, watch } from "vue";
import { User } from "@/models/User";
import { Location } from "@/models/Location";
import UserLocationDisplay from "./UserLocationDisplay.vue";
import { getParks } from "@/Api/parks";
import ImageCarousel from "@/components/ImageCarousel.vue";
import { useRouter } from "vue-router";

// Pinia store.
import { useLocationStore } from "@/stores/useLocationStore";
const locationStore = useLocationStore();

// DATA SECTION
// Instantiate a user.
const user = new User("Caleb");

// Search text for the park search.
const searchText = ref("");

// Locations.
const locations = ref<Array<Location>>([]);
const originalLocations = ref<Array<Location>>([]);

const loaded = ref(false);

// Methods section
// Create a method to load the park API data.
const getParkData = () => {
  console.log("Calling API...");
  loaded.value = true;
};

const addBeenThere = (location: Location) => {
  user.addExisitngLocation(location);
  // Add to pinia store.
  locationStore.addBeenThere(location);
};

// Want to go.
const addWantTo = (location: Location) => {
  user.addNewLocation(location);
  // add to pinia store.
  locationStore.addWantToGo(location);
};

// On Mounted
onMounted(async () => {
  try {
    const parks = await getParks();
    parks.forEach((park) => {
      locations.value.push(park);
      originalLocations.value.push(park);
    });
    // Load the store with the locations.
    locationStore.setAllLocations(parks);
  } catch (error) {
    console.error("Error fetching parks:", error);
  }
});
watch(searchText, (newValue) => {
  if (newValue.length > 0) {
    locations.value = originalLocations.value.filter((location) =>
      location.name.toLowerCase().includes(newValue.toLowerCase())
    );
  } else {
    // Reset to original list if search text is cleared
    locations.value = [...originalLocations.value];
  }
});

const router = useRouter();
// Function to go to the map.
const goToMap = () => {
  router.push("/maps");
};
</script>
