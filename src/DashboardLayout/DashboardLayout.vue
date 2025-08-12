<template>
  <div class="dashboard-container" :class="{ 'sidebar-collapsed': isCollapsed }">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'collapsed': isCollapsed || isMobile }" ref="sidebarRef">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="logo-container" v-if="!isCollapsed && !isMobile">
          <div class="logo-icon">🎮</div>
          <div class="logo-text">Admin Panel</div>
          <button 
            class="collapse-btn" 
            @click="handleSidebarCollapse" 
            v-if="!isMobile && isMounted && !isToggling" 
            type="button"
            :disabled="isToggling"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
        <div class="logo-icon-only" v-else @click="handleSidebarExpand" style="cursor: pointer;">🎮</div>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="(link, index) in navigationLinks" :key="index" class="nav-item">
            <router-link :to="link.path" class="nav-link" active-class="active">
              <div class="nav-icon">
                <i :class="link.icon"></i>
              </div>
              <span class="nav-text" v-if="!isCollapsed && !isMobile">{{ link.name }}</span>
              <div class="nav-tooltip" v-if="isCollapsed || isMobile">{{ link.name }}</div>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer" v-if="!isCollapsed && !isMobile">
        <div class="user-info">
          <div class="user-avatar">
            <img 
              :src="userAvatarUrl" 
              alt="Profile" 
              class="avatar-img"
            >
          </div>
          <div class="user-details">
            <div class="username">{{ userData.username || 'Loading...' }}</div>
            <div class="user-role">{{ userData.role || 'User' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <header class="header">
        <div class="header-content">
          <div class="header-left">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <div class="breadcrumb">
              <span class="breadcrumb-item">Dashboard</span>
              <span class="breadcrumb-separator">/</span>
              <span class="breadcrumb-current">{{ pageTitle }}</span>
            </div>
          </div>
          <div class="header-right">
            <div class="user-dropdown" ref="userDropdownRef">
              <button class="user-dropdown-btn" @click="toggleUserMenu">
                <img 
                  :src="userAvatarUrl" 
                  alt="Profile" 
                  class="profile-photo"
                >
                <span class="user-name">{{ userData.username || 'Loading...' }}</span>
                <i class="fas fa-chevron-down"></i>
              </button>
              <div class="user-dropdown-menu" :class="{ 'show': showUserMenu }">
                <div class="dropdown-header">
                  <img 
                    :src="userAvatarUrl" 
                    alt="Profile" 
                    class="dropdown-avatar"
                  >
                  <div class="dropdown-user-info">
                    <div class="dropdown-username">{{ userData.username || 'Loading...' }}</div>
                    <div class="dropdown-role">{{ userData.role || 'User' }}</div>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <router-link to="/profile" class="dropdown-item">
                  <i class="fas fa-user"></i>
                  <span>Profile</span>
                </router-link>
                <router-link to="/home" class="dropdown-item">
                  <i class="fas fa-home"></i>
                  <span>Home</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <button @click="handleSignOut" class="dropdown-item logout-item">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <section class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { getCurrentUser } from '../config/userLogic'
import { eventBus } from '../router'

// Router and Store
const router = useRouter()
const route = useRoute()
const store = useStore()
const toast = useToast()

// Refs
const userDropdownRef = ref(null)
const isCollapsed = ref(false)
const isMobile = ref(false)
const isToggling = ref(false)
const showUserMenu = ref(false)
const userData = reactive({})
const isMounted = ref(false)
const sidebarRef = ref(null)

// Navigation Links
const navigationLinks = [
  { name: "Dashboard", path: "/dashboard/home", icon: "fas fa-tachometer-alt" },
  { name: "Ban List", path: "/dashboard/banlist", icon: "fas fa-ban" },
  { name: "Commands", path: "/dashboard/commands", icon: "fas fa-terminal" },
]

// Computed Properties
const pageTitle = computed(() => {
  return route.meta?.title || "Dashboard Home"
})

const userAvatarUrl = computed(() => {
  if (userData.profilePhoto) {
    return `https://zm-westcstrike.com/${userData.profilePhoto}`
  }
  const name = encodeURIComponent(userData.username || 'User')
  return `https://ui-avatars.com/api/?rounded=true&name=${name}&background=0D8ABC&color=fff`
})

// Methods
const handleSidebarExpand = () => {
  // Only allow expanding on desktop
  if (isMobile.value || isToggling.value || !isMounted.value) return
  if (!sidebarRef.value) return
  
  try {
    isToggling.value = true
    
    // Only expand if currently collapsed
    if (isCollapsed.value) {
      isCollapsed.value = false
    }
    
    // Reset flag after transition completes
    setTimeout(() => {
      isToggling.value = false
    }, 350)
  } catch (error) {
    console.warn('Error expanding sidebar:', error)
    isToggling.value = false
  }
}

const handleSidebarCollapse = () => {
  // Only allow collapsing on desktop
  if (isMobile.value || isToggling.value || !isMounted.value) return
  if (!sidebarRef.value) return
  
  try {
    isToggling.value = true
    
    // Only collapse if currently expanded
    if (!isCollapsed.value) {
      isCollapsed.value = true
    }
    
    // Reset flag after transition completes
    setTimeout(() => {
      isToggling.value = false
    }, 350)
  } catch (error) {
    console.warn('Error collapsing sidebar:', error)
    isToggling.value = false
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleClickOutside = (event) => {
  try {
    if (userDropdownRef.value && !userDropdownRef.value.contains(event.target)) {
      showUserMenu.value = false
    }
  } catch (error) {
    console.warn('Error handling click outside:', error)
    // Fallback: close the menu if there's an error
    showUserMenu.value = false
  }
}

const handleSignOut = async () => {
  try {
    await router.replace({ path: '/home' })
    store.dispatch('clearToken')
    eventBus.emit("userLoggedOut")
    toast.warning("You have been logged out.")
  } catch (error) {
    console.error('Error during sign out:', error)
  }
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    // On mobile, always keep sidebar closed
    isCollapsed.value = true
  } else {
    // On desktop, start with sidebar open
    isCollapsed.value = false
  }
}

const loadUserData = async () => {
  try {
    const user = await getCurrentUser()
    if (user && typeof user === 'object') {
      Object.assign(userData, user)
    }
  } catch (error) {
    console.warn('Error loading user data:', error)
  }
}

// Lifecycle
onMounted(async () => {
  try {
    // Wait for next tick to ensure DOM is ready
    await nextTick()
    
    // Set mounted flag after DOM is ready
    isMounted.value = true
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    document.addEventListener("click", handleClickOutside)
    
    await loadUserData()
  } catch (error) {
    console.warn('Error during component mount:', error)
    // Still mark as mounted even if there's an error
    isMounted.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize)
  document.removeEventListener("click", handleClickOutside)
})

// Watch for route changes
watch(() => route.path, () => {
  showUserMenu.value = false
})
</script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow-x: hidden;
    align-items: flex-start;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    color: white;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease-out;
    position: sticky;
    top: 0;
    height: 100vh;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    overflow: hidden;
  }

  .sidebar.collapsed {
    width: 70px;
  }

  /* Sidebar Header */
  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    min-height: 80px;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-right: 60px;
  }

  .logo-icon {
    font-size: 28px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo-icon-only {
    font-size: 25px;
    text-align: center;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-left: 2px;
    transition: transform 0.2s ease, filter 0.2s ease;
    position: relative;
  }

  .logo-icon-only:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .logo-icon-only:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .sidebar.collapsed .logo-icon-only {
    margin-left: 0;
    padding-right: 0;
    text-align: center;
    width: 100%;
    margin-top: 5px;
  }

  .logo-text {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .collapse-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .collapse-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .collapse-btn:active {
    transform: scale(0.95);
  }

  .collapse-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  /* Navigation */
  .sidebar-nav {
    flex: 1;
    padding: 20px 0;
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    margin: 8px 16px;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 16px 10px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 12px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  .nav-link:hover::before {
    left: 100%;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(8px);
  }

  .nav-link.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .nav-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    font-size: 18px;
  }

  .nav-text {
    font-weight: 500;
    font-size: 15px;
  }

  .nav-tooltip {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: #1a1a2e;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    margin-left: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .nav-link:hover .nav-tooltip {
    opacity: 1;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-details {
    flex: 1;
  }

  .username {
    font-weight: 600;
    font-size: 14px;
    color: white;
  }

  .user-role {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: capitalize;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    background: #f8fafc;
    overflow-y: auto;
    transition: margin-left 0.3s ease-out;
    min-width: 0;
    height: 100vh;
    overflow-x: hidden;
  }

  /* Header */
  .header {
    background: white;
    padding: 24px 32px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #e2e8f0;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #64748b;
  }

  .breadcrumb-separator {
    color: #cbd5e1;
  }

  .breadcrumb-current {
    color: #3b82f6;
    font-weight: 500;
  }

  /* User Dropdown */
  .user-dropdown {
    position: relative;
  }

  .user-dropdown-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 8px 16px;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .user-dropdown-btn:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  .profile-photo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    font-weight: 500;
    color: #1e293b;
  }

  .user-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid #e2e8f0;
    min-width: 240px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
  }

  .user-dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
  }

  .dropdown-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .dropdown-user-info {
    flex: 1;
  }

  .dropdown-username {
    font-weight: 600 !important;
    color: #1e293b !important;
    font-size: 16px !important;
  }

  .dropdown-role {
    color: #64748b !important;
    font-size: 14px !important;
    text-transform: capitalize !important;
  }

  .dropdown-divider {
    height: 1px !important;
    background: #e2e8f0 !important;
    margin: 8px 0 !important;
  }

  .dropdown-item {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 12px 20px !important;
    color: #64748b !important;
    text-decoration: none !important;
    transition: background-color 0.2s ease, color 0.2s ease !important;
    cursor: pointer !important;
    border: none;
    background: none !important;
    width: 100% !important;
    text-align: left !important;
    font-size: 14px;
  }

  .dropdown-item:hover {
    background: #f8fafc !important;
    color: #3b82f6 !important;
  }

  .dropdown-item i {
    width: 16px !important;
    text-align: center !important;
  }

  .logout-item {
    color: #ef4444;
  }

  .logout-item:hover {
    background: #fef2f2;
    color: #dc2626;
  }

  /* Content */
  .content {
    padding: 32px;
    min-height: calc(100vh - 120px);
    overflow-x: hidden;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .dashboard-container {
      position: relative;
    }
    
    .sidebar {
      position: sticky;
      top: 0;
      width: 70px;
      height: 100vh;
      z-index: 1000;
      transition: width 0.3s ease-out;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .main-content {
      margin-left: 0;
      width: calc(100% - 70px);
    }

    .header {
      padding: 16px 20px;
    }
    
         .header-content {
       align-items: flex-start;
       flex-direction: column;
       gap: 16px;
     }
     
     .header-left {
       flex-direction: row;
       align-items: center;
       gap: 12px;
       order: 1;
     }

     .header-right {
       order: 2;
       align-self: flex-end;
       margin-top: 8px;
     }

     .page-title {
       font-size: 20px;
       margin: 0;
     }
     
     .breadcrumb {
       display: none;
     }

    .content {
      padding: 20px;
    }

    .user-dropdown-btn .user-name {
      display: none;
    }
    
    /* Improve mobile dropdown */
    .user-dropdown {
      position: relative;
    }
    
    .user-dropdown-btn {
      padding: 8px 12px;
      border-radius: 8px;
    }
    
    .user-dropdown-menu {
      right: 0;
      min-width: 200px;
      max-width: calc(100vw - 40px);
    }
    
    .dropdown-header {
      padding: 16px;
    }
    
    .dropdown-avatar {
      width: 40px;
      height: 40px;
    }
    
    .dropdown-username {
      font-size: 14px;
    }
    
    .dropdown-role {
      font-size: 12px;
    }
    
    .dropdown-item {
      padding: 10px 16px;
      font-size: 13px;
    }
    
    /* Hide collapse button on mobile */
    .collapse-btn {
      display: none;
    }
    
    /* Improve mobile sidebar header */
    .sidebar-header {
      padding: 16px 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      min-height: 60px;
    }
    
    .logo-container {
      margin-bottom: 16px;
      padding-right: 0;
    }
    
    .logo-icon-only {
      padding-right: 0;
    }
    
    .logo-icon {
      font-size: 24px;
    }
    
    .logo-text {
      font-size: 16px;
    }
    
    /* Improve mobile navigation */
    .sidebar-nav {
      padding: 16px 0;
    }
    
    .nav-item {
      margin: 4px 8px;
    }
    
    .nav-link {
      padding: 14px 8px;
      font-size: 14px;
      justify-content: center;
    }
    
    .nav-icon {
      margin-right: 0;
    }
    
    /* Improve mobile sidebar footer */
    .sidebar-footer {
      padding: 16px;
    }
    
    .user-info {
      gap: 10px;
    }
    
    .user-avatar {
      width: 36px;
      height: 36px;
    }
    
    .username {
      font-size: 13px;
    }
    
    .user-role {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }

    .page-title {
      font-size: 18px;
    }

    .content {
      padding: 16px;
    }
    
    /* Small screen sidebar improvements */
    .sidebar {
      width: 70px;
      position: sticky;
      top: 0;
    }
    
    .main-content {
      width: calc(100% - 70px);
    }
    
    /* Small screen header improvements */
    .header {
      padding: 12px 16px;
    }
    
    .header-left {
      gap: 8px;
    }
    
    .page-title {
      font-size: 16px;
    }
    
    /* Small screen dropdown improvements */
    .user-dropdown-menu {
      max-width: calc(100vw - 32px);
      right: -8px;
    }
    
    .dropdown-header {
      padding: 12px;
    }
    
    .dropdown-avatar {
      width: 36px;
      height: 36px;
    }
    
    .dropdown-username {
      font-size: 13px;
    }
    
    .dropdown-role {
      font-size: 11px;
    }
    
    .dropdown-item {
      padding: 8px 12px;
      font-size: 12px;
    }
  }



  /* Router View Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  </style>
  