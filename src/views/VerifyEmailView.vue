<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 70vh;">
    <div class="text-center text-white w-100">
      <h2 class="fw-bolder mb-4">Email Verification</h2>
      <p v-if="isVerifying">Verifying your email, please wait...</p>
      <p v-else>{{ verificationStatus }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isVerifying: true,
      verificationStatus: "",
    };
  },
  mounted() {
    this.verifyEmail();
  },
  methods: {
    async verifyEmail() {
      const token = this.$route.query.token;

      if (!token) {
        this.verificationStatus = "Invalid verification link.";
        this.isVerifying = false;
        return;
      }

      try {
        await this.$axios.get(`/user/verify-email?token=${token}`);
        this.verificationStatus = "✅ Email verified successfully! You can now log in.";
        this.$toast.success("✅ Email verified! Redirecting to login...");
        
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      } catch (error) {
        console.error(error);
        this.verificationStatus = "❌ Verification failed. Link may be expired or invalid.";
        this.$toast.error("❌ Verification failed!");
      } finally {
        this.isVerifying = false;
      }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a202c;
}

.max-w-md {
  max-width: 28rem;
}

.w-full {
  width: 100%;
}

.bg-white {
  background-color: #fff;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.p-8 {
  padding: 2rem;
}

.text-center {
  text-align: center;
}

.text-2xl {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-gray-900 {
  color: #1a202c;
}

.text-gray-700 {
  color: #4a5568;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
