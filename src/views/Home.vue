<template>
  <div class="home-container">
    <!-- Daily Reward Banner -->
    <div v-if="isLoggedIn && showDailyBanner" class="daily-reward-banner">
      <div class="banner-content">
        <div class="banner-icon">🎁</div>
        <div class="banner-text">
          <h3>Daily Reward Available!</h3>
          <p>Don't miss your daily bonus - claim it now!</p>
        </div>
        <button class="claim-btn" @click="claimReward">
          <span class="btn-icon">⚡</span>
          Claim Now
        </button>
      </div>
    </div>

    <!-- Hero Banner Section -->
    <Banner :players="server" />

    <!-- Features Grid Section -->
    <Infos />

    <!-- Carousel Section -->
    <div class="carousel-section">
      <div class="container">
        <div class="section-header">
          <h2>🎮 Latest Updates & Events</h2>
          <p>Stay updated with the newest content and features</p>
        </div>
        <Carousels />
      </div>
    </div>

    <!-- Main Content Sections -->
    <div class="main-content">
      <!-- Top Players Section -->
      <div class="content-section">
        <div class="container">
          <div class="section-header">
            <h2>🏆 Top Players Leaderboard</h2>
            <p>See who's dominating the server</p>
          </div>
          <Top15 />
        </div>
      </div>

      <!-- Partner Section -->
      <div class="content-section partner-section">
        <div class="container">
          <div class="section-header">
            <h2>🤝 Our Partners</h2>
            <p>Working together for the best gaming experience</p>
          </div>
          <Partner />
        </div>
      </div>

      <!-- Game Modes Section -->
      <div class="content-section modes-section">
        <div class="container">
          <div class="section-header">
            <h2>🎯 Game Modes</h2>
            <p>Experience different ways to play</p>
          </div>
          <Modes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import Carousels from "../components/Carousel.vue";
import Banner from "../components/Banner.vue";
import Infos from "../components/Infos.vue";
import configuration from "../config/config";
import { getCurrentUser } from "../config/userLogic";
import { eventBus } from "../router/index";
import { useToast } from "vue-toastification";
import axiosInstance from '../config/axios'

export default {
  name: "HomePage",
  metaInfo() {
    return {
      title: 'CS 1.6 Zombie Server | Zm-WestCStrike',
      meta: [
        {
          name: 'description',
          content: 'Join Zm-WestCStrike – the ultimate CS 1.6 zombie plague server. Enjoy thrilling zombie battles, unique modes, and a great gaming community!'
        },
        {
          name: 'keywords',
          content: 'CS 1.6 zombie server, zombie plague server, Counter-Strike 1.6, zm-westcstrike, CS zombie mode, CS 1.6 multiplayer'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://zm-westcstrike.com/home'
        }
      ]
    };
  },
  components: {
    Banner,
    Infos,
    Carousels,
    Modes: defineAsyncComponent(() => import('../components/Modes.vue')),
    Partner: defineAsyncComponent(() => import('../components/Partner.vue')),
    Top15: defineAsyncComponent(() => import('../components/Top15.vue')),
  },
  data() {
    return {
      heightString: "0px", // Default height in px
      server: 0,
      showDailyBanner: false
    };
  },
  methods: {
    matchHeight() {
      if (this.$refs.firstDiv) {
        const height = this.$refs.firstDiv.clientHeight;
        this.heightString = `${height}px`;
      }
    },
    async checkDailyReward() {
      try {
        const config = configuration();
        const res = await axiosInstance.get("/rcon/canClaimDailyReward", config);
        this.showDailyBanner = res.data.canClaim;
      } catch (err) {
        console.error("Error checking daily reward:", err);
      }
    },
    async claimReward() {
      const toast = useToast();
      try {
        const config = configuration();
        const res = await axiosInstance.post("/rcon/claim-daily-reward", {}, config);
        toast.success(res.data.message || "Reward claimed!");
        this.showDailyBanner = false;
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to claim reward.");
      }
    },
    listenToAuthChanges() {
      eventBus.on("userLoggedIn", async () => {
        if (this.$store.state.user) {
          await this.checkDailyReward();
        }
      });

      eventBus.on("userLoggedOut", () => {
        this.showDailyBanner = false;
      });
    },
  },
  computed: {
    isLoggedIn() {
      return !!this.$store.state.user;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.matchHeight();
      }, 50); // Adjust delay if needed
    });

    // Update height on window resize
    window.addEventListener("resize", this.matchHeight);
  },
  async created(){
    try {
        const response = await axiosInstance.get('/game/serverInfo');
        this.server = response.data.state.numplayers;
        const user = await getCurrentUser();
      if (user) await this.checkDailyReward();
      this.listenToAuthChanges();
    } catch (error) {
        console.error("Error fetching server info:", error);
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.matchHeight);
    eventBus.off("userLoggedIn");
    eventBus.off("userLoggedOut");
  },
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Daily Reward Banner */
.daily-reward-banner {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1rem 2rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(255, 26, 26, 0.3);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.banner-icon {
  font-size: 2.5rem;
  animation: bounce 2s infinite;
}

.banner-text {
  flex: 1;
  text-align: center;
}

.banner-text h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.banner-text p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

.claim-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.claim-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Carousel Section */
.carousel-section {
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.02);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.section-header p {
  font-size: 1.2rem;
  color: #cccccc;
  font-weight: 300;
}

/* Main Content Sections */
.main-content {
  padding: 2rem 0;
}

.content-section {
  padding: 4rem 0;
  margin-bottom: 2rem;
}

.content-section:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.partner-section {
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.modes-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(255, 26, 26, 0.05) 100%);
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

/* Responsive Design */
@media (max-width: 768px) {
  .home-container {
    padding: 0 0.5rem;
  }
  
  .daily-reward-banner {
    padding: 1rem;
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .banner-text {
    order: 2;
  }
  
  .claim-btn {
    order: 3;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .carousel-section,
  .content-section {
    padding: 2rem 0;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
  
  .banner-icon {
    font-size: 2rem;
  }
  
  .banner-text h3 {
    font-size: 1.1rem;
  }
}
</style>
