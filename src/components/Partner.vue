<template>
    <div class="partner-section container">
      <h1 class="text-center mb-5" style="color: #ff1a1a; font-weight: bolder;">Our Partners</h1>
      <div v-for="(part,index) in partner" :key="index" class="row align-items-center mb-5">
        <div class="col-md-4 text-center mb-3">
          <img :src="part.logo" :alt="part.name" class="partner-logo">
        </div>
        <div class="col-md-8 text-center">
            <h2 class="fw-bold" style="color: #ff1a1a;">{{ part.name }}</h2>
          <p>
            {{ part.text }}
          </p>
          <a :href="part.website" class="btn text-white" style="background-color: #ff1a1a" target="_blank" rel="noopener">Visit Our Partner</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        partner: [
          {
            name: "WESTCSTRIKE Romania",
            text: "WESTCSTRIKE Romania is one of the most active and vibrant Counter-Strike communities. Join their forum to connect with players, share experiences, and stay updated on the latest events and server news.",
            logo: require("../assets/partner/west.png"), // Replace with the uploaded logo
            website: "https://westcstrike.ro/forum/index.php?/forum/1551-zombie-%C2%BB-zm/", // Replace with your partner's website URL
          },
      ],
      };
    },
  };
  </script>
  
  <style scoped>
  .partner-section {
    color: white;
    padding: 40px 20px;
    border-radius: 8px;
    margin-top: 30px;
  }
  
  .partner-logo {
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    display: block;
    max-height: 150px;
  }
  
  .btn-warning {
    color: #1c1c1c;
    font-weight: bold;
  }
  </style>
  