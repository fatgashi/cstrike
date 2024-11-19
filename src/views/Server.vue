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
                <h5 class="card-title"><span id="title">Name: </span><span class="fw-bolder">{{ server.name }}</span></h5>
                <p class="card-text"><span id="title">Game: </span> <span class="fw-bolder">Counter Strike 1.6 | Status: Alive</span></p>
                <p class="card-text"><span id="title">IP Address: </span> <span class="fw-bolder">{{ server.connect }}</span></p>
                </div>
            </div>

      <!-- Game Server Banners Section -->
      <div class="card text-warning banner-section bg-dark mb-3">
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
            server: []
        }
    },

    async created() {
        try {
            const response = await this.$axios.get('/game/serverInfo');
            this.server = response.data.state || { players: [], bots: [] };
        } catch (error) {
            console.error("Error fetching server info:", error);
        }
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
  background-image:linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('../assets/zombie-banner.png'); /* Optional background image */
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}
</style>