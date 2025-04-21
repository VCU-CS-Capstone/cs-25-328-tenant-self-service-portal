<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Create new account</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="first-name">First name</label>
                    <input type="text" id="first-name" v-model="user.firstName" placeholder="Enter your first name" />
                </div>

                <div class="form-group">
                    <label for="last-name">Last name</label>
                    <input type="text" id="last-name" v-model="user.lastName" placeholder="Enter your last name" />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="user.email" placeholder="Enter your email" />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="user.password" placeholder="Enter your password" />
                </div>

                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="is-admin" v-model="user.isAdmin" @change="resetAdminPassword" />
                        <span>Is admin?</span>
                    </label>
                </div>

                <div class="form-group" v-if="user.isAdmin">
                    <label for="admin-passkey">Admin Passkey</label>
                    <input type="password" id="admin-passkey" v-model="adminPasskey"
                        :class="{ 'invalid-input': adminPasskeyError }" required placeholder="Enter passkey" />
                    <div class="error-message" v-if="adminPasskeyError">{{ adminPasskeyError }}</div>
                </div>

                <div class="button-group">
                    <button type="button" class="btn-back" @click="navigateBack">
                        <span class="arrow-left">←</span>
                    </button>
                    <button type="submit" class="btn-create">Create account</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { registerUser } from '../../services/auth.api'

export default {
    setup() {
        const router = useRouter();
        return { router };
    },
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isAdmin: false,
            },
            adminPasskey: '',
            adminPasskeyError: '',
            formError: '',
            ADMIN_PASSKEY: 'admin123', // Static passkey
        };
    },
    methods: {
        navigateBack() {
            this.$router.push('/login');
        },
        async handleSubmit() {
            // Validate admin passkey if needed
            if (this.user.isAdmin) {
                if (this.adminPasskey !== "admin123") {
                    this.adminPasskeyError = "Invalid admin passkey";
                    return;
                }
                console.log("Admin status being sent:", this.user.isAdmin);
            }

            try {
                const response = await registerUser({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    password: this.user.password,
                    isAdmin: this.user.isAdmin// ? 1 : 0 //CHANGED is_admin -> isAdmin : to communicate correctly to authentication.api
                });

                // Store user info if needed
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                }

                this.$router.push('/login');
            } catch (error) {
                // Handle registration errors
                if (error.response) {
                    if (error.response.status === 409) {
                        this.formError = "Email already in use";
                    } else {
                        this.formError = "Registration failed. Please try again.";
                    }
                } else {
                    this.formError = "An error occurred. Please try again.";
                }
            }
        }
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
    padding-left: 5rem;
    padding-right: 5rem;
    border-radius: 10px;
    text-align: left;
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
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 7rem;
    border-radius: .5rem;
    border: solid thin #007A8E;
}

/* Checkbox styling */
.checkbox-group {
    margin-bottom: 1rem;
    text-align: left;
}

.checkbox-label {
    display: flex;
    align-items: center;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
}

.error-message {
    color: #d32f2f;
    font-size: 0.875rem;
    text-align: left;
    margin-top: 0.25rem;
}

/* Button styling */
.button-group {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-back {
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: #007A8E;
    cursor: pointer;
}

.arrow-left {
    font-size: 1.2rem;
    line-height: 1;
    color: #000000;
}

.btn-create {
    width: 9rem;
    padding-top: .35rem;
    padding-bottom: .35rem;
    padding-left: .75rem;
    padding-right: .75rem;
    border-radius: 25rem;
    border: 0px;
    background-color: #007A8E;
    color: #ffffff;
    margin-left: auto;
    cursor: pointer;
}

.invalid-input {
    border-color: #d32f2f;
    background-color: #fff8f8;
}
</style>
