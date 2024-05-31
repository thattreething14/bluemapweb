<template>
  <div>
    <!-- Password input field -->
    <input type="password" v-model="password" placeholder="Enter password">
    <button @click="submitPassword" class="submit-button">Submit</button>

    <div v-if="isMenuAccessible">
      <button :title="$t('towns.title', { name: 'Paint your territories!' })" :isActive="markerPaintingMode" @toggle="toggleMarkerPaintingMode" class="menu-button">Paint yo chunks</button>
    </div>
    <div v-else>
      <p>Please enter the correct password to access the menu.</p>
    </div>
  </div>
</template>

<script>
import Group from "./Group.vue";
import SwitchButton from "@/components/Menu/SwitchButton.vue";
import {MarkerSet} from "@/js/markers/MarkerSet";
export default {
  name: "TownsMenu",
  // eslint-disable-next-line vue/no-unused-components
  components: { SwitchButton, Group },
  data() {
    return {
      password: "",
      isMenuAccessible: false,
      markerPaintingMode: false // State for toggle button
    };
  },
  methods: {
    submitPassword() {
      if (this.password === "balls") {
        this.isMenuAccessible = true;
        this.password = "";
      } else {
        // Display a message indicating incorrect password
        alert("Incorrect password. Please try again.");
      }
    },
    toggleMarkerPaintingMode() {
      this.markerPaintingMode = !this.markerPaintingMode;
    }
  }
};
</script>

<style>
.submit-button {
  background-color: transparent; /* Making background transparent */
  border: none; /* Removing border */
  color: inherit; /* Inherit color from parent */
  cursor: pointer; /* Changing cursor to pointer */
  /* Add other styles if needed */
}

.menu-button {
  background-color: transparent; /* Making background transparent */
  border: none; /* Removing border */
  color: inherit; /* Inherit color from parent */
  cursor: pointer; /* Changing cursor to pointer */
  /* Add other styles if needed */
}
/* Add your styles here if needed */
</style>
