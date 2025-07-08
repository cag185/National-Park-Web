<template>
  <div class="absolute top-0 -z-1">
    <img
      src="@/assets/background.jpg"
      alt="National Park Banner"
      class="fixed top-0 left-0 w-screen h-screen bg-cover object-cover opacity-60"
    />
  </div>
  <div class="text-center">
    <button v-if="!loaded" class="button" @click="getParkData()">
      Click here to load the parks
    </button>
  </div>
  <UserLocationDisplay :user="user" />
  <div v-if="loaded" class="flex flex-col justify-center items-center pt-8 space-y-8">
    <div
      v-for="location in locations"
      :key="location.name"
      class="border p-4 bg-white rounded-xl ring-5 ring-lime-700/75 border-gray-300 w-1/2 h-1/2 flex flex-col space-y-4"
    >
      <h2 class="text-xl text-black font-bold">{{ location.name }}</h2>
      <p class="text-black">{{ location.description }}</p>
      <div class="flex justify-center items-center">
        <!-- <img :src="location.imageUrl" alt="Park Image" class="w-3/4 h-auto mt-2 rounded-lg" /> -->
        <ImageCarousel :images="location.imageUrls ?? []" />
      </div>
      <p class="text-sm text-black-500 mt-2">
        Latitude: {{ location.latitude }}, Longitude: {{ location.longitude }}
      </p>
      <div class="flex flex-row justify-center items-center pt-2 space-x-4">
        <button class="beenThere" @click="addBeenThere(location)">Add to Been There</button>
        <button class="wantToGo" @click="addWantTo(location)">Add to Want to Go</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports.
import { ref, onMounted } from 'vue'
import { User } from '@/models/User'
import { Location } from '@/models/Location'
import UserLocationDisplay from './UserLocationDisplay.vue'
import { getParks } from '@/Api/parks'
import ImageCarousel from '@/components/imageCarousel.vue'

// DATA SECTION
// Instantiate a user.
const user = new User('Caleb')
// Mock data from a API call.

// Locations.
const locations = ref<Array<Location>>([])

const loaded = ref(false)

// Methods section
// Create a method to load the park API data.
const getParkData = () => {
  console.log('Calling API...')
  loaded.value = true
}

const addBeenThere = (location: Location) => {
  user.addExisitngLocation(location)

  // Testing.
  console.log('Been there locations:', user.existingLocations)
}

// Want to go.
const addWantTo = (location: Location) => {
  user.addNewLocation(location)

  // Testing.
  console.log('Want to go locations:', user.newLocations)
}

// On Mounted
onMounted(async () => {
  try {
    const parks = await getParks()
    console.log(parks)
    parks.forEach((park) => {
      locations.value.push(park)
    })
  } catch (error) {
    console.error('Error fetching parks:', error)
  }
})
</script>
