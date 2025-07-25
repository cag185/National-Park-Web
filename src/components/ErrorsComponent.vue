<template>
  <div v-if="errors.length > 0" class="flex flex-col items-center">
    <div
      class="bg-white text-black p-4 rounded-lg mt-4 w-auto mx-auto ring-2 ring-red-500"
      v-for="error in errors"
      :key="error"
    >
      {{ error }}
    </div>
    <button
      class="bg-green-500 text-white rounded-2xl p-2 w-1/4 mt-4 mx-auto"
      @click="clearErrors()"
    >
      Clear
    </button>
  </div>

  <!-- successes -->
  <div v-if="successes.length > 0" class="flex flex-col items-center">
    <div
      class="bg-white text-black p-4 rounded-lg mt-4 w-auto mx-auto ring-2 ring-green-500"
      v-for="success in successes"
      :key="success"
    >
      {{ success }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  errors: string[];
  successes: string[];
}>();

const computedErrors = ref<string[]>([]);
const computedSuccesses = ref<string[]>([]);

const emit = defineEmits<{
  (event: "clearErrors"): void;
}>();

const clearErrors = () => {
  computedErrors.value = [];
  emit("clearErrors");
};

watch(
  () => props.errors,
  (newErrors) => {
    computedErrors.value = newErrors;
  },
  { immediate: true }
);

watch(
  () => props.successes,
  (newSuccesses) => {
    computedSuccesses.value = newSuccesses;
  },
  { immediate: true }
);
</script>
