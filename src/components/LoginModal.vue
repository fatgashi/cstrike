<template>
  <div>
    <div
      class="modal fade"
      ref="myModal"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white rounded-4 shadow-lg border-0">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title" id="exampleModalToggleLabel">🔐 Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-4 small text-white">
              If you are registered in our server you can login here. If you are not registered yet,
              go to our server and type <code>/reg</code>.
            </p>

            <form @submit.prevent="login">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control bg-dark text-white border-secondary"
                  id="inputEmail"
                  placeholder="Username"
                  autocomplete="off"
                  v-model="username"
                  required
                />
                <label for="inputEmail" class="text-white">nickname</label>
              </div>

              <div class="form-floating mb-2">
                <input
                  type="password"
                  class="form-control bg-dark text-white border-secondary"
                  id="inputPassword"
                  placeholder="Password"
                  v-model="password"
                  required
                />
                <label for="inputPassword" class="text-white">password</label>
              </div>

              <div class="text-end mb-3">
                <span class="resetp" @click.prevent="closeModalAndNavigate">
                  🔁 Forgot your password?
                </span>
              </div>

              <div class="d-grid">
                <button style="background: #ff1a1a;" type="submit" class="btn fw-bold shadow-sm">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    <script>
    // import Register from './Register.vue'
    import { Modal } from 'bootstrap';
    import { eventBus } from '../router/index';
    import { useToast } from "vue-toastification";
    import axiosInstance from '../config/axios'
    
    export default {
      name: "LoginModal",
      components: { 
        // Register,
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
          const toast = useToast();
          try {
            const data = await axiosInstance.post(`/user/login`, {
              username: this.username,
              password: this.password
            }).then(res => {
              return res.data
            });
            this.$store.dispatch('updateToken', data.token);
            this.$store.dispatch('updateLogged', true);
            this.$store.dispatch('updateUser', data.user)
            eventBus.emit("userLoggedIn");
            if(data.user.role === 'superadmin'){
              this.$router.push('/dashboard/home')
            }
            toast.success("You logged in successfully! ");
            this.modal.hide();
            this.username = ""
            this.password = ""
          } catch(err) {
            this.error = err.message;
            toast.error(err.response.data.message || "Login failed. Please try again.");
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

        eventBus.on("showLoginModal", () => {
          console.log("🔥 Received showLoginModal event in LoginModal.vue");
          this.modal.show();
        });
      },

      beforeUnmount() {
        // ✅ Remove event listener to prevent memory leaks
        eventBus.off("showLoginModal");
      }
    };
    </script>
    
    <style scoped>
      #modalheader{
        border:none !important;
      }
      #modalfooter{
        border:none !important;
        justify-content:start;
      }

      #exampleModalToggleLabel {
        border-bottom: 2px solid orange;
        padding-bottom: 4px;
        font-weight: bold;
      }

      .modal-dialog {
        font-family: "Roboto", sans-serif;
      }

      .resetp {
        font-size: 0.9rem;
        color: #ff1a1a;
        cursor: pointer;
        text-decoration: underline;
      }

      .resetp:hover {
        color: #ffc04d;
        text-decoration: none;
      }
    </style>