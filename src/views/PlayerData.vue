<template>
  <div class="player-data-page">
    <!-- Hero Section -->
    <div v-if="player" class="hero-section">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content">
          <div class="player-avatar">
            <div class="avatar-circle">
              <span class="avatar-text">{{ player.name.charAt(0).toUpperCase() }}</span>
            </div>
          </div>
          <div class="player-info">
            <h1 class="player-name">{{ player.name }}</h1>
            <div class="player-stats">
              <div class="stat-item">
                <div class="stat-icon">⏱️</div>
                <div class="stat-content">
                  <div class="stat-value">{{ formatTime(player.totalTime) }}</div>
                  <div class="stat-label">Total Time</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">👁️</div>
                <div class="stat-content">
                  <div class="stat-value">{{ formatDate(player.lastSeen) }}</div>
                  <div class="stat-label">Last Seen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <!-- Date Range Selector -->
        <div class="date-selector-card">
          <div class="card-header-modern">
            <h3>📅 Select Date Range</h3>
            <p>Choose a period to analyze your gaming activity</p>
          </div>
          <div class="date-inputs">
            <div class="date-input-group">
              <label for="fromDate" class="date-label">From Date</label>
              <div class="input-wrapper">
                <input
                  type="date"
                  id="fromDate"
                  class="date-input"
                  v-model="fromDate"
                  @change="fetchAndPrepareChartData"
                />
                <div class="input-icon">📅</div>
              </div>
            </div>
            <div class="date-separator">
              <div class="separator-line"></div>
              <div class="separator-arrow">→</div>
            </div>
            <div class="date-input-group">
              <label for="toDate" class="date-label">To Date</label>
              <div class="input-wrapper">
                <input
                  type="date"
                  id="toDate"
                  class="date-input"
                  v-model="toDate"
                  @change="fetchAndPrepareChartData"
                />
                <div class="input-icon">📅</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="chart-card">
          <div class="chart-header">
            <h3>📊 Gaming Activity Chart</h3>
            <p>Visual representation of your daily playtime</p>
          </div>
          <div class="chart-container">
            <div v-if="loading || !chartOptions || !chartSeries" class="chart-loading">
              <div class="loading-spinner"></div>
              <p>Loading chart data...</p>
            </div>
            <apexchart
              v-else
              type="line"
              height="400"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </div>

        <!-- Playtime Table -->
        <div class="table-card">
          <div class="table-header">
            <h3>📋 Daily Playtime Breakdown</h3>
            <p>Detailed view of your gaming sessions</p>
          </div>
          <div class="table-container">
            <div v-if="loading || !filteredPlaytime.length" class="table-loading">
              <div class="loading-spinner"></div>
              <p>{{ loading ? 'Loading data...' : 'No data available for selected date range' }}</p>
            </div>
            <table v-else class="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Playtime</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(record, index) in filteredPlaytime" :key="index" class="table-row">
                  <td class="date-cell">
                    <div class="date-content">
                      <div class="date-day">{{ formatDate(record.date) }}</div>
                    </div>
                  </td>
                  <td class="time-cell">
                    <div class="time-badge">
                      {{ formatTime(record.totalDuration) }}
                    </div>
                  </td>
                  <td class="status-cell">
                    <div class="status-indicator" :class="getStatusClass(record.totalDuration)">
                      {{ getStatusText(record.totalDuration) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axiosInstance from '../config/axios'

export default {
  components: {
    apexchart: defineAsyncComponent(() =>
      import(/* webpackChunkName: "apexcharts" */ 'vue3-apexcharts')
  )
  },
  props: {
    playerName: {
      type: String,
      required: true,
    },
  },
  data() {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);
    
    return {
      player: null,
      loading: true,
      chartOptions: null,
      chartSeries: null,
      fromDate: sevenDaysAgo.toISOString().split('T')[0], // Default fromDate
      toDate: now.toISOString().split('T')[0], // Default toDate
      filteredPlaytime: [], // Filtered daily playtime for the date range
    };
  },
  async created() {
    await this.fetchAndPrepareChartData(); // Fetch data for default date range
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      return `${hours}h ${minutes}m ${secs}s`;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
    getStatusClass(duration) {
      if (duration >= 7200) return 'status-heavy'; // 2+ hours
      if (duration >= 3600) return 'status-medium'; // 1-2 hours
      if (duration >= 1800) return 'status-light'; // 30min-1hour
      return 'status-minimal'; // <30min
    },
    getStatusText(duration) {
      if (duration >= 7200) return 'Heavy';
      if (duration >= 3600) return 'Medium';
      if (duration >= 1800) return 'Light';
      return 'Minimal';
    },
    async fetchAndPrepareChartData() {
      this.loading = true;
      try {
        const response = await axiosInstance.get('/players', {
          params: {
            name: this.playerName,
            from: this.fromDate,
            to: this.toDate,
          },
        });

        // Update the player's playtime data for the date range
        if (response.data.data && response.data.data.length > 0) {
          this.player = response.data.data[0];
          this.prepareChartData();
        } else {
          // Reset data if no results
          this.player = null;
          this.chartOptions = null;
          this.chartSeries = null;
          this.filteredPlaytime = [];
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Reset data on error
        this.player = null;
        this.chartOptions = null;
        this.chartSeries = null;
        this.filteredPlaytime = [];
      } finally {
        this.loading = false;
      }
    },
    prepareChartData() {
  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);
  const days = [];
  const playtimeMap = {};

  // Generate date range and ensure each day is accounted for
  for (let date = new Date(from); date <= to; date.setDate(date.getDate() + 1)) {
    const formattedDate = this.formatDate(new Date(date));
    days.push(formattedDate);
  }

  // Populate playtime map
  this.player.dailyPlaytime.forEach((record) => {
    const formattedDate = this.formatDate(record.date);
    if (days.includes(formattedDate)) {
      playtimeMap[formattedDate] = (playtimeMap[formattedDate] || 0) + record.totalDuration;
    }
  });

  // Prepare chart data
  const data = days.map((day) => playtimeMap[day] || 0); // Keep seconds as is for detailed formatting
  this.filteredPlaytime = this.player.dailyPlaytime.filter((record) =>
    days.includes(this.formatDate(record.date))
  );

  this.chartOptions = {
    chart: {
      id: 'custom-playtime',
      toolbar: {
        show: false,
      },
      background: 'transparent',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: '#ff1a1a',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      title: {
        text: 'Days',
        style: {
          color: '#ff1a1a',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          const hours = Math.floor(val / 3600);
          const minutes = Math.floor((val % 3600) / 60);
          return `${hours}h ${minutes}m`;
        },
        style: {
          colors: '#ff1a1a',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      title: {
        text: 'Playtime (Hours & Minutes)',
        style: {
          color: '#ff1a1a',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    title: {
      text: 'Playtime Over Selected Date Range',
      align: 'center',
      style: {
        fontSize: '18px',
        color: '#ff1a1a',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#ff1a1a'],
    markers: {
      size: 6,
      colors: ['#ff1a1a'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: (val) => {
          const hours = Math.floor(val / 3600);
          const minutes = Math.floor((val % 3600) / 60);
          const seconds = Math.floor(val % 60);
          return `${hours}h ${minutes}m ${seconds}s`;
        },
      },
      theme: 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
          color: '#f1f5f9',
        },
      },
      yaxis: {
        lines: {
          show: true,
          color: '#f1f5f9',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        gradientToColors: ['#ff1a1a'],
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  };

  this.chartSeries = [
    {
      name: 'Playtime',
      data,
    },
  ];
},

  },
};
</script>

<style scoped>
.player-data-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 80px 0 60px;
  background: linear-gradient(135deg, #1c1c1c 0%, #2b2b2b 100%);
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,26,26,0.03)"/><circle cx="75" cy="75" r="1" fill="rgba(255,26,26,0.03)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,26,26,0.02)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,26,26,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.6;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 30px;
  position: relative;
  z-index: 2;
}

.player-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(255, 26, 26, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.avatar-text {
  font-size: 48px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.player-info {
  flex: 1;
}

.player-name {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.player-stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 24px;
  width: 50px;
  height: 50px;
  background: rgba(255, 26, 26, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
}

.stat-label {
  font-size: 0.875rem;
  color: #cccccc;
  font-weight: 500;
}

/* Main Content */
.main-content {
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Date Selector Card */
.date-selector-card {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.card-header-modern h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff1a1a;
}

.card-header-modern p {
  margin: 0;
  color: #cccccc;
  font-size: 1rem;
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.date-input-group {
  flex: 1;
  min-width: 200px;
}

.date-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #cccccc;
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
}

.date-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(255, 26, 26, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.date-input:focus {
  outline: none;
  border-color: #ff1a1a;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(255, 26, 26, 0.2);
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #ff1a1a;
  pointer-events: none;
}

.date-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.separator-line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 26, 26, 0.3) 0%, rgba(255, 26, 26, 0.1) 100%);
  border-radius: 1px;
}

.separator-arrow {
  font-size: 18px;
  color: #ff1a1a;
  font-weight: 600;
}

/* Chart Card */
.chart-card {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

/* Loading States */
.chart-loading,
.table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 26, 26, 0.3);
  border-top: 3px solid #ff1a1a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chart-loading p,
.table-loading p {
  color: #cccccc;
  font-size: 1rem;
  margin: 0;
}

.chart-header h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff1a1a;
}

.chart-header p {
  margin: 0 0 25px 0;
  color: #cccccc;
  font-size: 1rem;
}

.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Table Card */
.table-card {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.table-header h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff1a1a;
}

.table-header p {
  margin: 0 0 25px 0;
  color: #cccccc;
  font-size: 1rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
}

.modern-table th {
  background: rgba(255, 26, 26, 0.1);
  padding: 18px 20px;
  text-align: left;
  font-weight: 600;
  color: #ff1a1a;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid rgba(255, 26, 26, 0.3);
}

.modern-table td {
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: middle;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

.date-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-day {
  font-weight: 500;
  color: #ffffff;
}

.time-badge {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-block;
}

.status-indicator {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  min-width: 80px;
}

.status-heavy {
  background: #dc2626;
  color: white;
}

.status-medium {
  background: #ea580c;
  color: white;
}

.status-light {
  background: #ca8a04;
  color: white;
}

.status-minimal {
  background: #16a34a;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .player-name {
    font-size: 2rem;
  }
  
  .player-stats {
    justify-content: center;
    gap: 20px;
  }
  
  .date-inputs {
    flex-direction: column;
    gap: 15px;
  }
  
  .date-separator {
    display: none;
  }
  
  .stat-item {
    padding: 15px;
  }
  
  .avatar-circle {
    width: 100px;
    height: 100px;
  }
  
  .avatar-text {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0 40px;
  }
  
  .main-content {
    padding: 40px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .date-selector-card,
  .chart-card,
  .table-card {
    padding: 20px;
  }
  
  .player-stats {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
