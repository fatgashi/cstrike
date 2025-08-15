<template>
  <div class="rules-view">
    <!-- Hero Header -->
    <div class="hero-header">
      <div class="hero-content">
        <div class="hero-icon">📜</div>
        <div class="hero-text">
          <h1 class="hero-title">Server Rules</h1>
          <p class="hero-subtitle">Know the rules, play fair, dominate the apocalypse</p>
        </div>
        <div class="hero-badges">
          <div class="badge-item">
            <span class="badge-icon">⚖️</span>
            <span class="badge-text">Fair Play</span>
          </div>
          <div class="badge-item">
            <span class="badge-icon">🛡️</span>
            <span class="badge-text">Community</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rules Content -->
    <div class="rules-content">
      <div class="content-wrapper">
        <!-- Golden Rules Section -->
        <div class="rules-section golden-rules">
          <div class="section-header">
            <div class="section-icon">👑</div>
            <div class="section-info">
              <h3 class="section-title">Golden Rules</h3>
              <p class="section-description">The foundation of our community</p>
            </div>
          </div>
          
          <div class="rules-grid">
            <div class="rule-card golden">
              <div class="rule-number">1</div>
              <div class="rule-content">
                <h4 class="rule-title">Respect Others</h4>
                <p class="rule-description">Respect others to receive respect in return</p>
              </div>
            </div>
            
            <div class="rule-card golden">
              <div class="rule-number">2</div>
              <div class="rule-content">
                <h4 class="rule-title">Follow Rule #1</h4>
                <p class="rule-description">Adhere strictly to the first rule</p>
              </div>
            </div>
            
            <div class="rule-card golden">
              <div class="rule-number">3</div>
              <div class="rule-content">
                <h4 class="rule-title">Have Fun</h4>
                <p class="rule-description">The primary objective is to have fun</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Infractions Section -->
        <div class="rules-section infractions">
          <div class="section-header">
            <div class="section-icon">🚨</div>
            <div class="section-info">
              <h3 class="section-title">Infractions & Punishments</h3>
              <p class="section-description">Consequences for rule violations</p>
            </div>
          </div>

          <div class="infractions-grid">
            <!-- Gag Section -->
            <div class="infraction-card gag">
              <div class="infraction-header">
                <div class="infraction-icon">🛑</div>
                <h4 class="infraction-title">Gag (Mute)</h4>
                <div class="infraction-severity">Minor</div>
              </div>
              <ul class="infraction-list">
                <li>Players using offensive language or aggressive behavior</li>
                <li>Begging for ammunition repeatedly</li>
                <li>Initial gag is 3 minutes, increases with repeated offenses</li>
              </ul>
            </div>

            <!-- Slay Section -->
            <div class="infraction-card slay">
              <div class="infraction-header">
                <div class="infraction-icon">❌</div>
                <h4 class="infraction-title">Slay (In-Game Kill)</h4>
                <div class="infraction-severity">Moderate</div>
              </div>
              <ul class="infraction-list">
                <li>Destroying another player's lasermine</li>
                <li>Zombies hiding or refusing to attack (except Samurai mode)</li>
                <li>Using jetpacks in survivor/nemesis/samurai modes</li>
                <li>Deploying lasermines as a survivor</li>
                <li>Buying multiple mods in the same map (one mod per map allowed)</li>
              </ul>
            </div>

            <!-- Ban Section -->
            <div class="infraction-card ban">
              <div class="infraction-header">
                <div class="infraction-icon">🚫</div>
                <h4 class="infraction-title">Ban (Permanent or Temporary)</h4>
                <div class="infraction-severity">Severe</div>
              </div>
              <ul class="infraction-list">
                <li>Using hacks results in a permanent ban with proof (demo required)</li>
                <li>Offensive language after 3 gags = ban (5-30 mins)</li>
                <li>Insulting players/admins (family, religion, race) can lead to long-term bans</li>
                <li>Reconnecting or switching to spectator when chosen as first zombie</li>
              </ul>
            </div>

            <!-- Slap Section -->
            <div class="infraction-card slap">
              <div class="infraction-header">
                <div class="infraction-icon">✋</div>
                <h4 class="infraction-title">Slap (In-Game Nudge)</h4>
                <div class="infraction-severity">Warning</div>
              </div>
              <ul class="infraction-list">
                <li>Players stuck in map corners or glitches may be slapped</li>
                <li>Zombies refusing to attack get slaps, then freeze, then slay</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Game Mode Rules Section -->
        <div class="rules-section game-modes">
          <div class="section-header">
            <div class="section-icon">🎮</div>
            <div class="section-info">
              <h3 class="section-title">Game Mode Rules</h3>
              <p class="section-description">Specific rules for different gameplay modes</p>
            </div>
          </div>

          <div class="game-modes-grid">
            <!-- Sniper Mode -->
            <div class="mode-card sniper">
              <div class="mode-header">
                <div class="mode-icon">🔭</div>
                <h4 class="mode-title">Sniper</h4>
              </div>
              <ul class="mode-rules">
                <li>Jetpack usage is forbidden</li>
                <li>Snipers must hide</li>
              </ul>
            </div>

            <!-- Survivor Mode -->
            <div class="mode-card survivor">
              <div class="mode-header">
                <div class="mode-icon">🔫</div>
                <h4 class="mode-title">Survivor</h4>
              </div>
              <ul class="mode-rules">
                <li>Jetpack usage is forbidden</li>
                <li>Lasermine deployment is allowed</li>
                <li>When asked "Did you read the rules?", you must write: <span class="keyword">{{ keyword }}</span></li>
                <li>Survivors must hide</li>
              </ul>
            </div>

            <!-- Nemesis Mode -->
            <div class="mode-card nemesis">
              <div class="mode-header">
                <div class="mode-icon">💀</div>
                <h4 class="mode-title">Nemesis</h4>
              </div>
              <ul class="mode-rules">
                <li>Free nemesis is allowed only if granted to all players</li>
                <li>Hiding to prolong the round is not allowed</li>
              </ul>
            </div>

            <!-- Assassin Mode -->
            <div class="mode-card assassin">
              <div class="mode-header">
                <div class="mode-icon">⚔️</div>
                <h4 class="mode-title">Assassin</h4>
              </div>
              <ul class="mode-rules">
                <li>Must attack all players, not selectively avoid some</li>
                <li>No hiding to extend the round</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="notice-section">
          <div class="notice-card">
            <div class="notice-icon">⚠️</div>
            <div class="notice-content">
              <h4 class="notice-title">Important Notice</h4>
              <p class="notice-text">Ignorance of the rules is not an excuse. All players are expected to read and follow these guidelines. Repeated violations may result in increased penalties.</p>
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
  name: "RulesView",
  data() {
    return {
      keyword: ""
    };
  },
  metaInfo() {
    return {
      title: 'ZM Server Rules | zm-westcstrike.com',
      meta: [
        {
          name: 'description',
          content: 'Read the full ZM server rules including punishments, golden rules, and game mode guidelines. Stay informed and avoid penalties.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://zm-westcstrike.com/forum/rules'
        }
      ]
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get('/admin/get-keyword');
      this.keyword = response.data.keyword;
    } catch (error) {
      console.error('Error fetching keyword:', error);
    }
  }
};
</script>

