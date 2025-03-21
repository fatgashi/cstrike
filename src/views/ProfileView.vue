<template>
    <div class="container">
        <br>
        <br>
        <div class="profile-container">
          <h2 class="text-white fw-bolder">Profile</h2>
          <div>
            <form class="text-white" @submit.prevent="saveProfile" enctype="multipart/form-data">
                <div class="d-flex justify-content-center align-items-center mb-4">
                    <div v-if="profilePreview || user.profilePhoto">
                      <img :src="profilePreview || getImageUrl(user.profilePhoto)" alt="Profile Photo" class="profile-photo" />
                    </div>
                    <div v-else>
                      <img :src="avatarUrl" alt="Avatar" style="width: 50px; height: 50px; object-fit: cover;">
                    </div>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Change profile picture:</label>
                    <input class="form-control bg-dark text-white" type="file" id="formFile" @change="handleFileUpload" accept="image/*" >
                </div>
              
              <label>Username:</label>
              <input v-model="user.username" type="text" require />
              
              <label>Email:</label>
              <input class="text-white" v-model="user.email" type="email" disabled />
              
              <label>Date of Birth:</label>
              <input v-model="user.dateOfBirth" type="date" require />
              
              <label>Role:</label>
              <input class="text-white" v-model="user.role" type="text" disabled />
              
              <button type="btn submit">Save Changes</button>
            </form>
          </div>
        </div>
        <br>
        <br>
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
      profilePreview: null
    };
  },
  async created() {
    await this.fetchUserProfile();
  },
  computed: {
    avatarUrl() {
      if (!this.user.username) return "https://ui-avatars.com/api/?rounded=true&name=User&background=0D8ABC&color=fff";
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
        this.profilePreview = URL.createObjectURL(file); // Create a dynamic preview URL
      }
    },
    getImageUrl(path) {
      return `http://zm-westcstrike.com/${path}`;
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
          headers: { 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
           }
        });
        this.$toast.success('Profile updated successfully!');
        await this.fetchUserProfile(); // Refresh user data after saving
        this.profilePreview = null; // Reset preview after successful upload
      } catch (error) {
        this.$toast.error(error.response?.data?.error || 'Failed to update profile.');
        console.error('Error updating profile:', error.response?.data?.error);
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}
label {
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #218838;
}
</style>
