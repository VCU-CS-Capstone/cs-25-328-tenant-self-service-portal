<template>
    <div class="nav">
        <img alt="Gallery logo" class="logo" src="../assets/figmalogo.png">
        <a>Gallery</a>
        <div class="header">
            <RouterLink to="/">Dashboard</RouterLink>
            <RouterLink to="/datasets">Datasets</RouterLink>
            <RouterLink to="/usecases">Use Cases</RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header'
}
</script>

<style scoped>
.logo {
    width: 90px;
    float: left;
    /* text-align: left; */
}

.nav {
    background-color: #ffffff;
    overflow: hidden;
    border-bottom: 2px solid black;
    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.25));
}

.nav a {
    float: left;
    color: #033450;
    padding: 14px 0px;
    text-align: right;
    font-size: 40px;
    font-weight: 900;
    font-style: bold;
    text-decoration: none;
    margin-right: 5 px;
}

.header a {
    float: right;
    color: #017291;
    padding: 30px 30px;
    text-align: right;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    margin-right: 10 px;
}
</style>