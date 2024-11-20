<template>
  <!-- Bootstrap Banner Section -->
<div class="banner-section container-fluid text-white d-flex justify-content-center align-items-center" style="background-color: #333; height: 18rem;">
  <div class="row d-flex flex-column justify-content-center align-items-center">
    <div class="text-center">
        <p class="header-text">Welcome to Zm-WestCStrike!</p>
        <p class="lead fw-bold">Your ultimate CS 1.6 community for thrilling battles and experience!</p>
    </div>
    <div class="d-flex justify-content-center align-items-center mt-3">
      <!-- Server Status Widget -->
      <div class="server-status mr-3">
        <p class="mb-1"><strong>Server IP:</strong> <span style="color: #ff8000">51.77.72.157:27015</span></p>
        <p class="mb-1"><strong>Status:</strong> <span style="background-color: #ff8000" class="badge text-white">Online</span></p>
        <p class="mb-1"><strong>Players:</strong> <span style="color: #ff8000">{{players}}/32</span></p>
      </div>
      <!-- Call to Action Button -->
      <!-- <a href="#vip" class="btn btn-danger btn-lg ml-3">Buy VIP Now</a> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    players: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
@media only screen and (max-width: 600px) {
    .header-text {
        font-size: 24px !important;
    }
}
.banner-section {
  background-image: url('../assets/cover3.jpg'); /* Optional background image */
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.server-status {
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  padding: 10px 15px;
  border-radius: 10px;
}

.header-text {
    font-size: 40px;
    font-weight: 700;
}

.btn-danger {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-danger:hover {
  background-color: #c9302c;
}
</style>