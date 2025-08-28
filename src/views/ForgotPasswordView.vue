<template>
  <div class="forgot-password-container">
    <!-- Background Pattern -->
    <div class="background-pattern"></div>
    
    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-icon">🔐</div>
        <div class="header-text">
          <h1 class="main-title">Forgot Password?</h1>
          <p class="subtitle">Don't worry! We'll help you get back into the game</p>
        </div>
      </div>

      <!-- Form Card -->
      <div class="form-card">
        <div class="card-header">
          <div class="card-icon">📧</div>
          <h2 class="card-title">Reset Your Password</h2>
          <p class="card-description">Enter your email address and we'll send you a reset link</p>
        </div>

        <form @submit.prevent="requestPasswordReset" class="reset-form">
          <!-- Email Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">📧</div>
              <input
                type="email"
                v-model="email"
                class="form-input"
                id="resetEmail"
                placeholder="Enter your email address"
                required
                autocomplete="email"
              />
              <div class="input-focus-border"></div>
            </div>
            <label for="resetEmail" class="input-label">Email Address</label>
          </div>

          <!-- Submit Button -->
          <div class="submit-section">
            <button type="submit" class="reset-btn" :disabled="isLoading">
              <span class="btn-icon" v-if="!isLoading">🚀</span>
              <span class="btn-icon loading" v-else>⏳</span>
              <span class="btn-text">{{ isLoading ? 'Sending...' : 'Send Reset Link' }}</span>
              <div class="btn-glow"></div>
            </button>
          </div>
        </form>

        <!-- Help Section -->
        <div class="help-section">
          <div class="help-icon">💡</div>
          <div class="help-content">
            <h3 class="help-title">Need Help?</h3>
            <p class="help-text">If your email doesn't work or you need assistance, contact our support team:</p>
            <div class="support-links">
              <a 
                href="https://discordapp.com/users/947193667188306011" 
                target="_blank" 
                class="support-link"
              >
                <span class="link-icon">👤</span>
                <span class="link-text">emosbg</span>
              </a>
              <span class="separator">or</span>
              <a 
                href="https://discordapp.com/users/1150374397606113370" 
                target="_blank" 
                class="support-link"
              >
                <span class="link-icon">👤</span>
                <span class="link-text">assos13-14</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Back to Login -->
        <div class="back-section">
          <button @click="$router.push('/home')" class="back-btn">
            <span class="back-icon">←</span>
            <span class="back-text">Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import axiosInstance from '../config/axios'

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      email: "",
      message: "",
      success: false,
      isLoading: false
    };
  },
  methods: {
    async requestPasswordReset() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      const toast = useToast();
      
      try {
        const response = await axiosInstance.post("/user/forgot-password", { email: this.email });
        this.message = response.data.message;
        this.success = true;
        toast.success(this.message);
        
        // Redirect after success
        setTimeout(() => {
          this.$router.push("/home");
        }, 3000);
      } catch (error) {
        this.message = error.response?.data?.message || "An error occurred while processing your request.";
        this.success = false;
        toast.error(this.message);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #262626 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 26, 26, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 26, 26, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.content-wrapper {
  width: 100%;
  max-width: 500px;
  z-index: 1;
  position: relative;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease-out;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.main-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(255, 26, 26, 0.5);
}

.subtitle {
  font-size: 1.1rem;
  color: #cccccc;
  margin: 0;
  opacity: 0.9;
}

/* Form Card */
.form-card {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(255, 26, 26, 0.2);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.card-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #cccccc;
  font-size: 1rem;
  margin: 0;
  opacity: 0.8;
}

/* Form Styling */
.reset-form {
  margin-bottom: 2rem;
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  color: #ff1a1a;
  z-index: 2;
}

.form-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1rem 1rem 1rem 3rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-input:focus {
  outline: none;
  border-color: #ff1a1a;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(255, 26, 26, 0.3);
}

.input-focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff1a1a 0%, #cc0000 100%);
  transition: width 0.3s ease;
}

.form-input:focus + .input-focus-border {
  width: 100%;
}

.input-label {
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  background: linear-gradient(135deg, #262626 0%, #404040 100%);
  padding: 0 0.5rem;
  color: #ff1a1a;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Submit Button */
.submit-section {
  margin-bottom: 2rem;
}

.reset-btn {
  width: 100%;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(255, 26, 26, 0.4);
}

.reset-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.reset-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.reset-btn:hover:not(:disabled) .btn-glow {
  left: 100%;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-icon.loading {
  animation: spin 1s linear infinite;
}

/* Help Section */
.help-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.help-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-align: center;
}

.help-text {
  color: #cccccc;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.support-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.support-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff1a1a;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 26, 26, 0.1);
  border: 1px solid rgba(255, 26, 26, 0.2);
}

.support-link:hover {
  background: rgba(255, 26, 26, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 26, 26, 0.3);
}

.link-icon {
  font-size: 1rem;
}

.separator {
  color: #cccccc;
  font-weight: 600;
}

/* Back Button */
.back-section {
  text-align: center;
}

.back-btn {
  background: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #cccccc;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
}

.back-btn:hover {
  border-color: #ff1a1a;
  color: #ff1a1a;
  background: rgba(255, 26, 26, 0.1);
  transform: translateY(-2px);
}

.back-icon {
  font-size: 1.1rem;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    max-width: 100%;
  }
  
  .form-card {
    padding: 2rem 1.5rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .support-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .separator {
    display: none;
  }
}

@media (max-width: 480px) {
  .forgot-password-container {
    padding: 1rem 0.5rem;
  }
  
  .form-card {
    padding: 1.5rem 1rem;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
  
  .header-icon {
    font-size: 3rem;
  }
}
</style>
  