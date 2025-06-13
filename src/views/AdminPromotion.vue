<template>
  <div class="container">
    <br>
    <h2 class="text-center text-white mb-3 fw-bolder">Admin Promotion Applications</h2>

    <div v-if="!['admin', 'superadmin'].includes(currUser?.role)" class="alert alert-danger text-center mt-4">
      🚫 You are not part of the staff team. Only Admins and Superadmins can view promotion applications.
    </div>

    <div v-else>
    <div class="text-end mb-3">
      <router-link to="/forum/apply-for-promotions" class="btn fw-bold text-white" style="background-color: #ff1a1a;">
        Apply for Promotion
      </router-link>
    </div>

    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-else-if="applications.length === 0" class="text-center text-white">No applications found.</div>

    <div v-else class="row">
      <div v-for="application in applications" :key="application._id" class="col-md-6 mb-3">
        <router-link :to="'/forum/admin-promotions/' + application._id" class="text-decoration-none">
          <div class="card forum-card application-card">
            <div class="card-body image-background">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <img v-if="application.user?.profilePhoto" class="profile-photo" :src="getImageUrl(application.user.profilePhoto)" alt="Avatar">
                  <img v-else :src="avatarUrl(application.user)" alt="Avatar">
                  <h5 class="ms-3">{{ application.user ? application.user.username : "Loading..." }}</h5>
                </div>
              </div>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Actual Rank:</strong> {{ application.actualRank }}</p>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Desired Rank:</strong> {{ application.desiredRank }}</p>
              <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Steam Status:</strong> {{ application.steamStatus }}</p>
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
  </div>
</template>

<script>
import { getCurrentUser } from "../config/userLogic";
export default {
  data() {
    return {
      applications: [],
      loading: true,
      currUser: this.$store.state.user,
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
        const response = await this.$axios.get(`/admin-promotion/get-applications?page=${this.pagination.currentPage}&limit=10`);
        this.pagination = response.data.pagination;
        const applications = response.data.data;

        const userRequests = applications.map(async (app) => {
          try {
            const userResponse = await this.$axios.get(`/user/${app.userId}`);
            app.user = userResponse.data.data;
          } catch (err) {
            console.error(`Failed to fetch user for app ${app._id}`, err);
            app.user = null;
          }
        });

        await Promise.all(userRequests);
        this.applications = applications;
      } catch (err) {
        console.error("Error loading promotion applications:", err);
      } finally {
        this.loading = false;
      }
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
    avatarUrl(user) {
      if (!user) return "https://ui-avatars.com/api/?rounded=true&name=Unknown&size=32&background=0D8ABC&color=fff";
      return `https://ui-avatars.com/api/?rounded=true&name=${encodeURIComponent(user.username)}&size=32&background=0D8ABC&color=fff`;
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
        "text-danger": status === "rejected",
      };
    },
  },
  async mounted() {
    this.fetchApplications();
    this.currentUser = await getCurrentUser();
  },
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
  border-radius: 10px;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  min-height: 250px;
}

.image-background {
  background-image: url("../assets/forum/application-background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0.7) !important;
  position: relative;
}

.image-background::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
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
}

.pagination .page-item .page-link {
  color: #fff;
  background-color: #222;
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
}

.pagination .page-item .page-link:hover {
  background-color: #ff1a1a;
  border-color: #ff1a1a;
}

.pagination .page-item.active .page-link {
  background-color: #ff1a1a;
  border-color: #ff1a1a;
  color: #fff;
}

.pagination .page-item.disabled .page-link {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .pagination-container {
    justify-content: center;
  }

  .pagination .page-item {
    margin: 0 2px;
  }

  .pagination .page-item .page-link {
    font-size: 12px;
    padding: 4px 8px;
  }
}

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