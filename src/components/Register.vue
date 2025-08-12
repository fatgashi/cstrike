<template>
    <div class="modal fade" ref="myModal" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header" id="modalheader">
            <h5 class="modal-title " id="exampleModalToggleLabel2">Register</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-white">
           <form @submit.prevent="register">
                <div class=" form-floating mb-3">
                    <input type="text" class="form-control bg-dark text-white " id="inputRegisterUsername" placeholder="Username" minlength="4" autocomplete="off" v-model="username"  required />
                    <label for="inputRegisterUsername">Username</label>
                </div>
                <div class=" form-floating mb-3">
                    <input type="email" class="form-control bg-dark text-white" id="inputRegisterEmail" placeholder="Email" autocomplete="off"  v-model="email"  required />
                    <label for="inputRegisterEmail">Email</label>
                </div>
                <div class=" form-floating mb-3">
                    <input type="date" class="form-control bg-dark text-white" id="inputRegisterDate" placeholder="Date Of Birth" autocomplete="off"  v-model="dateBirth"  required />
                    <label for="inputRegisterDate">Date Of Birth</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control bg-dark text-white" id="inputRegisterPassword" minlength="8" placeholder="Password" v-model="password"  required />
                    <label for="inputRegisterPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control bg-dark text-white" id="inputRegisterRePassword" minlength="8" placeholder="Confirm Password" v-model="confirmPassword" required />
                    <label for="inputRegisterPassword">Confirm Password</label>
                </div>
                <div id="emailHelp" class="form-text fw-bolder text-white mb-3">If you are already registered in server cs1.6, you can login with your name and password!</div>
                <button type="submit" style="background-color: #ff1a1a;" class="btn text-white">Register</button>
            </form>
          </div>
          <div class="modal-footer" id="modalfooter">
            <button class="btn btn-success"  data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to Login</button>
          </div>
        </div>
      </div>
    </div>
    </template>
    
    <script>
      import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';
import axiosInstance from '../config/axios'
    
    export default {
        name: "RegisterModal",
        data(){
          return {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateBirth: "",
            modal: null,
          }
        },
    
        methods: {
          async register(){
            const toast = useToast();
            if (this.password !== this.confirmPassword) {
              toast.error('Passwords do not match.');
              return;
            }
            try {
              await axiosInstance.post(`/user/register`, {
                username: this.username,
                email: this.email,
                password: this.password,
                dateOfBirth: this.dateBirth
              }).then(res => {
                
                this.$router.push('/email-verification');
                toast.success(res.data.message);
                return res.data;
              })
    
              this.modal.hide();
    
              this.username = "";
              this.email = "";
              this.password = "";
                
            } catch (err){
              const keys = Object.keys(err.response.data);
              
              var firstError = keys[0];
              toast.error(err.response.data[firstError]);
              
            }
    
            }
        },
    
        mounted(){
          // eslint-disable-next-line
          this.modal = new Modal(this.$refs.myModal);
        }
    }
    </script>
    
    <style scoped>
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
      #exampleModalToggleLabel2{
        border-bottom: 1px solid orange;
      }
    </style>