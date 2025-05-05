<template>
    <div class="container">
      <br>
      <h2 class="text-center text-white mb-3 fw-bolder">Reset Your Password</h2>
  
      <div class="card reset-password-card">
        <div class="card-body text-white">
          <form @submit.prevent="resetPassword">
            <div class="mb-3">
              <label class="form-label">New Password</label>
              <input type="password" v-model="password" class="form-control" required>
            </div>
  
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" v-model="confirmPassword" class="form-control" required>
            </div>
  
            <div class="text-center">
              <button type="submit" class="btn btn-success fw-bold">🔑 Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { useToast } from 'vue-toastification';

  
  export default {
    data() {
      return {
        password: "",
        confirmPassword: "",
        message: "",
        token: "",
        success: false
      };
    },
    created() {
        this.token = this.$route.query.token;
    },
    methods: {
      async resetPassword() {
        const toast = useToast();
        if (this.password !== this.confirmPassword) {
          this.message = "Passwords do not match!";
            toast.error(this.message);
          this.success = false;
          return;
        }
  
        try {
          const response = await this.$axios.post("/user/reset-password", {
            token: this.token,
            newPassword: this.password
          });
  
          this.message = response.data.message;
          this.success = true;
          toast.success("Password updated successfully!");
          
          setTimeout(() => {
            this.$router.push("/home");
          }, 3000);
        } catch (error) {
          this.message = error.response?.data?.message || "An error occurred.";
          toast.error(this.message);
          this.success = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-password-card {
    max-width: 400px;
    margin: auto;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  </style>
  