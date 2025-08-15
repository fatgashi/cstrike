<template>
  <div class="forum-container">
    <!-- Hero Header -->
    <div class="forum-hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <i class="fas fa-comments me-3"></i>
          Community Forum
        </h1>
        <p class="hero-subtitle">Connect, discuss, and stay informed with our gaming community</p>
      </div>
      <div class="hero-decoration">
        <div class="floating-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="floating-icon">
          <i class="fas fa-trophy"></i>
        </div>
        <div class="floating-icon">
          <i class="fas fa-star"></i>
        </div>
      </div>
    </div>

    <!-- Forum Categories Grid -->
    <div class="forum-categories">
      <div class="category-grid">
        <!-- Admin Applications -->
        <router-link to="/forum/admin-applications" class="category-card admin-applications">
          <div class="card-background" :style="{ backgroundImage: 'url(' + require('@/assets/forum/admin-applications.webp') + ')' }"></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="category-icon">
              <i class="fas fa-user-shield"></i>
            </div>
            <h3 class="category-title">Admin Applications</h3>
            <p class="category-description">Review and vote on admin applications</p>
            <div class="category-meta">
              <span class="meta-item">
                <i class="fas fa-vote-yea"></i>
                Voting System
              </span>
              <span class="meta-item">
                <i class="fas fa-users"></i>
                Community Decision
              </span>
            </div>
            <div class="card-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>

        <!-- Admin Promotions -->
        <router-link to="/forum/admin-promotions" class="category-card admin-promotions">
          <div class="card-background" :style="{ backgroundImage: 'url(' + require('@/assets/forum/admin-promotions.png') + ')' }"></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="category-icon">
              <i class="fas fa-crown"></i>
            </div>
            <h3 class="category-title">Admin Promotions</h3>
            <p class="category-description">Vote on admin rank promotions</p>
            <div class="category-meta">
              <span class="meta-item">
                <i class="fas fa-star"></i>
                Rank Advancement
              </span>
              <span class="meta-item">
                <i class="fas fa-handshake"></i>
                Merit Based
              </span>
            </div>
            <div class="card-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>

        <!-- Rules -->
        <router-link to="/forum/rules" class="category-card rules">
          <div class="card-background" :style="{ backgroundImage: 'url(' + require('@/assets/forum/rules.webp') + ')' }"></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="category-icon">
              <i class="fas fa-book-open"></i>
            </div>
            <h3 class="category-title">Server Rules</h3>
            <p class="category-description">Read our community guidelines</p>
            <div class="category-meta">
              <span class="meta-item">
                <i class="fas fa-shield-alt"></i>
                Community Safety
              </span>
              <span class="meta-item">
                <i class="fas fa-gavel"></i>
                Fair Play
              </span>
            </div>
            <div class="card-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>

        <!-- Announcements -->
        <router-link to="" class="category-card announcements">
          <div class="card-background" :style="{ backgroundImage: 'url(' + require('@/assets/forum/announcements.webp') + ')' }"></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="category-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            <h3 class="category-title">Announcements</h3>
            <p class="category-description">Stay updated with server news</p>
            <div class="category-meta">
              <span class="meta-item">
                <i class="fas fa-newspaper"></i>
                Latest Updates
              </span>
              <span class="meta-item">
                <i class="fas fa-bell"></i>
                Important Info
              </span>
            </div>
            <div class="card-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Community Stats -->
    <div class="community-stats">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">1,247</span>
            <span class="stat-label">Active Members</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-comments"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">5,892</span>
            <span class="stat-label">Total Posts</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Active Support</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <!-- <div class="quick-actions">
      <h3 class="section-title">Quick Actions</h3>
      <div class="actions-grid">
        <button class="action-btn primary">
          <i class="fas fa-plus me-2"></i>
          New Topic
        </button>
        <button class="action-btn secondary">
          <i class="fas fa-search me-2"></i>
          Search Forum
        </button>
        <button class="action-btn accent">
          <i class="fas fa-bookmark me-2"></i>
          My Bookmarks
        </button>
        <button class="action-btn info">
          <i class="fas fa-question-circle me-2"></i>
          Help Center
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ForumView"
};
</script>

<style scoped>
/* Main Container */
.forum-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
}

/* Hero Section */
.forum-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  padding: 60px 40px;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 3;
}

.hero-title {
  color: white;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
}

.floating-icon:nth-child(1) {
  top: 20px;
  left: 20px;
  animation-delay: 0s;
}

.floating-icon:nth-child(2) {
  top: 40px;
  right: 30px;
  animation-delay: 2s;
}

.floating-icon:nth-child(3) {
  bottom: 30px;
  left: 50%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* Forum Categories */
.forum-categories {
  margin-bottom: 50px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.category-card {
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.category-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
}

.category-card:hover .card-background {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.category-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.category-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.category-description {
  font-size: 1rem;
  margin: 0 0 20px 0;
  opacity: 0.9;
  line-height: 1.5;
}

.category-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  opacity: 0.8;
}

.meta-item i {
  color: #667eea;
  width: 16px;
}

.card-arrow {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.category-card:hover .card-arrow {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

/* Community Stats */
.community-stats {
  margin-bottom: 50px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  color: #bdc3c7;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 40px;
}

.section-title {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.action-btn {
  padding: 18px 25px;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: white;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.action-btn.secondary {
  background: linear-gradient(135deg, #2c3e50, #34495e);
}

.action-btn.accent {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.action-btn.info {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.action-btn.primary:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a4190);
}

.action-btn.secondary:hover {
  background: linear-gradient(135deg, #34495e, #2c3e50);
}

.action-btn.accent:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
}

.action-btn.info:hover {
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
}

/* Responsive Design */
@media (max-width: 768px) {
  .forum-container {
    padding: 15px;
  }
  
  .forum-hero {
    padding: 40px 20px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .category-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .category-card {
    height: 280px;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-icon {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .category-content {
    padding: 20px;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
  
  .stat-item {
    padding: 20px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.forum-categories,
.community-stats,
.quick-actions {
  animation: fadeInUp 0.8s ease-out;
}

.community-stats {
  animation-delay: 0.2s;
}

.quick-actions {
  animation-delay: 0.4s;
}
</style>
