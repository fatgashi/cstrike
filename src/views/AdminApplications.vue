<template>
  <div class="container">
    <br>
    <h2 class="text-center text-white mb-3 fw-bolder">Admin Applications</h2>

    <div class="text-end mb-3">
      <router-link to="/forum/apply-for-admin" class="btn fw-bold text-white" style="background-color: rgb(242, 142, 38);">
        Apply for Admin
      </router-link>
    </div>

    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-else-if="applications.length === 0" class="text-center text-white">No applications found.</div>

    <div v-else class="row">
      <div v-for="application in applications" :key="application._id" class="col-md-6 mb-3">
        <router-link :to="'/forum/admin-applications/' + application._id" class="text-decoration-none">
          <div class="card forum-card application-card">
            <div class="card-body image-background">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <img v-if="application.user.profilePhoto" class="profile-photo" :src="getImageUrl(application.user.profilePhoto)" alt="Avatar">
                  <img v-else :src="avatarUrl(application.user)" alt="Avatar">
                  <h5 class="ms-3">{{ application.user ? application.user.username : "Loading..." }}</h5>
                </div>
              </div>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Country:</strong> {{ application.country }}</p>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Experience:</strong> {{ application.experience }}</p>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Hours Played:</strong> {{ application.hoursPlayed }}</p>
              <p><strong>Status:</strong> <span :class="statusClass(application.status)">{{ application.status }}</span></p>
              <small>Submitted on: {{ formatDateLong(application.createdAt) }}</small>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from "../config/userLogic";

export default {
  data() {
    return {
      applications: [],
      loading: true,
      currentUser: {},
    };
  },
  methods: {
    async fetchApplications() {
      try {
        const response = await this.$axios.get("/admin/get-applications?page=1&limit=10");
        let applications = response.data.data;

        // Fetch user details for each application
        const userRequests = applications.map(async (app) => {
          try {
            const userResponse = await this.$axios.get(`/user/${app.userId}`);
            app.user = userResponse.data.data; // Attach user data to the application
          } catch (error) {
            console.error(`Error fetching user for application ${app._id}:`, error);
            app.user = null; // Handle cases where user fetch fails
          }
        });

        await Promise.all(userRequests); // Wait for all user fetches to complete

        this.applications = applications; // Update state with user-enriched applications
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        this.loading = false;
      }
    },
    avatarUrl(user) {
      if (!user) {
        return "https://ui-avatars.com/api/?rounded=true&name=Unknown&size=32&background=0D8ABC&color=fff";
      }
      return `https://ui-avatars.com/api/?rounded=true&name=${encodeURIComponent(user.username)}&size=32&background=0D8ABC&color=fff`;
    },
    getImageUrl(path) {
      return `http://zm-westcstrike.com/${path}`;
    },
    formatDateLong(date) {
      if (!date) return "";
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      return new Date(date).toLocaleString("en-US", options);
    },
    statusClass(status) {
      return {
        "text-warning": status === "pending",
        "text-success": status === "approved",
        "text-danger": status === "rejected"
      };
    }
  },
  async mounted() {
    this.fetchApplications();
    this.currentUser = await getCurrentUser();
  }
};
</script>

<style scoped>
.application-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  cursor: pointer;
  background-color: #1a1a1a;
  color: white;
}

.forum-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  min-height: 250px;
  height: auto; 
}

.image-background {
  position: relative;
  background-image: url("../assets/forum/application-background.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.7) !important; /* This might still not work */
}

.image-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.image-background * {
  position: relative;
  z-index: 2;
}

.application-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

.profile-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}
</style>
