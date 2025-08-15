<template>
  <div class="features-section">
    <div class="container">
      <div class="section-header">
        <h2>🚀 Server Features</h2>
        <p>Discover what makes our server unique</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card server-info-card">
          <div class="feature-icon">
            <span class="icon">🖥️</span>
          </div>
          <div class="feature-content">
            <h3>Server Info</h3>
            <p>View real-time stats for our top servers and join the action!</p>
            <router-link to="/server" class="feature-btn server-btn">
              <span class="btn-icon">📊</span>
              View Server
            </router-link>
          </div>
        </div>

        <div class="feature-card maps-card">
          <div class="feature-icon">
            <span class="icon">🗺️</span>
          </div>
          <div class="feature-content">
            <h3>Maps</h3>
            <p>Explore our diverse collection of maps, ranging from small arenas to large battlefields.</p>
            <router-link to="/maps" class="feature-btn maps-btn">
              <span class="btn-icon">🌍</span>
              View Maps
            </router-link>
          </div>
        </div>

        <div class="feature-card events-card">
          <div class="feature-icon">
            <span class="icon">🎉</span>
          </div>
          <div class="feature-content">
            <h3>Events & Updates</h3>
            <p>See the latest events & updates on our server!</p>
            <router-link to="/events-updates" class="feature-btn events-btn">
              <span class="btn-icon">📢</span>
              View Events
            </router-link>
          </div>
        </div>

        <div class="feature-card vip-card">
          <div class="feature-icon">
            <span class="icon">💎</span>
          </div>
          <div class="feature-content">
            <h3>VIP Membership</h3>
            <p>Unlock exclusive VIP features and level up your experience.</p>
            <router-link to="/vip-info" class="feature-btn vip-btn">
              <span class="btn-icon">👑</span>
              View VIP
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfosView",
}
</script>

<style scoped>
.features-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(255, 26, 26, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 800;
  color: #ff1a1a;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(255, 26, 26, 0.3);
}

.section-header p {
  font-size: 1.3rem;
  color: #cccccc;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff1a1a, #cc0000);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.feature-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.feature-content p {
  color: #cccccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 400;
}

.feature-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.feature-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.feature-btn:hover::before {
  left: 100%;
}

.btn-icon {
  font-size: 1.1rem;
}

/* Server Info Card */
.server-info-card:hover {
  background: rgba(255, 193, 7, 0.1);
  border-color: rgba(255, 193, 7, 0.3);
}

.server-btn {
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
  color: #000;
  border: 2px solid #ffc107;
}

.server-btn:hover {
  background: linear-gradient(135deg, #ff8f00 0%, #ffc107 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
  color: #000;
  text-decoration: none;
}

/* Maps Card */
.maps-card:hover {
  background: rgba(13, 202, 240, 0.1);
  border-color: rgba(13, 202, 240, 0.3);
}

.maps-btn {
  background: linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%);
  color: white;
  border: 2px solid #0dcaf0;
}

.maps-btn:hover {
  background: linear-gradient(135deg, #0aa2c0 0%, #0dcaf0 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 202, 240, 0.4);
  color: white;
  text-decoration: none;
}

/* Events Card */
.events-card:hover {
  background: rgba(220, 53, 69, 0.1);
  border-color: rgba(220, 53, 69, 0.3);
}

.events-btn {
  background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%);
  color: white;
  border: 2px solid #dc3545;
}

.events-btn:hover {
  background: linear-gradient(135deg, #b02a37 0%, #dc3545 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
  color: white;
  text-decoration: none;
}

/* VIP Card */
.vip-card:hover {
  background: rgba(25, 135, 84, 0.1);
  border-color: rgba(25, 135, 84, 0.3);
}

.vip-btn {
  background: linear-gradient(135deg, #198754 0%, #146c43 100%);
  color: white;
  border: 2px solid #198754;
}

.vip-btn:hover {
  background: linear-gradient(135deg, #146c43 0%, #198754 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 135, 84, 0.4);
  color: white;
  text-decoration: none;
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
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 3rem 0;
  }
  
  .section-header h2 {
    font-size: 2.5rem;
  }
  
  .section-header p {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .icon {
    font-size: 3rem;
  }
  
  .feature-content h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 2rem;
  }
  
  .section-header p {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 1.5rem 1rem;
  }
  
  .icon {
    font-size: 2.5rem;
  }
  
  .feature-content h3 {
    font-size: 1.2rem;
  }
  
  .feature-content p {
    font-size: 0.9rem;
  }
  
  .feature-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>