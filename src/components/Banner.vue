<template>
  <div
    class="hero-section"
    :style="heroStyle"
  >
    <!-- Particle Background -->
    <div id="particles-js"></div>

    <!-- Content -->
    <div class="hero-content container">
      <h1 class="fade-in mt-3">
        Play <span style="color: #ff1a1a; font-family: 'Nosifer', cursive;">Zm-WestCStrike</span> – CS 1.6 Zombie Server
      </h1>
      <p class="fade-in">
        Welcome to the <strong>best CS 1.6 Zombie Plague server</strong> – Zm-WestCStrike. Join our intense zombie survival battles and experience top-tier Counter-Strike 1.6 multiplayer gameplay.
      </p>
      <div class="server-info fade-in">
        <p>Server IP: <span class="fw-bold">81.181.244.15:27015</span></p>
        <p>Status: <span class="online fw-bolder">Online</span></p>
        <p>Players: <span>{{players}}/32</span></p>
      </div>
        <a
          href="steam://connect/81.181.244.15:27015"
          class="btn text-white"
          target="_self"
          rel="noopener"
        >
          <button class="join-btn text-white mb-5">
              Join the Server
          </button>
        </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "BannerView",
  props: {
    players: {
      type: Number,
      default: 0
    }
  },
  computed: {
    heroStyle() {
      const isMobile = window.innerWidth <= 600;
      // Use zombie-themed backgrounds instead of spring
      const bg = isMobile
        ? require('../assets/zombie-banner.png')  // Mobile: zombie banner
        : require('../assets/zm-wall.webp');      // Desktop: zombie wall texture

      return {
        background: `url('${bg}') no-repeat center center`,
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker overlay for zombie theme
        backgroundBlendMode: 'overlay',
        backgroundAttachment: 'fixed',
      };
    }
  },
  mounted() {
    this.initParticles();
    this.animateContent();
  },
  methods: {
    initParticles() {
      setTimeout(() => {
        window.particlesJS.load("particles-js", "/particles.json");
      }, 1500);
    },
    async animateContent() {
      const { gsap } = await import("gsap");
      setTimeout(() => {
        gsap.from(".fade-in", {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3
        });
      }, 1000);
    }
  }
};
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  /* Enhanced zombie theme styling */
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
}

@supports (-webkit-touch-callout: none) {
  .hero-section {
    background-attachment: scroll !important;
  }
}

@media only screen and (max-width: 600px) {
  .hero-section {
    min-height: 90vh;
    height: auto;
  }
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  min-height: 350px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  /* Enhanced text styling for zombie theme */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 26, 26, 0.5);
  margin-bottom: 1rem;
}

.hero-content p {
  /* Enhanced description styling */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.server-info {
  margin-top: 10px;
  /* Enhanced server info styling */
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 26, 26, 0.3);
  backdrop-filter: blur(5px);
}

.server-info p {
  margin: 0.5rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.server-info .online {
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  font-weight: bold;
}

.join-btn {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 12px 25px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
  border-radius: 25px;
  /* Enhanced button styling for zombie theme */
  box-shadow: 0 4px 15px rgba(255, 26, 26, 0.4);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.join-btn:hover {
  background: linear-gradient(135deg, #cc0000 0%, #ff1a1a 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 26, 26, 0.6);
}
</style>
