<template>
  <div id="app">
    <!-- Conditional rendering of Header -->
    <Header v-if="showHeader" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  computed: {
    showHeader() {
      return !this.$route.meta.hideHeader;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

/* Global font */
* {
  font-family: 'Inter', sans-serif;
}

/* Remove default margins and paddings */
html, body {
  margin: 0;
  padding: 0;
}

/* Ensure full viewport coverage */
body {
  background-color: #ffffff; /* Matches teal background */
  height: 100vh;
  overflow: hidden; /* Prevent scrollbar */
}

/* Ensure app container fills viewport */
#app {
  width: 100%;
  height: 100%;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
