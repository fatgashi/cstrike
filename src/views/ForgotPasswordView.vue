<template>
    <div class="container">
        <br>
        <br>
        <h2 class="text-center text-white mb-3 fw-bolder">Forgot Password</h2>
        <div class="card forgot-password-card">
        <div class="card-body text-white">
            <form @submit.prevent="requestPasswordReset">
            <div class="mb-3">
                <label class="form-label">Enter your email:</label>
                <input type="email" v-model="email" class="form-control" required placeholder="Enter your email!">
            </div>
    
            <div class="text-center">
                <button type="submit" style="background-color: rgb(242, 142, 38);" class="btn fw-bold text-white">📩 Send Reset Link</button>
            </div>
            <p class="mt-2 text-center">If your email does not work or is not valid when you registered, please write to 
              <a href="https://discordapp.com/users/947193667188306011" target="_blank" class="important">
                emosbg 
              </a>
              or
              <a href="https://discordapp.com/users/1150374397606113370" target="_blank" class="important">
                assos13-14
              </a>
            </p>
            </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        email: "",
        message: "",
        success: false
      };
    },
    methods: {
      async requestPasswordReset() {
        try {
          const response = await this.$axios.post("/user/forgot-password", { email: this.email });
          this.message = response.data.message;
          this.success = true;
          this.$toast.success(this.message);
          setTimeout(() => {
            this.$router.push("/home");
          }, 3000);
        } catch (error) {
          this.message = error.response?.data?.message || "An error occurred.";
          this.success = false;
          this.$toast.error(this.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .forgot-password-card {
    max-width: 600px;
    margin: auto;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  </style>
  