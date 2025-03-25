<template>
  <div id="app">
    <Header />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </RouterView>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  mounted() {
    console.log('App mounted');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #017291;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 25px;
  border: 4px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-button {
  display: none;
}
</style>
