<template>
    <div class="dashboard-container" :class="{ 'sidebar-collapsed': isCollapsed }">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'align-items-start': !isCollapsed }">
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
      </aside>
  
      <!-- Main Content -->
      <main class="main-content w-100">
        <header class="header">
          <h1>{{ pageTitle }}</h1>
        </header>
        <section class="content">
          <router-view></router-view>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { name: "Home", path: "/dashboard/home", icon: "fas fa-home" },
          { name: "Ban List", path: "/dashboard/banlist", icon: "fas fa-users" },
          { name: "Settings", path: "/dashboard/settings", icon: "fas fa-cog" },
          { name: "Logout", path: "/logout", icon: "fas fa-sign-out-alt" }
        ],
        pageTitle: "Dashboard Home",
        isCollapsed: false,
        isMobile: false
      };
    },
    watch: {
      "$route"(to) {
        this.pageTitle = to.meta.title || "Dashboard";
      }
    },
    mounted() {
      this.checkScreenSize();
      window.addEventListener("resize", this.checkScreenSize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.checkScreenSize);
    },
    methods: {
      toggleSidebar() {
        if (!this.isMobile) {
          this.isCollapsed = !this.isCollapsed;
        }
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
    min-height: 100vh;
    overflow: hidden;
    transition: 0.3s;
    width: 100% !important;
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
    width: 60px;
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
  
  .content {
    margin-top: 20px;
    flex-grow: 1;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100% !important;
  }
  </style>
  