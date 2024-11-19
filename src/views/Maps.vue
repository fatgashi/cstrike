<template>
    <div>
        <br><br>
        <div class="maps-view container">
          <!-- Header -->
          <h1 class="text-center mb-4" style="color: #ff8000;">Map Selection</h1>
          
          <!-- Filter Buttons -->
          <div class="button-group text-center mb-4">
            <button @click="filterMaps('small')" :class="{ active: selectedSize === 'small' }" class="btn btn-outline-warning text-white mb-3">Small Maps</button>
            <button @click="filterMaps('medium')" :class="{ active: selectedSize === 'medium' }" class="btn btn-outline-warning text-white mb-3">Medium Maps</button>
            <button @click="filterMaps('large')" :class="{ active: selectedSize === 'large' }" class="btn btn-outline-warning text-white mb-3">Large Maps</button>
          </div>
      
          <!-- Map Cards Grid -->
          <div class="row">
            <div class="col-md-6 col-lg-3 mb-4" v-for="(map, index) in filteredMaps" :key="index">
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
        selectedSize: 'small', // Default filter to show small maps
        maps: [
          // List of small maps
          { name: "zm_snow_vk2", image: require("../assets/maps/zm_snow_vk2.jpg"), size: "small" },
          { name: "zm_big_vk", image: require("../assets/maps/zm_big_vk.jpg"), size: "medium" },
          { name: "zm_foda_v2", image: require("../assets/maps/zm_foda_v2.jpg"), size: "large" },
          { name: "zm_csbd_vk", image: require("../assets/maps/zm_csbd_vk.jpg"), size: "small" },
          { name: "zm_trakinax_tubo", image: require("../assets/maps/zm_trakinax_tubo.jpg"), size: "medium" },
          { name: "zm_zhell", image: require("../assets/maps/zm_zhell.jpg"), size: "medium" },
          { name: "zm_ice_vk", image: require("../assets/maps/zm_ice_vk.jpg"), size: "medium" },
          { name: "zm_ice_attack2009", image: require("../assets/maps/zm_ice_attack2009.jpg"), size: "medium" },
          { name: "zm_gbox5", image: require("../assets/maps/zm_gbox5.jpg"), size: "small" },
          { name: "zm_gbox7", image: require("../assets/maps/zm_gbox7.jpg"), size: "small" },
          { name: "zm_str_vk2", image: require("../assets/maps/zm_str_vk2.jpg"), size: "small" },
          { name: "zm_snow2012", image: require("../assets/maps/zm_snow2012.jpg"), size: "small" },
          { name: "zm_snow_vk6", image: require("../assets/maps/zm_snow_vk6.jpg"), size: "small" },
          { name: "zm_ice_attack_vip", image: require("../assets/maps/zm_ice_attack_vip.jpg"), size: "small" },
          { name: "zm_ice_attack3", image: require("../assets/maps/zm_ice_attack3.jpg"), size: "medium" },
          { name: "zm_dust_attack4", image: require("../assets/maps/zm_dust_attack4.jpg"), size: "small" },
          { name: "zm_glass_attack6", image: require("../assets/maps/zm_glass_attack6.jpg"), size: "small" },
          { name: "zm_foda", image: require("../assets/maps/zm_foda.jpg"), size: "large" },
          { name: "zm_deko2", image: require("../assets/maps/zm_deko2.jpg"), size: "large" },
          { name: "zm_deko2_zg_v2", image: require("../assets/maps/zm_deko2_zg_v2.jpg"), size: "large" },
          { name: "zm_gg", image: require("../assets/maps/zm_gg.jpg"), size: "small" },
          { name: "zm_egypt_v3", image: require("../assets/maps/zm_egypt_v3.jpg"), size: "small" },
          { name: "zm_dusts", image: require("../assets/maps/zm_dusts.jpg"), size: "small" },
          { name: "zm_csdevils", image: require("../assets/maps/zm_csdevils.jpg"), size: "large" },
          { name: "zm_united_night", image: require("../assets/maps/zm_united_night.jpg"), size: "small" },
          { name: "zm_2day", image: require("../assets/maps/zm_2day.jpg"), size: "large" },
          { name: "zm_adytzasfantu", image: require("../assets/maps/zm_adytzasfantu.jpg"), size: "large" },
          { name: "zm_fox_v5", image: require("../assets/maps/zm_fox_v5.jpg"), size: "small" },
          { name: "zm_cross", image: require("../assets/maps/zm_cross.jpg"), size: "large" },
          { name: "zm_dusty_camp", image: require("../assets/maps/zm_dusty_camp.jpg"), size: "large" },
          { name: "zm_snow_mix", image: require("../assets/maps/zm_snow_mix.jpg"), size: "medium" },
          { name: "zm_snow_volta", image: require("../assets/maps/zm_snow_volta.jpg"), size: "small" },
          { name: "zm_snow_vk5", image: require("../assets/maps/zm_snow_vk5.jpg"), size: "small" },
          { name: "zm_snow_vk3", image: require("../assets/maps/zm_snow_vk3.jpg"), size: "small" },
          { name: "zm_snow_vk", image: require("../assets/maps/zm_snow_vk.jpg"), size: "small" },
          { name: "zm_snowbase4_zp", image: require("../assets/maps/zm_snowbase4_zp.jpg"), size: "medium" },
          { name: "zm_snowbase4", image: require("../assets/maps/zm_snowbase4.jpg"), size: "large" },
          { name: "zm_long_night_v2", image: require("../assets/maps/zm_long_night_v2.jpg"), size: "large" },
          { name: "zm_battleground_foda", image: require("../assets/maps/zm_battleground_foda.jpg"), size: "large" },
          { name: "zm_canabys_glass2", image: require("../assets/maps/zm_canabys_glass2.jpg"), size: "large" },
          { name: "zm_canabys_snow", image: require("../assets/maps/zm_canabys_snow.jpg"), size: "large" },
          { name: "zm_franqeeto_final", image: require("../assets/maps/zm_franqeeto_final.jpg"), size: "small" },
          { name: "zm_long_glass", image: require("../assets/maps/zm_long_glass.jpg"), size: "medium" },
          { name: "zm_restart_v3", image: require("../assets/maps/zm_restart_v3.jpg"), size: "large" },
          { name: "zm_zombust", image: require("../assets/maps/zm_zombust.jpg"), size: "large" },
          { name: "zm_x1", image: require("../assets/maps/zm_x1.jpg"), size: "small" },
          { name: "zm_zero_blood", image: require("../assets/maps/zm_zero_blood.jpg"), size: "small" },
          { name: "zm_winter_invasion", image: require("../assets/maps/zm_winter_invasion.jpg"), size: "small" },
          { name: "zm_pxs_draging", image: require("../assets/maps/zm_pxs_draging.jpg"), size: "medium" },
          { name: "zm_killdust2", image: require("../assets/maps/zm_killdust2.jpg"), size: "medium" },
          { name: "zm_fortuna", image: require("../assets/maps/zm_fortuna.jpg"), size: "large" },
          { name: "zm_fortuna_rmx", image: require("../assets/maps/zm_fortuna_rmx.jpg"), size: "large" },
          { name: "zm_fix_vk", image: require("../assets/maps/zm_fix_vk.jpg"), size: "small" },
          { name: "zm_aztec_sdl_v1", image: require("../assets/maps/zm_aztec_sdl_v1.jpg"), size: "large" },
          { name: "zm_3rooms", image: require("../assets/maps/zm_3rooms.jpg"), size: "large" },
          { name: "zm_sand", image: require("../assets/maps/zm_sand.jpg"), size: "large" },
          { name: "zm_5-rmks", image: require("../assets/maps/zm_5-rmks.jpg"), size: "small" },
          { name: "zm_antidote", image: require("../assets/maps/zm_antidote.jpg"), size: "medium" },
          { name: "zm_evil_dustnight", image: require("../assets/maps/zm_evil_dustnight.jpg"), size: "medium" },
          { name: "zm_fullpvz", image: require("../assets/maps/zm_fullpvz.jpg"), size: "medium" },
          { name: "zm_kill_duster", image: require("../assets/maps/zm_kill_duster.jpg"), size: "large" },
          { name: "zm_pacman", image: require("../assets/maps/zm_pacman.jpg"), size: "small" },
          { name: "zm_vip_gray", image: require("../assets/maps/zm_vip_gray.jpg"), size: "medium" },
          { name: "zm_queseyo", image: require("../assets/maps/zm_queseyo.jpg"), size: "small" },
          { name: "zm_ibero", image: require("../assets/maps/zm_ibero.jpg"), size: "small" },
          { name: "zm_vendetta_v2", image: require("../assets/maps/zm_vendetta_v2.jpg"), size: "large" },
          { name: "zm_vendetta", image: require("../assets/maps/zm_vendetta.jpg"), size: "large" },
          { name: "zm_winter_place", image: require("../assets/maps/zm_winter_place.jpg"), size: "medium" },
          { name: "zm_dust2_2k15", image: require("../assets/maps/zm_dust2_2k15.jpg"), size: "large" },
          { name: "zm_pis2", image: require("../assets/maps/zm_pis2.jpg"), size: "large" },
          { name: "zm_clinic_emergency", image: require("../assets/maps/zm_clinic_emergency.jpg"), size: "medium" },
          { name: "zm_one_sap", image: require("../assets/maps/zm_one_sap.jpg"), size: "large" },
          { name: "zm_303", image: require("../assets/maps/zm_303.jpg"), size: "large" },
          { name: "zm_devil_b3", image: require("../assets/maps/zm_devil_b3.jpg"), size: "small" },
          { name: "zm_infantry", image: require("../assets/maps/zm_infantry.jpg"), size: "large" },
          { name: "zm_winter_big", image: require("../assets/maps/zm_winter_big.jpg"), size: "large" },
          { name: "zm_trasnylvania", image: require("../assets/maps/zm_trasnylvania.jpg"), size: "small" },
          { name: "zm_nose", image: require("../assets/maps/zm_nose.jpg"), size: "large" },
          { name: "zm_ziger_new", image: require("../assets/maps/zm_ziger_new.jpg"), size: "medium" },
          { name: "zm_vd_winter", image: require("../assets/maps/zm_vd_winter.jpg"), size: "medium" },
          { name: "zm_frosty_f2", image: require("../assets/maps/zm_frosty_f2.jpg"), size: "medium" },
          { name: "zm_toronto_v8", image: require("../assets/maps/zm_toronto_v8.jpg"), size: "small" },
          { name: "zm_ice_attackv4_v3", image: require("../assets/maps/zm_ice_attackv4_v3.jpg"), size: "medium" },
          { name: "zm_ice_attack5", image: require("../assets/maps/zm_ice_attack5.jpg"), size: "medium" },
          { name: "zm_csdark_cinder", image: require("../assets/maps/zm_csdark_cinder.jpg"), size: "large" },
          { name: "zm_chatoyant", image: require("../assets/maps/zm_chatoyant.jpg"), size: "large" },
          { name: "zm_2boxes", image: require("../assets/maps/zm_2boxes.jpg"), size: "small" },
          { name: "zm_arabstreets_happy", image: require("../assets/maps/zm_arabstreets_happy.jpg"), size: "large" },
          { name: "zm_cantera", image: require("../assets/maps/zm_cantera.jpg"), size: "large" },
          { name: "zm_dust_undead", image: require("../assets/maps/zm_dust_undead.jpg"), size: "medium" },
          { name: "zm_fg_perfect_halloween", image: require("../assets/maps/zm_fg_perfect_halloween.jpg"), size: "small" },

          { name: "zm_lakepark", image: require("../assets/maps/zm_lakepark.jpg"), size: "large" },
          { name: "zm_party_house", image: require("../assets/maps/zm_party_house.jpg"), size: "large" },
          { name: "zm_siege_happy_fixed2", image: require("../assets/maps/zm_siege_happy_fixed2.jpg"), size: "large" },
          { name: "zm_tuscan_happy", image: require("../assets/maps/zm_tuscan_happy.jpg"), size: "large" },
          { name: "zm_xopom_town", image: require("../assets/maps/zm_xopom_town.jpg"), size: "medium" },
          { name: "zm_assault_night2", image: require("../assets/maps/zm_assault_night2.jpg"), size: "large" },
          { name: "zm_base_human_lg_new_v2", image: require("../assets/maps/zm_base_human_lg_new_v2.jpg"), size: "medium" },
          { name: "zm_cornered", image: require("../assets/maps/zm_cornered.jpg"), size: "large" },
          { name: "zm_downtown", image: require("../assets/maps/zm_downtown.jpg"), size: "large" },
          { name: "zm_epic_zone", image: require("../assets/maps/zm_epic_zone.jpg"), size: "medium" },
          { name: "zm_gorod_final", image: require("../assets/maps/zm_gorod_final.jpg"), size: "large" },
          { name: "zm_ice_house", image: require("../assets/maps/zm_ice_house.jpg"), size: "medium" },
          { name: "zm_oynucaz_dust2_new", image: require("../assets/maps/zm_oynucaz_dust2_new.jpg"), size: "large" },
          { name: "zm_queens_d2", image: require("../assets/maps/zm_queens_d2.jpg"), size: "large" },
          { name: "zm_qzet", image: require("../assets/maps/zm_qzet.jpg"), size: "medium" },
          { name: "zm_ugc_ground", image: require("../assets/maps/zm_ugc_ground.jpg"), size: "medium" },
          { name: "zm_virus_t", image: require("../assets/maps/zm_virus_t.jpg"), size: "medium" },
          { name: "zm_world_rmx_fixed", image: require("../assets/maps/zm_world_rmx_fixed.jpg"), size: "medium" },
          { name: "zm_zod_area51", image: require("../assets/maps/zm_zod_area51.jpg"), size: "large" },
          { name: "zm_epic_bageta_final", image: require("../assets/maps/zm_epic_bageta_final.jpg"), size: "medium" },
          { name: "zm_gbox8", image: require("../assets/maps/zm_gbox8.jpg"), size: "medium" },
          { name: "zm_hs_zhell_v2", image: require("../assets/maps/zm_hs_zhell_v2.jpg"), size: "medium" },
          { name: "zm_cheteau", image: require("../assets/maps/zm_cheteau.jpg"), size: "medium" },
          { name: "zm_feazy_1", image: require("../assets/maps/zm_feazy_1.jpg"), size: "small" },
          { name: "zm_paranormal", image: require("../assets/maps/zm_paranormal.jpg"), size: "medium" },
          { name: "zm_hs_subzero_2", image: require("../assets/maps/zm_hs_subzero_2.jpg"), size: "large" },
          { name: "zm_x2", image: require("../assets/maps/zm_x2.jpg"), size: "large" },
          { name: "zm_decay", image: require("../assets/maps/zm_decay.jpg"), size: "small" },
          { name: "zm_ice_attack_fix_zg", image: require("../assets/maps/zm_ice_attack_fix_zg.jpg"), size: "small" },
          { name: "zm_soccer_gs", image: require("../assets/maps/zm_soccer_gs.jpg"), size: "large" },
          { name: "zm_madafakus", image: require("../assets/maps/zm_madafakus.jpg"), size: "medium" },
          { name: "zm_snow_attack_dd", image: require("../assets/maps/zm_snow_attack_dd.jpg"), size: "medium" },
          { name: "zm_cold_attack", image: require("../assets/maps/zm_cold_attack.jpg"), size: "medium" },
          { name: "zm_dev_colours", image: require("../assets/maps/zm_dev_colours.jpg"), size: "large" },
          { name: "zm_epr", image: require("../assets/maps/zm_epr.jpg"), size: "medium" },
          { name: "zm_laura", image: require("../assets/maps/zm_laura.jpg"), size: "medium" },
          { name: "zm_puma", image: require("../assets/maps/zm_puma.jpg"), size: "medium" },
          { name: "zm_stpr", image: require("../assets/maps/zm_stpr.jpg"), size: "medium" },
          { name: "zm_talvisota", image: require("../assets/maps/zm_talvisota.jpg"), size: "large" },
          { name: "zm_fun_world_4_final", image: require("../assets/maps/zm_fun_world_4_final.jpg"), size: "medium" },
          { name: "zm_ice_world_2", image: require("../assets/maps/zm_ice_world_2.jpg"), size: "medium" },
          { name: "zm_forza", image: require("../assets/maps/zm_forza.jpg"), size: "medium" },
          { name: "zm_defense", image: require("../assets/maps/zm_defense.jpg"), size: "medium" },
        ]
      };
    },
    computed: {
      // Filtered maps based on selected size
      filteredMaps() {
        return this.maps.filter(map => map.size === this.selectedSize);
      }
    },
    methods: {
      // Change the map size filter
      filterMaps(size) {
        this.selectedSize = size;
      }
    }
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