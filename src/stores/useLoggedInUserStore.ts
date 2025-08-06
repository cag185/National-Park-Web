import { defineStore } from 'pinia';
import { User } from '@/models/User';

export const useLoggedInUserStore = defineStore('loggedInUser', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    setUserName(firstName: string, lastName: string) {
      if (this.user) {
        this.user.firstName = firstName;
        this.user.lastName = lastName;
      }
    },
  },
});