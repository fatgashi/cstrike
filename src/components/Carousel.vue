<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="(carousel, index) in carousels" :key="index">
      <div :id="`carousel-${index}`" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div
            v-for="(slide, i) in carousel.slides"
            :key="i"
            class="carousel-item"
            data-bs-interval="3000"
            :class="{ active: i === 0 }"
          >
            <img :src="require(`@/assets/${slide.image}`)" width="100%"
              height="400" class="d-block w-100" :alt="slide.title" />
            <div class="carousel-caption">
              <h5>{{ slide.title }}</h5>
              <p>{{ slide.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselsView",
  data() {
    return {
      carousels: [
        {
          slides: [
            {
              image: "zm-wall4.webp",
              title: "Survive the Apocalypse",
              text: "Face hordes of the undead and test your survival skills.",
            },
            {
              image: "zm-wall2.webp",
              title: "Enter the Zombie Zone",
              text: "Explore the decaying city, but beware of what's lurking.",
            },
          ],
        },
        {
          slides: [
            {
              image: "zm-wall3.webp",
              title: "Dark Streets Await",
              text: "Navigate through shadows, but don’t let your guard down.",
            },
            {
              image: "zm-wall.webp",
              title: "Fight for Your Life",
              text: "Engage in relentless battles against the infected.",
            },
          ],
        },
        {
          slides: [
            {
              image: "zm-wall5.webp",
              title: "Face the Horde",
              text: "It’s you against them – hold your ground or fall.",
            },
            {
              image: "zm-wall6.webp",
              title: "The Final Stand",
              text: "Gather your courage and brace for the ultimate showdown.",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 15px;
  top: 8rem !important;
  bottom: auto !important;
}

.carousel-inner {
  min-height: 400px;
}
.carousel-inner img {
  height: 400px;
  object-fit: cover;
}
</style>
