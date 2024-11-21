<template>
  <!-- <div id="app"> -->
    <!-- <header class="header">
      <h1>Gallery</h1>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/usecase">Use cases</router-link>
        <router-link to="/dataset">Datasets</router-link>
      </nav>
    </header> -->
  <body>
    <HomeScreen />
  </body>
    <!-- <router-view></router-view> -->
  <!-- </div> -->
</template>

<script>
import HomeScreen from './components/HomeScreen.vue'

export default {
  name: 'App',
  components: {
    HomeScreen,
  }
}
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