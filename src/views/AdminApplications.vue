<template>
  <div class="container">
    <br>
    <h2 class="text-center text-white mb-3 fw-bolder">Admin Applications</h2>

    <div class="text-end mb-3">
      <router-link to="/forum/apply-for-admin" class="btn fw-bold text-white" style="background-color: #ff1a1a;">
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
                  <!-- Avatar -->
                  <img
                    v-if="application.user && application.user.profilePhoto"
                    class="profile-photo"
                    :src="getImageUrl(application.user.profilePhoto)"
                    alt="Avatar"
                  />
                  <img
                    v-else-if="application.user"
                    :src="avatarUrl(application.user)"
                    class="profile-photo"
                    alt="Avatar"
                  />
                  <img
                    v-else
                    src="https://ui-avatars.com/api/?rounded=true&name=Deleted&size=64&background=777&color=fff"
                    class="profile-photo"
                    alt="Deleted User"
                  />

                  <!-- Username -->
                  <h5 class="ms-3">
                    {{ application.user ? application.user.username : "User deleted" }}
                  </h5>
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

    <nav v-if="pagination.totalPages > 1" class="pagination-container mt-4">
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <!-- Previous -->
        <ul class="pagination mb-0 ms-3">
          <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
            <button class="page-link" @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1">
              <span class="d-none d-sm-inline">previous</span>
              <span class="d-sm-none">«</span>
            </button>
          </li>
        </ul>

        <!-- Page Numbers -->
        <ul class="pagination mb-0">
          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === pagination.currentPage }"
          >
            <button
              class="page-link"
              v-if="page !== '...'"
              @click="changePage(page)">
              {{ page }}
            </button>
            <span v-else class="page-link">...</span>
          </li>
        </ul>

        <!-- Next -->
        <ul class="pagination mb-0 me-3">
          <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.totalPages }">
            <button class="page-link" @click="changePage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.totalPages">
              <span class="d-none d-sm-inline">next</span>
              <span class="d-sm-none">»</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <br>
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
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
    };
  },
  computed: {
    visiblePages() {
      const total = this.pagination.totalPages;
      const current = this.pagination.currentPage;
      if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

      const pages = [];
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", total);
      } else if (current >= total - 3) {
        pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
      return pages;
    }
  },
  methods: {
    async fetchApplications() {
      try {
        const { data } = await this.$axios.get(
          `/admin/get-applications?page=${this.pagination.currentPage}&limit=10`
        );
        this.pagination = data.pagination;
        const applications = data.data;

        // Fetch user details for each application
        const userRequests = applications.map(async (app) => {
          try {
            const res = await this.$axios.get(`/user/${app.userId}`);
            app.user = res.data.data;          // ✅ attach user data
            app.userDeleted = false;
          } catch (err) {
            // If the user is gone or some other error occurs
            if (err.response && err.response.status === 404) {
              app.userDeleted = true;          // ✅ flag as deleted
            } else {
              console.error(`Error fetching user ${app.userId}:`, err);
            }
            app.user = null;
          }
        });

        await Promise.all(userRequests);
        this.applications = applications;
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
    async changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages && page !== this.pagination.currentPage) {
        this.pagination.currentPage = page;
        this.loading = true;
        await this.fetchApplications();
      }
    },
    getImageUrl(path) {
      return `https://zm-westcstrike.com/${path}`;
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

.pagination-container {
  margin-top: 20px;
}

.pagination {
  margin-bottom: 0; /* Remove extra margin */
}

.pagination .page-item .page-link {
  color: #fff;
  background-color: #222; /* Dark background for pagination buttons */
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
  padding: 5px 10px; /* Compact padding */
}

/* Responsive Adjustments for Small Devices */
@media (max-width: 768px) {
  .pagination-container {
    justify-content: center; /* Center pagination on smaller devices */
  }

  .pagination .page-item {
    display: inline-block;
    margin: 0 2px; /* Reduce margin for compact layout */
  }

  .pagination .page-item .page-link {
    font-size: 12px; /* Smaller font size for compact layout */
    padding: 4px 8px; /* Reduce padding */
  }
}

/* Very Small Devices */
@media (max-width: 480px) {
  .pagination-container {
    flex-direction: column;
    align-items: center;
  }

  .pagination .page-item {
    margin: 2px 0; /* Stack buttons vertically */
  }

  .pagination .page-item .page-link {
    font-size: 10px; /* Smaller font size for extra compact layout */
  }
}

.pagination-container {
  margin-top: 20px;
}

.pagination .page-item .page-link {
  color: #fff;
  background-color: #222; /* Dark background for pagination buttons */
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
}

.pagination .page-item .page-link:hover {
  background-color: #ff1a1a; /* Highlighted background on hover */
  border-color: #ff1a1a;
}

.pagination .page-item.active .page-link {
  background-color: #ff1a1a; /* Active page button */
  border-color: #ff1a1a;
  color: #fff;
}

.pagination .page-item.disabled .page-link {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
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
