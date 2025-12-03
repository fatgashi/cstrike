<template>
  <div class="banned-players-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading banned players...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="banned-content">
      <!-- Hero Header Section -->
      <div class="hero-section">
        <div class="hero-background"></div>
        <div class="hero-content">
          <div class="status-indicator">
            <span class="status-icon">🚫</span>
            <span class="status-text">BANNED PLAYERS</span>
          </div>
          <h1 class="page-title">Server Ban List</h1>
          <p class="page-subtitle">List of players banned from the server</p>
        </div>
      </div>

      <!-- Banned Players Section -->
      <div class="banned-players-section">
        <div class="section-header">
          <h2>🚫 Banned Players</h2>
          <p>Complete list of server bans</p>
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
                placeholder="Search by player name..."
                @input="handleSearch"
                @keyup.enter="handleSearch"
              />
              <button 
                v-if="searchQuery" 
                class="clear-search-btn"
                @click="clearSearch"
                type="button"
                title="Clear search"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="pagination-controls">
            <select class="limit-select" v-model="limit" @change="fetchBannedPlayers">
              <option value="5">5 per page</option>
              <option value="10" selected>10 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
              <option value="25">25 per page</option>
            </select>
          </div>
        </div>

        <!-- Banned Players Table - Desktop -->
        <div class="banned-table-container desktop-table">
          <div class="table-header">
            <span class="header-text">Banned Players List</span>
          </div>
          <div class="table-wrapper">
            <table class="banned-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player Name</th>
                  <th>Steam ID</th>
                  <th>IP Address</th>
                  <th>Admin</th>
                  <th>Reason</th>
                  <th>Ban Duration</th>
                  <th>Ban Date</th>
                  <th>Expires</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="bannedPlayers.length === 0" class="no-results-row">
                  <td colspan="9" class="no-results">
                    <span class="no-results-icon">🔍</span>
                    <p>No banned players found</p>
                  </td>
                </tr>
                <tr v-for="(player, index) in bannedPlayers" :key="player.ID" class="player-row">
                  <td class="rank-cell">
                    <span class="rank-badge">{{ (currentPage - 1) * limit + index + 1 }}</span>
                  </td>
                  <td class="name-cell">
                    <span class="player-name">{{ player.Name }}</span>
                  </td>
                  <td class="steam-cell">
                    <span class="steam-id">{{ player.AuthId || 'N/A' }}</span>
                  </td>
                  <td class="ip-cell">
                    <span class="ip-address">{{ player.Ip || 'N/A' }}</span>
                  </td>
                  <td class="admin-cell">
                    <span class="admin-name">{{ player.AdminName || 'N/A' }}</span>
                  </td>
                  <td class="reason-cell">
                    <span class="ban-reason">{{ player.Reason || 'No reason provided' }}</span>
                  </td>
                  <td class="duration-cell">
                    <span class="ban-duration">{{ formatBanDuration(player.BanDuration) }}</span>
                  </td>
                  <td class="date-cell">
                    <span class="ban-date">{{ formatDate(player.BanTimeStamp) }}</span>
                  </td>
                  <td class="expire-cell">
                    <span class="expire-badge" :class="getExpirationClass(player.BanExpirationTimestamp)">
                      {{ formatExpiration(player.BanExpirationTimestamp) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Banned Players Cards - Mobile -->
        <div class="banned-cards-container mobile-cards">
          <div v-if="bannedPlayers.length === 0" class="no-results-card">
            <span class="no-results-icon">🔍</span>
            <p>No banned players found</p>
          </div>
          <div v-for="(player, index) in bannedPlayers" :key="player.ID" class="ban-card">
            <div class="card-header">
              <span class="card-rank">#{{ (currentPage - 1) * limit + index + 1 }}</span>
              <span class="card-player-name">{{ player.Name }}</span>
            </div>
            <div class="card-body">
              <div class="card-row">
                <span class="card-label">Steam ID:</span>
                <span class="card-value steam-id">{{ player.AuthId || 'N/A' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">IP Address:</span>
                <span class="card-value ip-address">{{ player.Ip || 'N/A' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">Admin:</span>
                <span class="card-value admin-name">{{ player.AdminName || 'N/A' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">Reason:</span>
                <span class="card-value ban-reason">{{ player.Reason || 'No reason provided' }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">Ban Duration:</span>
                <span class="card-value ban-duration">{{ formatBanDuration(player.BanDuration) }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">Ban Date:</span>
                <span class="card-value ban-date">{{ formatDate(player.BanTimeStamp) }}</span>
              </div>
              <div class="card-row">
                <span class="card-label">Expires:</span>
                <span class="card-value">
                  <span class="expire-badge" :class="getExpirationClass(player.BanExpirationTimestamp)">
                    {{ formatExpiration(player.BanExpirationTimestamp) }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-section">
          <div class="pagination-info">
            <span>Showing {{ ((currentPage - 1) * limit) + 1 }} - {{ Math.min(currentPage * limit, totalPlayers) }} of {{ totalPlayers }} banned players</span>
          </div>
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
  name: "BannedPlayersView",
  data() {
    return {
      bannedPlayers: [],
      searchQuery: "",
      limit: 10,
      currentPage: 1,
      totalPages: 1,
      totalPlayers: 0,
      loading: true,
      lastSearchQuery: "",
      searchTimeout: null,
    }
  },

  async created() {
    await this.fetchBannedPlayers();
  },
  
  computed: {
    visiblePages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;

      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages = [];
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }

      return pages;
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return 'N/A';
      if (date === 'Permanent') return 'Permanent';
      try {
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return 'Invalid Date';
      }
    },

    formatExpiration(expiration) {
      if (!expiration || expiration === 'Permanent') {
        return 'Permanent';
      }
      try {
        const dateObj = expiration instanceof Date ? expiration : new Date(expiration);
        const now = new Date();
        
        if (dateObj < now) {
          return 'Expired';
        }
        
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return 'Invalid Date';
      }
    },

    formatBanDuration(duration) {
      if (!duration || duration === 0 || duration === null) {
        return 'Permanent';
      }
      
      // Duration is in minutes
      const minutes = parseInt(duration);
      
      if (minutes < 60) {
        return `${minutes} min${minutes !== 1 ? 's' : ''}`;
      }
      
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (hours < 24) {
        if (remainingMinutes === 0) {
          return `${hours} hour${hours !== 1 ? 's' : ''}`;
        }
        return `${hours}h ${remainingMinutes}m`;
      }
      
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      
      if (remainingHours === 0) {
        return `${days} day${days !== 1 ? 's' : ''}`;
      }
      return `${days}d ${remainingHours}h`;
    },

    getExpirationClass(expiration) {
      if (!expiration || expiration === 'Permanent') {
        return 'permanent';
      }
      try {
        const dateObj = expiration instanceof Date ? expiration : new Date(expiration);
        const now = new Date();
        
        if (dateObj < now) {
          return 'expired';
        }
        
        // Check if expires within 24 hours
        const hoursUntilExpiry = (dateObj - now) / (1000 * 60 * 60);
        if (hoursUntilExpiry < 24) {
          return 'expiring-soon';
        }
        
        return 'active';
      } catch (error) {
        return 'active';
      }
    },

    handleSearch() {
      // Debounce search to avoid too many API calls
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery !== this.lastSearchQuery) {
          this.currentPage = 1;
          this.lastSearchQuery = this.searchQuery;
          this.fetchBannedPlayers();
        }
      }, 500);
    },

    clearSearch() {
      this.searchQuery = '';
      this.lastSearchQuery = '';
      this.currentPage = 1;
      this.fetchBannedPlayers();
    },

    async fetchBannedPlayers() {
      this.loading = true;
      try {
        const response = await axiosInstance.get("/players/banned", {
          params: {
            name: this.searchQuery || undefined,
            limit: this.limit,
            page: this.currentPage,
          },
        });

        if (response.data.success) {
          this.bannedPlayers = response.data.data || [];
          this.totalPages = response.data.pagination?.totalPages || 1;
          this.totalPlayers = response.data.pagination?.totalPlayers || 0;
        } else {
          this.bannedPlayers = [];
          this.totalPages = 1;
          this.totalPlayers = 0;
        }
      } catch (error) {
        console.error("Error fetching banned players:", error);
        this.bannedPlayers = [];
        this.totalPages = 1;
        this.totalPlayers = 0;
      } finally {
        this.loading = false;
      }
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchBannedPlayers();
      }
    },
  }
}
</script>

<style scoped>
.banned-players-container {
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 26, 26, 0.2);
  border: 2px solid #ff1a1a;
  border-radius: 25px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2rem;
}

.status-icon {
  font-size: 1.2rem;
}

.status-text {
  color: #ff1a1a;
  font-size: 0.9rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.page-subtitle {
  font-size: 1.2rem;
  color: #cccccc;
  margin: 0;
}

/* Banned Players Section */
.banned-players-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  color: #cccccc;
  z-index: 1;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 3rem;
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

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: rgba(255, 26, 26, 0.2);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  padding: 0;
}

.clear-search-btn:hover {
  background: rgba(255, 26, 26, 0.4);
  color: #ff1a1a;
  transform: scale(1.1);
}

.clear-search-btn i {
  font-size: 0.85rem;
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

.limit-select option {
  background: #1a1a1a;
  color: white;
}

/* Banned Table */
.banned-table-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.table-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.table-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.header-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.table-wrapper {
  padding: 0;
  overflow-x: auto;
  overflow-y: visible;
  max-height: none;
}

.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ff1a1a, #cc0000);
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cc0000, #990000);
}

.banned-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: white;
  margin: 0;
}

.banned-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

.banned-table th {
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.15) 0%, rgba(204, 0, 0, 0.15) 100%);
  padding: 1.25rem 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(255, 26, 26, 0.4);
  white-space: nowrap;
  color: #ffcccc;
  position: relative;
}

