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
        <router-link to="/home" id="logo">Zm-WestCStrike</router-link>
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
                <Login v-on:login= "isLoggedIn"/>
              </div>
              
            </div>
        </div>
      </div>
    </nav>
    <div class="container-fluid" id="container">
      <div class="row justify-content-md-center align-items-md-center h-100">
        <div class="col d-flex justify-content-center align-items-center">
          <router-link to="/server" id="navbar-links">Server</router-link>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <router-link link to="/BooksInLibrary" id="navbar-links">Maps</router-link>
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <router-link to="/BooksInCart" id="navbar-links">Offers</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { isTokenAvaible, removeToken } from '@/methods/localStorage';
import Login from "../components/Login.vue"
// import ProductCart from "../components/ProductCart.vue"
// import { getCurrentUser } from '@/methods/userLogic';
export default {
  name: "Header",
  components: { Login },
  data() {
    return {
      loggedIn: false,
      title: '',
      error: "",
      user: [],
      collapse: false,
    };
  },
  computed: {
    checkLog(){
      return this.$store.state.logged
    },
    
  },
  
  methods: {
    isLoggedIn() {
      this.loggedIn = this.$store.getters.isAuthenticated;
    },
  //   async role(){
  //     const currentUser = await getCurrentUser();
  //     if(currentUser){
  //       this.user = currentUser;
  //     }
  //   },
  //   searchBooks() {
  //     if (this.title.trim() === '') {
  //       return;
  //     }

  //     this.$router.push({ name: 'BookSearched', params: { bookTitle: this.title } });
  //   },
      async signOut() {
        if (this.$router.currentRoute.path !== '/home') {
          await this.$router.replace({ path: '/home' });
        }

        this.$store.dispatch('clearToken');
        this.loggedIn = false;
        this.$toast.warning("You have been logged out.");
      },
  },
  mounted() {
    this.isLoggedIn();
  }
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

:root {
  font-family: "Comfortaa", cursive;
  font-family: "Poppins", sans-serif;
  font-family: "Roboto", sans-serif;
  /*background: rgb(242,142,38);
  background: linear-gradient(80deg, rgba(242,142,38,1) 0%, rgba(253,100,79,1) 100%);*/
}
</style>
