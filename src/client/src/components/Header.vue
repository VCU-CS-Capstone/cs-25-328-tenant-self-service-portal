<template>
    <nav class="nav">
        <div class="nav-left">
            <RouterLink to="/" class="brand-link">
                <img alt="Gallery logo" class="logo" src="../assets/figmalogo.png">
                <h1 class="title">Gallery</h1>
            </RouterLink>
        </div>
        <div class="nav-right">
            <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="nav-links" :class="{ 'active': isMenuOpen }">
                <RouterLink to="/" @click="isMenuOpen = false">Dashboard</RouterLink>
                <RouterLink to="/datasets" @click="isMenuOpen = false">Datasets</RouterLink>
                <RouterLink to="/usecases" @click="isMenuOpen = false">Use Cases</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* ... existing styles ... */

.brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
}

.nav-left .brand-link:hover .title {
    color: #017291;
    transition: color 0.2s ease;
}
</style>


<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            isMenuOpen: false
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.nav {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.25));
    font-family: 'Inter', sans-serif;
    position: relative;
    z-index: 1000; /* Add this */
}

.nav-left {
    display: flex;
    align-items: center;
}

.nav-left .brand-link:hover .title {
    color: #033450;
}

.logo {
    width: 70px;
    height: auto;
    margin-right: 1rem;
}

.title {
    color: #033450;
    font-size: 2.4rem;
    font-weight: bold;
    margin: 0;
    letter-spacing: 0px;
    font-style: italic;
    font-weight: bold;
}

.nav-right {
    display: flex;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: #017291;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
}

.nav-links a:hover {
    color: #033450;
}

.nav-links a.router-link-active {
    color: #033450;
    font-weight: 600;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001; /* Higher than nav */
}

.menu-toggle span {
    width: 100%;
    height: 3px;
    background-color: #017291;
    border-radius: 10px;
    transition: all 0.3s linear;
}

@media (max-width: 768px) {
    .nav {
        padding: 1rem;
    }

    .logo {
        width: 50px;
    }

    .title {
        font-size: 1.5rem;
    }

    .menu-toggle {
        display: flex;
    }

    .nav-links {
        display: none;
        position: fixed; /* Changed from absolute */
        top: 80px;
        left: 0;
        right: 0;
        flex-direction: column;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        gap: 1rem;
        z-index: 999; /* Add this */
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links a {
        padding: 0.5rem 0;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 1.25rem;
    }
}
</style>