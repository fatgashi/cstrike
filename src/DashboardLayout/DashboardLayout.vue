<template>
    <div class="dashboard-container" :class="{ 'sidebar-collapsed': isCollapsed }">
      <!-- Sidebar -->
      <div class="sidebar" :class="{ 'align-items-start': !isCollapsed }">
        <button class="toggle-btn" :class="{'text-end me-3': !isCollapsed}" @click="toggleSidebar" v-if="!isMobile">
            <i v-if="isCollapsed" class="fa fa-arrow-right" aria-hidden="true"></i>
            <i v-else class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <nav class="w-100">
          <ul>
            <li v-for="(link, index) in links" :key="index">
              <router-link :to="link.path" class="nav-link" active-class="active-link">
                <i :class="link.icon"></i>
                <span v-if="!isCollapsed">{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
  
      <!-- Main Content -->
      <main class="main-content container">
        <header class="header">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="fw-bolder">{{ pageTitle }}</h1>
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img 
                  :src="user.profilePhoto ? getImageUrl(user.profilePhoto) : avatarUrl()" 
                  alt="Profile" 
                  class="profile-photo"
                >
              </a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow">
                <li class="dropdown-header px-3 py-2">
                  <strong>{{ user.username }}</strong><br>
                  <small class="text-white">{{ user.role }}</small>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
                <li><router-link to="/home" class="dropdown-item">Home</router-link></li>
                <li><a @click="signOut" class="dropdown-item pointer">Logout</a></li>
              </ul>
            </div>
          </div>
        </header>
        <section class="content container gx-0">
          <router-view></router-view>
        </section>
      </main>
    </div>
  </template>
  
  <script>
import { useToast } from 'vue-toastification';
import { getCurrentUser } from '../config/userLogic';
import { eventBus } from '../router/index';

  export default {
    data() {
      return {
        links: [
          { name: "Dashboard", path: "/dashboard/home", icon: "fas fa-home" },
          { name: "Ban List", path: "/dashboard/banlist", icon: "fas fa-users" },
          { name: "Command Page", path: "/dashboard/commands", icon: "fa fa-terminal" },
          // { name: "Home", path: "/home", icon: "fas fa-home" },
          // { name: "Settings", path: "/dashboard/settings", icon: "fas fa-cog" }
        ],
        pageTitle: "Dashboard Home",
        isCollapsed: false,
        isMobile: false,
        user: {},
      };
    },
    watch: {
      "$route"(to) {
        this.pageTitle = to.meta.title || "Dashboard";
      }
    },
    async mounted() {
      this.checkScreenSize();
      window.addEventListener("resize", this.checkScreenSize);
      this.user = await getCurrentUser();
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.checkScreenSize);
    },
    methods: {
      toggleSidebar() {
        if (!this.isMobile) {
          this.isCollapsed = !this.isCollapsed;
        }
      },
      avatarUrl() {
        const name = encodeURIComponent(this.user.username);
        return `https://ui-avatars.com/api/?rounded=true&name=${name}&background=0D8ABC&color=fff`;
      },
      getImageUrl(path) {
        return `https://zm-westcstrike.com/${path}`;
      },
      async signOut() {
        const toast = useToast();
        this.$router.replace({ path: '/home' });

        this.$store.dispatch('clearToken');
        eventBus.emit("userLoggedOut");
        toast.warning("You have been logged out.");
      },
      checkScreenSize() {
        this.isMobile = window.innerWidth < 768;
        if (this.isMobile) {
          this.isCollapsed = true;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    max-width: 100% !important;
    min-height: 100vh;
    transition: 0.3s;
  }
  
  .sidebar {
    width: 250px;
    background: #1e1e2d;
    color: white;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: width 0.3s;
  }
  
  .sidebar-collapsed .sidebar {
    width: 50px;
  }
  
  .sidebar-collapsed .nav-link span {
    display: none;
  }
  
  .logo {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    width: 100%;
  }

  .toggle-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  nav ul li {
    margin: 15px 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  .nav-link i {
    margin-right: 10px;
  }
  
  .nav-link:hover, .active-link {
    background: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
  
  .main-content {
    background: #f4f4f4;
  }
  
  .header {
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .pointer {
    cursor: pointer;
  }
  
  .content {
    margin-top: 20px;
    flex-grow: 1;
    background: white;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100% !important;
  }

  .profile-photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  </style>
  