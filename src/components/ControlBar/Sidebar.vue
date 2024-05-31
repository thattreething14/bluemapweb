<template>
  <div id="sidebar" :class="{ 'open': isOpen }">
    <button @click="toggleSidebar" class="toggle-button">Toggle Sidebar</button>
    <div class="sidebar-content">
      <!-- Sidebar content goes here -->
      <h2>Sidebar</h2>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure sidebar is above other content */
}

.toggle-button {
  cursor: pointer;
}

.sidebar-content {
  display: none;
  position: absolute; /* Position content absolutely */
  top: 50px; /* Adjust as needed based on your design */
  left: 0;
  background-color: #fff; /* Add background color to sidebar content */
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-content.visible {
  display: block;
}
</style>
