<template>
  <div
    class="hero-section"
    :style="heroStyle"
  >
    <!-- Particle Background -->
    <div id="particles-js"></div>

    <!-- Content -->
    <div class="hero-content container">
      <h1 class="fade-in">
        Play <span style="color: #ff1a1a; font-family: 'Nosifer', cursive;">Zm-WestCStrike</span> – CS 1.6 Zombie Server
      </h1>
      <p class="fade-in">
        Welcome to the <strong>best CS 1.6 Zombie Plague server</strong> – Zm-WestCStrike. Join our intense zombie survival battles and experience top-tier Counter-Strike 1.6 multiplayer gameplay.
      </p>
      <div class="server-info fade-in">
        <p>Server IP: <span class="fw-bold">51.77.72.157:27015</span></p>
        <p>Status: <span class="online fw-bolder">Online</span></p>
        <p>Players: <span>{{players}}/32</span></p>
      </div>
      <button class="join-btn text-white">
        <a
          href="steam://connect/51.77.72.157:27015"
          class="btn text-white"
          target="_self"
          rel="noopener"
        >
          Join the Server
        </a>
      </button>
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
      const bg = isMobile
        ? "/assets/spring/spring-update1-mobile.webp"
        : "/assets/spring/spring-update1.webp";

      return {
        background: `url('${bg}') no-repeat center center`,
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  height: 75vh;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

@supports (-webkit-touch-callout: none) {
  .hero-section {
    background-attachment: scroll !important;
  }
}

@media only screen and (max-width: 600px) {
  .hero-section {
    height: 90vh !important;
  }
}

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
}

.server-info {
  margin-top: 10px;
  font-size: 1.1rem;
}

.server-info .online {
  color: #00ff00;
}

.join-btn {
  background: #ff1a1a;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  transition: 0.3s;
}

.join-btn:hover {
  background: #990000;
}
</style>
