<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Login to dashboard</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Enter your email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter your password" />
                </div>
                <div class="button-group">
                    <button type="submit" class="btn-login">Login</button>
                    <button type="button" class="btn-create" @click="navigateToCreateAccount">Create account</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

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
        handleLogin() {
            this.router.push("/dashboard");
        },
        navigateToCreateAccount() {
            this.router.push("/create")
        },
    },
};
</script>

<style scoped>
/* Container styling */
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
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

h2 {
    margin-bottom: 1.5rem;
    color: #003D4C;
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
    color: #003D4C;
    /* Dark blue text color */
}

input {
    width: calc(100% - 1rem);
    padding: .5rem;
    border-radius: .5rem;
    border: solid thin #007A8E;
}

/* Button styling */
.button-group {
    margin-top: 2rem;
    display: flex;

    justify-content: space-between;
}

button {
    width: 9rem;
    padding-top: .35rem;
    padding-bottom: .35rem;
    padding-left: .75rem;
    padding-right: .75rem;
    border-radius: 25rem;
    border: 0px;
    border-color: #007A8E;

}

.btn-login {
    background-color: #007A8E;
    color: #ffffff;
    cursor: pointer;
}

.btn-create {
    background-color: #ffffff;
    cursor: pointer;
}
</style>