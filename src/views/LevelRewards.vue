<template>
  <div class="level-rewards-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-icon">🏆</span>
          Level Rewards
        </h1>
        <p class="subtitle">Unlock rewards as you progress through levels</p>
      </div>
    </div>

    <!-- Authentication Alert -->
    <div v-if="!isLoggedIn" class="auth-alert">
      <div class="alert-content">
        <div class="alert-icon">🔒</div>
        <div class="alert-text">
          <h3>Authentication Required</h3>
          <p>You must be logged in to view and claim rewards</p>
          <button class="login-btn" @click="buss.emit('showLoginModal')">
            <span class="btn-icon">🔐</span>
            Login Now
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content for Logged In Users -->
    <div v-else class="main-content">
      <!-- Info Banner -->
      <div class="info-banner">
        <div class="banner-content">
          <div class="banner-icon">🎯</div>
          <div class="banner-text">
            <h3>Reward Overview</h3>
            <p>Earn up to <strong>~4000 Ammo Packs</strong> and <strong>~1000 Points</strong> by claiming all rewards!</p>
            <div class="warning-text">
              <span class="warning-icon">⚠️</span>
              <span><strong>Warning:</strong> If you have <strong>2000 Ammo Packs</strong>, you can't receive more until you spend some. Check your stats in your <router-link class="profile-link" to="/profile">Profile</router-link>.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div v-if="rewards.length > 0" class="progress-section">
        <div class="progress-header">
          <h3>Progress Tracker</h3>
          <div class="progress-stats">
            <span class="stat-item">
              <span class="stat-icon">✅</span>
              {{ claimedCount }} / 100 Claimed
            </span>
            <span class="stat-item">
              <span class="stat-icon">📊</span>
              {{ progressPercentage }}% Complete
            </span>
          </div>
        </div>
        <div class="progress-container">
          <div class="progress-bar-wrapper">
            <div 
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <div class="progress-label">{{ progressPercentage }}%</div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading rewards...</p>
      </div>

      <!-- Rewards Grid -->
      <div v-else class="rewards-grid">
        <div 
          v-for="reward in rewards" 
          :key="reward.level" 
          class="reward-card"
          :class="{
            'claimed': reward.claimed,
            'available': reward.canClaim && !reward.claimed,
            'locked': !reward.canClaim
          }"
        >
          <div class="card-header">
            <div class="level-badge">
              <span class="level-number">{{ reward.level }}</span>
            </div>
            <div class="status-indicator">
              <span v-if="reward.claimed" class="status claimed">✅ Claimed</span>
              <span v-else-if="reward.canClaim" class="status available">🎯 Available</span>
              <span v-else class="status locked">🔒 Locked</span>
            </div>
          </div>

          <div class="card-body">
            <div class="rewards-list">
              <div class="reward-item">
                <span class="reward-icon">🎯</span>
                <span class="reward-label">Ammo Packs:</span>
                <span class="reward-value">{{ reward.reward.ammoPacks }}</span>
              </div>
              <div v-if="reward.reward.points > 0" class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-label">Points:</span>
                <span class="reward-value">{{ reward.reward.points }}</span>
              </div>
            </div>

            <button
              v-if="reward.canClaim && !reward.claimed"
              @click="claimReward(reward.level)"
              class="claim-btn"
            >
              <span class="btn-icon">🎁</span>
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from "../config/userLogic";
import configuration from "../config/config";
import { eventBus } from "../router";
import { useToast } from "vue-toastification";
import axiosInstance from '../config/axios'

