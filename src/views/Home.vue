<template>
  <div style="position: relative;">
    <div style="z-index: 2;">
      <div v-if="isLoggedIn && showDailyBanner" class="alert mb-0 alert-warning text-center">
      🎁 You haven't claimed your <strong>Daily Reward</strong> yet!
        <button class="btn ms-3" style="background-color: #39ff14;" @click="claimReward">Claim Now</button>
      </div>
      <Banner :players="server" />
      <Infos />
      <div class="row rowi row-cols-1 row-cols-md-3 mt-3 d-flex justify-content-center">
        <div ref="firstDiv" class="row carousel mb-3">
          <Carousel :dynamicHeight="heightString" />
        </div>
        <div class="row carousel mb-3">
          <Carousel1 :dynamicHeight="heightString"/>
        </div>
        <div class="row carousel">
          <Carousel2 :dynamicHeight="heightString"/>
        </div>
      </div>
      <div>
        <Top15 />
        <Partner />
        <Modes />
      </div>
  </div>
    </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Carousel1 from "../components/Carousel1.vue";
import Carousel2 from "../components/Carousel2.vue";
import Banner from "../components/Banner.vue";
import Infos from "../components/Infos.vue";
import Modes from "../components/Modes.vue";
import Partner from '../components/Partner.vue';
import Top15 from '../components/Top15.vue';
import configuration from "../config/config";
import { getCurrentUser } from "../config/userLogic";
import { eventBus } from "../router/index";

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
    Carousel,
    Carousel1,
    Carousel2,
    Modes,
    Partner,
    Top15
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
        const res = await this.$axios.get("/rcon/canClaimDailyReward", config);
        this.showDailyBanner = res.data.canClaim;
      } catch (err) {
        console.error("Error checking daily reward:", err);
      }
    },
    async claimReward() {
      try {
        const config = configuration();
        const res = await this.$axios.post("/rcon/claim-daily-reward", {}, config);
        this.$toast.success(res.data.message || "Reward claimed!");
        this.showDailyBanner = false;
      } catch (err) {
        this.$toast.error(err.response?.data?.message || "Failed to claim reward.");
      }
    },
    listenToAuthChanges() {
      eventBus.$on("userLoggedIn", async () => {
        if (this.$store.state.user) {
          await this.checkDailyReward();
        }
      });

      eventBus.$on("userLoggedOut", () => {
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
        const response = await this.$axios.get('/game/serverInfo');
        this.server = response.data.state.numplayers;
        const user = await getCurrentUser();
      if (user) await this.checkDailyReward();
      this.listenToAuthChanges();
    } catch (error) {
        console.error("Error fetching server info:", error);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.matchHeight);
    eventBus.$off("userLoggedIn");
    eventBus.$off("userLoggedOut");
  },
};
</script>

<style scoped>
@media only screen and (max-width: 700px) {
  .carousel-style {
    display: none;
  }
}

.rowi {
  --bs-gutter-x: 0;
}

.alert-warning {
  background: #ff1a1a;
  color: white;
  font-weight: bold;
  border-radius: 0% !important;
  border-color: #ff1a1a !important;
}

.carousel {
  margin-right: 0px !important;
  margin-left: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
