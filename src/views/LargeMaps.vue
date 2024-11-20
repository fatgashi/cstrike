<template>
    <div>
        <br><br>
        <div class="maps-view container">
          <!-- Header -->
          <h1 class="text-center mb-4 fw-bolder" style="color: #ff8000;">Map Selection</h1>
          
          <!-- Filter Buttons -->
          <div class="button-group text-center mb-4">
            <router-link to="/maps"><button class="btn btn-outline-warning text-white mb-3">Small Maps</button></router-link>
            <router-link to="/medium-maps"><button class="btn btn-outline-warning text-white mb-3">Medium Maps</button></router-link>
            <button :class="{ active: selectedSize === 'large' }" class="btn btn-outline-warning text-white mb-3">Large Maps</button>
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
    data() {
      return {
        selectedSize: 'large', // Default filter to show small maps
        maps: [
          // List of small maps
          { name: "zm_foda_v2", image: require("../assets/maps/zm_foda_v2.jpg"), size: "large" },
          { name: "zm_foda", image: require("../assets/maps/zm_foda.jpg"), size: "large" },
          { name: "zm_deko2", image: require("../assets/maps/zm_deko2.jpg"), size: "large" },
          { name: "zm_deko2_zg_v2", image: require("../assets/maps/zm_deko2_zg_v2.jpg"), size: "large" },
          { name: "zm_csdevils", image: require("../assets/maps/zm_csdevils.jpg"), size: "large" },
          { name: "zm_2day", image: require("../assets/maps/zm_2day.jpg"), size: "large" },
          { name: "zm_adytzasfantu", image: require("../assets/maps/zm_adytzasfantu.jpg"), size: "large" },
          { name: "zm_cross", image: require("../assets/maps/zm_cross.jpg"), size: "large" },
          { name: "zm_dusty_camp", image: require("../assets/maps/zm_dusty_camp.jpg"), size: "large" },
          { name: "zm_snowbase4", image: require("../assets/maps/zm_snowbase4.jpg"), size: "large" },
          { name: "zm_long_night_v2", image: require("../assets/maps/zm_long_night_v2.jpg"), size: "large" },
          { name: "zm_battleground_foda", image: require("../assets/maps/zm_battleground_foda.jpg"), size: "large" },
          { name: "zm_canabys_glass2", image: require("../assets/maps/zm_canabys_glass2.jpg"), size: "large" },
          { name: "zm_canabys_snow", image: require("../assets/maps/zm_canabys_snow.jpg"), size: "large" },
          { name: "zm_restart_v3", image: require("../assets/maps/zm_restart_v3.jpg"), size: "large" },
          { name: "zm_zombust", image: require("../assets/maps/zm_zombust.jpg"), size: "large" },
          { name: "zm_fortuna", image: require("../assets/maps/zm_fortuna.jpg"), size: "large" },
          { name: "zm_fortuna_rmx", image: require("../assets/maps/zm_fortuna_rmx.jpg"), size: "large" },
          { name: "zm_aztec_sdl_v1", image: require("../assets/maps/zm_aztec_sdl_v1.jpg"), size: "large" },
          { name: "zm_3rooms", image: require("../assets/maps/zm_3rooms.jpg"), size: "large" },
          { name: "zm_sand", image: require("../assets/maps/zm_sand.jpg"), size: "large" },
          { name: "zm_kill_duster", image: require("../assets/maps/zm_kill_duster.jpg"), size: "large" },
          { name: "zm_vendetta_v2", image: require("../assets/maps/zm_vendetta_v2.jpg"), size: "large" },
          { name: "zm_vendetta", image: require("../assets/maps/zm_vendetta.jpg"), size: "large" },
          { name: "zm_dust2_2k15", image: require("../assets/maps/zm_dust2_2k15.jpg"), size: "large" },
          { name: "zm_pis2", image: require("../assets/maps/zm_pis2.jpg"), size: "large" },
          { name: "zm_one_sap", image: require("../assets/maps/zm_one_sap.jpg"), size: "large" },
          { name: "zm_303", image: require("../assets/maps/zm_303.jpg"), size: "large" },
          { name: "zm_infantry", image: require("../assets/maps/zm_infantry.jpg"), size: "large" },
          { name: "zm_winter_big", image: require("../assets/maps/zm_winter_big.jpg"), size: "large" },
          { name: "zm_nose", image: require("../assets/maps/zm_nose.jpg"), size: "large" },
          { name: "zm_csdark_cinder", image: require("../assets/maps/zm_csdark_cinder.jpg"), size: "large" },
          { name: "zm_chatoyant", image: require("../assets/maps/zm_chatoyant.jpg"), size: "large" },
          { name: "zm_arabstreets_happy", image: require("../assets/maps/zm_arabstreets_happy.jpg"), size: "large" },
          { name: "zm_cantera", image: require("../assets/maps/zm_cantera.jpg"), size: "large" },

          { name: "zm_lakepark", image: require("../assets/maps/zm_lakepark.jpg"), size: "large" },
          { name: "zm_party_house", image: require("../assets/maps/zm_party_house.jpg"), size: "large" },
          { name: "zm_siege_happy_fixed2", image: require("../assets/maps/zm_siege_happy_fixed2.jpg"), size: "large" },
          { name: "zm_tuscan_happy", image: require("../assets/maps/zm_tuscan_happy.jpg"), size: "large" },
          { name: "zm_assault_night2", image: require("../assets/maps/zm_assault_night2.jpg"), size: "large" },
          { name: "zm_cornered", image: require("../assets/maps/zm_cornered.jpg"), size: "large" },
          { name: "zm_downtown", image: require("../assets/maps/zm_downtown.jpg"), size: "large" },
          { name: "zm_gorod_final", image: require("../assets/maps/zm_gorod_final.jpg"), size: "large" },
          { name: "zm_oynucaz_dust2_new", image: require("../assets/maps/zm_oynucaz_dust2_new.jpg"), size: "large" },
          { name: "zm_queens_d2", image: require("../assets/maps/zm_queens_d2.jpg"), size: "large" },
          { name: "zm_zod_area51", image: require("../assets/maps/zm_zod_area51.jpg"), size: "large" },
          { name: "zm_hs_subzero_2", image: require("../assets/maps/zm_hs_subzero_2.jpg"), size: "large" },
          { name: "zm_x2", image: require("../assets/maps/zm_x2.jpg"), size: "large" },
          { name: "zm_soccer_gs", image: require("../assets/maps/zm_soccer_gs.jpg"), size: "large" },
          { name: "zm_dev_colours", image: require("../assets/maps/zm_dev_colours.jpg"), size: "large" },
          { name: "zm_talvisota", image: require("../assets/maps/zm_talvisota.jpg"), size: "large" },
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
    color: #ff8000;
    font-size: 1.2em;
    text-align: center;
  }
  
  .button-group button {
    margin: 0 10px;
    color: #ff8000;
  }
  
  .button-group .active {
    background-color: #ff8000;
    color: #1c1c1c;
  }
  </style>