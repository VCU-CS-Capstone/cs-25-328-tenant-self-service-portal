<template>
    <nav class="nav">
        <div class="nav-left">
            <img alt="Gallery logo" class="logo" src="../assets/figmalogo.png">
            <h1 class="title">Gallery</h1>
        </div>
        <div class="nav-right">
            <RouterLink to="/">Dashboard</RouterLink>
            <RouterLink to="/datasets">Datasets</RouterLink>
            <RouterLink to="/usecases">Use Cases</RouterLink>
        </div>
    </nav>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header'
}
</script>

<style scoped>
.nav {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid black;
    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.25));
}

.nav-left {
    display: flex;
    align-items: center;
}

.nav-right {
    display: flex;
}

.logo {
    width: 90px;
    margin-right: 15px;
}

.title {
    color: #033450;
    font-size: 40px;
    font-weight: 900;
    margin: 0;
}



.nav-right a {
    color: #017291;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    margin-left: 30px;
}
</style>