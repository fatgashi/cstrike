<template>
  <!-- Modern Header -->
  <header class="modern-header">
    <!-- Top Banner -->
    <div class="top-banner">
      <div class="container">
        <div class="banner-content">
          <div class="server-status">
            <span class="status-icon">🟢</span>
            <span class="status-text">Server Online</span>
          </div>
          <div class="server-info">
            <span class="info-icon">🌐</span>
            <span class="info-text">Connect to: <strong>81.181.244.15:27015</strong></span>
          </div>
          <div class="quick-actions">
            <button class="action-btn" @click="openLoginModal" v-if="!loggedIn">
              <span class="btn-icon">👤</span>
              <span class="btn-text">Join Now</span>
            </button>
            <div class="user-welcome" v-else>
              <span class="welcome-icon">🎮</span>
              <span class="welcome-text">Welcome back, {{ userData.username }}!</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="main-nav">
      <div class="container">
        <div class="nav-content">
          <!-- Logo Section -->
          <router-link to="/home" class="logo-section">
            <div class="logo-icon">🎯</div>
            <div class="logo-text">
              <span class="logo-title">ZM-WESTCSTRIKE</span>
              <span class="logo-subtitle">Zombie Survival</span>
            </div>
            <div class="logo-effects">
              <span class="effect-dot"></span>
              <span class="effect-dot"></span>
              <span class="effect-dot"></span>
            </div>
          </router-link>

          <!-- Navigation Links -->
          <div class="nav-links">
            <router-link
              v-for="link in filteredNavLinks"
              :key="link.to"
              :to="link.to"
              class="nav-link"
              :class="{ active: $route.path.startsWith(link.to) }"
            >
              <span class="link-icon">{{ getLinkIcon(link.label) }}</span>
              <span class="link-text">{{ link.label }}</span>
            </router-link>
          </div>

          <!-- User Actions -->
          <div class="user-actions">
            <div class="user-dropdown-wrapper" v-if="loggedIn">
              <button class="user-menu-btn" @click="toggleUserMenu" ref="userMenuBtn">
                <div class="user-avatar">
                  <img 
                    v-if="userData.profilePhoto" 
                    :src="getImageUrl(userData.profilePhoto)" 
                    class="avatar-image" 
                    alt="Profile Photo"
                  />
                  <img 
                    v-else 
                    :src="avatarUrl(userData)" 
                    class="avatar-image" 
                    alt="Default Avatar"
                  />
                </div>
                <span class="user-name">{{ userData.username }}</span>
                <span class="dropdown-arrow">▼</span>
              </button>
              
                                            <div class="user-dropdown" :class="{ 'show': showUserMenu }">
                 <div class="dropdown-header">
                   <div class="user-info">
                     <div class="user-avatar-large">
                       <img 
                         v-if="userData.profilePhoto" 
                         :src="getImageUrl(userData.profilePhoto)" 
                         class="avatar-image-large" 
                         alt="Profile Photo"
                       />
                       <img 
                         v-else 
                         :src="avatarUrl(userData)" 
                         class="avatar-image-large" 
                         alt="Default Avatar"
                       />
                     </div>
                     <div class="user-details">
                       <span class="user-fullname">{{ userData.username }}</span>
                       <span class="user-role">{{ userData.role }}</span>
                     </div>
                   </div>
                 </div>
                <div class="dropdown-content">
                  <router-link v-if="userData.role === 'superadmin'" to="/dashboard" class="dropdown-item">
                    <span class="item-icon">⚙️</span>
                    <span class="item-text">Dashboard</span>
                  </router-link>
                  <router-link to="/profile" class="dropdown-item">
                    <span class="item-icon">👤</span>
                    <span class="item-text">Profile</span>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item logout-btn" @click="signOut">
                    <span class="item-icon">🚪</span>
                    <span class="item-text">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            <button v-else class="login-btn" @click="openLoginModal">
              <span class="btn-icon">🔑</span>
              <span class="btn-text">Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { getCurrentUser } from "../config/userLogic";
import { eventBus } from "../router";
import { useToast } from "vue-toastification";
import axiosInstance from '../config/axios';

