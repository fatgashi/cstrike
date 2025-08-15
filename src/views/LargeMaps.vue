<template>
  <div class="maps-container">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-content">
        <div class="hero-icon">🗺️</div>
        <h1 class="hero-title">Large Maps</h1>
        <p class="hero-subtitle">Epic battles across vast landscapes with strategic depth</p>
        <div class="map-count-badge">
          <span class="badge-text">{{ maps.length }} Large Maps</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="navigation-section">
      <div class="container">
        <div class="nav-tabs">
          <router-link to="/maps" class="nav-tab">
            <span class="tab-icon">🔴</span>
            <span class="tab-text">Small Maps</span>
            <span class="tab-count">32</span>
          </router-link>
          <router-link to="/maps/medium-maps" class="nav-tab">
            <span class="tab-icon">🟡</span>
            <span class="tab-text">Medium Maps</span>
            <span class="tab-count">40</span>
          </router-link>
          <button class="nav-tab active">
            <span class="tab-icon">🟢</span>
            <span class="tab-text">Large Maps</span>
            <span class="tab-count">{{ maps.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-icon">🟢</div>
          <div class="section-info">
            <h2 class="section-title">Large Maps</h2>
            <p class="section-description">Massive environments for epic zombie survival battles</p>
          </div>
        </div>

        <!-- Maps Grid -->
        <div class="maps-grid">
          <div v-for="(map, index) in maps" :key="index" class="map-card">
            <div class="card-image-container">
              <img :src="map.image" :alt="map.name" class="card-image">
              <div class="card-overlay">
                <div class="overlay-content">
                  <span class="map-name">{{ map.name }}</span>
                  <div class="map-size-badge large">Large</div>
                </div>
              </div>
              <div class="card-badges">
                <div class="size-badge large">L</div>
                <div class="type-badge">Zombie</div>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ map.name }}</h3>
              <div class="map-stats">
                <span class="stat">Size: Large</span>
                <span class="stat">Type: Zombie</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">🗺️</div>
              <div class="stat-content">
                <h4>Total Maps</h4>
                <p>{{ maps.length }}</p>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🔴</div>
              <div class="stat-content">
                <h4>Small Maps</h4>
                <p>32</p>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🟡</div>
              <div class="stat-content">
                <h4>Medium Maps</h4>
                <p>40</p>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🟢</div>
              <div class="stat-content">
                <h4>Large Maps</h4>
                <p>{{ maps.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LargeMapsView",
  data() {
    return {
      selectedSize: 'large',
      maps: [
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
  }
};
</script>

<style scoped>
.maps-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Hero Header */
.hero-header {
  text-align: center;
  padding: 5rem 2rem 3rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%);
  position: relative;
  overflow: hidden;
}

.hero-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(76,175,80,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  color: #4caf50;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: #cccccc;
  font-weight: 300;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.map-count-badge {
  display: inline-block;
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* Navigation Section */
.navigation-section {
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-decoration: none;
  position: relative;
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  text-decoration: none;
  color: white;
}

.nav-tab.active {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.tab-icon {
  font-size: 1.3rem;
}

.tab-count {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Content Section */
.content-section {
  padding: 3rem 0;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  flex-shrink: 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4caf50;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.section-description {
  font-size: 1.2rem;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
}

/* Maps Grid */
.maps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Map Cards */
.map-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
}

.map-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(76, 175, 80, 0.3);
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.map-card:hover .card-image {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 2rem 1rem 1rem;
}

.overlay-content {
  text-align: center;
}

.map-name {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.map-size-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.map-size-badge.large {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
}

.card-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.size-badge, .type-badge {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.size-badge.large {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4caf50;
  margin-bottom: 1rem;
  text-align: center;
}

.map-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  color: #cccccc;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Stats Section */
.stats-section {
  margin-top: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
}

.stat-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content h4 {
  color: white;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.stat-content p {
  color: #4caf50;
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .maps-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .maps-container {
    padding: 0 0.5rem;
  }
  
  .hero-header {
    padding: 3rem 1rem 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .section-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .nav-tabs {
    gap: 0.5rem;
  }
  
  .nav-tab {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .maps-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    padding: 1.5rem;
  }
  
  .nav-tab {
    width: 100%;
    justify-content: center;
  }
}
</style>