<template>
  <div>
    <div v-if="server">
      <Banner :players="server.length" />
    </div>
    <Infos />
    <div class="row rowi row-cols-1 row-cols-md-3 mt-3 d-flex justify-content-center">
      <div ref="firstDiv" class="row carousel">
        <Carousel :dynamicHeight="heightString" />
      </div>
      <div class="row carousel">
        <Carousel1 :dynamicHeight="heightString"/>
      </div>
      <div class="row carousel">
        <Carousel2 :dynamicHeight="heightString"/>
      </div>
    </div>
    <div>
      <Modes />
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

export default {
  components: {
    Banner,
    Infos,
    Carousel,
    Carousel1,
    Carousel2,
    Modes,
  },
  data() {
    return {
      heightString: "0px", // Default height in px
      server: []
    };
  },
  methods: {
    matchHeight() {
      if (this.$refs.firstDiv) {
        const height = this.$refs.firstDiv.clientHeight;
        this.heightString = `${height}px`;
      }
    },
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
        this.server = response.data.state.raw.players;
    } catch (error) {
        console.error("Error fetching server info:", error);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.matchHeight);
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

.carousel {
  margin-right: 0px !important;
  margin-left: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
