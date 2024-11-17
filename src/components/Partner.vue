<template>
    <div class="partner-section container">
      <div class="row align-items-center">
        <div class="col-md-4 text-center mb-3">
          <img :src="partner.logo" :alt="partner.name" class="partner-logo">
        </div>
        <div class="col-md-8 text-center">
            <h2 class="d-none d-md-block" style="color: #ff8000;">Our Partner</h2>
          <p>
            We are proud to partner with <strong>{{ partner.name }}</strong>, a leading platform for boosting Counter-Strike 1.6. 
            Visit their website to explore amazing services to improve your gaming experience.
          </p>
          <a :href="partner.website" class="btn text-white" style="background-color: rgb(242, 142, 38);" target="_blank" rel="noopener">Visit Our Partner</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        partner: {
          name: "Top-Boost",
          logo: require("../assets/partner/opboost.png"), // Replace with the uploaded logo
          website: "https://top-boost.ro/", // Replace with your partner's website URL
        },
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
  