export default {
  data() {
    return {
      currentUser: null,
      rewards: [],
      loading: true,
      buss: eventBus
    };
  },
  computed: {
    claimedCount() {
      return this.rewards.filter(r => r.claimed).length;
    },
    progressPercentage() {
      return Math.floor((this.claimedCount / 100) * 100);
    },
    isLoggedIn() {
      return !!this.$store.state.user;
    }
  },
  methods: {
    async fetchRewards() {
      const toast = useToast();
      try {
        // Safety check - don't fetch if not logged in
        if (!this.isLoggedIn) {
          console.log("User not logged in, skipping rewards fetch");
          return;
        }
        
        this.loading = true;
        const res = await axiosInstance.get("/rcon/levelRewardStatus", configuration());
        if (res.data.success) {
          // 🧠 Sort rewards for better UX
          res.data.rewards.sort((a, b) => {
            if (a.canClaim && !a.claimed && !(b.canClaim && !b.claimed)) return -1;
            if (!(a.canClaim && !a.claimed) && b.canClaim && !b.claimed) return 1;
            if (a.claimed && !b.claimed) return 1;
            if (!a.claimed && b.claimed) return -1;
            return a.level - b.level;
          });

          this.rewards = res.data.rewards;
        }
      } catch (error) {
        console.error("Error fetching level rewards:", error);
        toast.error(error.response?.data?.message || "Failed to load rewards.");
      } finally {
        this.loading = false;
      }
    },
    async listenToAuthChanges() {
      eventBus.on("userLoggedIn", async () => {
        if (this.$store.state.user) {
          this.currentUser = this.$store.state.user;
          await this.fetchRewards();
        }
      });
      
      // Also listen for logout events
      eventBus.on("userLoggedOut", () => {
        this.currentUser = null;
        this.rewards = [];
        this.loading = false;
      });
    },
    async claimReward(level) {
      const toast = useToast();
      
      // Safety check - don't allow claiming if not logged in
      if (!this.isLoggedIn) {
        toast.error("You must be logged in to claim rewards.");
        return;
      }
      
      try {
        const res = await axiosInstance.post("/rcon/claim-level-reward", { level }, configuration());
        if (res.data.success) {
          toast.success(`Successfully claimed level ${level} reward!`);
          this.fetchRewards(); // Refresh the list after claiming
        }
      } catch (error) {
        console.error("Error claiming reward:", error);
        toast.error(error.response?.data?.message || "Failed to claim reward.");
      }
    }
  },
  async mounted() {
    // Set up event listeners first
    this.listenToAuthChanges();
    
    const user = await getCurrentUser();
    if (user) {
      this.currentUser = user;
      // Only fetch rewards if user is logged in
      await this.fetchRewards();
    }
    // If no user, don't fetch rewards - just wait for login event
  },
  beforeUnmount() {
    eventBus.off("userLoggedIn");
    eventBus.off("userLoggedOut");
  },
};
</script>

<style scoped>
.level-rewards-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
  font-family: 'Nosifer', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2.5rem;
  animation: bounce 2s infinite;
}

.subtitle {
  font-size: 1.2rem;
  color: #cccccc;
  font-weight: 300;
  margin: 0;
}

/* Authentication Alert */
.auth-alert {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.alert-content {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(255, 26, 26, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.alert-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.alert-text h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.alert-text p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.login-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Info Banner */
.info-banner {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(255, 26, 26, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.banner-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.banner-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.banner-text h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.banner-text p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.warning-text {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #ffcc00;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.warning-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.profile-link {
  color: #ffcc00;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.profile-link:hover {
  color: white;
  text-decoration: underline;
}

/* Progress Section */
.progress-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.progress-header h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.progress-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  color: #cccccc;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 1.2rem;
}

.progress-container {
  position: relative;
}

.progress-bar-wrapper {
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
  border-radius: 15px;
  transition: width 0.8s ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #cccccc;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 26, 26, 0.3);
  border-top: 4px solid #ff1a1a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

/* Rewards Grid */
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.reward-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.reward-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff1a1a, #cc0000);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.reward-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.reward-card:hover::before {
  opacity: 1;
}

.reward-card.claimed {
  border-color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.reward-card.available {
  border-color: #ff1a1a;
  background: rgba(255, 26, 26, 0.1);
}

.reward-card.locked {
  border-color: #6c757d;
  background: rgba(108, 117, 125, 0.1);
  opacity: 0.7;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.level-badge {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(255, 26, 26, 0.3);
}

.level-number {
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
}

.status-indicator {
  text-align: right;
}

.status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status.claimed {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.status.available {
  background: rgba(255, 26, 26, 0.2);
  color: #ff1a1a;
  border: 1px solid rgba(255, 26, 26, 0.3);
}

.status.locked {
  background: rgba(108, 117, 125, 0.2);
  color: #6c757d;
  border: 1px solid rgba(108, 117, 125, 0.3);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.reward-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.reward-label {
  color: #cccccc;
  font-weight: 500;
  flex: 1;
}

.reward-value {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.claim-btn {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px rgba(255, 26, 26, 0.3);
}

.claim-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.4);
  background: linear-gradient(135deg, #cc0000 0%, #ff1a1a 100%);
}

.claim-btn:active {
  transform: translateY(0);
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .level-rewards-container {
    padding: 1rem 0.5rem;
  }
  
  .main-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .progress-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .progress-stats {
    gap: 1rem;
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .status-indicator {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
  }
  
  .info-banner,
  .progress-section {
    padding: 1.5rem;
  }
  
  .reward-card {
    padding: 1rem;
  }
  
  .level-badge {
    width: 50px;
    height: 50px;
  }
  
  .level-number {
    font-size: 1.2rem;
  }
}
</style>
  