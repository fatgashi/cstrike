<template>
    <div>
        <br><br>
        <div class="maps-view container">
          <!-- Header -->
          <h1 class="text-center mb-4 fw-bolder" style="color: #ff1a1a;">Map Selection</h1>
          
          <!-- Filter Buttons -->
          <div class="button-group text-center mb-4">
            <button :class="{ active: selectedSize === 'small' }" class="btn btn-outline-danger text-white mb-3">Small Maps</button>
            <router-link to="/medium-maps"><button class="btn btn-outline-danger text-white mb-3">Medium Maps</button></router-link>
            <router-link to="/large-maps"><button class="btn btn-outline-danger text-white mb-3">Large Maps</button></router-link>
          </div>
      
          <!-- Map Cards Grid -->
          <div class="row">
            <div class="col-md-6 col-lg-3 mb-4" v-for="(map, index) in maps" :key="index">
              <div class="card">
                <img :src="map.image" :alt="map.name" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">{{ map.name }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
    </div>
  </template>
  
  <script>
  export default {
    name: "MapsView",
    data() {
      return {
        selectedSize: 'small', // Default filter to show small maps
        maps: [
          // List of small maps
          { name: "zm_snow_vk2", image: require("../assets/maps/zm_snow_vk2.jpg"), size: "small" },
          { name: "zm_csbd_vk", image: require("../assets/maps/zm_csbd_vk.jpg"), size: "small" },
          { name: "zm_gbox5", image: require("../assets/maps/zm_gbox5.jpg"), size: "small" },
          { name: "zm_gbox7", image: require("../assets/maps/zm_gbox7.jpg"), size: "small" },
          { name: "zm_str_vk2", image: require("../assets/maps/zm_str_vk2.jpg"), size: "small" },
          { name: "zm_snow2012", image: require("../assets/maps/zm_snow2012.jpg"), size: "small" },
          { name: "zm_snow_vk6", image: require("../assets/maps/zm_snow_vk6.jpg"), size: "small" },
          { name: "zm_ice_attack_vip", image: require("../assets/maps/zm_ice_attack_vip.jpg"), size: "small" },
          { name: "zm_dust_attack4", image: require("../assets/maps/zm_dust_attack4.jpg"), size: "small" },
          { name: "zm_glass_attack6", image: require("../assets/maps/zm_glass_attack6.jpg"), size: "small" },
          { name: "zm_gg", image: require("../assets/maps/zm_gg.jpg"), size: "small" },
          { name: "zm_egypt_v3", image: require("../assets/maps/zm_egypt_v3.jpg"), size: "small" },
          { name: "zm_dusts", image: require("../assets/maps/zm_dusts.jpg"), size: "small" },
          { name: "zm_united_night", image: require("../assets/maps/zm_united_night.jpg"), size: "small" },
          { name: "zm_fox_v5", image: require("../assets/maps/zm_fox_v5.jpg"), size: "small" },
          { name: "zm_snow_volta", image: require("../assets/maps/zm_snow_volta.jpg"), size: "small" },
          { name: "zm_snow_vk5", image: require("../assets/maps/zm_snow_vk5.jpg"), size: "small" },
          { name: "zm_snow_vk3", image: require("../assets/maps/zm_snow_vk3.jpg"), size: "small" },
          { name: "zm_snow_vk", image: require("../assets/maps/zm_snow_vk.jpg"), size: "small" },
          { name: "zm_franqeeto_final", image: require("../assets/maps/zm_franqeeto_final.jpg"), size: "small" },
          { name: "zm_x1", image: require("../assets/maps/zm_x1.jpg"), size: "small" },
          { name: "zm_zero_blood", image: require("../assets/maps/zm_zero_blood.jpg"), size: "small" },
          { name: "zm_winter_invasion", image: require("../assets/maps/zm_winter_invasion.jpg"), size: "small" },
          { name: "zm_fix_vk", image: require("../assets/maps/zm_fix_vk.jpg"), size: "small" },
          { name: "zm_5-rmks", image: require("../assets/maps/zm_5-rmks.jpg"), size: "small" },
          { name: "zm_pacman", image: require("../assets/maps/zm_pacman.jpg"), size: "small" },
          { name: "zm_queseyo", image: require("../assets/maps/zm_queseyo.jpg"), size: "small" },
          { name: "zm_ibero", image: require("../assets/maps/zm_ibero.jpg"), size: "small" },
          { name: "zm_devil_b3", image: require("../assets/maps/zm_devil_b3.jpg"), size: "small" },
          { name: "zm_trasnylvania", image: require("../assets/maps/zm_trasnylvania.jpg"), size: "small" },
          { name: "zm_toronto_v8", image: require("../assets/maps/zm_toronto_v8.jpg"), size: "small" },
          { name: "zm_2boxes", image: require("../assets/maps/zm_2boxes.jpg"), size: "small" },
          { name: "zm_fg_perfect_halloween", image: require("../assets/maps/zm_fg_perfect_halloween.jpg"), size: "small" },

          { name: "zm_feazy_1", image: require("../assets/maps/zm_feazy_1.jpg"), size: "small" },
          { name: "zm_decay", image: require("../assets/maps/zm_decay.jpg"), size: "small" },
          { name: "zm_ice_attack_fix_zg", image: require("../assets/maps/zm_ice_attack_fix_zg.jpg"), size: "small" },
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  .maps-view {
    color: #fff;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
  }
  
  .card {
    background-color: #2e2e2e;
    border: none;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-title {
    color: #ff1a1a;
    font-size: 1.2em;
    text-align: center;
  }
  
  .button-group button {
    margin: 0 10px;
    color: #ff1a1a;
  }

  .btn-outline-danger:hover {
    background-color: #ff1a1a;
  }
  
  .button-group .active {
    background-color: #ff1a1a;
    color: #1c1c1c;
  }
  </style>