<template>
  <div class="py-4 text-5xl mb-4 text-white text-center">
    {{ isSignUp ? "Sign Up" : "Log In" }}
  </div>
  <div class="absolute top-0 -z-1">
    <img
      src="@/assets/LoginBackground.jpg"
      alt="National Park Banner"
      class="fixed top-0 left-0 w-screen h-screen bg-cover object-cover opacity-60"
    />
  </div>
  <div>
    <div
      v-if="isSignUp"
      class="flex flex-col items-center justify-center space-y-4 w-full h-full"
    >
      <div class="w-1/2 lg:w-1/4">
        <input
          type="text"
          v-model="signUpInput.firstName"
          placeholder="First Name"
          class="bg-white rounded-2xl p-1 w-full text-center"
        />
        <input
          type="text"
          v-model="signUpInput.lastName"
          placeholder="Last Name"
          class="bg-white rounded-2xl p-1 w-full text-center mt-4"
        />
        <input
          type="text"
          v-model="signUpInput.emailAddress"
          placeholder="Email Address"
          class="bg-white rounded-2xl p-1 w-full text-center mt-4"
        />

        <button
          class="bg-blue-500 text-white rounded-2xl p-2 w-full mt-4"
          @click="submitSignUp()"
        >
          Submit
        </button>
      </div>
    </div>
    <div v-else>
      <div class=""></div>
    </div>

    <!-- Error section -->
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
        @click="clearErrors"
      >
        Clear Errors
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { postUser } from "@/Api/routes/routes";

const isSignUp = ref(true);

const signUpInput = ref({
  firstName: "",
  lastName: "",
  emailAddress: "",
});

// Method for handling submit.
const submitSignUp = () => {
  // attempt to make an axios post request to the backend.
  postUser(signUpInput.value)
    .then((response) => {
      console.log("User created successfully:", response);
    })
    .catch((error) => {
      error?.originalError.response?.data?.errors.forEach((error: string) =>
        addError((error ?? "Unknown error").toString())
      );
    });
};

const errors = ref<string[]>([]);

const addError = (error: string) => {
  errors.value.push(error);
};
const clearErrors = () => {
  errors.value = [];
};
</script>
