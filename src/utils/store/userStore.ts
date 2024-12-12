import { defineStore } from 'pinia';
import { User } from '../types';
import { useSettingsStore } from './settingsStore';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    cart: {} as Record<string, number>,
    isAuthenticated: false,
  }),
  persist: true,
  actions: {
    login(userData: { email: string; password: string }) {
      const settingsStore = useSettingsStore();
      const registered = settingsStore.settings.accountRegistered;
      const user = registered.find(u => u.email === userData.email && u.password === userData.password);
      if (user) {
        this.user = user;
        this.isAuthenticated = true
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    getUser() {
      return this.user;
    },
    getIsAuthenticated() {
      return this.isAuthenticated;
    },
    getCart() {
      return this.cart;
    },
    addToCart(productId: string) {
      this.cart[productId] = 1;
    },
    removeFromCart(productId: string) {
      delete this.cart[productId];
    }, 
    clearCart() {
      this.cart = {};
    },
    increaseQuantity(productId: string) {
      console.log(this.cart)
      const quantity = this.cart[productId] || 0;
      this.cart[productId] = quantity + 1;
    },
    decreaseQuantity(productId: string) {
      const quantity = this.cart[productId] || 0;
      if (quantity > 1) {
        this.cart[productId] = quantity - 1;
      } else {
        delete this.cart[productId];
      }
    }
  },
});
