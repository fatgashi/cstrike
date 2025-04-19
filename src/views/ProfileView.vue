<template>
  <div>
    <br><br>
    <div class="container">
      <div class="profile-container bg-dark text-white rounded shadow-lg p-4">
        <h2 class="text-center fw-bold mb-4">👤 Profile</h2>
  
        <div class="text-center mb-4">
          <img
            :src="profilePreview || getImageUrl(user.profilePhoto) || avatarUrl"
            alt="Profile"
            class="profile-photo mb-3"
          />
          <div>
            <label for="formFile" class="form-label">Change profile picture:</label>
            <input
              class="form-control bg-dark text-white border-secondary"
              type="file"
              id="formFile"
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
        </div>
  
        <form @submit.prevent="saveProfile">
          <div class="mb-3">
            <label for="username">Username:</label>
            <input
              id="username"
              v-model="user.username"
              type="text"
              class="form-control bg-dark text-white border-secondary"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="email">Email:</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="form-control bg-secondary text-white"
              disabled
            />
          </div>
  
          <div class="mb-3">
            <label for="dob">Date of Birth:</label>
            <input
              id="dob"
              v-model="user.dateOfBirth"
              type="date"
              class="form-control bg-dark text-white border-secondary"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="role">Role:</label>
            <input
              id="role"
              v-model="user.role"
              type="text"
              class="form-control bg-secondary text-white"
              disabled
            />
          </div>
  
          <div class="border-top pt-3 mt-3">
            <h5 class="mb-3">🎮 Your In-Game Stats</h5>
            <div class="row">
              <div class="col-6 mb-2">
                <strong>Ammo Packs:</strong> {{ user.stats && user.stats.AP || 0 }}
              </div>
              <div class="col-6 mb-2">
                <strong>Points:</strong> {{ user.stats && user.stats.POINTS || 0 }}
              </div>
              <div class="col-6 mb-2">
                <strong>Level:</strong> {{ user.stats && user.stats.LEVEL || 1 }}
              </div>
              <div class="col-6 mb-2">
                <strong>EXP:</strong> {{ user.stats && user.stats.EXP || 0 }}
              </div>
            </div>
          </div>
  
          <button type="submit" class="btn btn-success w-100 mt-4 fw-semibold">
            Save Changes
          </button>
        </form>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
import { getCurrentUser } from '../config/userLogic';
import { getToken } from '../config/localStorage';

export default {
  data() {
    return {
      user: {},
      profilePhoto: null,
      profilePreview: null,
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  computed: {
    avatarUrl() {
      if (!this.user.username) {
        return "https://ui-avatars.com/api/?rounded=true&name=User&background=0D8ABC&color=fff";
      }
      const name = encodeURIComponent(this.user.username);
      return `https://ui-avatars.com/api/?rounded=true&name=${name}&background=0D8ABC&color=fff`;
    },
  },
  methods: {
    async fetchUserProfile() {
      const userData = await getCurrentUser();
      if (userData.dateOfBirth) {
        userData.dateOfBirth = new Date(userData.dateOfBirth).toISOString().split('T')[0];
      }
      this.user = userData;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profilePhoto = file;
        this.profilePreview = URL.createObjectURL(file);
      }
    },
    getImageUrl(path) {
      return path ? `https://zm-westcstrike.com/${path}` : null;
    },
    async saveProfile() {
      const formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('dateOfBirth', this.user.dateOfBirth);
      if (this.profilePhoto) {
        formData.append('profilePhoto', this.profilePhoto);
      }

      try {
        const token = getToken();
        await this.$axios.put('/user/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        this.$toast.success("Profile updated successfully!");
        await this.fetchUserProfile();
        this.profilePreview = null;
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to update profile.');
        console.error('Error updating profile:', error.response?.data?.error);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  border: 1px solid #444;
  border-radius: 12px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffc107;
}
</style>
