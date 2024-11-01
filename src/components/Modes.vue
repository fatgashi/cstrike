<template>
  <div class="container mt-5">
  <h2 class="text-center text-white mb-4">Explore Game Modes</h2>
  <div class="row text-white">
    <div class="col-md-4 col-12 text-center" id="photo">
      <img src="../assets/cover5.jpg" class="img-fluid rounded" alt="Zombie Mode">
      <h4 class="mt-3">Zombie Mode</h4>
      <p>Survive waves of the undead in an intense battle for survival.</p>
    </div>
    <div class="col-md-4 col-12 text-center" id="photo">
      <img src="../assets/cover2.jpg" class="img-fluid rounded" alt="Deathmatch">
      <h4 class="mt-3">Deathmatch</h4>
      <p>Face off against opponents in a fast-paced Deathmatch mode.</p>
    </div>
    <div class="col-md-4 col-12 text-center" id="photo">
      <img src="../assets/cover4.jpg" class="img-fluid rounded" alt="Classic Mode">
      <h4 class="mt-3">Classic Mode</h4>
      <p>Experience the classic Counter-Strike 1.6 gameplay we all love.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
#photo img {
  transition: transform 0.3s ease; /* Smooth transition for the zoom effect */
}

#photo img:hover {
  transform: scale(1.1); /* Slight zoom on hover (10% increase in size) */
}
</style>