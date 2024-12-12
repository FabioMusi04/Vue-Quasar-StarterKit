<template>
  <q-header reveal bordered class="bg-red text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Title
      </q-toolbar-title>
      <LanguageSelector />
      <ThemeToggler />
    </q-toolbar>

    <q-tabs align="center">
      <q-route-tab to="/" label="Home Page" />
      <q-route-tab v-if="!isLogged" to="/login" label="Login Page" />
      <q-route-tab v-if="isLogged" to="/me" label="User info Page" />
      <q-route-tab v-if="!isLogged" to="/register" label="Register Page" />
      <q-route-tab v-if="isLogged" @click="logout" label="Logout" />
      <q-route-tab v-if="!isLogged" to="/cart" label="Cart Page" >
        <q-badge color="primary" floating>{{ cartItems }}</q-badge>
      </q-route-tab>
    </q-tabs>

  </q-header>
</template>

<script>
import { useUserStore } from '../utils/store/userStore';
import LanguageSelector from './LanguageSelector.vue';
import ThemeToggler from './ThemeToggler.vue';

export default {
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  components: {
    ThemeToggler,
    LanguageSelector,
  },
  methods: {
    logout() {
      const userStore = useUserStore();  // Access store inside a method
      userStore.logout();  // Call the store action
      this.$router.push('/login');
    },
  },
  computed: {
    isLogged() {
      const userStore = useUserStore();  // Access store inside computed
      return userStore.isAuthenticated;
    },
    cartItems() {
      const userStore = useUserStore();  // Access store inside computed
      return userStore.cart.size || 0;
    },
  }
};
</script>