.banned-table th:first-child {
  border-top-left-radius: 0;
}

.banned-table th:last-child {
  border-top-right-radius: 0;
}

.banned-table th::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 26, 26, 0.6), transparent);
}

.banned-table tbody tr {
  transition: all 0.2s ease;
}

.banned-table td {
  padding: 1.25rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  vertical-align: middle;
  background: rgba(255, 255, 255, 0.02);
}

.banned-table tbody tr:last-child td {
  border-bottom: none;
}

.banned-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 0;
}

.banned-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 0;
}

.player-row:hover {
  background: rgba(255, 26, 26, 0.08) !important;
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(255, 26, 26, 0.2);
}

.player-row:hover td {
  background: transparent;
}

.rank-cell {
  text-align: center;
}

.rank-badge {
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: linear-gradient(135deg, #ff1a1a, #cc0000);
  color: white;
}

.player-name {
  font-weight: 600;
  color: #ff6b6b;
}

.steam-id, .ip-address, .admin-name {
  color: #bdc3c7;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.ban-reason {
  color: #e74c3c;
  font-weight: 500;
  max-width: 200px;
  word-wrap: break-word;
}

.ban-duration {
  color: #f39c12;
  font-weight: 600;
  font-size: 0.9rem;
}

.ban-date {
  color: #95a5a6;
  font-size: 0.9rem;
  white-space: nowrap;
}

.expire-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-block;
}

