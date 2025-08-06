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

        <input
          type="text"
          v-model="signUpInput.password"
          placeholder="Password"
          class="bg-white rounded-2xl p-1 w-full text-center mt-4"
        />

        <button
          class="bg-blue-500 text-white rounded-2xl p-2 w-full mt-4"
          @click="submitSignUp()"
        >
          Submit
        </button>
      </div>
      <div v-if="isSignUp">
        <div class="pt-4 text-2xl text-white text-center mt-8">
          Already have an account? Sign in instead.
        </div>
        <button
          class="bg-red-500 text-white rounded-2xl p-2 w-full mt-2"
          @click="isSignUp = false"
        >
          Sign In!
        </button>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center space-y-4 w-full h-full"
    >
      <div class="w-1/2 lg:w-1/4">
        <input
          type="text"
          v-model="signUpInput.emailAddress"
          placeholder="Email Address"
          class="bg-white rounded-2xl p-1 w-full text-center mt-4"
        />

        <input
          type="text"
          v-model="signUpInput.password"
          placeholder="Password"
          class="bg-white rounded-2xl p-1 w-full text-center mt-4"
        />

        <button
          class="bg-blue-500 text-white rounded-2xl p-2 w-full mt-4"
          @click="submitLogIn()"
        >
          Submit
        </button>

        <div v-if="!isSignUp">
          <div class="pt-4 text-3xl text-white text-center mt-8">
            Don't have an account? Sign up instead.
          </div>
          <button
            class="bg-red-500 text-white rounded-2xl p-2 w-full mt-2"
            @click="isSignUp = true"
          >
            Sign Up!
          </button>
        </div>
      </div>
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
import { postUser, loginUser, getUserByEmail } from "@/Api/routes/routes";
import ErrorsComponent from "@/components/ErrorsComponent.vue";
import { useLoggedInUserStore } from "@/stores/useLoggedInUserStore";
import { useRouter } from "vue-router";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@/models/User";

const isSignUp = ref(false);
const loggedInUser = useLoggedInUserStore();

const signUpInput = ref({
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
});

const logInInput = ref({
  emailAddress: "",
  password: "",
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

const submitLogIn = () => {
  // Clear the potential existing errors.
  clear();

  // attempt to make an axios post request to the backend.
  loginUser(logInInput.value)
    .then((response) => {
      console.log("User logged in successfully:", response);
      addSuccess("User logged in successfully");

      // Make sure to set the user in pinia to set it for the app.

      // @TODO - make an API call the get the user and it's locations.
      const user = getUserByEmail(logInInput.value.emailAddress);
      setUser(user);
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

// Set the user based on the login or signup request.
// @TODO - replace any with USER once user matches DB user.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setUser = (user: any) => {
  // @TODO - Retrieve the user's locations using the API.
  loggedInUser.setUser(user);
  loggedInUser.setUserName(user.firstName, user.lastName);
};
</script>
