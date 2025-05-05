<template>
    <div>
        <br>
        <div class="latest-updates container mt-4">
          <div class="text-center mb-4">
            <button
              class="btn mx-2 text-white"
              style="background-color: #ff1a1a;"
              :class="{ active: showUpdates }"
              @click="showUpdates = true"
            >
              Show Updates
            </button>
            <button
              class="btn mx-2 text-white"
              style="background-color: green;"
              :class="{ active: !showUpdates }"
              @click="showUpdates = false"
            >
              Show Events
            </button>
          </div>          
          <!-- Updates Section -->
           <div v-if="showUpdates">
             <section v-for="(update, index) in updates" :key="index" class="update-section mb-5">
               <h1 class="text-center mb-4 fw-bolder">Latest Server Updates</h1>
               <div class="row align-items-center">
                   <h2 class="update-title text-center fw-bolder">{{ update.title }}</h2>
                   <p class="update-description text-center">{{ update.description }}</p>
                 <!-- Image Column -->
                 <div class="col-md-5">
                   <img :src="update.image" :alt="update.title" class="img-fluid rounded shadow-sm mb-4">
                 </div>
                 <!-- Content Column -->
                 <div class="col-md-7">            
                   <!-- Weapon Details -->
                   <div v-if="update.items && update.items.length" class="item-details mt-3">
                     <h4 class="fw-bolder">{{ update.shortDesc }}</h4>
                     <div class="row">
                       <div class="col-md-6" v-for="(item, i) in update.items" :key="i">
                         <div class="card item-card mb-3">
                           <img :src="item.image" :alt="item.name" class="card-img-top">
                           <div class="card-body">
                             <h5 class="card-title fw-bolder">{{ item.name }}</h5>
                             <p class="card-text">{{ item.description }}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>
           </div>

          <div v-else>
            <div class="events-view container mt-4">
              <h1 class="text-center mb-4 fw-bolder">Server Events</h1>
              <div class="event-section text-white p-4 rounded">
                <h2 class="text-center fw-bolder" style="color: #ff1a1a;">Monthly VIP Rewards</h2>
                <p class="mt-3">
                  Compete to be in the Top 3 players in the server leaderboard and
                  win exclusive VIP rewards! The event runs every month from the 1st
                  to the 30th.
                </p>
                <ul class="list-group mt-3">
                  <li class="list-group-item bg-dark text-white">
                    <strong style="color: #ff1a1a;">Top 1:</strong> VIP for 1 month + 5000 points
                  </li>
                  <li class="list-group-item bg-dark text-white">
                    <strong style="color: #ff1a1a;">Top 2:</strong> VIP for 2 weeks + 3000 points
                  </li>
                  <li class="list-group-item bg-dark text-white">
                    <strong style="color: #ff1a1a;">Top 3:</strong> VIP for 1 week + 1000 points
                  </li>
                </ul>
                <p class="mt-4 text-center">
                  Push your limits, claim the top spot, and earn amazing rewards!
                </p>
              </div>
            </div>
            <h2 class="text-center fw-bolder" style="color: #ff1a1a;">Last Month Top15</h2>
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
                          <span class="tooltip-text"><img :src="getCountryFlag(player.Country)" class="flag-icon" alt="flag" /> {{ player.Country }}</span>
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
        <br>
        <br>
    </div>
  </template>
  
  <script>
  export default {
    name: "EventsView",
    data() {
      return {
        showUpdates: true,
        players: [],
        updates: [
          {
            title: "New Spring Update",
            description: "Our latest spring update brings an amazing feel to the battlefield with exclusive skins and new weapons.",
            shortDesc: "Wepons and Skins",
            image: require("../assets/spring/spring-update.webp"),
            items: [
              {
                name: "Ethereal",
                description: "The Ethereal is a futuristic energy-based weapon featured in Counter-Strike 1.6, showcasing a sleek, high-tech design with glowing, dynamic energy cores. Its vivid blue and green accents give it a sci-fi aesthetic, making it stand out in the zombie game mode. Perfectly balanced between style and functionality, the Ethereal is ideal for players seeking a unique, visually stunning weapon to dominate the battlefield.",
                image: require("../assets/spring/etheral-gun.png")
              },
              {
                name: "Barlog-XI",
                description: "The Barlog-XI is a menacing shotgun with a fiery red and black design, adorned with demonic horn-like embellishments for a sinister aesthetic. This weapon exudes power and aggression, making it perfect for intense combat scenarios in Counter-Strike 1.6 zombie modes. Its intimidating appearance complements its devastating performance, offering players a visually striking and highly effective tool for survival.",
                image: require("../assets/spring/barlog.png")
              },
              {
                name: "AK47 Silver",
                description: "The AK47 Silver is a sleek and modern variant of the classic AK47, featuring a polished silver finish that gives it a sophisticated yet deadly appearance. This weapon combines the iconic design of the AK47 with a contemporary twist, making it a standout choice for players in Counter-Strike 1.6 zombie modes. Its striking look is matched by its reliability and power, ensuring players can dominate the battlefield with style.",
                image: require("../assets/spring/ak47-silver.png")
              },
            ]
          },
          {
            title: "Spring In Game Effects and Knifes",
            description: "Equip yourself with exclusive holiday outfits and immerse yourself in the seasonal spirit while taking down your enemies.",
            shortDesc: "Knifes",
            image: require("../assets/spring/spring-update1.webp"),
            items: [
              {
                name: "Dual Katana (Speed)",
                description: "Swift and deadly, the X-MAS Dual Katana grants incredible speed, allowing you to outmaneuver and strike down your enemies with precision. Perfect for players who value agility and quick reflexes.",
                image: require("../assets/chrismas/katana.png")
              },
              {
                name: "Ruyi Stick (Jump)",
                description: "Leap into action with the X-MAS Ruyi Stick, a festive weapon that enhances your jump height, giving you a tactical advantage in reaching high ground or evading enemies.",
                image: require("../assets/chrismas/stick.png")
              },
              {
                name: "Shadow Axe (Damage)",
                description: "Unleash devastating power with the X-MAS Shadow Axe, designed to deliver maximum damage with every swing. Ideal for players who prioritize raw strength and impact.",
                image: require("../assets/chrismas/axe.png")
              },
              {
                name: "Hammer (Knockback)",
                description: "Send your enemies flying with the X-MAS Hammer, a mighty weapon that excels in knockback, giving you control over the battlefield and creating distance when needed.",
                image: require("../assets/chrismas/hammer.png")
              },
              {
                name: "War Hammer (Vip Only)",
                description: "The ultimate weapon for VIP players, the X-MAS War Hammer combines the speed of the Dual Katana, the jump boost of the Ruyi Stick, the damage of the Shadow Axe, and the knockback of the Hammer, with additional bonus damage. A true masterpiece of destruction for the battlefield.",
                image: require("../assets/chrismas/war-hammer.png")
              }
            ]
          }
        ]
      };
    },
    methods: {
      async fetchTopPlayers() {
        try {
          const response = await this.$axios.get("/stats/top15/by-month");
          this.players = response.data.players;
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
  .latest-updates {
    color: #fff;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
  }

  .btn {
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  border: 2px solid transparent;
  padding: 8px 20px;
  border-radius: 6px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.btn.active {
  border: 2px solid #ffffff;
  box-shadow: 0 0 8px #ffffff;
  transform: scale(1.05);
}

.btn-show-updates {
  background-color: #ff1a1a;
  color: #fff;
}

.btn-show-updates:hover {
  background-color: #cc0000;
}

.btn-show-events {
  background-color: #1f8b1f;
  color: #fff;
}

.btn-show-events:hover {
  background-color: #166616;
}
  
  .update-title {
    color: #ff1a1a;
    font-size: 1.5em;
  }
  
  .update-description {
    color: #ccc;
    font-size: 1em;
  }
  
  .item-details h4 {
    color: #ff1a1a;
    margin-top: 15px;
  }
  
  .item-card {
    background-color: #2e2e2e;
    border: none;
  }
  
  .card-title {
    color: #ff1a1a;
    font-size: 1.1em;
    text-align: center;
  }
  
  .card-text {
    color: #ccc;
    font-size: 0.9em;
    text-align: center;
  }
  
  .img-fluid {
   
    object-fit: cover;
  }
  
  .update-section {
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
  }

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
  