import { defineStore } from 'pinia'
import type { Location } from '@/types/locations'

export const useLocationStore = defineStore('location', {
  state: () => ({
    allLocations: [] as Location[],
    beenThereLocations: [] as Location[],
    wantToGoLocations: [] as Location[],
  }),

  actions: {
    setAllLocations(locations: Location[]) {
      this.allLocations = locations
    },
    addBeenThere(location: Location) {
      if (!this.beenThereLocations.find(l => l.id === location.id)) {
        this.beenThereLocations.push(location)
      }
    },
    addWantToGo(location: Location) {
      if (!this.wantToGoLocations.find(l => l.id === location.id)) {
        this.wantToGoLocations.push(location)
      }
    },
    removeBeenThere(locationId: string) {
      this.beenThereLocations = this.beenThereLocations.filter(l => l.id !== locationId)
    },
    removeWantToGo(locationId: string) {
      this.wantToGoLocations = this.wantToGoLocations.filter(l => l.id !== locationId)
    },
    clearAll() {
      this.allLocations = []
      this.beenThereLocations = []
      this.wantToGoLocations = []
    },
  },
})
