<template>
  <div class="carousel relative flex items-center justify-center w-full h-[250px] overflow-hidden">
    <img
      v-for="(image, index) in props.images"
      :key="index"
      :src="image"
      alt="Carousel Image"
      class="absolute w-1/2 h-full object-cover rounded-2xl transition-opacity duration-700 ease-in-out"
      :class="{
        'opacity-100 z-10': index === currentIndex,
        'opacity-0 z-0': index !== currentIndex,
      }"
    />
    <button
      @click="prevImage"
      class="absolute left-4 text-white bg-black/50 p-2 rounded-full z-20 hover:bg-black/70"
    >
      <span class="pi pi-chevron-left"></span>
    </button>
    <button
      @click="nextImage"
      class="absolute right-4 text-white bg-black/50 p-2 rounded-full z-20 hover:bg-black/70"
    >
      <span class="pi pi-chevron-right"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}
</script>