export default {
  name: "HeaderView",
  data() {
    return {
      navLinks: [
        { label: "Home", to: "/home" },
        { label: "Server", to: "/server" },
        { label: "Forum", to: "/forum" },
        { label: "Rewards", to: "/level-rewards" },
        { label: "Maps", to: "/maps" },
        { label: "Events", to: "/events-updates" },
        { label: "Vip Benefits", to: "/vip-info" },
        { label: "Offers", to: "/offers" },
      ],
      title: '',
      error: "",
      user: {},
      collapse: false,
      showUserMenu: false,
      userProfileData: null, // Store complete user profile data
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userData(){
      // Use profile data if available, otherwise fall back to store data
      return this.userProfileData || this.$store.state.user || {};
    },
    filteredNavLinks() {
      return this.navLinks;
    }
  },



  methods: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    
    async role(){
      const currentUser = await getCurrentUser();
      if(currentUser){
        this.user = currentUser;
      }
    },
    
    openLoginModal() {
      console.log("🔥 Triggering showLoginModal event from Header.vue");
      eventBus.emit("showLoginModal");
    },

    getLinkIcon(label) {
      const iconMap = {
        'Home': '🏠',
        'Server': '🖥️',
        'Forum': '💬',
        'Rewards': '🏆',
        'Maps': '🗺️',
        'Events': '📅',
        'Vip Benefits': '👑',
        'Offers': '🎁'
      };
      return iconMap[label] || '🔗';
    },

    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },

    closeUserMenu() {
      this.showUserMenu = false;
    },

    async signOut() {
      const toast = useToast();
      
      this.closeUserMenu();

      if (this.$router.currentRoute.path !== '/home') {
        await this.$router.replace({ path: '/home' });
      }

      this.$store.dispatch('clearToken');
      eventBus.emit("userLoggedOut");
      this.user = [];
      this.userProfileData = null; // Clear profile data on logout
      toast.warning("You have been logged out.");
    },

    // Image utility methods
    getImageUrl(path) {
      if (!path) return '';
      return `https://zm-westcstrike.com/${path}`;
    },

    avatarUrl(user) {
      if (!user || !user.username) {
        return "https://ui-avatars.com/api/?rounded=true&name=Unknown&size=64&background=0D8ABC&color=fff";
      }
      return `https://ui-avatars.com/api/?rounded=true&name=${encodeURIComponent(user.username)}&size=64&background=0D8ABC&color=fff`;
    },

    // Fetch complete user profile data including profile photo
    async fetchUserProfile() {
      try {
        if (this.loggedIn && this.$store.state.user?.id) {
          const response = await axiosInstance.get(`/user/${this.$store.state.user.id}`);
          if (response.data && response.data.data) {
            this.userProfileData = response.data.data;
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fall back to store data if profile fetch fails
        this.userProfileData = null;
      }
    },
  },

  async mounted() {
    if (this.loggedIn) {
      await this.role();
      await this.fetchUserProfile(); // Fetch complete profile data
    }

          eventBus.on("userLoggedIn", async () => {
        console.log("🔥 userLoggedIn event received in Header.vue");
        await this.role();
        await this.fetchUserProfile(); // Fetch complete profile data after login
      });

      // Listen for profile updates
      eventBus.on("profileUpdated", async () => {
        console.log("🔥 profileUpdated event received in Header.vue");
        await this.fetchUserProfile(); // Refresh profile data when profile is updated
      });

    // Add click outside listener for dropdown
    document.addEventListener('click', (event) => {
      const dropdown = event.target.closest('.user-dropdown-wrapper');
      if (!dropdown && this.showUserMenu) {
        this.showUserMenu = false;
      }
    });
  },

  beforeUnmount() {
    eventBus.off("userLoggedIn");
    eventBus.off("profileUpdated");
  },


};
</script>

<style scoped>
.modern-header {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Top Banner */
.top-banner {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.server-status, .server-info, .quick-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-icon, .info-icon {
  font-size: 1rem;
}

.status-text, .info-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
}

.info-text strong {
  color: #ffeb3b;
  text-shadow: 0 0 5px rgba(255, 235, 59, 0.5);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.user-welcome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Main Navigation */
.main-nav {
  padding: 1rem 0;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
  position: relative;
  transition: all 0.3s ease;
}

.logo-section:hover {
  transform: translateY(-2px);
}

.logo-icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo-title {
  font-family: 'Nosifer', cursive;
  font-size: 1.8rem;
  font-weight: 900;
  color: #ff1a1a;
  text-shadow: 0 0 10px rgba(255, 26, 26, 0.5);
  background: linear-gradient(135deg, #ff1a1a 0%, #ff6b6b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #cccccc;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.logo-effects {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.effect-dot {
  width: 4px;
  height: 4px;
  background: #ff1a1a;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.effect-dot:nth-child(2) {
  animation-delay: 0.5s;
}

.effect-dot:nth-child(3) {
  animation-delay: 1s;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
  border-radius: 12px;
  color: #cccccc;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 26, 26, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 26, 26, 0.3);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.nav-link.active {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  box-shadow: 0 8px 20px rgba(255, 26, 26, 0.4);
}

.link-icon {
  font-size: 1.1rem;
}

.link-text {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* User Actions */
.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 26, 26, 0.4);
}

/* User Dropdown */
.user-dropdown-wrapper {
  position: relative;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.user-menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 26, 26, 0.3);
  transform: translateY(-2px);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-icon {
  font-size: 1.2rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.user-name {
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.user-dropdown-wrapper:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  min-width: 250px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%);
  padding: 1.5rem;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.avatar-icon-large {
  font-size: 1.5rem;
}

.avatar-image-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-fullname {
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
}

.user-role {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-content {
  padding: 1rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #cccccc;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ff1a1a;
}

.dropdown-item.logout-btn:hover {
  background: rgba(255, 26, 26, 0.1);
  color: #ff1a1a;
}

.item-icon {
  font-size: 1.1rem;
}

.item-text {
  font-weight: 500;
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .nav-content {
    gap: 1rem;
  }
  
  .nav-links {
    gap: 0.75rem;
  }
  
  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 992px) {
  .banner-content {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .nav-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .nav-links {
    justify-content: center;
    order: 2;
  }
  
  .logo-section {
    order: 1;
  }
  
  .user-actions {
    order: 3;
  }
  
  .logo-title {
    font-size: 1.5rem;
  }
  
  .logo-icon {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .top-banner {
    padding: 0.5rem 0;
  }
  
  .main-nav {
    padding: 0.75rem 0;
  }
  
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .link-text {
    display: none;
  }
  
  .nav-link {
    min-width: 50px;
    justify-content: center;
  }
  
  .user-name {
    display: none;
  }
  
  .user-menu-btn {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .logo-title {
    font-size: 1.3rem;
  }
  
  .logo-subtitle {
    font-size: 0.7rem;
  }
  
  .nav-links {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    min-width: 45px;
  }
  
  .login-btn, .user-menu-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .btn-text {
    display: none;
  }
}
</style>
