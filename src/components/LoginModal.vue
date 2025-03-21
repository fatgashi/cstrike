<template>
    <div>
      <div class="modal fade" ref="myModal" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header text-white" id="modalheader">
            <h5 class="modal-title text-white" id="exampleModalToggleLabel">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-white">
            <form @submit.prevent="login">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control bg-dark text-white" id="inputEmail" placeholder="Username" aria-describedby="emailHelp" autocomplete="off" v-model="username"  required />
                    <label for="inputEmail">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control bg-dark text-white" id="inputPassword" placeholder = "Password" v-model="password"  required />
                    <label for="inputPassword">Password</label>
                  <!--<div id="resetpassword" class="form-text text-white">Reset your <a class="resetp" href="#">password</a></div>-->
                  <div class="my-2">
                    Did you forget your password? <span class="resetp" @click.prevent="closeModalAndNavigate">Reset it here!</span>
                  </div>
                </div>
                <button type="submit" class="btn btn-success">Login</button>
            </form>
          </div>
          <div class="modal-footer" id="modalfooter">
            <button class="btn text-white" style="background-color: rgb(242, 142, 38);" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Register</button>
          </div>
        </div>
      </div>
    </div>
    <Register/>
    </div>
    </template>
    <script>
    import Register from './Register.vue'
    import { Modal } from 'bootstrap';
    import { eventBus } from '../router/index';
    
    export default {
      name: "LoginModal",
      components: { 
        Register,
    
      },
      data(){
        return {
          username: '',
          password: '',
          error: '',
          modal: null,
        }
    
      },
      methods: {
        
        async login() {
          try {
            const data = await this.$axios.post(`/user/login`, {
              username: this.username,
              password: this.password
            }).then(res => {
              return res.data
            });
            this.$store.dispatch('updateToken', data.token);
            this.$store.dispatch('updateLogged', true);
            this.$store.dispatch('updateUser', data.user)
            eventBus.$emit("userLoggedIn");
            if(data.user.role === 'superadmin'){
              this.$router.push('/dashboard/home')
            }
            this.$toast.success("You logged in successfully! ");
            this.modal.hide();
            this.username = ""
            this.password = ""
          } catch(err) {
            this.error = err.message;
            this.$toast.error(err.response.data.message);
          }
        },

        closeModalAndNavigate() {
          if (this.modal) {
            this.modal.hide(); // Close the modal
          }
          this.$router.push('/forgot-password'); // Navigate to the forgot password route
        },
        
      },
    
      mounted(){
        this.modal = new Modal(this.$refs.myModal);

        eventBus.$on("showLoginModal", () => {
          console.log("🔥 Received showLoginModal event in LoginModal.vue");
          this.modal.show();
        });
      },

      beforeDestroy() {
        // ✅ Remove event listener to prevent memory leaks
        eventBus.$off("showLoginModal");
      }
    };
    </script>
    
    <style scoped>
    #exampleModalToggleLabel{
      border-bottom: 1px solid orange;
    }
    
    .modal-dialog{
      font-family: "Roboto", sans-serif;
    }
      #modalheader{
        border:none !important;
      }
      #modalfooter{
        border:none !important;
        justify-content:start;
      }
      .resetp{
        border-bottom:0.5px solid orange;
        text-decoration:none;
        color:white;
        cursor: pointer;
      }
    </style>