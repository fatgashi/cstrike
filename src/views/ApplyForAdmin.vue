<template>
  <div class="apply-admin-container">
    <!-- Hero Header -->
    <div class="page-hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <i class="fas fa-user-shield me-3"></i>
          Apply for Admin
        </h1>
        <p class="hero-subtitle">Join our admin team and help maintain a great gaming community</p>
        <div class="hero-features">
          <div class="feature-item">
            <i class="fas fa-shield-alt"></i>
            <span>Community Protection</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-users"></i>
            <span>Team Collaboration</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-star"></i>
            <span>Leadership Role</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Form Section -->
    <div class="form-section">
      <div class="form-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="loading-text">Preparing application form...</p>
        </div>

        <!-- Application Form -->
        <div v-else class="application-form">
          <div class="form-header">
            <h2 class="form-title">
              <i class="fas fa-clipboard-list me-2"></i>
              Application Details
            </h2>
            <p class="form-description">Please fill out all required fields to submit your application</p>
          </div>

          <form @submit.prevent="submitApplication" class="form-content">
            <!-- Personal Information Section -->
            <div class="form-section-group">
              <h3 class="section-title">
                <i class="fas fa-user me-2"></i>
                Personal Information
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-tag me-2"></i>
                    Nickname
                  </label>
                  <input 
                    type="text" 
                    v-model="application.nickname" 
                    class="form-control" 
                    required 
                    placeholder="Your in-game nickname"
                  >
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-birthday-cake me-2"></i>
                    Age
                  </label>
                  <input 
                    type="number" 
                    v-model="application.age" 
                    class="form-control" 
                    required 
                    placeholder="How old are you?"
                  >
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-language me-2"></i>
                    Language Spoken
                  </label>
                  <input 
                    type="text" 
                    v-model="application.languageSpoken" 
                    class="form-control" 
                    required 
                    placeholder="What languages do you speak?"
                  >
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-flag me-2"></i>
                    Country
                  </label>
                  <input 
                    type="text" 
                    v-model="application.country" 
                    class="form-control" 
                    required 
                    placeholder="Where are you from?"
                  >
                </div>
              </div>
            </div>

            <!-- Gaming Experience Section -->
            <div class="form-section-group">
              <h3 class="section-title">
                <i class="fas fa-gamepad me-2"></i>
                Gaming Experience
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-clock me-2"></i>
                    Hours Played
                  </label>
                  <input 
                    type="number" 
                    v-model="application.hoursPlayed" 
                    class="form-control" 
                    required 
                    placeholder="How many hours have you played on the server?"
                  >
                </div>

                <div class="form-group full-width">
                  <label class="form-label">
                    <i class="far fa-calendar-alt me-2"></i>
                    Activity Schedule
                  </label>
                  <input 
                    type="text" 
                    v-model="application.activitySchedule" 
                    class="form-control" 
                    required 
                    placeholder="When are you usually active? example: (From 1pm to 5pm)"
                  >
                </div>

                <div class="form-group full-width">
                  <label class="form-label">
                    <i class="fas fa-star me-2"></i>
                    Experience as Admin
                  </label>
                  <textarea 
                    v-model="application.experience" 
                    class="form-control" 
                    required 
                    placeholder="A short description of your experience as admin"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Communication Tools Section -->
            <div class="form-section-group">
              <h3 class="section-title">
                <i class="fas fa-headset me-2"></i>
                Communication Tools
              </h3>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="application.joinedDiscord" 
                    class="form-check-input" 
                    id="discordCheck"
                  >
                  <label class="form-check-label" for="discordCheck">
                    🎮
                    Joined Discord Group?
                  </label>
                </div>

                <div class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="application.useTeamSpeak" 
                    class="form-check-input" 
                    id="teamSpeakCheck"
                  >
                  <label class="form-check-label" for="teamSpeakCheck">
                    <i class="fas fa-microphone me-2"></i>
                    Do you use TeamSpeak?
                  </label>
                </div>

                <div class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="application.voteTeamSpeak" 
                    class="form-check-input" 
                    id="voteCheck"
                  >
                  <label class="form-check-label" for="voteCheck">
                    <i class="fas fa-vote-yea me-2"></i>
                    I voted on the TeamSpeak Community Server
                  </label>
                </div>
              </div>
            </div>

            <!-- Rules Verification Section -->
            <div class="form-section-group">
              <h3 class="section-title">
                <i class="fas fa-gavel me-2"></i>
                Rules Verification
              </h3>
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-info-circle me-2 text-warning"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Write the secret keyword you found at zm-westcstrike.com/forum/rules">
                  </i>
                  Did you read the rules?
                </label>
                <input 
                  type="text" 
                  v-model="application.rulesRead" 
                  class="form-control" 
                  required 
                  placeholder="Did you read the rules?"
                >
              </div>
            </div>

            <!-- Attachments Section -->
            <div class="form-section-group">
              <h3 class="section-title">
                <i class="fas fa-paperclip me-2"></i>
                Attachments
              </h3>
              
              <!-- Activity Photo -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fas fa-info-circle me-2 text-warning" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Visit gametracker.com or gametracker.ro to find your activity and take a screenshot.">
                  </i>
                  Attach a Photo Of Your Activity
                </label>
                <div class="file-upload-container">
                  <input 
                    type="file" 
                    @change="(event) => handleFileUpload('photoAttachment', 'photoPreview', event)" 
                    class="file-input" 
                    required
                    accept="image/*"
                  >
                  <div class="file-upload-label">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span>Choose Activity Screenshot</span>
                  </div>
                </div>

                <div v-if="photoPreview" class="image-preview">
                  <img :src="photoPreview" class="preview-image" alt="Activity Preview">
                  <button type="button" class="remove-preview" @click="removePreview('photoPreview', 'photoAttachment')">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>

              <!-- TeamSpeak Vote Screenshot -->
              <div v-if="application.voteTeamSpeak" class="form-group">
                <label class="form-label">
                  <i class="fas fa-vote-yea me-2"></i>
                  TeamSpeak Community Vote Screenshot
                </label>
                <div class="file-upload-container">
                  <input 
                    type="file" 
                    @change="(event) => handleFileUpload('votePhotoAttachment', 'votePhotoPreview', event)" 
                    class="file-input"
                    accept="image/*"
                  >
                  <div class="file-upload-label">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span>Choose Vote Screenshot</span>
                  </div>
                </div>

                <div v-if="votePhotoPreview" class="image-preview">
                  <img :src="votePhotoPreview" class="preview-image" alt="Vote Screenshot Preview">
                  <button type="button" class="remove-preview" @click="removePreview('votePhotoPreview', 'votePhotoAttachment')">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Section -->
            <div class="submit-section">
              <div class="submit-info">
                <i class="fas fa-info-circle me-2"></i>
                <span>Please review all information before submitting</span>
              </div>
              <button 
                type="submit" 
                :disabled="isSubmitDisabled" 
                class="submit-btn"
              >
                <i class="fas fa-paper-plane me-2"></i>
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import configuration from "../config/config";
import axiosInstance from '../config/axios'
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
        rulesRead: "",
        voteTeamSpeak: false,
      },
      loading: false,
      photoAttachment: null,
      votePhotoAttachment: null,
      photoPreview: null,
      votePhotoPreview: null,
    };
  },
  methods: {
    async submitApplication() {
      const toast = useToast();

      this.loading = true;
      this.errorMessage = "";

      const formData = new FormData();
      Object.keys(this.application).forEach((key) => {
        formData.append(key, this.application[key]);
      });

      // Convert boolean values to "true"/"false" strings
      formData.set("joinedDiscord", this.application.joinedDiscord ? "true" : "false");
      formData.set("useTeamSpeak", this.application.useTeamSpeak ? "true" : "false");
      formData.set("rulesRead", this.application.rulesRead.trim());
      formData.set("voteTeamSpeak", this.application.voteTeamSpeak ? "true" : "false");

      // Attach Photos
      if (this.photoAttachment) {
        formData.append("photoAttachment", this.photoAttachment);
      }
      if (this.votePhotoAttachment) {
        formData.append("votePhotoAttachment", this.votePhotoAttachment);
      }

      try {
        await axiosInstance.post("/admin/apply", formData, configuration());
        this.$router.push("/forum/admin-applications");
        toast.success("Application submitted successfully!");
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error(error.response?.data?.message || "An error occurred. Try again.");
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(field, previewField, event) {
      if (event && event.target && event.target.files.length > 0) {
        const file = event.target.files[0];
        this[field] = file;
        this[previewField] = URL.createObjectURL(file);
      } else {
        this[previewField] = null;
      }
    },
    removePreview(previewField, attachmentField) {
      this[previewField] = null;
      this[attachmentField] = null;
      // Reset the file input
      const fileInputs = document.querySelectorAll('.file-input');
      fileInputs.forEach(input => {
        if (input.files.length > 0) {
          input.value = '';
        }
      });
    },
  },
  computed: {
    isSubmitDisabled() {
      return !this.application.rulesRead || this.application.rulesRead.trim() === "";
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
.apply-admin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  padding: 20px;
}

/* Hero Section */
.page-hero {
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #b8b8b8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-weight: 500;
}

.feature-item i {
  font-size: 1.5rem;
  color: #4CAF50;
}

/* Form Section */
.form-section {
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 60px 20px;
  color: #ffffff;
}

.loading-text {
  margin-top: 20px;
  color: #b8b8b8;
}

/* Form Header */
.form-header {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
  padding: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.form-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.form-description {
  color: #b8b8b8;
  margin: 0;
}

/* Form Content */
.form-content {
  padding: 30px;
}

.form-section-group {
  margin-bottom: 40px;
}

.section-title {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #4CAF50;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.form-control::placeholder {
  color: #888;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

/* Checkbox Group */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-check-input {
  width: 20px;
  height: 20px;
  accent-color: #4CAF50;
}

.form-check-label {
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* File Upload */
.file-upload-container {
  position: relative;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.file-upload-container:hover {
  border-color: #4CAF50;
  background: rgba(76, 175, 80, 0.05);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-upload-label {
  color: #ffffff;
  font-weight: 500;
}

.file-upload-label i {
  font-size: 2rem;
  color: #4CAF50;
  margin-bottom: 10px;
  display: block;
}

/* Image Preview */
.image-preview {
  position: relative;
  margin-top: 15px;
  display: inline-block;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.remove-preview {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-preview:hover {
  background: #c82333;
  transform: scale(1.1);
}

/* Submit Section */
.submit-section {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.submit-info {
  color: #b8b8b8;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.submit-btn {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.submit-btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-features {
    flex-direction: column;
    gap: 20px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-content {
    padding: 20px;
  }
  
  .form-header {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .apply-admin-container {
    padding: 10px;
  }
  
  .page-hero {
    padding: 40px 20px;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
}
</style>
  