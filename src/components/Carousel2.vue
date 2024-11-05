<template>
    <div>
    <b-carousel
      id="carousel-2"
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
        :img-src="require('@/assets/zm-wall5.webp')"
      >
        <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
            <h3>Face the Horde</h3>
            <p>It’s you against them—hold your ground or fall.</p>
        </div>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide 
        :img-src="require('@/assets/zm-wall6.webp')">
        <div class="carousel-content d-flex justify-content-center align-items-center flex-column" :style="{ height: dynamicHeight }">
            <h3>The Final Stand</h3>
            <p>Gather your courage and brace for the ultimate showdown.</p>
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