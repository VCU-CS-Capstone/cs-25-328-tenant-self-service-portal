<!-- Header.vue  (shared by Admin & User layouts) -->
<template>
  <nav class="nav">
    <!-- ◂ brand / logout ▸ -->
    <div class="nav-left">
      <!-- clicking the logo asks to log out -->
      <a href="#" class="brand-link" @click.prevent="handleLogoClick">
        <img alt="Gallery logo" class="logo" src="../../assets/figmalogo.png" />
        <h1 class="title">Gallery</h1>
      </a>
    </div>

    <!-- ◂ menu links ▸ -->
    <div class="nav-right">
      <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
        <span></span><span></span><span></span>
      </button>

      <div class="nav-links" :class="{ active: isMenuOpen }">
        <RouterLink to="/dashboard" @click="closeMenu">Dashboard</RouterLink>
        <RouterLink to="/admin/datasets" @click="closeMenu">Datasets</RouterLink>
        <RouterLink to="/admin/usecases" @click="closeMenu">Use Cases</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { logoutUser } from "@/services/auth.api";
import { useRouter, RouterLink } from "vue-router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdminHeader",
  components: { RouterLink },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return { isMenuOpen: false };
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    async handleLogoClick() {
      const ok = window.confirm("Do you want to log out?");
      if (!ok) return;

      logoutUser();
      localStorage.removeItem("user");

      try {
        await this.router.push("/login");
      } catch (err) {
        console.error("Navigation failed:", err);
        // maybe show an error toast or retry
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* ─── layout ─── */
.nav {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.25));
  font-family: "Inter", sans-serif;
  position: relative;
  z-index: 1000;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}
.brand-link:hover .title {
  color: #017291;
  transition: color 0.2s ease;
}

.logo {
  width: 70px;
  margin-right: 1rem;
}
.title {
  color: #033450;
  font-size: 2.4rem;
  font-style: italic;
  font-weight: bold;
  margin: 0;
}

/* links */
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
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #033450;
}

/* burger */
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
  margin-left: 1rem;
}
.menu-toggle span {
  width: 100%;
  height: 3px;
  background-color: #017291;
  border-radius: 10px;
}

/* ─── responsive ─── */
@media (max-width: 768px) {
  .logo {
    width: 50px;
  }
  .title {
    font-size: 2rem;
  }
  .menu-toggle {
    display: flex;
  }
  .nav-links {
    display: none;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
    text-align: center;
    gap: 1rem;
    z-index: 999;
  }
  .nav-links.active {
    display: flex;
  }
  .nav-links a {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
}
@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
}
</style>
