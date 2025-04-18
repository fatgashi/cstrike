<template>
    <div class="container">
      <br>
      <h2 class="text-center text-white mb-3 fw-bolder">Apply for Admin</h2>
  
      <div v-if="loading" class="text-center text-white">Loading...</div>
      <div v-else-if="errorMessage" class="alert alert-danger text-center">{{ errorMessage }}</div>
      <div v-else class="card application-form-card">
        <div class="card-body text-white">
          <form @submit.prevent="submitApplication">
            <div class="mb-3">
              <label class="form-label">Nickname</label>
              <input type="text" v-model="application.nickname" class="form-control" required placeholder="Your in-game nickname">
            </div>
  
            <div class="mb-3">
              <label class="form-label">Age</label>
              <input type="number" v-model="application.age" class="form-control" required placeholder="How old are you?">
            </div>
  
            <div class="mb-3">
              <label class="form-label">Language Spoken</label>
              <input type="text" v-model="application.languageSpoken" class="form-control" required placeholder="What languages do you speak?">
            </div>
  
            <div class="mb-3">
              <label class="form-label">Country</label>
              <input type="text" v-model="application.country" class="form-control" required placeholder="Where are you from?">
            </div>
  
            <div class="mb-3">
              <label class="form-label">Hours Played</label>
              <input type="number" v-model="application.hoursPlayed" class="form-control" required placeholder="How many hours have you played on the server?">
            </div>
  
            <div class="mb-3">
              <label class="form-label">Experience as Admin</label>
              <textarea v-model="application.experience" class="form-control" required placeholder="A short description of your experience as admin"></textarea>
            </div>
  
            <div class="mb-3">
              <label class="form-label">Activity Schedule</label>
              <input type="text" v-model="application.activitySchedule" class="form-control" required placeholder="When are you usually active? example: (From 1pm to 5pm)">
            </div>
  
            <!-- ✅ Boolean Fields (Checkbox) -->
            <div class="mb-3 form-check">
              <input type="checkbox" v-model="application.joinedDiscord" class="form-check-input" id="discordCheck">
              <label class="form-check-label" for="discordCheck">Joined Discord Group?</label>
            </div>
  
            <div class="mb-3 form-check">
              <input type="checkbox" v-model="application.useTeamSpeak" class="form-check-input" id="teamSpeakCheck">
              <label class="form-check-label" for="teamSpeakCheck">Do you use TeamSpeak?</label>
            </div>
  
            <div class="mb-3 form-check">
              <i class="fa fa-info-circle me-2 text-warning" 
                data-bs-toggle="tooltip" 
                data-bs-placement="top" 
                title="Did you read the rules found in zm-westcstrike.com/forum/rules">
              </i>
              <input type="checkbox" v-model="application.rulesRead" class="form-check-input" id="rulesCheck" required>
              <label class="form-check-label" for="rulesCheck">I have read and agree to the rules</label>
            </div>

            <div v-if="application.rulesRead" class="mb-3">
              <label class="form-label">Enter the Secret Keyword</label>
              <input type="text" v-model="secretKeyword" class="form-control bg-dark text-white" placeholder="Enter VIP" required>
              <small v-if="secretKeyword && secretKeyword !== 'VIP'" class="text-danger">You must read the rules to find the keyword to apply!</small>
            </div>
  
            <div class="mb-3 form-check">
              <input type="checkbox" v-model="application.voteTeamSpeak" class="form-check-input" id="voteCheck">
              <label class="form-check-label" for="voteCheck">I voted on the TeamSpeak Community Server</label>
            </div>
  
            <!-- ✅ Attachments -->
            <div class="mb-3">
              <i class="fa fa-info-circle me-2 text-warning" 
                data-bs-toggle="tooltip" 
                data-bs-placement="top" 
                title="Visit gametracker.com or gametracker.ro to find your activity and take a screenshot.">
              </i>
              <label class="form-label">Attach a Photo Of Your Activity</label>
              <input type="file" @change="(event) => handleFileUpload('photoAttachment', 'photoPreview', event)" class="form-control bg-dark text-white" required>
            </div>

            <div v-if="photoPreview" class="my-3">
              <img :src="photoPreview" class="img-fluid img-preview" alt="Activity Preview">
            </div>
  
            <div v-if="application.voteTeamSpeak" class="mb-3">
              <label class="form-label">TeamSpeak Community Vote Screenshot</label>
              <input type="file" @change="(event) => handleFileUpload('votePhotoAttachment', 'votePhotoPreview', event)" class="form-control">

              <div v-if="votePhotoPreview" class="mt-3">
                <img :src="votePhotoPreview" class="img-fluid img-preview" alt="Vote Screenshot Preview">
              </div>
            </div>
  
            <!-- ✅ Submit Button -->
            <div class="text-center">
              <button type="submit" :disabled="isSubmitDisabled" class="btn btn-success fw-bold">🚀 Submit Application</button>
            </div>
          </form>
        </div>
      </div>
      <br>
      <br>
    </div>
  </template>
  
  <script>
  import configuration from "../config/config";
  import { Tooltip } from "bootstrap";
  
  export default {
    data() {
      return {
        application: {
          nickname: "",
          age: "",
          languageSpoken: "",
          country: "",
          experience: "",
          activitySchedule: "",
          hoursPlayed: "",
          joinedDiscord: false,
          useTeamSpeak: false,
          rulesRead: false,
          voteTeamSpeak: false,
        },
        secretKeyword: "",
        loading: false,
        errorMessage: "",
        photoAttachment: null,
        votePhotoAttachment: null,
        photoPreview: null,
        votePhotoPreview: null,
      };
    },
    methods: {
      async submitApplication() {
        if (this.application.rulesRead && this.secretKeyword !== "VIP") {
          this.$toast.error("You must enter the correct keyword to proceed.");
          return;
        }

        this.loading = true;
        this.errorMessage = "";
  
        const formData = new FormData();
        Object.keys(this.application).forEach((key) => {
          formData.append(key, this.application[key]);
        });
  
        // ✅ Convert boolean values to "true"/"false" strings (because FormData doesn't support booleans)
        formData.set("joinedDiscord", this.application.joinedDiscord ? "true" : "false");
        formData.set("useTeamSpeak", this.application.useTeamSpeak ? "true" : "false");
        formData.set("rulesRead", this.application.rulesRead ? "true" : "false");
        formData.set("voteTeamSpeak", this.application.voteTeamSpeak ? "true" : "false");
  
        // ✅ Attach Photos
        if (this.photoAttachment) {
          formData.append("photoAttachment", this.photoAttachment);
        }
        if (this.votePhotoAttachment) {
          formData.append("votePhotoAttachment", this.votePhotoAttachment);
        }
  
        try {
          await this.$axios.post("/admin/apply", formData, configuration());
          this.$router.push("/forum/admin-applications"); // Redirect to applications list
          this.$toast.success("Application submitted successfully!");
        } catch (error) {
          console.error("Error submitting application:", error);
          this.errorMessage = error.response?.data?.message || "An error occurred. Try again.";
        } finally {
          this.loading = false;
        }
      },
      handleFileUpload(field, previewField, event) {
        if (event && event.target && event.target.files.length > 0) {
          const file = event.target.files[0];
          this[field] = file; // Store the file object
          this[previewField] = URL.createObjectURL(file); // Generate preview URL
        } else {
          this[previewField] = null; // Clear preview if no file is selected
        }
      },
    },
    computed: {
      isSubmitDisabled() {
        // ✅ Disable Submit Button if Rules Read is checked but the keyword is incorrect
        return this.application.rulesRead && this.secretKeyword !== "VIP";
      }
    },
    watch: {
      "application.voteTeamSpeak"(newValue) {
        if (!newValue) {
          this.votePhotoAttachment = null;
          this.votePhotoPreview = null;
        }
      }
    },
    mounted() {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }
  };
  </script>
  
  <style scoped>
  .application-form-card {
    max-width: 600px;
    margin: auto;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  </style>
  