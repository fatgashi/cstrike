<template>
  <div class="reset-password-container">
    <!-- Background Pattern -->
    <div class="background-pattern"></div>
    
    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-icon">🔑</div>
        <div class="header-text">
          <h1 class="main-title">Reset Your Password</h1>
          <p class="subtitle">Create a new secure password for your account</p>
        </div>
      </div>

      <!-- Form Card -->
      <div class="form-card">
        <div class="card-header">
          <div class="card-icon">🔄</div>
          <h2 class="card-title">Create New Password</h2>
          <p class="card-description">Enter your new password below to complete the reset process</p>
        </div>

        <form @submit.prevent="resetPassword" class="reset-form">
          <!-- New Password Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">🔒</div>
              <input
                type="password"
                v-model="password"
                class="form-input"
                id="newPassword"
                placeholder="Enter your new password"
                required
                minlength="8"
                autocomplete="new-password"
              />
              <div class="input-focus-border"></div>
            </div>
            <label for="newPassword" class="input-label">New Password</label>
            <div class="password-requirements">
              <small class="requirement-text">Minimum 8 characters required</small>
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div class="form-group">
            <div class="input-wrapper">
              <div class="input-icon">✅</div>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-input"
                id="confirmPassword"
                placeholder="Confirm your new password"
                required
                minlength="8"
                autocomplete="new-password"
              />
              <div class="input-focus-border"></div>
            </div>
            <label for="confirmPassword" class="input-label">Confirm Password</label>
            <div class="password-match" v-if="confirmPassword">
              <span class="match-icon" :class="{ 'match': password === confirmPassword, 'mismatch': password !== confirmPassword }">
                {{ password === confirmPassword ? '✓' : '✗' }}
              </span>
              <span class="match-text" :class="{ 'match': password === confirmPassword, 'mismatch': password !== confirmPassword }">
                {{ password === confirmPassword ? 'Passwords match' : 'Passwords do not match' }}
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="submit-section">
            <button type="submit" class="reset-btn" :disabled="isLoading || !canSubmit">
              <span class="btn-icon" v-if="!isLoading">🚀</span>
              <span class="btn-icon loading" v-else>⏳</span>
              <span class="btn-text">{{ isLoading ? 'Updating...' : 'Update Password' }}</span>
              <div class="btn-glow"></div>
            </button>
          </div>
        </form>

        <!-- Security Tips -->
        <div class="security-tips">
          <div class="tips-icon">💡</div>
          <div class="tips-content">
            <h3 class="tips-title">Password Security Tips</h3>
            <ul class="tips-list">
              <li>Use at least 8 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid common words or phrases</li>
            </ul>
          </div>
        </div>

        <!-- Back to Home -->
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
  name: 'ResetPasswordView',
  data() {
    return {
      password: "",
      confirmPassword: "",
      message: "",
      token: "",
      success: false,
      isLoading: false
    };
  },
  computed: {
    canSubmit() {
      return this.password.length >= 8 && this.password === this.confirmPassword;
    }
  },
  created() {
    this.token = this.$route.query.token;
    if (!this.token) {
      this.$router.push('/forgot-password');
    }
  },
  methods: {
    async resetPassword() {
      if (this.isLoading || !this.canSubmit) return;
      
      this.isLoading = true;
      const toast = useToast();
      
      if (this.password !== this.confirmPassword) {
        this.message = "Passwords do not match!";
        toast.error(this.message);
        this.success = false;
        this.isLoading = false;
        return;
      }

      try {
        const response = await axiosInstance.post("/user/reset-password", {
          token: this.token,
          newPassword: this.password
        });

        this.message = response.data.message;
        this.success = true;
        toast.success("Password updated successfully!");
        
        // Redirect after success
        setTimeout(() => {
          this.$router.push("/home");
        }, 3000);
      } catch (error) {
        this.message = error.response?.data?.message || "An error occurred while updating your password.";
        toast.error(this.message);
        this.success = false;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.reset-password-container {
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

/* Password Requirements */
.password-requirements {
  margin-top: 0.5rem;
  text-align: center;
}

.requirement-text {
  color: #888888;
  font-size: 0.8rem;
  font-style: italic;
}

/* Password Match Indicator */
.password-match {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.match-icon {
  font-size: 1rem;
  font-weight: bold;
}

.match-icon.match {
  color: #00ff88;
}

.match-icon.mismatch {
  color: #ff4444;
}

.match-text {
  font-size: 0.85rem;
  font-weight: 600;
}

.match-text.match {
  color: #00ff88;
}

.match-text.mismatch {
  color: #ff4444;
}

/* Submit Button */
.submit-section {
  margin-bottom: 2rem;
}

.reset-btn {
  width: 100%;
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  border: none;
  color: #000000;
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
  box-shadow: 0 15px 30px rgba(0, 255, 136, 0.4);
}

.reset-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  background: linear-gradient(135deg, #666666 0%, #444444 100%);
  color: #cccccc;
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

/* Security Tips */
.security-tips {
  background: rgba(0, 255, 136, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.tips-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.tips-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: #00ff88;
  margin-bottom: 1rem;
  text-align: center;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  color: #cccccc;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  position: relative;
  padding-left: 1.5rem;
}

.tips-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #00ff88;
  font-weight: bold;
}

.tips-list li:last-child {
  border-bottom: none;
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
  border-color: #00ff88;
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
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
}

@media (max-width: 480px) {
  .reset-password-container {
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
  