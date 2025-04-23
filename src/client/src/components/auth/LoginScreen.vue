<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login to dashboard</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
        <div class="button-group">
          <button type="submit" class="btn-login">Login</button>
          <button
            type="button"
            class="btn-create"
            @click="navigateToCreateAccount"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
    <label for="sponsor"><br><br>Sponsored by</label>
        <img alt="Gallery logo" class="logo" src="../../assets/capitalonelogo.png" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { loginUser } from "../../services/auth.api";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    navigateToCreateAccount() {
      this.$router.push("/register");
    },
    async handleLogin() {
      try {
        const response = await loginUser({
          email: this.email,
          password: this.password,
        });

        // Debug output
        console.log("Login response:", response);

        if (!response.token || !response.user) {
          alert("Login failed: Missing token or user in response.");
          return;
        }

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        const user = response.user;

        if (user.is_admin) {
          this.$router.push("/admin/dashboard");
        } else {
          this.$router.push("/user/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
          if (error.response.status === 401) {
            alert("Invalid email or password");
          } else if (error.response.status === 404) {
            alert("User not found");
          } else {
            alert("Login failed. Please try again.");
          }
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Container styling */
.auth-container {
    display: flex;
    flex-direction: column;      /* Stack children vertically */
    justify-content: center;     /* Center vertically */
    align-items: center;         /* Center horizontally */
    height: 100vh;
    background-color: #017291;
}
/* Card styling */
.auth-card {
  background-color: white;
  padding-top: 3rem;
  padding-bottom: 4rem;
  padding-left: 4.5rem;
  padding-right: 4.5rem;
  border-radius: 10px;
  text-align: center;
}

.logo {
    width: 180px;      /* Change this value to your desired width */
    height: auto;      /* Maintains aspect ratio */
    margin-top: 2rem;  /* Optional: space from the card above */
    display: block;    /* Ensures the image behaves as a block element */
}

h2 {
  margin-bottom: 1.5rem;
  color: #003d4c;
  text-align: left;
  /* Dark blue text color */
}

/* Form styling */
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  color: #003d4c;
  /* Dark blue text color */
}

input {
  width: calc(100% - 1rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: solid thin #007a8e;
}

/* Button styling */
.button-group {
  margin-top: 2rem;
  display: flex;

  justify-content: space-between;
}

button {
  width: 9rem;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 25rem;
  border: 0px;
  border-color: #007a8e;
}

.btn-login {
  background-color: #007a8e;
  color: #ffffff;
  cursor: pointer;
}

.btn-create {
  background-color: #ffffff;
  cursor: pointer;
}
</style>
