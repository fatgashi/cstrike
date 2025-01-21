<template>
  <div>
    <br><br>
    <div v-if="server.players" class="container server-view">
  <!-- Server Summary Section -->
        <div class="row mb-3">
            <div class="col-md-8">
            <div class="card text-white bg-dark mb-3 summary">
                <div class="card-header">Server Summary</div>
                <div class="card-body">
                <h5 class="card-title fw-bolder"><span id="title">Name: </span><span>{{ server.name }}</span></h5>
                <p class="card-text fw-bolder"><span id="title">Game: </span> <span>Counter Strike 1.6 | Status: Alive</span></p>
                <p class="card-text fw-bolder"><span id="title">IP Address: </span> <span>{{ server.connect }}</span></p>
                <p class="card-text fw-bolder"><span id="title">Join By Domain: </span> <span>connect cs.zm-westcstrike.com</span></p>
                <p>
                  If you are a steam user you can join our server by this button!
                </p>
                <p class="card-text fw-bolder"><span id="title">Join By Button: </span> <span>
                  <a
                    href="steam://connect/51.77.72.157:27015"
                    class="btn text-white"
                    style="background-color: #ff8000;"
                    target="_self"
                    rel="noopener"
                  >
                    Join the Server
                  </a>
                  </span>
                </p>
                </div>
            </div>

      <!-- Game Server Banners Section -->
      <div class="card banner-section bg-dark mb-3" id="title">
        <div class="card-header text-white">Game Server Banner</div>
        <div class="card-body">
            <div class="d-flex justify-content-start align-items-center">
                <div class="d-flex flex-column">
                    <div><span class="h6">Server Name:</span> <span class="h5 fw-bolder text-white">{{ server.name }}</span></div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="d-flex flex-column">
                            <h6>IP ADDRESS:</h6>
                            <h4 class="text-white">51.77.72.157</h4>
                            <h6>PLAYERS:</h6>
                            <h6 class="text-white">{{server.numplayers}}/32</h6>
                        </div>
                        <div class="d-flex flex-column">
                            <h6>PORT:</h6>
                            <h4 class="text-white">27015</h4>
                            <h6>RANK:</h6>
                            <h6 class="text-white">1</h6>
                        </div>
                        <div class="d-flex flex-column">
                            <h6>STATUS:</h6>
                            <h4 class="text-success fw-bolder">Online</h4>
                            <h6>CURRENT MAP:</h6>
                            <h6 class="text-white">{{ server.map }}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Player Stats and Historical Data -->
    <div class="col-md-4">
      <!-- Current Map Section -->
      <div class="card text-white bg-dark mb-3 hoveri">
        <div class="card-header">Current Map</div>
        <div class="card-body">
          <img :src="getMapImage(server.map)" :alt="server.map" id="cdnImage" />
          <p class="card-text">{{ server.map }}</p>
        </div>
      </div>

      <!-- Player Stats Section -->
      <div v-if="server.players" class="card text-white bg-dark mb-3 hoveri">
        <div class="card-header">Player Stats</div>
        <div class="card-body">
          <p class="card-text">Current Players: {{ server.players.length }}/32</p>
          <p class="card-text">Current Bots: {{ server.bots.length }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Online Players Section -->
  <div class="card text-white" style="background-color: transparent !important;">
    <div class="card-header">Online Players</div>
    <div class="card-body table-responsive">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time Played</th>
          </tr>
        </thead>
        <tbody v-if="server.raw.players">
          <tr v-for="(player, index) in server.raw.players" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
            <td>{{ formatTime(player.time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="server-view mt-5">
    <!-- Search and Pagination Controls -->
    <div class="row mb-3 d-flex justify-content-between">
      <div class="col-md-3 col-sm-6 col-12 mb-3 mb-md-0">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search players by name"
          @input="fetchPlayers"
        />
      </div>
      <!-- Select Dropdown for Pagination Limit -->
      <div class="col-md-3 col-sm-6 col-12 mb-3 mb-md-0">
        <select class="form-select" v-model="limit" @change="fetchPlayers">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15" selected>15 per page</option>
        </select>
      </div>
    </div>
  </div>

  <div class="card text-white mt-2" style="background-color: transparent !important;">
    <div class="card-header">Top Players by Hours Played</div>
    <nav v-if="totalPages > 1" class="pagination-container">
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <!-- Previous Button -->
        <ul class="pagination mb-0 ms-3">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
              <span class="d-none d-sm-inline">previous</span>
              <span class="d-sm-none">«</span> <!-- Compact icon for small screens -->
            </button>
          </li>
        </ul>

        <!-- Numbered Pagination -->
        <ul class="pagination mb-0">
          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button
              class="page-link"
              v-if="page !== '...'"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
            <span v-else class="page-link">...</span>
          </li>
        </ul>

        <!-- Next Button -->
        <ul class="pagination mb-0 me-3">
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
              <span class="d-none d-sm-inline">next</span>
              <span class="d-sm-none">»</span> <!-- Compact icon for small screens -->
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <div class="card-body table-responsive">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody v-if="players.length">
          <tr v-for="(player, index) in players" :key="player._id">
            <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ formatTime(player.totalTime) }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3" class="text-center">No players found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    <div v-else class="d-flex justify-content-center">
        <div class="spinner-border text-warning" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <br><br>
  </div>
</template>

<script>
export default {
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
            const response = await this.$axios.get('/game/serverInfo');
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

            const response = await this.$axios.get("/players", {
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

<style>
.server-view .card {
  border-radius: 8px;
  background-color: #1c1c1c !important; /* Lighter gray for contrast */
  border: 1px solid #3a3a3a;
}

.server-view .card-header {
  font-weight: bold;
  font-size: 1.1em;
  background-color: rgb(242, 142, 38);
}

#title {
  color: #ff8000;
}

#cdnImage {
  width: 100%;
  object-fit: cover;
}

.hoveri:hover {
  background: linear-gradient(135deg, #2e2e2e, #1f1f1f); /* Subtle gradient on hover */
}

.server-view .table th, .server-view .table td {
  vertical-align: middle;
}

.server-view .img-fluid {
  border: 2px solid #333;
}

.banner-section {
  background-image: url('../assets/cover3.jpg'); /* Optional background image */
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.summary {
  background-image:linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('../assets/zombie-banner.png'); /* Optional background image */
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.pagination-container {
  margin-top: 20px;
}

.pagination {
  margin-bottom: 0; /* Remove extra margin */
}

.pagination .page-item .page-link {
  color: #fff;
  background-color: #222; /* Dark background for pagination buttons */
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
  padding: 5px 10px; /* Compact padding */
}

.pagination .page-item .page-link:hover {
  background-color: #ff8000; /* Highlighted background on hover */
  border-color: #ff8000;
}

.pagination .page-item.active .page-link {
  background-color: #ff8000; /* Active page button */
  border-color: #ff8000;
  color: #fff;
}

.pagination .page-item.disabled .page-link {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
}

/* Responsive Adjustments for Small Devices */
@media (max-width: 768px) {
  .pagination-container {
    justify-content: center; /* Center pagination on smaller devices */
  }

  .pagination .page-item {
    display: inline-block;
    margin: 0 2px; /* Reduce margin for compact layout */
  }

  .pagination .page-item .page-link {
    font-size: 12px; /* Smaller font size for compact layout */
    padding: 4px 8px; /* Reduce padding */
  }
}

/* Very Small Devices */
@media (max-width: 480px) {
  .pagination-container {
    flex-direction: column;
    align-items: center;
  }

  .pagination .page-item {
    margin: 2px 0; /* Stack buttons vertically */
  }

  .pagination .page-item .page-link {
    font-size: 10px; /* Smaller font size for extra compact layout */
  }
}

.server-view {
  margin-top: 30px;
}

.server-view input.form-control {
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #222; /* Dark background for input */
  color: #fff; /* Text color */
}

.server-view input.form-control::placeholder {
  color: #aaa; /* Placeholder text color */
}

.server-view input.form-control:focus {
  box-shadow: none;
  border-color: #ff8000; /* Highlighted border color */
}

.server-view select.form-select {
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #222; /* Dark background for select */
  color: #fff; /* Text color */
}

.server-view select.form-select:focus {
  box-shadow: none;
  border-color: #ff8000; /* Highlighted border color */
}

.server-view button.btn-primary {
  background-color: #007bff; /* Blue button background */
  border-color: #007bff;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
}

.server-view button.btn-primary:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.server-view .pagination-container {
  margin-top: 20px;
}

.server-view .pagination .page-item .page-link {
  color: #fff;
  background-color: #222; /* Dark background for pagination buttons */
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
}

.server-view .pagination .page-item .page-link:hover {
  background-color: #ff8000; /* Highlighted background on hover */
  border-color: #ff8000;
}

.server-view .pagination .page-item.active .page-link {
  background-color: #ff8000; /* Active page button */
  border-color: #ff8000;
  color: #fff;
}

.server-view .pagination .page-item.disabled .page-link {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
}

</style>