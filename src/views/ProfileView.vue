<template>
  <div class="profile-view">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-content">
        <div class="hero-icon">👤</div>
        <div class="hero-text">
          <h1 class="hero-title">Player Profile</h1>
          <p class="hero-subtitle">Customize your identity and track your progress</p>
        </div>
        <div class="hero-stats">
          <div class="stat-badge">
            <span class="stat-icon">🎯</span>
            <span class="stat-value">{{ user.stats && user.stats.LEVEL || 1 }}</span>
            <span class="stat-label">Level</span>
          </div>
          <div class="stat-badge">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">{{ user.stats && user.stats.EXP || 0 }}</span>
            <span class="stat-label">EXP</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content">
      <div class="content-wrapper">
        <!-- Profile Photo Section -->
        <div class="profile-photo-section">
          <div class="photo-container">
            <img
              :src="profilePreview || getImageUrl(user.profilePhoto) || avatarUrl"
              alt="Profile"
              class="profile-photo"
            />
            <div class="photo-overlay">
              <div class="upload-icon">📷</div>
              <span class="upload-text">Change Photo</span>
            </div>
            <input
              class="photo-upload-input"
              type="file"
              id="formFile"
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
          <div class="photo-info">
            <h3 class="player-name">{{ user.username || 'Player' }}</h3>
            <div class="role-badge">
              <span class="role-icon">👑</span>
              <span class="role-text">{{ user.role || 'Player' }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Form Section -->
        <div class="profile-form-section">
          <div class="section-header">
            <div class="section-icon">⚙️</div>
            <div class="section-info">
              <h3 class="section-title">Profile Settings</h3>
              <p class="section-description">Update your personal information</p>
            </div>
          </div>

          <form @submit.prevent="saveProfile" class="profile-form">
            <!-- Username Field -->
            <div class="form-group">
              <div class="input-wrapper">
                <div class="input-icon">👤</div>
                <input
                  id="username"
                  v-model="user.username"
                  type="text"
                  class="form-input disabled"
                  placeholder="Enter your username"
                  disabled
                />
                <div class="input-focus-border"></div>
              </div>
              <label for="username" class="input-label">Username</label>
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <div class="input-wrapper">
                <div class="input-icon">📧</div>
                <input
                  id="email"
                  v-model="user.email"
                  type="email"
                  class="form-input disabled"
                  placeholder="Your email address"
                  disabled
                />
                <div class="input-focus-border"></div>
              </div>
              <label for="email" class="input-label">Email</label>
              <div class="field-note">Email cannot be changed</div>
            </div>

            <!-- Date of Birth Field -->
            <div class="form-group">
              <div class="input-wrapper">
                <div class="input-icon">🎂</div>
                <input
                  id="dob"
                  v-model="user.dateOfBirth"
                  type="date"
                  class="form-input"
                  required
                />
                <div class="input-focus-border"></div>
              </div>
              <label for="dob" class="input-label">Date of Birth</label>
            </div>

            <!-- Role Field -->
            <div class="form-group">
              <div class="input-wrapper">
                <div class="input-icon">👑</div>
                <input
                  id="role"
                  v-model="user.role"
                  type="text"
                  class="form-input disabled"
                  placeholder="Your role"
                  disabled
                />
                <div class="input-focus-border"></div>
              </div>
              <label for="role" class="input-label">Role</label>
              <div class="field-note">Role is managed by administrators</div>
            </div>

            <!-- Save Button -->
            <div class="submit-section">
              <button type="submit" class="save-btn">
                <span class="btn-icon">💾</span>
                <span class="btn-text">Save Changes</span>
                <div class="btn-glow"></div>
              </button>
            </div>
          </form>
        </div>

        <!-- Stats Section -->
        <div class="stats-section">
          <div class="section-header">
            <div class="section-icon">📊</div>
            <div class="section-info">
              <h3 class="section-title">Game Statistics</h3>
              <p class="section-description">Your in-game achievements and progress</p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <div class="stat-value">{{ user.stats && user.stats.LEVEL || 1 }}</div>
                <div class="stat-label">Level</div>
              </div>
              <div class="stat-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getLevelProgress() + '%' }"></div>
                </div>
                <div class="progress-text">{{ getLevelProgress() }}% to next level</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-content">
                <div class="stat-value">{{ user.stats && user.stats.EXP || 0 }}</div>
                <div class="stat-label">Experience</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">💎</div>
              <div class="stat-content">
                <div class="stat-value">{{ user.stats && user.stats.AP || 0 }}</div>
                <div class="stat-label">Ammo Packs</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-content">
                <div class="stat-value">{{ user.stats && user.stats.POINTS || 0 }}</div>
                <div class="stat-label">Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from '../config/userLogic';
import { getToken } from '../config/localStorage';
import { useToast } from 'vue-toastification';
import axiosInstance from '../config/axios'

export default {
  data() {
    return {
      user: {},
      profilePhoto: null,
      profilePreview: null,
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  computed: {
    avatarUrl() {
      if (!this.user.username) {
        return "https://ui-avatars.com/api/?rounded=true&name=User&background=ff1a1a&color=fff";
      }
      const name = encodeURIComponent(this.user.username);
      return `https://ui-avatars.com/api/?rounded=true&name=${name}&background=ff1a1a&color=fff`;
    },
  },
  methods: {
    async fetchUserProfile() {
      const userData = await getCurrentUser();
      if (userData.dateOfBirth) {
        userData.dateOfBirth = new Date(userData.dateOfBirth).toISOString().split('T')[0];
      }
      this.user = userData;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePhoto = file;
        this.profilePreview = URL.createObjectURL(file);
      }
    },
    getImageUrl(path) {
      return path ? `https://zm-westcstrike.com/${path}` : null;
    },
    getLevelProgress() {
      // Calculate level progress (example: 75% to next level)
      const exp = this.user.stats && this.user.stats.EXP || 0;
      // Simple calculation - you can adjust this based on your game's leveling system
      return Math.min(75, Math.floor((exp % 1000) / 10));
    },
    async saveProfile() {
      const toast = useToast();
      const formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('dateOfBirth', this.user.dateOfBirth);
      if (this.profilePhoto) {
        formData.append('profilePhoto', this.profilePhoto);
      }

      try {
        const token = getToken();
        await axiosInstance.put('/user/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        toast.success("Profile updated successfully!");
        await this.fetchUserProfile();
        this.profilePreview = null;
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to update profile.');
        console.error('Error updating profile:', error.response?.data?.error);
      }
    },
  },
};
</script>

<style scoped>
/* Profile View Container */
.profile-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.profile-view::before {
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

/* Hero Header */
.hero-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-header::before {
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

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-family: 'Nosifer', cursive;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-badge {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 120px;
}

.stat-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Profile Content */
.profile-content {
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

/* Profile Photo Section */
.profile-photo-section {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  padding: 3rem;
  text-align: center;
}

.photo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.profile-photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #ff1a1a;
  box-shadow: 0 10px 30px rgba(255, 26, 26, 0.3);
  transition: all 0.3s ease;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.photo-container:hover .photo-overlay {
  opacity: 1;
}

.photo-container:hover .profile-photo {
  transform: scale(1.05);
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.upload-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
}

.photo-upload-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.photo-info {
  text-align: center;
}

.player-name {
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
}

.role-icon {
  font-size: 1.2rem;
}

.role-text {
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Profile Form Section */
.profile-form-section {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  padding: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.section-description {
  color: #cccccc;
  margin: 0;
  font-size: 0.9rem;
}

/* Form Styles */
.profile-form {
  display: grid;
  gap: 2rem;
}

.form-group {
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

.form-input.disabled {
  background: rgba(255, 255, 255, 0.02);
  color: #888;
  cursor: not-allowed;
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

.field-note {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Submit Section */
.submit-section {
  margin-top: 1rem;
}

.save-btn {
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

.save-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(255, 26, 26, 0.4);
}

.save-btn:active {
  transform: translateY(-1px);
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

.save-btn:hover .btn-glow {
  left: 100%;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  padding: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 30px rgba(255, 26, 26, 0.2);
}

.stat-card .stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.stat-content {
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ff1a1a;
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 1rem;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.stat-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff1a1a 0%, #cc0000 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #888;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-header {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat-badge {
    min-width: 100px;
    padding: 0.75rem 1rem;
  }
  
  .profile-content {
    padding: 2rem 1rem;
  }
  
  .content-wrapper {
    gap: 1.5rem;
  }
  
  .profile-photo-section,
  .profile-form-section,
  .stats-section {
    padding: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-icon {
    font-size: 3rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
