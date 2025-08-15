<template>
  <div class="vip-container">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-content">
        <div class="hero-icon">👑</div>
        <h1 class="hero-title">VIP Benefits</h1>
        <p class="hero-subtitle">Unlock exclusive perks and dominate the battlefield</p>
        <div class="vip-badge">
          <span class="badge-text">PREMIUM</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <div class="container">
        <!-- VIP Skins Section -->
        <section class="vip-section">
          <div class="section-header">
            <div class="section-icon">🎨</div>
            <div class="section-info">
              <h2 class="section-title">Exclusive VIP Skins</h2>
              <p class="section-description">Stand out on the battlefield with unique character and weapon skins</p>
            </div>
          </div>
          
          <div class="items-grid">
            <div v-for="(skin, index) in vipSkins" :key="index" class="item-card skin-card">
              <div class="card-image-container">
                <img :src="skin.image" :alt="skin.name" class="card-image">
                <div class="card-overlay">
                  <span class="overlay-text">{{ skin.name }}</span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ skin.name }}</h3>
                <div class="vip-tag">VIP Only</div>
              </div>
            </div>
          </div>
        </section>

        <!-- VIP Normal Guns Section -->
        <section class="vip-section">
          <div class="section-header">
            <div class="section-icon">🔫</div>
            <div class="section-info">
              <h2 class="section-title">VIP Normal Guns</h2>
              <p class="section-description">Unlock powerful guns without ammo restrictions</p>
            </div>
          </div>
          
          <div class="items-grid">
            <div v-for="(gun, index) in vipNormalGuns" :key="index" class="item-card weapon-card">
              <div class="card-image-container">
                <img :src="gun.image" :alt="gun.name" class="card-image">
                <div class="card-overlay">
                  <span class="overlay-text">{{ gun.name }}</span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ gun.name }}</h3>
                <div class="weapon-stats">
                  <span class="stat">No Ammo Cost</span>
                  <span class="stat">VIP Access</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- VIP Menu Guns Section -->
        <section class="vip-section">
          <div class="section-header">
            <div class="section-icon">⚡</div>
            <div class="section-info">
              <h2 class="section-title">VIP Menu Guns</h2>
              <p class="section-description">Special weapons with enhanced damage and unique abilities</p>
            </div>
          </div>
          
          <div class="items-grid">
            <div v-for="(gun, index) in vipGuns" :key="index" class="item-card special-weapon-card">
              <div class="card-image-container">
                <img :src="gun.image" :alt="gun.name" class="card-image">
                <div class="card-overlay">
                  <span class="overlay-text">{{ gun.name }}</span>
                </div>
                <div class="special-badge">SPECIAL</div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ gun.name }}</h3>
                <div class="weapon-stats">
                  <span class="stat">Enhanced Damage</span>
                  <span class="stat">VIP Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Zombie Classes Section -->
        <section class="vip-section">
          <div class="section-header">
            <div class="section-icon">🧟</div>
            <div class="section-info">
              <h2 class="section-title">Exclusive Zombie Classes</h2>
              <p class="section-description">Unique zombie classes with special abilities and powers</p>
            </div>
          </div>
          
          <div class="items-grid">
            <div v-for="(zombie, index) in zombieClasses" :key="index" class="item-card zombie-card">
              <div class="card-image-container">
                <img :src="zombie.image" :alt="zombie.name" class="card-image">
                <div class="card-overlay">
                  <span class="overlay-text">{{ zombie.name }}</span>
                </div>
                <div class="ability-badge">{{ getAbilityIcon(zombie.name) }}</div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ zombie.name }}</h3>
                <p class="card-description">{{ zombie.description }}</p>
                <div class="zombie-stats">
                  <span class="stat">Special Ability</span>
                  <span class="stat">VIP Class</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- VIP Benefits Section -->
        <section class="vip-section benefits-section">
          <div class="section-header">
            <div class="section-icon">💎</div>
            <div class="section-info">
              <h2 class="section-title">Extra Benefits</h2>
              <p class="section-description">Additional perks that give you the competitive edge</p>
            </div>
          </div>
          
          <div class="benefits-grid">
            <div v-for="(benefit, index) in vipBenefits" :key="index" class="benefit-item">
              <div class="benefit-icon">✨</div>
              <div class="benefit-content">
                <span class="benefit-text">{{ benefit }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <!-- <section class="cta-section">
          <div class="cta-card">
            <div class="cta-content">
              <h2 class="cta-title">Ready to Go VIP?</h2>
              <p class="cta-description">Join the elite and unlock all these exclusive benefits</p>
              <div class="cta-buttons">
                <button class="cta-btn primary">Get VIP Now</button>
                <button class="cta-btn secondary">Learn More</button>
              </div>
            </div>
          </div>
        </section> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VipInfo",
  metaInfo() {
    return {
      title: 'VIP Benefits | zm-westcstrike.com',
      meta: [
        {
          name: 'description',
          content: 'Discover all VIP perks including exclusive skins, guns, zombie classes, and gameplay advantages on zm-westcstrike CS 1.6 zombie server.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://zm-westcstrike.com/vip-info'
        }
      ]
    };
  },
  data() {
    return {
      // List of VIP Skins
      vipSkins: [
        { name: "Ghost Face", image: require("../assets/vip-skins/ghost-face.webp") },
      ],

      vipNormalGuns: [
        {name: "XM1014 M4", image: require("../assets/weapons/xm1014.png")},
        {name: "M4A1 Carbine", image: require("../assets/weapons/m4a1-carbine.png")},
        {name: "AK47 Kalashnikov", image: require("../assets/weapons/ak47-kalashnikov.png")},
      ],
      
      // List of VIP Guns
      vipGuns: [
        { name: "MP5 Gold", image: require("../assets/vipmenu/mp5.png") },
        { name: "Star Chaser AR", image: require("../assets/spring/star-chaser.png") },
        { name: "Rail Cannon", image: require("../assets/chrismas/rail-cannon.jpg") },
        { name: "Thantos-7", image: require("../assets/vipmenu/thantos-7.png") },
        { name: "M3 Black Dragon", image: require("../assets/spring/black-dragon.png") },
      ],

      zombieClasses: [
        {
          name: "Revenant Ice",
          description: "Throw an Ice ball and freeze your opponent!",
          image: require("../assets/vip-zombie/revenant-ice.png")
        },
        {
          name: "Furien",
          description: "You are invisible and can hang in walls.",
          image: require("../assets/vip-zombie/furien.png")
        },
        {
          name: "Boomer",
          description: "You have an extra infection grenade.",
          image: require("../assets/vip-zombie/boomer.png")
        },
        {
          name: "Vampire",
          description: "You have 3 extra blinks + speed + special ability to release a ghost.",
          image: require("../assets/vip-zombie/vampire.png")
        },
      ],
        
      // List of VIP Benefits
      vipBenefits: [
        "1000 HP and 100 Armor on Every Round",
        "5x Jumps",
        "Gain Ammo Faster",
        "Gain Level Faster",
        "Extra Damage",
        "Special Model Knife (War Hammer)",
      ]
    };
  },
  methods: {
    getAbilityIcon(zombieName) {
      const icons = {
        "Revenant Ice": "❄️",
        "Furien": "👻",
        "Boomer": "💥",
        "Vampire": "🦇"
      };
      return icons[zombieName] || "⚡";
    }
  }
};
</script>

