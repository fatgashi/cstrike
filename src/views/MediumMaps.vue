<template>
    <div>
        <br><br>
        <div class="maps-view container">
          <!-- Header -->
          <h1 class="text-center mb-4 fw-bolder" style="color: #ff1a1a;">Map Selection</h1>
          
          <!-- Filter Buttons -->
          <div class="button-group text-center mb-4">
            <router-link to="/maps"><button class="btn btn-outline-danger text-white mb-3">Small Maps</button></router-link>
            <button :class="{ active: selectedSize === 'medium' }" class="btn btn-outline-danger text-white mb-3">Medium Maps</button>
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
    data() {
      return {
        selectedSize: 'medium', // Default filter to show small maps
        maps: [
          // List of small maps
          { name: "zm_big_vk", image: require("../assets/maps/zm_big_vk.jpg"), size: "medium" },
          { name: "zm_trakinax_tubo", image: require("../assets/maps/zm_trakinax_tubo.jpg"), size: "medium" },
          { name: "zm_emosbg_fx", image: require("../assets/maps/zm_emosbg_fx.jpg"), size: "medium" },
          { name: "zm_zhell", image: require("../assets/maps/zm_zhell.jpg"), size: "medium" },
          { name: "zm_ice_vk", image: require("../assets/maps/zm_ice_vk.jpg"), size: "medium" },
          { name: "zm_ice_attack2009", image: require("../assets/maps/zm_ice_attack2009.jpg"), size: "medium" },
          { name: "zm_ice_attack3", image: require("../assets/maps/zm_ice_attack3.jpg"), size: "medium" },
          { name: "zm_snow_mix", image: require("../assets/maps/zm_snow_mix.jpg"), size: "medium" },
          { name: "zm_snowbase4_zp", image: require("../assets/maps/zm_snowbase4_zp.jpg"), size: "medium" },
          { name: "zm_long_glass", image: require("../assets/maps/zm_long_glass.jpg"), size: "medium" },
          { name: "zm_pxs_draging", image: require("../assets/maps/zm_pxs_draging.jpg"), size: "medium" },
          { name: "zm_killdust2", image: require("../assets/maps/zm_killdust2.jpg"), size: "medium" },
          { name: "zm_antidote", image: require("../assets/maps/zm_antidote.jpg"), size: "medium" },
          { name: "zm_evil_dustnight", image: require("../assets/maps/zm_evil_dustnight.jpg"), size: "medium" },
          { name: "zm_fullpvz", image: require("../assets/maps/zm_fullpvz.jpg"), size: "medium" },
          { name: "zm_vip_gray", image: require("../assets/maps/zm_vip_gray.jpg"), size: "medium" },
          { name: "zm_winter_place", image: require("../assets/maps/zm_winter_place.jpg"), size: "medium" },
          { name: "zm_clinic_emergency", image: require("../assets/maps/zm_clinic_emergency.jpg"), size: "medium" },
          { name: "zm_ziger_new", image: require("../assets/maps/zm_ziger_new.jpg"), size: "medium" },
          { name: "zm_vd_winter", image: require("../assets/maps/zm_vd_winter.jpg"), size: "medium" },
          { name: "zm_frosty_f2", image: require("../assets/maps/zm_frosty_f2.jpg"), size: "medium" },
          { name: "zm_ice_attackv4_v3", image: require("../assets/maps/zm_ice_attackv4_v3.jpg"), size: "medium" },
          { name: "zm_ice_attack5", image: require("../assets/maps/zm_ice_attack5.jpg"), size: "medium" },
          { name: "zm_dust_undead", image: require("../assets/maps/zm_dust_undead.jpg"), size: "medium" },

          { name: "zm_xopom_town", image: require("../assets/maps/zm_xopom_town.jpg"), size: "medium" },
          { name: "zm_base_human_lg_new_v2", image: require("../assets/maps/zm_base_human_lg_new_v2.jpg"), size: "medium" },
          { name: "zm_epic_zone", image: require("../assets/maps/zm_epic_zone.jpg"), size: "medium" },
          { name: "zm_ice_house", image: require("../assets/maps/zm_ice_house.jpg"), size: "medium" },
          { name: "zm_qzet", image: require("../assets/maps/zm_qzet.jpg"), size: "medium" },
          { name: "zm_ugc_ground", image: require("../assets/maps/zm_ugc_ground.jpg"), size: "medium" },
          { name: "zm_virus_t", image: require("../assets/maps/zm_virus_t.jpg"), size: "medium" },
          { name: "zm_world_rmx_fixed", image: require("../assets/maps/zm_world_rmx_fixed.jpg"), size: "medium" },
          { name: "zm_epic_bageta_final", image: require("../assets/maps/zm_epic_bageta_final.jpg"), size: "medium" },
          { name: "zm_gbox8", image: require("../assets/maps/zm_gbox8.jpg"), size: "medium" },
          { name: "zm_hs_zhell_v2", image: require("../assets/maps/zm_hs_zhell_v2.jpg"), size: "medium" },
          { name: "zm_cheteau", image: require("../assets/maps/zm_cheteau.jpg"), size: "medium" },
          { name: "zm_paranormal", image: require("../assets/maps/zm_paranormal.jpg"), size: "medium" },
          { name: "zm_madafakus", image: require("../assets/maps/zm_madafakus.jpg"), size: "medium" },
          { name: "zm_snow_attack_dd", image: require("../assets/maps/zm_snow_attack_dd.jpg"), size: "medium" },
          { name: "zm_cold_attack", image: require("../assets/maps/zm_cold_attack.jpg"), size: "medium" },
          { name: "zm_epr", image: require("../assets/maps/zm_epr.jpg"), size: "medium" },
          { name: "zm_laura", image: require("../assets/maps/zm_laura.jpg"), size: "medium" },
          { name: "zm_puma", image: require("../assets/maps/zm_puma.jpg"), size: "medium" },
          { name: "zm_stpr", image: require("../assets/maps/zm_stpr.jpg"), size: "medium" },
          { name: "zm_fun_world_4_final", image: require("../assets/maps/zm_fun_world_4_final.jpg"), size: "medium" },
          { name: "zm_ice_world_2", image: require("../assets/maps/zm_ice_world_2.jpg"), size: "medium" },
          { name: "zm_forza", image: require("../assets/maps/zm_forza.jpg"), size: "medium" },
          { name: "zm_defense", image: require("../assets/maps/zm_defense.jpg"), size: "medium" },
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
    color: #ff8000;
  }

  .btn-outline-danger:hover {
    background-color: #ff1a1a;
  }
  
  .button-group .active {
    background-color: #ff1a1a;
    color: #1c1c1c;
  }
  </style>