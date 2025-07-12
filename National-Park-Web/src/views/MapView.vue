<template>
  <div
    class="flex justify-items-center justify-center align-center text-4xl text-center text-white pt-4"
  >
    Use the map to find parks!
  </div>
  <div class="flex justify-center items-center p-4 h-screen">
    <GoogleMap
      :api-key="googleMapsKey"
      style="width: 80vw; height: 80vh"
      :center="center"
      :zoom="15"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { googleMapsKey } from '@/secrets/keys.json'

// Import the locations for the user, as well as the locations from the parks.

import { ref } from 'vue'

const center = { lat: 40.689247, lng: -74.044502 }
</script>