<style scoped>
.vip-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
}

/* Hero Header */
.hero-header {
  text-align: center;
  padding: 5rem 2rem 3rem;
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%);
  position: relative;
  overflow: hidden;
}

.hero-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,26,26,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
  background: linear-gradient(135deg, #ff1a1a 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: #cccccc;
  font-weight: 300;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.vip-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* Content Wrapper */
.content-wrapper {
  padding: 3rem 0;
}

/* Section Styling */
.vip-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.3);
  flex-shrink: 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.section-description {
  font-size: 1.2rem;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Item Cards */
.item-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
}

.item-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 26, 26, 0.3);
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-card:hover .card-image {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1rem 1rem;
  text-align: center;
}

.overlay-text {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.special-badge, .ability-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.special-badge {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
}

.ability-badge {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-align: center;
}

.card-description {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: center;
}

.vip-tag {
  display: inline-block;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
}

.weapon-stats, .zombie-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  color: #cccccc;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Benefits Section */
.benefits-section {
  background: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 26, 26, 0.2);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 26, 26, 0.3);
}

.benefit-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-text {
  color: #cccccc;
  font-size: 1.1rem;
  font-weight: 500;
}

/* CTA Section */
.cta-section {
  margin-top: 3rem;
}

.cta-card {
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  border: 2px solid rgba(255, 26, 26, 0.3);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-btn.primary {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 26, 26, 0.4);
}

.cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 26, 26, 0.6);
}

.cta-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .items-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .benefits-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .vip-container {
    padding: 0 0.5rem;
  }
  
  .hero-header {
    padding: 3rem 1rem 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .section-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-card {
    padding: 2rem 1.5rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    padding: 1.5rem;
  }
}
</style>
  