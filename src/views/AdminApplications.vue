<template>
  <div class="admin-applications-container">
    <!-- Hero Header -->
    <div class="page-hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <i class="fas fa-user-shield me-3"></i>
          Admin Applications
        </h1>
        <p class="hero-subtitle">Review and manage admin applications from our community members</p>
      </div>
      <div class="hero-actions">
        <router-link to="/forum/apply-for-admin" class="apply-btn">
          <i class="fas fa-plus me-2"></i>
          Apply for Admin
        </router-link>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon pending">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon approved">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ approvedCount }}</span>
          <span class="stat-label">Approved</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon rejected">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ rejectedCount }}</span>
          <span class="stat-label">Rejected</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon total">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ applications.length }}</span>
          <span class="stat-label">Total</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="loading-text">Loading applications...</p>
    </div>

    <!-- No Applications State -->
    <div v-else-if="applications.length === 0" class="no-applications">
      <div class="empty-state">
        <i class="fas fa-inbox text-muted mb-3" style="font-size: 4rem;"></i>
        <h3>No Applications Found</h3>
        <p class="text-muted">There are currently no admin applications to review.</p>
        <router-link to="/forum/apply-for-admin" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>Be the First to Apply
        </router-link>
      </div>
    </div>

    <!-- Applications Grid -->
    <div v-else class="applications-section">
      <div class="section-header">
        <h3 class="section-title">
          <i class="fas fa-list me-2"></i>
          Recent Applications
        </h3>
        <div class="view-options">
          <button class="view-toggle active" @click="setViewMode('grid')">
            <i class="fas fa-th-large"></i>
          </button>
          <button class="view-toggle" @click="setViewMode('list')">
            <i class="fas fa-list"></i>
          </button>
        </div>
      </div>

      <div class="applications-grid" :class="viewMode">
        <div v-for="application in applications" :key="application._id" class="application-item">
          <router-link :to="'/forum/admin-applications/' + application._id" class="application-link">
            <div class="application-card">
              <div class="card-header">
                <div class="user-info">
                  <div class="avatar-container">
                    <img
                      v-if="application.user && application.user.profilePhoto"
                      class="user-avatar"
                      :src="getImageUrl(application.user.profilePhoto)"
                      alt="User Avatar"
                    />
                    <img
                      v-else-if="application.user"
                      :src="avatarUrl(application.user)"
                      class="user-avatar"
                      alt="User Avatar"
                    />
                    <img
                      v-else
                      src="https://ui-avatars.com/api/?rounded=true&name=Deleted&size=64&background=777&color=fff"
                      class="user-avatar"
                      alt="Deleted User"
                    />
                    <div class="status-badge" :class="statusClass(application.status)">
                      {{ application.status }}
                    </div>
                  </div>
                  <div class="user-details">
                    <h4 class="username">
                      {{ application.user ? application.user.username : "User deleted" }}
                    </h4>
                    <p class="submission-date">
                      <i class="far fa-calendar-alt me-1"></i>
                      {{ formatDateLong(application.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="card-actions">
                  <div class="action-icon">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="application-details">
                  <div class="detail-row">
                    <div class="detail-item">
                      <i class="fas fa-flag me-2"></i>
                      <span class="detail-label">Country:</span>
                      <span class="detail-value">{{ application.country }}</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-star me-2"></i>
                      <span class="detail-label">Experience:</span>
                      <span class="detail-value">{{ application.experience }}</span>
                    </div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-item">
                      <i class="fas fa-clock me-2"></i>
                      <span class="detail-label">Hours Played:</span>
                      <span class="detail-value">{{ application.hoursPlayed }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="pagination-section">
      <nav class="pagination-nav">
        <div class="pagination-info">
          <span class="page-info">
            Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
          </span>
        </div>
        
        <div class="pagination-controls">
          <!-- Previous Button -->
          <button 
            class="pagination-btn prev" 
            @click="changePage(pagination.currentPage - 1)" 
            :disabled="pagination.currentPage === 1"
          >
            <i class="fas fa-chevron-left"></i>
            <span class="btn-text">Previous</span>
          </button>

          <!-- Page Numbers -->
          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              class="page-btn"
              :class="{ 
                active: page === pagination.currentPage,
                ellipsis: page === '...'
              }"
              @click="page !== '...' ? changePage(page) : null"
              :disabled="page === '...'"
            >
              {{ page }}
            </button>
          </div>

          <!-- Next Button -->
          <button 
            class="pagination-btn next" 
            @click="changePage(pagination.currentPage + 1)" 
            :disabled="pagination.currentPage === pagination.totalPages"
          >
            <span class="btn-text">Next</span>
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from "../config/userLogic";
import axiosInstance from '../config/axios'

export default {
  data() {
    return {
      applications: [],
      loading: true,
      currentUser: {},
      viewMode: 'grid',
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
    },
    pendingCount() {
      return this.applications.filter(app => app.status === 'pending').length;
    },
    approvedCount() {
      return this.applications.filter(app => app.status === 'approved').length;
    },
    rejectedCount() {
      return this.applications.filter(app => app.status === 'rejected').length;
    }
  },
  methods: {
    setViewMode(mode) {
      this.viewMode = mode;
      // Update active button states
      document.querySelectorAll('.view-toggle').forEach(btn => btn.classList.remove('active'));
      event.target.closest('.view-toggle').classList.add('active');
    },
    async fetchApplications() {
      try {
        const { data } = await axiosInstance.get(
          `/admin/get-applications?page=${this.pagination.currentPage}&limit=10`
        );
        this.pagination = data.pagination;
        const applications = data.data;

        // Fetch user details for each application
        const userRequests = applications.map(async (app) => {
          try {
            const res = await axiosInstance.get(`/user/${app.userId}`);
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
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        "status-pending": status === "pending",
        "status-approved": status === "approved",
        "status-rejected": status === "rejected"
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
/* Main Container */
.admin-applications-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
}

/* Hero Section */
.page-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.hero-content h1 {
  color: white;
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  max-width: 500px;
}

.apply-btn {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 15px 30px;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.apply-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  color: white;
  text-decoration: none;
}

/* Stats Overview */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin: 0 auto 15px;
}

.stat-icon.pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.stat-icon.approved {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.stat-icon.rejected {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.stat-icon.total {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  display: block;
  line-height: 1;
}

.stat-label {
  color: #bdc3c7;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Loading and Empty States */
.loading-container, .no-applications {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.loading-text {
  color: #6c757d;
  font-size: 1.1rem;
  margin-top: 20px;
}

.empty-state h3 {
  color: white;
  margin-bottom: 15px;
}

/* Applications Section */
.applications-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-title {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.view-options {
  display: flex;
  gap: 10px;
}

.view-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #bdc3c7;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-toggle.active,
.view-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
}

/* Applications Grid */
.applications-grid {
  display: grid;
  gap: 25px;
}

.applications-grid.grid {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.applications-grid.list {
  grid-template-columns: 1fr;
}

.application-item {
  transition: all 0.3s ease;
}

.application-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.application-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.application-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.card-header {
  padding: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-container {
  position: relative;
}

.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.status-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.status-pending {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.status-approved {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.status-rejected {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.user-details h4 {
  color: white;
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.submission-date {
  color: #bdc3c7;
  margin: 0;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  align-items: center;
}

.action-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
  transition: all 0.3s ease;
}

.application-card:hover .action-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: scale(1.1);
}

.card-body {
  padding: 25px;
}

.application-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.detail-item i {
  color: #667eea;
  width: 16px;
}

.detail-label {
  color: #bdc3c7;
  font-weight: 600;
  margin-right: 8px;
}

.detail-value {
  color: white;
  font-weight: 500;
}

/* Pagination */
.pagination-section {
  margin-top: 40px;
}

.pagination-nav {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.pagination-info {
  text-align: center;
  margin-bottom: 20px;
}

.page-info {
  color: #bdc3c7;
  font-size: 0.9rem;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.pagination-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  font-weight: 600;
}

.page-btn:hover:not(.ellipsis) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.page-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.page-btn.ellipsis {
  cursor: default;
  background: transparent;
  border: none;
  color: #bdc3c7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-applications-container {
    padding: 15px;
  }
  
  .page-hero {
    padding: 30px 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .applications-grid.grid {
    grid-template-columns: 1fr;
  }
  
  .detail-row {
    flex-direction: column;
    gap: 15px;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 20px;
  }
  
  .page-numbers {
    order: -1;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-overview,
.applications-section,
.pagination-section {
  animation: fadeInUp 0.8s ease-out;
}

.applications-section {
  animation-delay: 0.2s;
}

.pagination-section {
  animation-delay: 0.4s;
}
</style>
