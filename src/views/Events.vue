<template>
  <div class="events-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-icon">🎮</span>
          Events & Updates
        </h1>
        <p class="subtitle">Stay updated with the latest server news and events</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="navigation-section">
      <div class="container">
        <div class="nav-tabs">
          <button
            class="nav-tab"
            :class="{ active: showUpdates }"
            @click="showUpdates = true"
          >
            <span class="tab-icon">🆕</span>
            <span class="tab-text">Latest Updates</span>
          </button>
          <button
            class="nav-tab"
            :class="{ active: !showUpdates }"
            @click="showUpdates = false"
          >
            <span class="tab-icon">🏆</span>
            <span class="tab-text">Server Events</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <div class="container">
        <!-- Updates Section -->
        <div v-if="showUpdates" class="updates-content">
          <div v-for="(update, index) in updates" :key="index" class="update-card">
            <div class="update-header">
              <div class="update-badge">NEW</div>
              <h2 class="update-title">{{ update.title }}</h2>
              <p class="update-description">{{ update.description }}</p>
            </div>

            <div class="update-content">
              <div class="update-image-section">
                <div class="image-container">
                  <img :src="update.image" :alt="update.title" class="update-image">
                  <div class="image-overlay">
                    <span class="overlay-text">Update {{ index + 1 }}</span>
                  </div>
                </div>
              </div>

              <div class="update-details">
                <div class="section-header">
                  <h3 class="section-title">{{ update.shortDesc }}</h3>
                  <div class="section-divider"></div>
                </div>

                <div class="items-grid">
                  <div v-for="(item, i) in update.items" :key="i" class="item-card">
                    <div class="item-image-container">
                      <img :src="item.image" :alt="item.name" class="item-image">
                      <div class="item-overlay">
                        <span class="item-name">{{ item.name }}</span>
                      </div>
                    </div>
                    <div class="item-content">
                      <h4 class="item-title">{{ item.name }}</h4>
                      <p class="item-description">{{ item.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Events Section -->
        <div v-else class="events-content">
          <!-- VIP Rewards Event -->
          <div class="event-card featured-event">
            <div class="event-header">
              <div class="event-icon">👑</div>
              <div class="event-info">
                <h2 class="event-title">Monthly VIP Rewards</h2>
                <p class="event-subtitle">Compete for exclusive rewards every month!</p>
              </div>
            </div>

            <div class="event-content">
              <p class="event-description">
                Compete to be in the Top 3 players in the server leaderboard and
                win exclusive VIP rewards! The event runs every month from the 1st
                to the 30th.
              </p>

              <div class="rewards-grid">
                <div class="reward-item first-place">
                  <div class="reward-rank">🥇</div>
                  <div class="reward-details">
                    <h4>Top 1</h4>
                    <p>VIP for 1 month + 5000 points</p>
                  </div>
                </div>
                <div class="reward-item second-place">
                  <div class="reward-rank">🥈</div>
                  <div class="reward-details">
                    <h4>Top 2</h4>
                    <p>VIP for 2 weeks + 3000 points</p>
                  </div>
                </div>
                <div class="reward-item third-place">
                  <div class="reward-rank">🥉</div>
                  <div class="reward-details">
                    <h4>Top 3</h4>
                    <p>VIP for 1 week + 1000 points</p>
                  </div>
                </div>
              </div>

              <div class="event-cta">
                <p class="cta-text">Push your limits, claim the top spot, and earn amazing rewards!</p>
              </div>
            </div>
          </div>

          <!-- Top Players Leaderboard -->
          <div class="leaderboard-section">
            <div class="section-header">
              <h2 class="section-title">🏆 Last Month Top 15</h2>
              <p class="section-subtitle">The best players from last month's competition</p>
            </div>

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
  </div>
</template>

<script>
import axiosInstance from '../config/axios'
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
          shortDesc: "Weapons and Skins",
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
          title: "Spring In Game Effects and Knives",
          description: "Equip yourself with exclusive holiday outfits and immerse yourself in the seasonal spirit while taking down your enemies.",
          shortDesc: "Knives",
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
              name: "War Hammer (VIP Only)",
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
        const response = await axiosInstance.get("/stats/top15/by-month");
        this.players = response.data.players;
      } catch (error) {
        console.error("Error fetching top 15 players:", error);
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
.events-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Header Section */
.header-section {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
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
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-tab.active {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.4);
}

.tab-icon {
  font-size: 1.3rem;
}

/* Content Section */
.content-section {
  padding: 3rem 0;
}

/* Updates Content */
.updates-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.update-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.update-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.update-header {
  text-align: center;
  margin-bottom: 2rem;
}

.update-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.update-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.update-description {
  font-size: 1.2rem;
  color: #cccccc;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.update-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.update-image-section {
  display: flex;
  justify-content: center;
}

.image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.update-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-container:hover .update-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-weight: 600;
}

.update-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
}

.section-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ff1a1a, #cc0000);
  margin: 0 auto;
  border-radius: 2px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.item-image-container {
  position: relative;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-card:hover .item-image {
  transform: scale(1.1);
}

.item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
  text-align: center;
}

.item-name {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.item-content {
  padding: 1.5rem;
}

.item-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-align: center;
}

.item-description {
  color: #cccccc;
  line-height: 1.6;
  font-size: 0.95rem;
  text-align: center;
}

/* Events Content */
.events-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.event-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.featured-event {
  border: 2px solid rgba(255, 26, 26, 0.3);
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.event-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.3);
}

.event-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
}

.event-subtitle {
  font-size: 1.2rem;
  color: #cccccc;
  margin: 0;
}

.event-description {
  font-size: 1.1rem;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.reward-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
}

.first-place {
  border-color: rgba(255, 215, 0, 0.5);
  background: rgba(255, 215, 0, 0.1);
}

.second-place {
  border-color: rgba(192, 192, 192, 0.5);
  background: rgba(192, 192, 192, 0.1);
}

.third-place {
  border-color: rgba(205, 127, 50, 0.5);
  background: rgba(205, 127, 50, 0.1);
}

.reward-rank {
  font-size: 2rem;
  flex-shrink: 0;
}

.reward-details h4 {
  color: white;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.reward-details p {
  color: #cccccc;
  margin: 0;
}

.event-cta {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 26, 26, 0.3);
}

.cta-text {
  font-size: 1.2rem;
  color: #ff1a1a;
  font-weight: 600;
  margin: 0;
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
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1.5rem;
  text-align: center;
}

.header-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
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
  border-bottom: 2px solid rgba(255, 26, 26, 0.3);
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
  color: #ff1a1a;
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
  color: #ff1a1a;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .update-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .items-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .events-container {
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
  
  .update-card {
    padding: 1.5rem;
  }
  
  .update-title {
    font-size: 2rem;
  }
  
  .event-header {
    flex-direction: column;
    text-align: center;
  }
  
  .event-icon {
    width: 60px;
    height: 60px;
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
  .main-title {
    font-size: 2rem;
  }
  
  .update-title {
    font-size: 1.5rem;
  }
  
  .event-title {
    font-size: 2rem;
  }
  
  .nav-tab {
    width: 100%;
    justify-content: center;
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
  