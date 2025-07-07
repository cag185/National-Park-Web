<template>
  <div class="text-center">
    <button v-if="!loaded" class="button" @click="getParkData()">
      Click here to load the parks
    </button>
  </div>
  <UserLocationDisplay :user="user" />
  <div class="flex flex-col justify-center items-center pt-8 space-y-4">
    <div
      v-for="location in locations"
      :key="location.name"
      class="border p-4 bg-white rounded-xl shadow-md border-gray-300"
    >
      <h2 class="text-xl text-black font-bold">{{ location.name }}</h2>
      <p class="text-black">{{ location.description }}</p>
      <img :src="location.imageUrl" alt="Park Image" class="w-full h-auto mt-2 rounded-lg" />
      <p class="text-sm text-black-500 mt-2">
        Latitude: {{ location.location.latitude }}, Longitude: {{ location.location.longitude }}
      </p>
      <div class="flex flex-row pt-2 items-center space-x-4">
        <button class="beenThere" @click="addBeenThere(location)">Add to Been There</button>
        <button class="wantToGo" @click="addWantTo(location)">Add to Want to Go</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports.
import { ref } from 'vue'
import { User } from '@/models/User'
import { Location } from '@/models/Location'
import UserLocationDisplay from './UserLocationDisplay.vue'

// DATA SECTION
// Instantiate a user.
const user = new User('Caleb')
// Mock data from a API call.
const sampleLocation = {
  id: '1',
  name: 'Yosemite National Park',
  description: 'A beautiful national park in California.',
  location: {
    latitude: 37.8651,
    longitude: -119.5383,
  },
  imageUrl: '@/assets/Yosemite.jpeg',
}

const sampleLocation2 = {
  id: '2',
  name: 'Arches National Park',
  description: 'A beautiful national park in Utah.',
  location: {
    latitude: 1234,
    longitude: -100,
  },
  imageUrl: '@/assets/Arches.jpeg',
}
// Locations.
const locations = ref<Array<typeof sampleLocation>>([])

const loaded = ref(false)

// Methods section
// Create a method to load the park API data.
const getParkData = () => {
  // @todo - make API call.
  // console.log('Calling API...')
  locations.value.push(sampleLocation)
  locations.value.push(sampleLocation2)
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
</script>
