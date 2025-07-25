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
    <ErrorsComponent
      :errors="errors"
      :successes="successes"
      @clearErrors="clear"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { postUser } from "@/Api/routes/routes";
import ErrorsComponent from "@/components/ErrorsComponent.vue";
import { useRouter } from "vue-router";

const isSignUp = ref(true);

const signUpInput = ref({
  firstName: "",
  lastName: "",
  emailAddress: "",
});

// create a router instance.
const router = useRouter();

// Method for handling submit.
const submitSignUp = () => {
  // Clear the potential existing errors.
  clear();

  // attempt to make an axios post request to the backend.
  postUser(signUpInput.value)
    .then((response) => {
      console.log("User created successfully:", response);
      addSuccess("User created successfully");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    })
    .catch((error) => {
      error?.originalError.response?.data?.errors.forEach((error: string) =>
        addError((error ?? "Unknown error").toString())
      );
    });
};

const errors = ref<string[]>([]);
const successes = ref<string[]>([]);

const addError = (error: string) => {
  errors.value.push(error);
};

const addSuccess = (success: string) => {
  successes.value.push(success);
};

const clear = () => {
  errors.value = [];
  successes.value = [];
};
</script>
