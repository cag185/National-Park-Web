<template>
  <div
    class="flex justify-items-center justify-center align-center text-4xl text-center text-white pt-4"
  >
    Use the map to find parks!
  </div>
  <div class="flex pt-4 space-x-2 justify-center">
    <input type="checkbox" id="beenThereCheckbox" v-model="beenThereChecked" />
    <div class="input beenThereTextColor">Show Been There Locations</div>
    <input type="checkbox" id="wantToGoCheckbox" v-model="wantToGoChecked" />
    <div class="input wantToGoTextColor">Show Want to Go Locations</div>
    <input type="checkbox" id="allCheckbox" v-model="allChecked" />
    <div class="input">Show All Locations</div>
  </div>
  <div class="flex justify-center items-center px-4 h-screen">
    <GoogleMap
      :api-key="googleMapsKey"
      style="width: 80vw; height: 80vh; padding-top: 12px; align-self: flex-start"
      :center="center"
      :zoom="zoom"
    >
      <Marker
        v-for="marker in markers"
        :key="marker.id"
        :options="{
          position: { lat: marker.latitude, lng: marker.longitude },
          title: marker.name,
        }"
      />
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { googleMapsKey } from '@/secrets/keys.json'
import { Location } from '@/models/Location'
import { computed, ref } from 'vue'

// Using the locations store in Pinia.
import { useLocationStore } from '@/stores/useLocationStore'
const locationStore = useLocationStore()

// Setup the functions for the chekcboxes.
const beenThereChecked = ref(false)
const wantToGoChecked = ref(false)
const allChecked = ref(false)

const beenThereLocations = ref(locationStore.beenThereLocations)
const wantToGoLocations = ref(locationStore.wantToGoLocations)

const markers = computed(() => {
  const allMarkers = ref<typeof locationStore.allLocations>([])

  if (allChecked.value) {
    allMarkers.value = locationStore.allLocations
  } else {
    if (beenThereChecked.value) {
      allMarkers.value = [...allMarkers.value, ...locationStore.beenThereLocations]
    }
    if (wantToGoChecked.value) {
      allMarkers.value = [...allMarkers.value, ...locationStore.wantToGoLocations]
    }
  }

  return allMarkers.value.map((location) => ({
    id: location.id,
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
  }))
})

// Import the locations for the user, as well as the locations from the parks.
const center = { lat: 39.8283, lng: -98.5795 }
const zoom = 4.5
</script>
