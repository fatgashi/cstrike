<template>
  <div>
    <Banner />
    <Infos />
    <div class="row row-cols-1 row-cols-md-3 mt-3 d-flex justify-content-center">
      <div ref="firstDiv" class="row">
        <!-- Pass the computed height as a prop to Carousel -->
        <Carousel :dynamicHeight="heightString" />
      </div>
      <div class="row">
        <Carousel1 :dynamicHeight="heightString"/>
      </div>
      <div class="row">
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
    };
  },
  methods: {
    matchHeight() {
      if (this.$refs.firstDiv) {
        const height = this.$refs.firstDiv.clientHeight;
        this.heightString = `${height}px`;
      } else {
        console.log("firstDiv reference is not available");
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

.row {
  margin-right: 0px;
  margin-left: 0px;
}
</style>