.expire-badge.permanent {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.expire-badge.expired {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
}

.expire-badge.expiring-soon {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.expire-badge.active {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.no-results-row {
  background: transparent !important;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.no-results-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.no-results p {
  font-size: 1.2rem;
  margin: 0;
}

/* Pagination */
.pagination-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
}

.pagination-info {
  color: #bdc3c7;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 26, 26, 0.2);
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
}

.page-btn {
  min-width: 40px;
  height: 40px;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled):not(.disabled) {
  background: rgba(255, 26, 26, 0.2);
  border-color: #ff1a1a;
}

.page-btn.active {
  background: linear-gradient(135deg, #ff1a1a, #cc0000);
  border-color: #ff1a1a;
  color: white;
}

.page-btn.disabled {
  opacity: 0.5;
  cursor: default;
}

/* Mobile Cards Layout */
.mobile-cards {
  display: none;
}

.banned-cards-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.ban-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.ban-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 26, 26, 0.2);
}

.card-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
}

.card-player-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  flex: 1;
}

.card-body {
  padding: 1rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-row:last-child {
  border-bottom: none;
}

.card-label {
  font-weight: 600;
  color: #bdc3c7;
  font-size: 0.9rem;
  min-width: 100px;
}

.card-value {
  color: white;
  font-size: 0.9rem;
  text-align: right;
  flex: 1;
  word-break: break-word;
}

.no-results-card {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (min-width: 769px) {
  .banned-table-container {
    display: block;
  }

  .mobile-cards {
    display: none;
  }

  .table-wrapper {
    padding: 1.5rem;
  }

  .banned-table {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .banned-players-section {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .controls-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    max-width: 100%;
  }

  /* Hide desktop table on mobile */
  .desktop-table {
    display: none;
  }

  /* Show mobile cards on mobile */
  .mobile-cards {
    display: flex;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .card-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-label {
    min-width: auto;
  }

  .card-value {
    text-align: left;
  }

  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

