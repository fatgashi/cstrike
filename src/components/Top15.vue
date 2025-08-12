<template>
    <div class="container mt-5">
      <div v-if="loading" class="text-center my-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else style="min-height: 600px;">
        <div class="card text-white" style="background-color: transparent !important;">
          <div class="card-header text-center">Top 15 Players</div>
          <div class="card-body table-responsive">
            <table class="table table-dark table-striped">
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
                <tr v-for="player in players" :key="player.Rank">
                  <td>{{ player.Rank }}</td>
                  <td class="player-name">
                    <span class="tooltip-container">
                      {{ player.Name }}
                      <span class="tooltip-text"><img :src="getCountryFlag(player.Country)" loading="lazy" width="30" height="40" class="flag-icon" alt="flag" /> {{ player.Country }}</span>
                    </span>
                  </td>
                  <td>{{ player.Kills }}</td>
                  <td>{{ player.HsKills }}</td>
                  <td>{{ player.ZombieModeKills + player.HumanModeKills }}</td>
                  <td>{{ player.Infections }}</td>
                  <td>{{ player.Infected }}</td>
                  <td>{{ player.BombInfections }}</td>
                  <td>{{ player.Deaths }}</td>
                  <td><strong>{{ player.TotalScore }}</strong></td>
                </tr>
              </tbody>
            </table>
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
    },
    created() {
      this.fetchTopPlayers();
    },
  };
  </script>
  
  <style scoped>
  /* Tooltip container */
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  /* Tooltip text */
  .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  /* Show the tooltip when hovering over the name */
  .tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
  
  /* Flag icon */
  .flag-icon {
    width: 20px;
    height: 14px;
    margin-right: 5px;
    vertical-align: middle;
  }

    .card {
        border-radius: 8px;
        background-color: #1c1c1c !important; /* Lighter gray for contrast */
        border: 1px solid #3a3a3a;
    }

    .card-header {
        font-weight: bold;
        font-size: 1.1em;
        background-color: #ff1a1a;
    }
  </style>
  