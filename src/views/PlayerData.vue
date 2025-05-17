<template>
  <div>
    <br><br>
    <div v-if="player" class="player-details container">
      <div class="card text-white bg-dark">
        <div class="card-header">
          Player Details: <span class="text-white fw-bolder">{{ player.name }}</span>
        </div>
        <div class="card-body">
          <p><strong class="c-title">Total Time Played:</strong> {{ formatTime(player.totalTime) }}</p>
          <p><strong class="c-title">Last Seen:</strong> {{ formatDate(player.lastSeen) }}</p>
  
          <!-- Date Range Inputs -->
          <div class="date-range-picker d-flex flex-sm-row flex-column justify-content-between align-items-center mb-4">
            <div class="form-group me-3">
              <label for="fromDate" class="form-label c-title">From:</label>
              <input
                type="date"
                id="fromDate"
                class="form-control styled-date-input"
                v-model="fromDate"
                @change="fetchAndPrepareChartData"
              />
            </div>
            <div class="form-group">
              <label for="toDate" class="form-label text-white">To:</label>
              <input
                type="date"
                id="toDate"
                class="form-control styled-date-input"
                v-model="toDate"
                @change="fetchAndPrepareChartData"
              />
            </div>
          </div>
  
          <apexchart
            type="line"
            height="400"
            :options="chartOptions"
            :series="chartSeries"
          />
  
          <!-- Daily Playtime Table -->
          <h5 class="mt-4 c-title">Daily Playtime</h5>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Playtime</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in filteredPlaytime" :key="index">
                <td>{{ formatDate(record.date) }}</td>
                <td>{{ formatTime(record.totalDuration) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>


<script>
import { defineAsyncComponent } from 'vue';

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
    async fetchAndPrepareChartData() {
      try {
        const response = await this.$axios.get('/players', {
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
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
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
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: '#ff1a1a',
        },
      },
      title: {
        text: 'Days',
        style: {
          color: '#ff1a1a',
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
        },
      },
      title: {
        text: 'Playtime (Hours & Minutes)',
        style: {
          color: '#ff1a1a',
        },
      },
    },
    title: {
      text: 'Playtime Over Selected Date Range',
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#ff1a1a',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      
    },
    colors: ['#ff1a1a'],
    markers: {
      size: 5,
      colors: ['#ff1a1a'],
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
      theme: 'dark',
    },
    grid: {
      borderColor: '#ff1a1a',
      strokeDashArray: 3,
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

<style>
.player-details .card {
  border-radius: 8px;
}

.player-details .card-header {
  font-weight: bold;
  font-size: 1.3em;
  background-color: #ff1a1a;
}

.apexcharts-legend-text {
  color: #fff !important; /* Ensure legend text matches the dark theme */
}

.table th,
.table td {
  vertical-align: middle;
}

.date-range-picker {
  gap: 1rem; /* Adds spacing between the date inputs */
}

/* Styling for the input labels */
.date-range-picker .form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ff1a1a; /* Matches your orange theme */
}

/* Styling for the date inputs */
.styled-date-input {
  background-color: #333; /* Dark background */
  color: #fff; /* White text */
  border: 1px solid #ff1a1a; /* Orange border */
  border-radius: 8px; /* Rounded corners */
  padding: 0.5rem; /* Padding for a better look */
  font-size: 1rem; /* Slightly larger text */
  transition: border-color 0.3s ease;
}

/* Focus effect for the date inputs */
.styled-date-input:focus {
  border-color: #f2f2f2; /* Lighter border when focused */
  outline: none; /* Remove default outline */
}

/* Styling for the entire date input container */
.form-group {
  display: flex;
  flex-direction: column; /* Label above input */
}
</style>
