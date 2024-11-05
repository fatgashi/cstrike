<template>
    <div>
    <b-carousel
      id="carousel-1"
      :interval="3000"
      fade
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 0px 0px 2px #000"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        :img-src="require('@/assets/zm-wall3.webp')"
      >
        <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
            <h3>Dark Streets Await</h3>
            <p>Navigate through shadows, but don't let your guard down.</p>
        </div>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide 
        :img-src="require('@/assets/zm-wall.webp')">
        <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
          <h3>Fight for Your Life</h3>
          <p>Engage in relentless battles against the infected.</p>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
  
  </template>
  
  <script>
  export default {
    name: "CarouselView",
    props: {
      dynamicHeight: {
        type: String,
        default: "0px",
      },
    },
  }
  </script>
  
  
<style scoped>
.carousel-content h3,
.carousel-content p {
  text-shadow: 3px 3px 24px rgba(0, 0, 0, 0.6) !important;
}
</style>