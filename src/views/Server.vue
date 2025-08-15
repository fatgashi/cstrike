<template>
  <div class="server-container">
    <!-- Loading State -->
    <div v-if="!server.players" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Connecting to server...</p>
    </div>

    <!-- Main Server Content -->
    <div v-else class="server-content">
      <!-- Hero Header Section -->
      <div class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="server-status">
            <div class="status-indicator online">
              <span class="status-dot"></span>
              <span class="status-text">ONLINE</span>
            </div>
          </div>
          <h1 class="server-title">{{ server.name }}</h1>
          <p class="server-subtitle">Counter-Strike 1.6 Zombie Mod Server</p>
          <div class="server-stats">
            <div class="stat-item">
              <span class="stat-icon">👥</span>
              <span class="stat-value">{{ server.numplayers }}/32</span>
              <span class="stat-label">Players</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">🗺️</span>
              <span class="stat-value">{{ server.map }}</span>
              <span class="stat-label">Current Map</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">🏆</span>
              <span class="stat-value">#1</span>
              <span class="stat-label">Rank</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Connect Section -->
      <div class="quick-connect-section">
        <div class="connect-card">
          <div class="connect-header">
            <h3>🚀 Quick Connect</h3>
            <p>Join the action instantly!</p>
          </div>
          <div class="connect-options">
            <div class="connect-option">
              <div class="option-icon">🌐</div>
              <div class="option-content">
                <span class="option-label">IP Address</span>
                <span class="option-value">{{ server.connect }}</span>
              </div>
            </div>
            <div class="connect-option">
              <div class="option-icon">🔗</div>
              <div class="option-content">
                <span class="option-label">Domain</span>
                <span class="option-value">cs.zm-westcstrike.com</span>
              </div>
            </div>
            <div class="connect-option">
              <div class="option-icon">🎮</div>
              <div class="option-content">
                <span class="option-label">Steam Connect</span>
                <a href="steam://connect/51.77.72.157:27015" class="steam-connect-btn">
                  <span class="btn-icon">🎯</span>
                  Join Server
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Left Column - Server Info -->
        <div class="server-info-section">
          <!-- Server Details Card -->
          <div class="info-card">
            <div class="card-header">
              <span class="header-icon">⚙️</span>
              <h3>Server Information</h3>
            </div>
            <div class="card-content">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Server Name</span>
                  <span class="info-value">{{ server.name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Game</span>
                  <span class="info-value">Counter-Strike 1.6</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Status</span>
                  <span class="info-value status-online">Alive</span>
                </div>
                <div class="info-item">
                  <span class="info-label">IP Address</span>
                  <span class="info-value">{{ server.connect }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Port</span>
                  <span class="info-value">27015</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Players</span>
                  <span class="info-value">{{ server.numplayers }}/32</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Map Card -->
          <div class="map-card">
            <div class="card-header">
              <span class="header-icon">🗺️</span>
              <h3>Current Map</h3>
            </div>
            <div class="card-content">
              <div class="map-image-container">
                <img :src="getMapImage(server.map)" :alt="server.map" class="map-image" />
                <div class="map-overlay">
                  <span class="map-name">{{ server.map }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Player Stats Card -->
          <div v-if="server.players" class="stats-card">
            <div class="card-header">
              <span class="header-icon">📊</span>
              <h3>Player Statistics</h3>
            </div>
            <div class="card-content">
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">👥</div>
                  <div class="stat-info">
                    <span class="stat-number">{{ server.players.length }}</span>
                    <span class="stat-label">Real Players</span>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">🤖</div>
                  <div class="stat-info">
                    <span class="stat-number">{{ server.bots.length }}</span>
                    <span class="stat-label">Bots</span>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">🎯</div>
                  <div class="stat-info">
                    <span class="stat-number">{{ server.numplayers }}</span>
                    <span class="stat-label">Total Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Online Players -->
        <div class="players-section">
          <div class="players-card">
            <div class="card-header">
              <span class="header-icon">🎮</span>
              <h3>Online Players</h3>
              <span class="player-count">{{ server.raw.players ? server.raw.players.length : 0 }} players</span>
            </div>
            <div class="card-content">
              <div v-if="server.raw.players && server.raw.players.length > 0" class="players-list">
                <div v-for="(player, index) in server.raw.players" :key="index" class="player-item">
                  <div class="player-rank">
                    <span class="rank-number">#{{ index + 1 }}</span>
                  </div>
                  <div class="player-info">
                    <span class="player-name">{{ player.name }}</span>
                    <div class="player-stats">
                      <span class="player-score">Score: {{ player.score }}</span>
                      <span class="player-time">Time: {{ formatTime(player.time) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="no-players">
                <span class="no-players-icon">😴</span>
                <p>No players currently online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Players Section -->
      <div class="top-players-section">
        <div class="section-header">
          <h2>🏆 Top Players by Hours Played</h2>
          <p>Leaderboard of the most dedicated players</p>
        </div>

        <!-- Search and Controls -->
        <div class="controls-section">
          <div class="search-container">
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                placeholder="Search players by name..."
                @input="fetchPlayers"
              />
            </div>
          </div>
          <div class="pagination-controls">
            <select class="limit-select" v-model="limit" @change="fetchPlayers">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="15" selected>15 per page</option>
            </select>
          </div>
        </div>

        <!-- Players Table -->
        <div class="players-table-container">
          <div class="table-header">
            <div class="table-row header-row">
              <div class="table-cell">Rank</div>
              <div class="table-cell">Player Name</div>
              <div class="table-cell">Total Time</div>
            </div>
          </div>
          <div class="table-body">
            <div v-if="players.length" class="table-rows">
              <div v-for="(player, index) in players" :key="player._id" class="table-row player-row">
                <div class="table-cell rank-cell">
                  <span class="rank-badge">{{ (currentPage - 1) * limit + index + 1 }}</span>
                </div>
                <div class="table-cell name-cell">
                  <router-link :to="{ name: 'PlayerDetails', params: { playerName: player.name } }" class="player-link">
                    {{ player.name }}
                  </router-link>
                </div>
                <div class="table-cell time-cell">
                  <span class="time-badge">{{ formatTime(player.totalTime) }}</span>
                </div>
              </div>
            </div>
            <div v-else class="no-results">
              <span class="no-results-icon">🔍</span>
              <p>No players found</p>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-section">
          <div class="pagination-controls">
            <button 
              class="pagination-btn prev-btn" 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1"
            >
              <span class="btn-icon">←</span>
              <span class="btn-text">Previous</span>
            </button>
            
            <div class="page-numbers">
              <button
                v-for="page in visiblePages"
                :key="page"
                class="page-btn"
                :class="{ active: page === currentPage, disabled: page === '...' }"
                @click="page !== '...' ? changePage(page) : null"
                :disabled="page === '...'"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn next-btn" 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
            >
              <span class="btn-text">Next</span>
              <span class="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
import axiosInstance from '../config/axios'

export default {
  name: "ServerView",
  data(){
    return {
      server: [],
      players: [], // Stores fetched players
      searchQuery: "", // Search input
      limit: 15, // Items per page
      currentPage: 1, // Current page
      totalPages: 1, // Total pages
      lastSearchQuery: "",
    }
  },

  async created() {
    try {
      const response = await axiosInstance.get('/game/serverInfo');
      this.server = response.data.state || { players: [], bots: [] };
    } catch (error) {
      console.error("Error fetching server info:", error);
    }
    this.fetchPlayers();
  },
  
  computed: {
    visiblePages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;

      if (totalPages <= 7) {
        // Show all pages if total pages are 7 or less
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages = [];
      if (currentPage <= 4) {
        // Show first 5 pages and '...'
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show '...' and last 5 pages
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show '...', current page range, and '...'
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }

      return pages;
    },
  },

  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    getMapImage(mapName) {
      try {
        return require(`../assets/maps/${mapName}.jpg`);
      } catch {
        return ""; // Return empty string if image is not found
      }
    },
    
    async fetchPlayers() {
      try {
        if (this.searchQuery !== this.lastSearchQuery) {
          this.currentPage = 1;
          this.lastSearchQuery = this.searchQuery;
        }

        const response = await axiosInstance.get("/players", {
          params: {
            name: this.searchQuery || undefined,
            limit: this.limit,
            page: this.currentPage,
          },
        });

        const { data, pagination } = response.data;

        this.players = data;
        this.totalPages = pagination.totalPages;
      } catch (error) {
        console.error("Error fetching players:", error);
        this.players = [];
        this.totalPages = 1;
      }
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchPlayers();
      }
    },
  }
}
</script>

<style scoped>
.server-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 26, 26, 0.3);
  border-top: 4px solid #ff1a1a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1.2rem;
  color: #cccccc;
  font-weight: 500;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 4rem 2rem;
  text-align: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/zombie-banner.png') center/cover;
  opacity: 0.3;
  z-index: -1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.server-status {
  margin-bottom: 2rem;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(40, 167, 69, 0.2);
  border: 2px solid #28a745;
  border-radius: 25px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-dot {
  width: 12px;
  height: 12px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-text {
  color: #28a745;
  font-size: 0.9rem;
}

.server-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
  font-family: 'Nosifer', cursive;
}

.server-subtitle {
  font-size: 1.3rem;
  color: #cccccc;
  margin-bottom: 3rem;
  font-weight: 300;
}

.server-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.9rem;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Connect Section */
.quick-connect-section {
  max-width: 1200px;
  margin: -2rem auto 3rem;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.connect-card {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(255, 26, 26, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.connect-header {
  text-align: center;
  margin-bottom: 2rem;
}

.connect-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.connect-header p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

.connect-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.connect-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.option-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.option-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.steam-connect-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.steam-connect-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  color: white;
  text-decoration: none;
}

/* Content Grid */
.content-grid {
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Server Info Section */
.server-info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card, .map-card, .stats-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover, .map-card:hover, .stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.card-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 1.5rem;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
}

.card-content {
  padding: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.9rem;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.status-online {
  color: #28a745;
}

.map-image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
  text-align: center;
}

.map-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card .stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.8rem;
  color: #cccccc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Players Section */
.players-section {
  display: flex;
  flex-direction: column;
}

.players-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.players-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.players-card .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.player-count {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.player-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.player-rank {
  flex-shrink: 0;
}

.rank-number {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
}

.player-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.player-name {
  font-weight: 600;
  color: white;
  font-size: 1.1rem;
}

.player-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #cccccc;
}

.no-players {
  text-align: center;
  padding: 3rem 2rem;
  color: #cccccc;
}

.no-players-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

/* Top Players Section */
.top-players-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.section-header p {
  font-size: 1.2rem;
  color: #cccccc;
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  color: #cccccc;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #cccccc;
}

.search-input:focus {
  outline: none;
  border-color: #ff1a1a;
  background: rgba(255, 255, 255, 0.1);
}

.limit-select {
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.limit-select:focus {
  outline: none;
  border-color: #ff1a1a;
}

/* Players Table */
.players-table-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1.5rem;
}

.header-row {
  display: grid;
  grid-template-columns: 100px 1fr 200px;
  gap: 2rem;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-body {
  padding: 1.5rem;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-row {
  display: grid;
  grid-template-columns: 100px 1fr 200px;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.player-row:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.rank-badge {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 700;
  text-align: center;
  display: inline-block;
}

.player-link {
  color: #ff1a1a;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.player-link:hover {
  color: white;
  text-decoration: underline;
}

.time-badge {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: #cccccc;
}

.no-results-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ff1a1a;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.page-btn {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 45px;
}

.page-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ff1a1a;
}

.page-btn.active {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-color: #ff1a1a;
}

.page-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .server-stats {
    gap: 2rem;
  }
  
  .connect-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .server-container {
    padding: 1rem 0.5rem;
  }
  
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .server-title {
    font-size: 2.5rem;
  }
  
  .server-stats {
    flex-direction: column;
    gap: 2rem;
  }
  
  .quick-connect-section {
    padding: 0 1rem;
  }
  
  .content-grid {
    padding: 0 1rem;
  }
  
  .top-players-section {
    padding: 0 1rem;
  }
  
  .controls-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    max-width: none;
  }
  
  .header-row,
  .table-row {
    grid-template-columns: 80px 1fr 150px;
    gap: 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .server-title {
    font-size: 2rem;
  }
  
  .connect-card {
    padding: 1.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-row,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: center;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-numbers {
    justify-content: center;
  }
}
</style>