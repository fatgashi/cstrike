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
        caption-html="<h3 class='carousel-caption-title'>Face the Horde</h3>"
        text-html="<p class='carousel-caption-text'>It’s you against them—hold your ground or fall.</p>"
        :img-src="require('@/assets/zm-wall5.webp')"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide 
        caption-html="<h3 class='carousel-caption-title'>The Final Stand</h3>"
        text-html="<p class='carousel-caption-text'>Gather your courage and brace for the ultimate showdown.</p>"
        :img-src="require('@/assets/zm-wall6.webp')">
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
  .carousel-caption-title,
  .carousel-caption-text {
    text-shadow: 3px 3px 24px rgba(0, 0, 0, 0.6) !important;
  }
</style>