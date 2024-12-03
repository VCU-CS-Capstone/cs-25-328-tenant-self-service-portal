<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Header from './components/Header.vue';

export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #017291;
  /* margin-top: 60px; */
}
body{
  padding:0;
  margin:0;
}

/* .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  color: #004d66;
  padding: 10px;
}

.header nav a {
  color: #004d66;
  margin-right: 15px;
} */
</style>