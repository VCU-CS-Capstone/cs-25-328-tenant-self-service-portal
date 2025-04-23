<template>
  <div id="app">
    <!-- Show Header if route doesn't disable it -->
    <component
      :is="currentHeader"
      v-if="showHeader"
    />
    
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AdminHeader from './components/admin/Header.vue';
import UserHeader from './components/user/Header.vue';

export default {
  components: {
    AdminHeader,
    UserHeader
  },
  computed: {
    showHeader() {
      return !this.$route.meta.hideHeader;
    },
    isLoggedIn() {
      const userStr = localStorage.getItem('user');
      return !!userStr;
    },
    currentHeader() {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null; 
      try {
        const user = JSON.parse(userStr);
        return user.is_admin ? 'AdminHeader' : 'UserHeader';
      } catch (e) {
        console.error('Header role error:', e);
        return null;
      }
    }
  }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #017291;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* overflow: hidden; */
}

body {
  padding: 0;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #FFFFFF;
  color: #004d66;
  padding: 0px;
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
