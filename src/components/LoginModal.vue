<template>
  <div>
    <div
      class="modal fade"
      ref="myModal"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <!-- IMPORTANT: include modal-content -->
        <div class="modal-content modern-login-modal">
          <!-- Modal Header -->
          <div class="modal-header-section">
            <div class="header-content">
              <div class="header-icon">🔐</div>
              <div class="header-text">
                <h2 class="modal-title">Welcome Back</h2>
                <p class="modal-subtitle">Ready to dominate the zombie apocalypse?</p>
              </div>
              <button type="button" class="close-btn" @click="closeModal" aria-label="Close">
                <span class="close-icon">×</span>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="modal-body-section">
            <div class="info-banner">
              <div class="info-icon">ℹ️</div>
              <div class="info-text">
                <p class="info-main">Not registered yet?</p>
                <p class="info-sub">Join our server and type <code>/reg</code> to create an account!</p>
              </div>
            </div>

            <form @submit.prevent="login" class="login-form">
              <!-- Username Field -->
              <div class="form-group">
                <div class="input-wrapper">
                  <div class="input-icon">👤</div>
                  <input
                    type="text"
                    class="form-input"
                    id="inputUsername"
                    placeholder="Enter your username"
                    autocomplete="off"
                    v-model="username"
                    required
                  />
                  <div class="input-focus-border"></div>
                </div>
                <label for="inputUsername" class="input-label">Username</label>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <div class="input-wrapper">
                  <div class="input-icon">🔒</div>
                  <input
                    type="password"
                    class="form-input"
                    id="inputPassword"
                    placeholder="Enter your password"
                    v-model="password"
                    required
                  />
                  <div class="input-focus-border"></div>
                </div>
                <label for="inputPassword" class="input-label">Password</label>
              </div>

              <!-- Forgot Password Link -->
              <div class="forgot-password">
                <button type="button" class="forgot-link" @click.prevent="closeModalAndNavigate">
                  <span class="link-icon">🔁</span>
                  <span class="link-text">Forgot your password?</span>
                </button>
              </div>

              <!-- Login Button -->
              <div class="submit-section">
                <button type="submit" class="login-btn">
                  <span class="btn-icon">🚀</span>
                  <span class="btn-text">Login to Server</span>
                  <div class="btn-glow"></div>
                </button>
              </div>
            </form>

            <!-- Server Info -->
            <div class="server-info">
              <div class="server-badge">
                <span class="badge-icon">🌐</span>
                <span class="badge-text">51.77.72.157:27015</span>
              </div>
              <div class="server-badge">
                <span class="badge-icon">🟢</span>
                <span class="badge-text">Server Online</span>
              </div>
            </div>
          </div> <!-- /modal-body-section -->
        </div> <!-- /modal-content modern-login-modal -->
      </div> <!-- /modal-dialog -->
    </div> <!-- /modal -->
  </div>
</template>

<script>
// import Register from './Register.vue'
import { Modal } from 'bootstrap';
import { eventBus } from '../router/index';
import { useToast } from "vue-toastification";
import axiosInstance from '../config/axios'

export default {
  name: "LoginModal",
  components: { 
    // Register,
  },
  data(){
    return {
      username: '',
      password: '',
      error: '',
      modal: null,
    }
  },
  methods: {
    async login() {
      const toast = useToast();
      try {
        const data = await axiosInstance.post(`/user/login`, {
          username: this.username,
          password: this.password
        }).then(res => res.data);

        this.$store.dispatch('updateToken', data.token);
        this.$store.dispatch('updateLogged', true);
        this.$store.dispatch('updateUser', data.user);
        eventBus.emit("userLoggedIn");

        if (data.user.role === 'superadmin') {
          this.$router.push('/dashboard/home');
        }

        toast.success("You logged in successfully!");
        this.modal.hide();
        this.username = "";
        this.password = "";
      } catch (err) {
        this.error = err.message;
        // guard in case err.response is undefined
        const msg = err?.response?.data?.message || "Login failed. Please try again.";
        toast.error(msg);
      }
    },

    closeModal() {
      if (this.modal) {
        this.modal.hide();
      }
    },

    closeModalAndNavigate() {
      if (this.modal) {
        this.modal.hide();
      }
      this.$router.push('/forgot-password');
    },
  },

  mounted(){
    // Configure modal (no custom click handlers needed)
    this.modal = new Modal(this.$refs.myModal, {
      backdrop: 'static', // won't close on backdrop click
      keyboard: true,     // ESC closes (set to false if you want to prevent it)
      focus: true
    });

    eventBus.on("showLoginModal", () => {
      console.log("🔥 Received showLoginModal event in LoginModal.vue");
      this.modal.show();
    });
  },

  beforeUnmount() {
    eventBus.off("showLoginModal");
  }
};
</script>

<style scoped>
/* Modern Login Modal Styles */
.modern-login-modal {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  min-width: 450px;
  max-width: 500px;
  z-index: 1056; /* Ensure modal content is above backdrop */
}

.modern-login-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,26,26,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

/* Modal Header Section */
.modal-header-section {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 2rem 2rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.modal-header-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.header-icon {
  font-size: 3rem;
  margin-right: 1rem;
  animation: float 3s ease-in-out infinite;
}

.header-text {
  flex: 1;
}

.modal-title {
  font-family: 'Nosifer', cursive;
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modal-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 500;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.close-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Modal Body Section */
.modal-body-section {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

/* Info Banner */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.info-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-text { flex: 1; }

.info-main {
  font-weight: 700;
  color: #ff1a1a;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.info-sub {
  color: #cccccc;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

.info-sub code {
  background: rgba(255, 26, 26, 0.2);
  color: #ff1a1a;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

/* Login Form */
.login-form { margin-bottom: 2rem; }

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
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
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input::placeholder { color: rgba(255, 255, 255, 0.5); }

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

.form-input:focus + .input-focus-border { width: 100%; }

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

/* Forgot Password */
.forgot-password {
  text-align: right;
  margin-bottom: 2rem;
}

.forgot-link {
  background: none;
  border: none;
  color: #ff1a1a;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 10px;
}

.forgot-link:hover {
  color: #ff6b6b;
  background: rgba(255, 26, 26, 0.1);
  transform: translateX(5px);
}

.link-icon { font-size: 1rem; }

/* Submit Section */
.submit-section { margin-bottom: 2rem; }

.login-btn {
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
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(255, 26, 26, 0.4);
}

.login-btn:active { transform: translateY(-1px); }

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.login-btn:hover .btn-glow { left: 100%; }

.btn-icon { font-size: 1.2rem; }

/* Server Info */
.server-info {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.server-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.server-badge:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.badge-icon { font-size: 1rem; }
.badge-text { color: #cccccc; font-size: 0.85rem; font-weight: 600; }

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-login-modal {
    min-width: 350px;
    margin: 1rem;
  }
  .modal-header-section { padding: 1.5rem 1.5rem 1rem; }
  .modal-title { font-size: 1.5rem; }
  .modal-subtitle { font-size: 0.9rem; }
  .modal-body-section { padding: 1.5rem; }
  .info-banner { padding: 1rem; }
  .form-input { padding: 0.875rem 0.875rem 0.875rem 2.5rem; }
  .login-btn { padding: 0.875rem 1.5rem; font-size: 1rem; }
}

@media (max-width: 480px) {
  .modern-login-modal { min-width: 300px; }
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  .close-btn { position: absolute; top: 1rem; right: 1rem; }
  .server-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>
