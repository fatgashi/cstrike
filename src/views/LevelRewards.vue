<template>
    <div class="container">
      <br>
      <h2 class="text-start mb-4 fw-bolder" style="color: #ff1a1a; font-family: 'Nosifer', cursive;">Level Rewards</h2>
  
      <!-- 🛑 Show if not logged in -->
      <div v-if="!isLoggedIn" class="alert alert-danger text-dark fw-bold text-center">
        🔒 You must be logged in to view and claim rewards.
        <br>
        <button class="btn btn-primary mt-2" @click="buss.emit('showLoginModal')">
          🔐 Login Now
        </button>
      </div>
  
      <!-- ✅ Main view for logged in users -->
      <div v-else>
        <!-- 📢 Info Row -->
        <div class="alert text-white fw-bold" style="background-color: #ff1a1a;" role="alert">
          🎯 You can earn up to <strong>~4000 Ammo Packs</strong> and <strong>~1000 Points</strong> by claiming all rewards!
          <br>
          ⚠️ <strong>Warning:</strong> If you have <strong>2000 Ammo Packs</strong>, you can't receive more until you spend some.
          To check your stats go to <router-link class="text-white" to="/profile">Profile</router-link>.
        </div>
  
        <!-- 📊 Progress Bar -->
        <div v-if="rewards.length > 0" class="mb-4">
          <div class="text-white fw-bold mb-2 text-center">
            🎯 Claimed {{ claimedCount }} / 100 Rewards ({{ progressPercentage }}%)
          </div>
          <div class="progress" style="height: 25px;">
            <div 
              class="progress-bar progress-bar-striped progress-bar-animated bg-success" 
              role="progressbar" 
              :style="{ width: progressPercentage + '%' }"
              aria-valuenow="progressPercentage" aria-valuemin="0" aria-valuemax="100">
              {{ progressPercentage }}%
            </div>
          </div>
        </div>
  
        <div v-if="loading" class="text-center text-white">
          Loading rewards...
        </div>
  
        <div v-else>
          <div class="row">
            <div v-for="reward in rewards" :key="reward.level" class="col-12 col-md-6 col-lg-4 mb-4">
              <div 
                class="card p-3 h-100"
                :class="{
                  'bg-dark text-white': true,
                  'border-success': reward.claimed,
                  'border-red': reward.canClaim && !reward.claimed,
                  'border-secondary': !reward.canClaim
                }"
              >
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="fw-bold">Level {{ reward.level }}</h5>
                    <p class="mb-1">🎯 Ammo Packs: <strong>{{ reward.reward.ammoPacks }}</strong></p>
                    <p class="mb-1" v-if="reward.reward.points > 0">⭐ Points: <strong>{{ reward.reward.points }}</strong></p>
                  </div>
  
                  <div>
                    <button
                      v-if="reward.canClaim && !reward.claimed"
                      @click="claimReward(reward.level)"
                      class="btn w-100 mt-2"
                      style="background-color: #ff1a1a;"
                    >
                      Claim Reward
                    </button>
  
                    <div v-else-if="reward.claimed" class="text-success fw-bolder text-center mt-2">
                      ✅ Claimed
                    </div>
  
                    <div v-else class="text-secondary fw-bolder text-center mt-2">
                      🔒 Locked
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <br><br>
    </div>
</template>
  
  
  <script>
  import { getCurrentUser } from "../config/userLogic";
  import configuration from "../config/config";
  import { eventBus } from "../router";
import { useToast } from "vue-toastification";
  
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
                this.loading = true;
                const res = await this.$axios.get("/rcon/levelRewardStatus", configuration());
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
                    await this.fetchRewards();
                }
            });
        },
      async claimReward(level) {
        const toast = useToast();
        try {
          const res = await this.$axios.post("/rcon/claim-level-reward", { level }, configuration());
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
        const user = await getCurrentUser();
        if (user){
            this.currentUser = user;
            this.fetchRewards();
        } else {
            await this.listenToAuthChanges();
        }
    },
    beforeUnmount() {
        eventBus.off("userLoggedIn");
    },
  };
  </script>
  
  <style scoped>
  .border-red {
    border-color: #ff1a1a !important;
  }
  .card {
    border: 2px solid transparent;
    transition: 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-3px);
  }
  
  .card .btn {
    font-weight: bold;
  }
  
  .progress {
    background-color: #333;
  }
  
  .progress-bar {
    font-weight: bold;
  }
  </style>
  