<style scoped>
/* Rules View Container */
.rules-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.rules-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,26,26,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

/* Hero Header */
.hero-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-family: 'Nosifer', cursive;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.badge-item {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1rem 1.5rem;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 120px;
}

.badge-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.badge-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Rules Content */
.rules-content {
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

/* Rules Section */
.rules-section {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  padding: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.section-description {
  color: #cccccc;
  margin: 0;
  font-size: 0.9rem;
}

/* Golden Rules */
.golden-rules {
  border-left: 5px solid #ffd700;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.rule-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.rule-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 30px rgba(255, 215, 0, 0.2);
}

.rule-card.golden {
  border-color: rgba(255, 215, 0, 0.3);
}

.rule-number {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  flex-shrink: 0;
}

.rule-title {
  color: #ffd700;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.rule-description {
  color: #cccccc;
  margin: 0;
  line-height: 1.5;
}

/* Infractions */
.infractions {
  border-left: 5px solid #ff4444;
}

.infractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.infraction-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.infraction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 68, 68, 0.2);
}

.infraction-card.gag {
  border-color: rgba(255, 193, 7, 0.3);
}

.infraction-card.slay {
  border-color: rgba(255, 87, 34, 0.3);
}

.infraction-card.ban {
  border-color: rgba(244, 67, 54, 0.3);
}

.infraction-card.slap {
  border-color: rgba(156, 39, 176, 0.3);
}

.infraction-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.infraction-icon {
  font-size: 2rem;
}

.infraction-title {
  color: white;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  flex: 1;
}

.infraction-severity {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.infraction-card.gag .infraction-severity {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.infraction-card.slay .infraction-severity {
  background: rgba(255, 87, 34, 0.2);
  color: #ff5722;
}

.infraction-card.ban .infraction-severity {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.infraction-card.slap .infraction-severity {
  background: rgba(156, 39, 176, 0.2);
  color: #9c27b0;
}

.infraction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.infraction-list li {
  color: #cccccc;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.infraction-list li::before {
  content: '•';
  color: #ff1a1a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Game Modes */
.game-modes {
  border-left: 5px solid #4caf50;
}

.game-modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.mode-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.mode-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 30px rgba(76, 175, 80, 0.2);
}

.mode-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mode-icon {
  font-size: 2rem;
}

.mode-title {
  color: #4caf50;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.mode-rules {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mode-rules li {
  color: #cccccc;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.mode-rules li::before {
  content: '▶';
  color: #4caf50;
  font-size: 0.8rem;
  position: absolute;
  left: 0;
}

.keyword {
  background: rgba(255, 26, 26, 0.2);
  color: #ff1a1a;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  border: 1px solid rgba(255, 26, 26, 0.3);
}

/* Notice Section */
.notice-section {
  text-align: center;
}

.notice-card {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  backdrop-filter: blur(10px);
  max-width: 800px;
  margin: 0 auto;
}

.notice-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.notice-title {
  color: #ffc107;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.notice-text {
  color: #cccccc;
  margin: 0;
  line-height: 1.6;
  text-align: left;
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
@media (max-width: 768px) {
  .hero-header {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-badges {
    gap: 1rem;
  }
  
  .badge-item {
    min-width: 100px;
    padding: 0.75rem 1rem;
  }
  
  .rules-content {
    padding: 2rem 1rem;
  }
  
  .content-wrapper {
    gap: 1.5rem;
  }
  
  .rules-section {
    padding: 2rem;
  }
  
  .rules-grid,
  .infractions-grid,
  .game-modes-grid {
    grid-template-columns: 1fr;
  }
  
  .rule-card {
    flex-direction: column;
    text-align: center;
  }
  
  .notice-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-icon {
    font-size: 3rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-badges {
    flex-direction: column;
    align-items: center;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
  }
  
  .infraction-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .mode-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
  