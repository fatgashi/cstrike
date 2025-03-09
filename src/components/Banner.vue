<template>
  <div class="hero-section">
    <!-- Particle Background -->
    <div id="particles-js"></div>
    
    <!-- Content -->
    <div class="hero-content">
      <h1 class="fade-in">Welcome to <span style="color: rgb(242, 142, 38);">Zm-WestCStrike</span></h1>
      <p class="fade-in">Your ultimate CS 1.6 community for thrilling battles and experiences!</p>
      <div class="server-info fade-in">
        <p>Server IP: <span class="fw-bold">51.77.72.157:27015</span></p>
        <p>Status: <span class="online fw-bolder">Online</span></p>
        <p>Players: <span>{{players}}/32</span></p>
      </div>
      <button class="join-btn text-white"><a
                href="steam://connect/51.77.72.157:27015"
                class="btn text-white"
                target="_self"
                rel="noopener"
            >
                Join the Server
            </a></button>
    </div>
  </div>
</template>

<script>
import { TweenMax } from "gsap";

export default {
  props: {
    players: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.initParticles();
    this.animateContent();
  },
  methods: {
    initParticles() {
      window.particlesJS.load("particles-js", "/particles.json");
    },
    animateContent() {
      TweenMax.staggerFrom(
        ".fade-in",
        1,
        { opacity: 0, y: 20, ease: "power2.out" },
        0.3
      );
    }
  }
};
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  
  /* Background Image */
  background: url("../assets/cover01.webp") no-repeat center center;
  background-size: cover;

  /* Dark Overlay */
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: overlay;
  background-attachment: fixed;
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
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

h1 span {
  color: #ff9f1c;
}

.server-info {
  margin-top: 10px;
  font-size: 1.1rem;
}

.server-info .online {
  color: #00ff00;
}

.join-btn {
  background: #ff8000;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  transition: 0.3s;
}

.join-btn:hover {
  background: #ff6b00;
}
</style>
