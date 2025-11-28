<template>
  <div>
    <br>
    <div class="admin-application-container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <h1 v-if="user" class="page-title">
            <i class="fas fa-user-shield me-3"></i>
            Admin Application: {{ user.username }}
          </h1>
          <div class="header-actions" v-if="currentUser && currentUser.role === 'superadmin' && application && application.status === 'pending'">
            <div class="dropdown">
              <button class="btn btn-outline-light dropdown-toggle action-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-cog me-2"></i>
                Actions
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><button class="dropdown-item" @click="finishApplication">
                  <i class="fas fa-sync-alt me-2"></i>Finish Application
                </button></li>
                <li><button class="dropdown-item text-success" @click="updateApplicationStatus('approved')">
                  <i class="fas fa-check me-2"></i>Approve
                </button></li>
                <li><button class="dropdown-item text-danger" @click="updateApplicationStatus('rejected')">
                  <i class="fas fa-times me-2"></i>Reject
                </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="loading-text">Loading application details...</p>
      </div>
  
      <!-- Application Not Found -->
      <div v-else-if="!application" class="not-found-container">
        <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 3rem;"></i>
        <h3>Application not found</h3>
        <p class="text-muted">The requested application could not be located.</p>
      </div>
  
      <!-- Main Application Content -->
      <div v-else class="application-content">
        <!-- Applicant Info Card -->
        <div class="applicant-card">
          <div class="applicant-header">
            <div class="applicant-profile">
              <div class="profile-image-container">
                <img v-if="user.profilePhoto" class="profile-image" :src="getImageUrl(user.profilePhoto)" alt="Profile Photo">
                <img v-else :src="avatarUrl" alt="Default Avatar" class="profile-image">
                <div class="status-badge" :class="statusClass(application.status)">
                  {{ application.status }}
                </div>
              </div>
              <div class="applicant-details">
                <h3 class="applicant-name">{{ user.username }}</h3>
                <p class="applicant-date">
                  <i class="far fa-calendar-alt me-2"></i>
                  Applied on {{ formatDate(application.createdAt) }}
                </p>
                <div v-if="application.status !== 'pending'" class="closed-info">
                  <i class="fas fa-lock me-2"></i>
                  Closed by: <span class="closed-by">{{ application.closedBy || "N/A" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Application Details Card -->
        <div class="details-card">
          <div class="card-header">
            <h4><i class="fas fa-info-circle me-2"></i>Application Details</h4>
          </div>
          <div class="card-body">
            <div class="details-grid">
              <div class="detail-item">
                <i class="fas fa-user me-2 text-white"></i>
                <span class="detail-label">Nickname:</span>
                <span class="detail-value">{{ application.nickname }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-flag me-2 text-white"></i>
                <span class="detail-label">Country:</span>
                <span class="detail-value">{{ application.country }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-star me-2 text-white"></i>
                <span class="detail-label">Experience:</span>
                <span class="detail-value">{{ application.experience }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-clock me-2 text-white"></i>
                <span class="detail-label">Hours Played:</span>
                <span class="detail-value">{{ application.hoursPlayed }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-calendar-week me-2 text-white"></i>
                <span class="detail-label">Activity Schedule:</span>
                <span class="detail-value">{{ application.activitySchedule }}</span>
              </div>
              <div class="detail-item">
                🎮
                <span class="detail-label">Discord Server:</span>
                <span class="detail-value" :class="application.joinedDiscord ? 'text-success' : 'text-danger'">
                  <i :class="application.joinedDiscord ? 'fas fa-check' : 'fas fa-times'"></i>
                  {{ application.joinedDiscord ? "Yes" : "No" }}
                </span>
              </div>
              <div class="detail-item">
                <i class="fas fa-headset me-2 text-white"></i>
                <span class="detail-label">TeamSpeak:</span>
                <span class="detail-value" :class="application.useTeamSpeak ? 'text-success' : 'text-danger'">
                  <i :class="application.useTeamSpeak ? 'fas fa-check' : 'fas fa-times'"></i>
                  {{ application.useTeamSpeak ? "Yes" : "No" }}
                </span>
              </div>
              <div class="detail-item">
                <i class="fas fa-book me-2 text-white"></i>
                <span class="detail-label">Rules Read:</span>
                <span class="detail-value" :class="application.rulesRead ? 'text-success' : 'text-danger'">
                  <i :class="application.rulesRead ? 'fas fa-check' : 'fas fa-times'"></i>
                  {{ application.rulesRead || "No" }}
                </span>
                <span v-if="currentUser && (currentUser.role === 'admin' || currentUser.role === 'superadmin')" class="keyword-info">
                  Keyword: <code class="keyword">{{ application.expectedKeyword }}</code>
                </span>
              </div>
              <div class="detail-item">
                <i class="fas fa-vote-yea me-2 text-white"></i>
                <span class="detail-label">TeamSpeak Vote:</span>
                <span class="detail-value" :class="application.voteTeamSpeak ? 'text-success' : 'text-danger'">
                  <i :class="application.voteTeamSpeak ? 'fas fa-check' : 'fas fa-times'"></i>
                  {{ application.voteTeamSpeak ? "Yes" : "No" }}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Voting Section -->
        <div class="voting-card">
          <div class="card-header">
            <h4><i class="fas fa-vote-yea me-2"></i>Voting Results</h4>
          </div>
          <div class="card-body">
            <div class="vote-stats">
              <div class="vote-stat approved">
                <div class="vote-icon">
                  <i class="fas fa-check"></i>
                </div>
                <div class="vote-info">
                  <span class="vote-count">{{ approvedVotes }}</span>
                  <span class="vote-label">Approved</span>
                </div>
              </div>
              <div class="vote-stat rejected">
                <div class="vote-icon">
                  <i class="fas fa-times"></i>
                </div>
                <div class="vote-info">
                  <span class="vote-count">{{ rejectedVotes }}</span>
                  <span class="vote-label">Rejected</span>
                </div>
              </div>
            </div>
  
            <!-- Voting Buttons -->
            <div v-if="!hasVoted && currentUser && (currentUser.role === 'superadmin' || currentUser.role === 'admin')" class="voting-actions">
              <button class="btn btn-success btn-lg me-3" @click="submitVote('approve')">
                <i class="fas fa-check me-2"></i>Approve
              </button>
              <button class="btn btn-danger btn-lg" @click="submitVote('reject')">
                <i class="fas fa-times me-2"></i>Reject
              </button>
            </div>
          </div>
        </div>
  
        <!-- Attachments Section -->
        <div class="attachments-card">
          <div class="card-header">
            <h4><i class="fas fa-paperclip me-2"></i>Attachments</h4>
          </div>
          <div class="card-body">
            <div class="attachments-grid">
              <div class="attachment-item">
                <h6>Application Photo</h6>
                <div class="attachment-image">
                  <img :src="getImageUrl(application.photoAttachment)" class="img-fluid" alt="Application Photo">
                </div>
              </div>
              <div v-if="application.votePhotoAttachment" class="attachment-item">
                <h6>Vote Screenshot</h6>
                <div class="attachment-image">
                  <img :src="getImageUrl(application.votePhotoAttachment)" class="img-fluid" alt="Vote Screenshot">
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Comments Section -->
        <div class="comments-card">
          <div class="card-header">
            <h4><i class="fas fa-comments me-2"></i>Admin Comments</h4>
          </div>
          <div class="card-body">
            <!-- No Comments State -->
            <div v-if="comments.length === 0" class="no-comments">
              <i class="far fa-comment-dots text-white mb-3" style="font-size: 2rem;"></i>
              <p class="text-white">No comments yet. Be the first to add one!</p>
            </div>
  
            <!-- Comments List -->
            <div v-else class="comments-list">
              <div v-for="(comment, index) in comments" :key="index" class="comment-item">
                <div class="comment-header">
                  <div class="comment-author">
                    <img
                      :src="comment.profilePhoto ? getFullProfilePhotoUrl(comment.profilePhoto) : commentAvatarUrl(comment.adminUsername)"
                      class="comment-avatar"
                      alt="Comment Avatar"
                    />
                    <div class="author-info">
                      <strong class="author-name">{{ comment.adminUsername }}</strong>
                      <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
                    </div>
                  </div>
                  <button v-if="currentUser && comment.adminUsername === currentUser.username" 
                    class="btn btn-outline-danger btn-sm delete-comment" 
                    @click="removeComment(comment._id)"
                    title="Delete comment">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="comment-content">
                  <p>{{ comment.comment }}</p>
                  <div v-if="comment.photoAttachment" class="comment-attachment">
                    <img :src="getCommentImageUrl(comment.photoAttachment)" class="img-fluid" alt="Comment attachment" />
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Add Comment Form -->
            <div v-if="currentUser && (currentUser.role === 'superadmin' || currentUser.role === 'admin')" class="comment-form">
              <h5>Add a Comment</h5>
              <form @submit.prevent="submitComment">
                <div class="form-group">
                  <textarea 
                    v-model="newCommentText" 
                    class="form-control comment-textarea" 
                    placeholder="Write your comment here..."
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-image me-2"></i>Add Image (Optional)
                  </label>
                  <input 
                    type="file" 
                    @change="handleFileUpload" 
                    class="form-control file-input"
                    accept="image/*"
                  >
                </div>
  
                <div v-if="commentPreview" class="image-preview">
                  <img :src="commentPreview" class="preview-image" alt="Image preview">
                  <button type="button" class="btn btn-sm btn-outline-danger remove-preview" @click="removePreview">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
  
                <button class="btn btn-primary submit-comment" type="submit">
                  <i class="fas fa-paper-plane me-2"></i>Submit Comment
                </button>
              </form>
            </div>
            
            <div v-else class="login-required">
              <i class="fas fa-lock text-muted mb-2"></i>
              <p class="text-muted">You must be logged in as an admin to comment on applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import configuration from "../config/config";
import { getCurrentUser } from "../config/userLogic";
import { eventBus } from "../router";
import axiosInstance from '../config/axios'

export default {
  data() {
    return {
      application: null,
      user: {},
      votes: [],
      comments: [],
      newCommentText: "",
      currentUser: {
        role: '',
      },
      commentImage: null,
      loading: true,
      hasVoted: false,
      approvedVotes: 0,
      rejectedVotes: 0,
      commentPreview: null,
    };
  },
  methods: {
    getFullProfilePhotoUrl(path) {
      if (!path) return null;
      return `https://zm-westcstrike.com/${path}`;
    },
    async fetchApplication() {
      try {
        const response = await axiosInstance.get(`/admin/get-applications/${this.$route.params.id}`);
        this.application = response.data.data;

        // Fetch user data
        this.fetchUser(this.application.userId);

        // Fetch votes & comments
        this.fetchVotes();
        this.fetchComments();
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        this.loading = false;
      }
    },

    async role(){
      const user = await getCurrentUser();
      if(user){
        this.currentUser = user;
      }
    },

    async fetchUser(userId) {
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        this.user = response.data.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    async fetchVotes() {
      try {
        const response = await axiosInstance.get(`/admin/votes/${this.$route.params.id}`);
        this.votes = response.data.votes;
        
        // ✅ Count approve/reject votes
        this.approvedVotes = this.votes.filter(v => v.vote === "approve").length;
        this.rejectedVotes = this.votes.filter(v => v.vote === "reject").length;

        // ✅ Check if user has already voted
        this.currentUser = await getCurrentUser();
        if (this.currentUser) {
          this.hasVoted = this.votes.some(vote => vote.adminUsername == this.currentUser.username);
        } else {
          this.hasVoted = true;
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    },

    async fetchComments() {
      try {
        const response = await axiosInstance.get(`/admin/comments/${this.$route.params.id}`);
        this.comments = response.data.comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },

    async submitVote(voteType) {
      const toast = useToast();
      try {
        await axiosInstance.post("/admin/vote", {
          applicationId: this.$route.params.id,
          vote: voteType
        }, configuration());

        this.hasVoted = true;
        this.fetchVotes();
        toast.success("Vote submitted successfully.");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error submitting vote.");
      }
    },

    async submitComment() {
      const toast = useToast();
      const formData = new FormData();
      formData.append("applicationId", this.$route.params.id);
      formData.append("comment", this.newCommentText);
      if (this.commentImage) {
        formData.append("photoAttachment", this.commentImage);
      }

      try {
        await axiosInstance.post("/admin/comment", formData, configuration());
        this.newCommentText = "";
        this.commentImage = null;
        this.commentPreview = null;
        this.fetchComments();
        toast.success("Comment submitted successfully.");
      } catch (error) {
        toast.error("Error submitting comment.");
        console.error("Error submitting comment:", error);
      }
    },

    async finishApplication() {
      const toast = useToast();
      try {
        await axiosInstance.post(`/admin/finish/${this.$route.params.id}`, {}, configuration());
        this.fetchApplication();
        toast.success("Application status updated based on votes.");
      } catch (error) {
        console.error("Error finishing application:", error);
        toast.error(error.response?.data?.message || "Error finishing application.");
      }
    },

    async updateApplicationStatus(status) {
      const toast = useToast();
      try {
        await axiosInstance.post(`/admin/change-status/${this.$route.params.id}`, { status }, configuration());
        this.fetchApplication();
        toast.success(`Application status updated to ${status}.`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error updating application status.");
      }
    },

    async removeComment(commentId) {
      const toast = useToast();
      const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
      
      if (!isConfirmed) {
        return; // Stop execution if the user cancels
      }

      try {
        await axiosInstance.delete(`/admin/comment/${this.$route.params.id}/${commentId}`, configuration());
        this.fetchComments();
        toast.success("Comment deleted successfully.");
      } catch (error) {
        toast.error("Error deleting comment.");
        console.error("Error deleting comment:", error);
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        this.commentImage = file;
        this.commentPreview = URL.createObjectURL(file); // ✅ Show Preview Before Submission
      } else {
        this.commentPreview = null;
      }
    },

    removePreview() {
      this.commentPreview = null;
      this.commentImage = null;
      // Reset the file input
      const fileInput = document.querySelector('.file-input');
      if (fileInput) {
        fileInput.value = '';
      }
    },

    getImageUrl(path) {
      const cleanPath = path.replace(/^\/app\//, '');
      return `https://zm-westcstrike.com/${cleanPath}`;
    },
    getCommentImageUrl(commentPath) {
      const cleanPath = commentPath.replace(/^\/app\//, '');
      return `https://zm-westcstrike.com/${cleanPath}`;
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    formatDateLong(date) {
    if (!date) return "";

    const options = {
      weekday: "long", // "Sunday"
      day: "numeric", // "3"
      month: "long", // "March"
      hour: "2-digit", // "10"
      minute: "2-digit", // "30"
      second: "2-digit", // "45"
      hour12: true, // 12-hour format with AM/PM
    };

    return new Date(date).toLocaleString("en-US", options);
  },
  commentAvatarUrl(username) {
      const name = encodeURIComponent(username);
      return `https://ui-avatars.com/api/?rounded=true&name=${name}&size=32&background=0D8ABC&color=fff`;
    },

    statusClass(status) {
      return {
        "text-warning": status === "pending",
        "text-success": status === "approved",
        "text-danger": status === "rejected"
      };
    }
  },
  computed: {
    avatarUrl() {
      const name = encodeURIComponent(this.user.username);
      return `https://ui-avatars.com/api/?rounded=true&name=${name}&background=0D8ABC&color=fff`;
    }
  },
  mounted() {
    this.fetchApplication();

    eventBus.on("userLoggedIn", async () => {
      console.log("🔥 userLoggedIn event received in Header.vue");
      await this.role(); // this.loggedIn updates automatically now
    });
  },
  beforeUnmount() {
    // ✅ Remove event listener to prevent memory leaks
    eventBus.off("userLoggedIn");
  },
};
</script>

<style scoped>
/* Main Container */
.admin-application-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.page-title {
  color: white;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.action-dropdown {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.action-dropdown:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Loading and Not Found States */
.loading-container, .not-found-container {
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

/* Application Content */
.application-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Applicant Card */
.applicant-card {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.applicant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.applicant-profile {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-image-container {
  position: relative;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
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

.status-badge.text-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white !important;
}

.status-badge.text-success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white !important;
}

.status-badge.text-danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white !important;
}

.applicant-details h3 {
  color: white;
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.applicant-date {
  color: #bdc3c7;
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.closed-info {
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 600;
}

.closed-by {
  color: #f39c12;
  font-weight: 700;
}

/* Details Card */
.details-card, .voting-card, .attachments-card, .comments-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  padding: 20px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h4 {
  color: white;
  margin: 0;
  font-weight: 600;
  font-size: 1.3rem;
}

.card-body {
  padding: 30px;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.detail-item i {
  color: #3498db;
  font-size: 1.1rem;
  margin-right: 15px;
  width: 20px;
  text-align: center;
}

.detail-label {
  color: #bdc3c7;
  font-weight: 600;
  margin-right: 15px;
  min-width: 120px;
}

.detail-value {
  color: white;
  font-weight: 500;
}

.keyword-info {
  margin-left: 15px;
  font-size: 0.9rem;
}

.keyword {
  background: rgba(52, 152, 219, 0.2);
  color: #3498db;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

/* Voting Section */
.vote-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
}

.vote-stat {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 15px;
  min-width: 150px;
  transition: all 0.3s ease;
}

.vote-stat.approved {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.2), rgba(46, 204, 113, 0.2));
  border: 2px solid rgba(39, 174, 96, 0.3);
}

.vote-stat.rejected {
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.2), rgba(192, 57, 43, 0.2));
  border: 2px solid rgba(231, 76, 60, 0.3);
}

.vote-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.vote-stat.approved .vote-icon {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.vote-stat.rejected .vote-icon {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.vote-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vote-count {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.vote-label {
  color: #bdc3c7;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.voting-actions {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.voting-actions .btn {
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.voting-actions .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Attachments */
.attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.attachment-item h6 {
  color: #bdc3c7;
  margin-bottom: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.attachment-image {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.attachment-image img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.attachment-image:hover img {
  transform: scale(1.05);
}

/* Comments Section */
.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.comment-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.comment-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.comment-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.author-name {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.comment-date {
  color: #6c757d;
  font-size: 0.9rem;
  display: block;
  margin-top: 5px;
}

.delete-comment {
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.delete-comment:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.1);
}

.comment-content p {
  color: white;
  margin-bottom: 15px;
  line-height: 1.6;
}

.comment-attachment {
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;
}

.comment-attachment img {
  width: 100%;
  height: auto;
}

/* Comment Form */
.comment-form {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-form h5 {
  color: white;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  color: #bdc3c7;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

.comment-textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  padding: 15px;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
}

.comment-textarea:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  outline: none;
}

.comment-textarea::placeholder {
  color: #6c757d;
}

.file-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  padding: 12px 15px;
  transition: all 0.3s ease;
}

.file-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  outline: none;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin: 20px 0;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.remove-preview {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.remove-preview:hover {
  background: #c82333;
  transform: scale(1.1);
}

.submit-comment {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.submit-comment:hover {
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.login-required {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-application-container {
    padding: 15px;
  }
  
  .page-header {
    padding: 20px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .vote-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .attachments-grid {
    grid-template-columns: 1fr;
  }
  
  .applicant-profile {
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

.application-content > * {
  animation: fadeInUp 0.6s ease-out;
}

.application-content > *:nth-child(2) {
  animation-delay: 0.1s;
}

.application-content > *:nth-child(3) {
  animation-delay: 0.2s;
}

.application-content > *:nth-child(4) {
  animation-delay: 0.3s;
}

.application-content > *:nth-child(5) {
  animation-delay: 0.4s;
}
</style>