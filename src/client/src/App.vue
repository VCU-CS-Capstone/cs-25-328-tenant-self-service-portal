<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #017291;
}
body{
  padding:0;
  margin:0;
}
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #FFFFFF;
  color: #004d66;
  padding: 0px;
}
</style>