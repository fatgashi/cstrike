<template>
  <div class="containerone">
    <div class="navbox flex-v-center flex-h-center flexing">
      <span class="nav-ico"><i class="far fa-check-circle"></i></span>
      <div class="d-flex justify-content-center align-items-center">
        <span class="nav-text">Your Number One Server: <span style="font-weight: bolder;">51.77.72.157:27015</span></span>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-0 shadow-0">
      <div class="container-fluid" id="navbarnew">
        <router-link to="/home" id="logo"><span class="fw-bolder">Zm-WestCStrike</span></router-link>
        <div
          class="justify-content-between"
        >
        <div class="navbar-nav">
              <!-- Example split danger button -->
              <div class="btn-group" id="butonatlogin">
                <button
                class="btn"
                type="button"
                id="login"
                v-if="loggedIn"
                @click="signOut"
              >
                <i class="bi bi-box-arrow-right text-white"></i>
                </button>
                <button
                  class="btn"
                  type="button"
                  id="login"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalToggle"
                  v-else
                >
                  <i class="bi bi-people text-white"></i>
                </button>                 
                <button
                  type="button"
                  class="btn dropdown-toggle dropdown-toggle-split"
                  id="bsep"
                  v-if="loggedIn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark user-dropdown shadow-lg">
                  <li class="dropdown-header px-3 py-2 text-center">
                    <strong>{{ user.username }}</strong><br>
                    <small class="text-muted">{{ user.role }}</small>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link v-if="user.role === 'superadmin'" class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
                  <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                  <li><a class="dropdown-item text-danger" @click="signOut" style="cursor: pointer;">Logout</a></li>
                </ul>
              </div>
              
            </div>
        </div>
      </div>
    </nav>
    <div>
      <div class="row gx-0 justify-content-center align-items-center h-100 nav-links-wrapper">
        <div v-for="link in filteredNavLinks" :key="link.to" class="col-auto nav-link-item">
          <router-link
            :to="link.to"
            class="nav-link-button"
            :class="{ active: $route.path.startsWith(link.to) }"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getCurrentUser } from "../config/userLogic";
import { eventBus } from "../router";
import { Dropdown } from "bootstrap";
export default {
  name: "Header",
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
      user: [],
      collapse: false,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.isAuthenticated;
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
      eventBus.$emit("showLoginModal"); // ✅ Emit event to open login modal
    },
      async signOut() {
        const toggleBtn = document.querySelector('.dropdown-toggle');

        if (toggleBtn) {
          const dropdownInstance = Dropdown.getInstance(toggleBtn) || new Dropdown(toggleBtn);
          dropdownInstance.hide();
        }

        if (this.$router.currentRoute.path !== '/home') {
          await this.$router.replace({ path: '/home' });
        }

        this.$store.dispatch('clearToken');
        eventBus.$emit("userLoggedOut");
        this.user = [];
        this.$toast.warning("You have been logged out.");
      },
  },
  async mounted() {
    if (this.loggedIn) {
      await this.role();
    }

    eventBus.$on("userLoggedIn", async () => {
      console.log("🔥 userLoggedIn event received in Header.vue");
      await this.role(); // this.loggedIn updates automatically now
    });
  },
  beforeDestroy() {
    // ✅ Remove event listener to prevent memory leaks
    eventBus.$off("userLoggedIn");
  },
};
</script>
<style>
@media only screen and (max-width: 991px) {
    .nav-text,
    .nav-ico {
      font-size: 15px;
    }
}
@media only screen and (max-width: 450px) {
  .nav-text,
  .nav-ico {
    font-size: 11px;
  }

  #logo {
    font-size: 22px !important;
  }
}
body {
  margin: 0;
}
.collapse-show {
  margin-top: 5px;
}
.kategorit {
  display: block;
  text-align: center;
}
.kategorit li a {
  font-size: 18px;
}
.kategorit li a:hover {
  border-bottom: 1px solid white;
  transition: all 8ms;
}
#butonishporta {
  background-color: transparent;
  border: none;

}
#dropdownMenuButton1 {
  color: white;
  padding:5px !important;
}
#dropdownMenuButton1:focus {
  color: orange;
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
}
#hamburgermenu:focus {
  color: orange;
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
}
#search-input1:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
}
#search-input1 {
  width: 300px;
}
#search-butoni {
  border-top-right-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 5px;
}
#navbarnew {
  max-width: 1200px;
}


li {
  list-style-type: none;
}
li a {
  text-decoration: none;
  color: white;
  font-weight: normal;
  font-family: "Poppins", sans-serif;
}
li a:hover {
  color: white;
}

router-link {
  cursor: pointer;
}
.bi-bag{
  font-size:22px;
  color:orange;
}
.bi-people,
.bi-box-arrow-right {
  font-size: 22px;
  color: white;
}
#container {
  height: 60px;
  max-width: 1200px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 0.15);
}
#container a {
  text-decoration: none;
  color: black;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1px;
}
#container a:hover {
  border-bottom: 1px solid orange;
  color: black;
}

#logo {
  color: rgb(242, 142, 38);
  font-family: "Comfortaa", cursive;
  font-size: 27px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}
#login {
  color: white;
  font-size: 14px;
  cursor: pointer;
  background-color: rgb(242, 142, 38);
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border:rgb(242, 142, 38);

}
#login:focus {
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
}
#bsep{
  background-color:rgb(242, 142, 38);
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  border:rgb(242, 142, 38);

}

.dropdown-menu {
  position: absolute !important;
}
.navbox {
  box-sizing: border-box;
  height: 40px;
  padding: 6px 10px;
  color: white;
  background: rgb(242, 142, 38);
  font-weight: bolder;
  font-family: "Roboto", sans-serif;
}
.flex-v-center {
  align-items: center;
}
.flex-h-center {
  justify-content: center;
}
.flexing {
  display: flex;
}
.nav-ico {
  margin: 0px 5px 0px 5px;
  font-weight: bolder;
}

.nav-links-wrapper {
  background-color: #111;
  border-top: 2px solid #ff6600;
  border-bottom: 2px solid #ff6600;
  padding: 10px 0;
  flex-wrap: wrap;
}

.nav-link-item {
  margin: 5px 10px;
}

.nav-link-button {
  background-color: #1a1a1a;
  border: 2px solid #ff6600;
  padding: 6px 16px;
  color: #ffcc00;
  font-weight: bold;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s ease;
  font-size: 0.9rem;
  display: inline-block;
}

.nav-link-button:hover {
  background-color: #ff6600;
  color: #fff;
  border-color: #ffcc00;
}

.nav-link-button.active {
  background-color: #ff6600;
  color: white;
  border-color: #ffcc00;
}

.user-dropdown {
  min-width: 200px;
  border-radius: 8px;
  background-color: #1a1a1a;
  font-size: 0.95rem;
}

.user-dropdown .dropdown-header {
  background-color: #ff6600;
  color: white;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.user-dropdown .dropdown-item {
  color: #f0f0f0;
}

.user-dropdown .dropdown-item:hover {
  background-color: #333;
  color: #ffcc00;
}

.user-dropdown .dropdown-divider {
  border-top: 1px solid #444;
}

:root {
  font-family: "Comfortaa", cursive;
  font-family: "Poppins", sans-serif;
  font-family: "Roboto", sans-serif;
  /*background: rgb(242,142,38);
  background: linear-gradient(80deg, rgba(242,142,38,1) 0%, rgba(253,100,79,1) 100%);*/
}
</style>
