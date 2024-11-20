<template>
    <div class="carousel-wrapper">
    <b-carousel
      id="carousel"
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
        :img-src="require('@/assets/zm-wall4.webp')"
      >
      <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
          <h3 class="fw-bolder">Survive the Apocalypse</h3>
          <p class="fw-bold">Face hordes of the undead and test your survival skills.</p>
        </div>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide 
        :img-src="require('@/assets/zm-wall2.webp')">
        <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
          <h3 class="fw-bolder">Enter the Zombie Zone</h3>
          <p class="fw-bold">Explore the decaying city, but beware of what's lurking.</p>
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

#title {
  color: #ff8000;
}
</style>