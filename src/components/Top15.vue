<template>
  <div class="top15-container">

    <!-- Content Section -->
    <div class="content-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-section">
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading top players...</p>
          </div>
        </div>

        <!-- Top 15 Leaderboard -->
        <div v-else class="leaderboard-section">
          <div class="leaderboard-card">
            <div class="leaderboard-header">
              <span class="header-text">Top 15 Players</span>
            </div>
            
            <div class="table-container">
              <table class="leaderboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Kills</th>
                    <th>HS Kills</th>
                    <th>Mode Kills</th>
                    <th>Infections</th>
                    <th>Infected</th>
                    <th>Bomb Infections</th>
                    <th>Deaths</th>
                    <th>Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in players" :key="player.Rank" class="player-row">
                    <td class="rank-cell">
                      <span class="rank-badge" :class="getRankClass(player.Rank)">{{ player.Rank }}</span>
                    </td>
                    <td class="player-name-cell">
                      <div class="player-info">
                        <span class="player-name">{{ player.Name }}</span>
                        <div class="country-tooltip">
                          <img :src="getCountryFlag(player.Country)" class="flag-icon" :alt="player.Country" />
                          <span class="tooltip-text">{{ player.Country }}</span>
                        </div>
                      </div>
                    </td>
                    <td>{{ player.Kills }}</td>
                    <td>{{ player.HsKills }}</td>
                    <td>{{ player.ZombieModeKills + player.HumanModeKills }}</td>
                    <td>{{ player.Infections }}</td>
                    <td>{{ player.Infected }}</td>
                    <td>{{ player.BombInfections }}</td>
                    <td>{{ player.Deaths }}</td>
                    <td class="score-cell">
                      <strong>{{ player.TotalScore }}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../config/axios'

export default {
  name: "Top15Players",
  data() {
    return {
      players: [],
      loading: true,
    };
  },
  methods: {
    async fetchTopPlayers() {
      try {
        const response = await axiosInstance.get("/stats/top15");
        this.players = response.data;
      } catch (error) {
        console.error("Error fetching top 15 players:", error);
      } finally {
        this.loading = false;
      }
    },
    getCountryFlag(country) {
      return `https://flagcdn.com/w40/${this.getCountryCode(country)}.png`;
    },
    getCountryCode(countryName) {
      const countryMap = {
        "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Andorra": "ad",
        "Angola": "ao", "Argentina": "ar", "Armenia": "am", "Australia": "au",
        "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh",
        "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Belize": "bz",
        "Benin": "bj", "Bhutan": "bt", "Bolivia": "bo", "Bosnia and Herzegovina": "ba",
        "Botswana": "bw", "Brazil": "br", "Brunei": "bn", "Bulgaria": "bg",
        "Burkina Faso": "bf", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm",
        "Canada": "ca", "Chile": "cl", "China": "cn", "Colombia": "co",
        "Comoros": "km", "Congo (Congo-Brazzaville)": "cg", "Congo (Congo-Kinshasa)": "cd",
        "Costa Rica": "cr", "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy",
        "Czechia": "cz", "Denmark": "dk", "Djibouti": "dj", "Dominican Republic": "do",
        "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Estonia": "ee",
        "Eswatini": "sz", "Ethiopia": "et", "Fiji": "fj", "Finland": "fi",
        "France": "fr", "Germany": "de", "Greece": "gr", "Guatemala": "gt",
        "Honduras": "hn", "Hungary": "hu", "Iceland": "is", "India": "in",
        "Indonesia": "id", "Iran": "ir", "Iraq": "iq", "Ireland": "ie",
        "Israel": "il", "Italy": "it", "Jamaica": "jm", "Japan": "jp",
        "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kuwait": "kw",
        "Latvia": "lv", "Lebanon": "lb", "Libya": "ly", "Lithuania": "lt",
        "Luxembourg": "lu", "Malaysia": "my", "Maldives": "mv", "Mexico": "mx",
        "Mongolia": "mn", "Montenegro": "me", "Morocco": "ma", "Nepal": "np",
        "Netherlands": "nl", "New Zealand": "nz", "Nigeria": "ng", "North Macedonia": "mk",
        "Norway": "no", "Oman": "om", "Pakistan": "pk", "Panama": "pa",
        "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt",
        "Qatar": "qa", "Romania": "ro", "Russia": "ru", "Saudi Arabia": "sa",
        "Serbia": "rs", "Slovakia": "sk", "Slovenia": "si", "South Africa": "za",
        "South Korea": "kr", "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd",
        "Sweden": "se", "Switzerland": "ch", "Syria": "sy", "Thailand": "th",
        "Tunisia": "tn", "Turkey": "tr", "Ukraine": "ua", "United Arab Emirates": "ae",
        "United Kingdom": "gb", "United States": "us", "Uruguay": "uy", "Uzbekistan": "uz",
        "Vietnam": "vn", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw",
        "Kosovo": "xk"
      };
      return countryMap[countryName] || "un";
    },
    getRankClass(rank) {
      if (rank === 1) return 'rank-gold';
      if (rank === 2) return 'rank-silver';
      if (rank === 3) return 'rank-bronze';
      return 'rank-normal';
    }
  },
  created() {
    this.fetchTopPlayers();
  },
};
</script>

<style scoped>
.top15-container {
  min-height: 100vh;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Header Section */
.header-section {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: 3rem;
  animation: bounce 2s infinite;
}

.subtitle {
  font-size: 1.3rem;
  color: #cccccc;
  font-weight: 300;
  margin: 0;
}

/* Loading Section */
.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 215, 0, 0.3);
  border-top: 4px solid #ffd700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-spinner p {
  color: #cccccc;
  font-size: 1.1rem;
}

/* Leaderboard Section */
.leaderboard-section {
  margin-top: 2rem;
}

.leaderboard-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.leaderboard-header {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  padding: 1.5rem;
  text-align: center;
}

.header-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}

.table-container {
  padding: 1.5rem;
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.leaderboard-table th {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 0.75rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
}

.leaderboard-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  vertical-align: middle;
}

.player-row:hover {
  background: rgba(255, 255, 255, 0.05);
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
}

.rank-gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
}

.rank-silver {
  background: linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 100%);
  color: #000;
}

.rank-bronze {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  color: #000;
}

.rank-normal {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.player-name-cell {
  min-width: 200px;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.player-name {
  font-weight: 600;
  color: #ffd700;
}

.country-tooltip {
  position: relative;
  display: inline-block;
}

.flag-icon {
  width: 24px;
  height: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.flag-icon:hover {
  transform: scale(1.2);
}

.tooltip-text {
  visibility: hidden;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.country-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.score-cell {
  text-align: center;
  font-weight: 700;
  color: #ffd700;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .top15-container {
    padding: 0 0.5rem;
  }
  
  .header-section {
    padding: 2rem 1rem 1rem;
  }
  
  .main-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .leaderboard-table {
    font-size: 0.8rem;
  }
  
  .leaderboard-table th,
  .leaderboard-table td {
    padding: 0.5rem 0.25rem;
  }
}
</style>
  