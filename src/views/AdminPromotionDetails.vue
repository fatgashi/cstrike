<template>
  <div class="container">
    <br>
    <h2 v-if="user" class="text-start text-white mb-3 fw-bolder">Promotion Request: {{ user.username }}</h2>
    <div v-if="!['admin', 'superadmin'].includes(currUser?.role)" class="alert alert-danger text-center mt-4">
  🚫 You are not part of the staff team. Only Admins and Superadmins can view promotion applications.
    </div>
    <div v-else>
    <div v-if="application" class="p-3 mb-3" style="background-color: #1a1a1a;">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img v-if="user.profilePhoto" class="profile-photo" :src="getImageUrl(user.profilePhoto)" alt="Avatar">
          <img v-else :src="avatarUrl" alt="Avatar" style="width: 50px; height: 50px; object-fit: cover;">
          <div class="d-flex flex-column ms-3">
            <h6 class="text-white m-0">By: {{ user.username }}</h6>
            <p class="text-white m-0 small">{{ formatDate(application.createdAt) }}</p>
          </div>
        </div>

        <div v-if="currentUser?.role === 'superadmin' && application.status === 'pending'" class="dropdown">
          <button class="btn dropdown-toggle" style="background-color: #1a1a1a;" type="button" data-bs-toggle="dropdown">
            <i class="fa fa-ellipsis-h text-white"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><button class="dropdown-item" @click="finishApplication">🔄 Finish Application</button></li>
            <li><button class="dropdown-item text-success" @click="updateApplicationStatus('approved')">✅ Approve</button></li>
            <li><button class="dropdown-item text-danger" @click="updateApplicationStatus('rejected')">❌ Reject</button></li>
          </ul>
        </div>
        <div v-else-if="application.status !== 'pending'" class="text-white">
          Closed By: <span class="fw-bolder text-danger">{{ application.closedBy || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-else-if="!application" class="text-center text-white">Application not found.</div>

    <div v-else class="card details-card">
      <div class="card-body text-white">
        <p><strong>Nickname:</strong> {{ application.nickname }}</p>
        <p><strong>Actual Rank:</strong> {{ application.actualRank }}</p>
        <p><strong>Desired Rank:</strong> {{ application.desiredRank }}</p>
        <p><strong>Last UP Date:</strong> {{ formatDate(application.lastUpDate) }}</p>
        <p><strong>Steam Status:</strong> {{ application.steamStatus }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(application.status)">{{ application.status }}</span></p>

        <hr class="bg-white">
        <h5 class="fw-bolder">Vote Count:</h5>
        <p>✅ Approved: <strong>{{ approvedVotes }}</strong> | ❌ Rejected: <strong>{{ rejectedVotes }}</strong></p>

        <hr class="bg-white">
        <h5>Attachment:</h5>
        <div class="row">
          <div class="col-12 col-md-6">
            <img :src="getImageUrl(application.activityPhoto)" class="img-fluid mb-2" alt="Activity Screenshot">
          </div>
        </div>

        <div v-if="!hasVoted && ['admin', 'superadmin'].includes(currentUser?.role) && application.userId != currentUser.ID">
          <hr class="bg-white">
          <h5>Vote on Application</h5>
          <button class="btn btn-success me-2" @click="submitVote('approve')">✅ Approve</button>
          <button class="btn btn-danger" @click="submitVote('reject')">❌ Reject</button>
        </div>

        <hr class="bg-white">
        <h5 class="text-center fw-bolder">Admin Comments</h5>
        <div v-if="comments.length === 0" class="text-white">No comments yet.</div>

        <div v-for="comment in comments" :key="comment._id" class="comment">
          <hr class="bg-white">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                :src="comment.profilePhoto ? getImageUrl(comment.profilePhoto) : commentAvatarUrl(comment.adminUsername)"
                class="profile-photo-comments"
                alt="Comment Avatar"
              />
              <div class="d-flex flex-column ms-2">
                <strong>{{ comment.adminUsername }}</strong>
                <span class="text-white small">({{ formatDate(comment.createdAt) }})</span>
              </div>
            </div>

            <button v-if="comment.adminUsername === currentUser.username" class="btn bg-danger" @click="removeComment(comment._id)">
              <i class="fas fa-trash text-white"></i>
            </button>
          </div>

          <p>{{ comment.comment }}</p>

          <div v-if="comment.photoAttachment" class="row">
            <div class="col-12 col-md-6">
              <img :src="getImageUrl(comment.photoAttachment)" class="img-fluid" />
            </div>
          </div>
        </div>

        <hr class="bg-white">
        <div v-if="['admin', 'superadmin'].includes(currentUser?.role)">
          <form @submit.prevent="submitComment">
            <textarea v-model="newCommentText" class="form-control bg-dark text-white mb-2" required placeholder="Write a comment..."></textarea>
            <input type="file" @change="handleFileUpload" class="form-control bg-dark text-white mb-2">
            <div v-if="commentPreview" class="mb-3">
              <img :src="commentPreview" class="img-fluid comment-img-preview">
            </div>
            <button class="btn btn-primary" type="submit">Submit Comment</button>
          </form>
        </div>
        <div v-else>
          <p class="text-white mt-2">You must be an Admin to comment on this application.</p>
        </div>
      </div>
    </div>

    <br><br>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import configuration from "../config/config";
import { getCurrentUser } from "../config/userLogic";
import axiosInstance from '../config/axios'

export default {
  data() {
    return {
      application: null,
      user: {},
      votes: [],
      comments: [],
      currUser: this.$store.state.user,
      newCommentText: "",
      commentImage: null,
      commentPreview: null,
      currentUser: {},
      loading: true,
      hasVoted: false,
      approvedVotes: 0,
      rejectedVotes: 0,
    };
  },
  methods: {
    async fetchApplication() {
      try {
        const response = await axiosInstance.get(`/admin-promotion/get-applications/${this.$route.params.id}`);
        this.application = response.data.data;
        this.fetchUser(this.application.userId);
        this.fetchVotes();
        this.fetchComments();
      } catch (error) {
        console.error("Error loading promotion application:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchUser(userId) {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        this.user = res.data.data;
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    },
    async fetchVotes() {
      try {
        const res = await axiosInstance.get(`/admin-promotion/votes/${this.$route.params.id}`);
        this.votes = res.data.votes;
        this.approvedVotes = this.votes.filter(v => v.vote === "approve").length;
        this.rejectedVotes = this.votes.filter(v => v.vote === "reject").length;
        this.hasVoted = this.votes.some(v => v.adminUsername === this.currentUser.username);
      } catch (err) {
        console.error("Error fetching votes:", err);
      }
    },
    async fetchComments() {
      try {
        const res = await axiosInstance.get(`/admin-promotion/comments/${this.$route.params.id}`);
        this.comments = res.data.comments;
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    },
    async submitVote(type) {
      const toast = useToast();
      try {
        await axiosInstance.post(`/admin-promotion/vote`, {
          applicationId: this.$route.params.id,
          vote: type
        }, configuration());
        this.hasVoted = true;
        this.fetchVotes();
        toast.success("Vote submitted.");
      } catch (err) {
        toast.error(err.response?.data?.message || "Vote failed.");
      }
    },
    async submitComment() {
      const toast = useToast();
      const formData = new FormData();
      formData.append("applicationId", this.$route.params.id);
      formData.append("comment", this.newCommentText);
      if (this.commentImage) formData.append("photoAttachment", this.commentImage);

      try {
        await axiosInstance.post(`/admin-promotion/comment`, formData, configuration());
        this.newCommentText = "";
        this.commentImage = null;
        this.commentPreview = null;
        this.fetchComments();
        toast.success("Comment added.");
      } catch (err) {
        toast.error("Comment failed.");
      }
    },
    async removeComment(commentId) {
      const toast = useToast();
      const confirm = window.confirm("Delete this comment?");
      if (!confirm) return;
      try {
        await axiosInstance.delete(`/admin-promotion/comment/${this.$route.params.id}/${commentId}`, configuration());
        this.fetchComments();
        toast.success("Comment deleted.");
      } catch (err) {
        toast.error("Error deleting comment.");
      }
    },
    async finishApplication() {
      const toast = useToast();
      try {
        await axiosInstance.post(`/admin-promotion/finish/${this.$route.params.id}`, {}, configuration());
        this.fetchApplication();
        toast.success("Application status finalized.");
      } catch (err) {
        toast.error("Finish failed.");
      }
    },
    async updateApplicationStatus(status) {
      const toast = useToast();
      try {
        await axiosInstance.post(`/admin-promotion/change-status/${this.$route.params.id}`, { status }, configuration());
        this.fetchApplication();
        toast.success(`Status set to ${status}`);
      } catch (err) {
        toast.error("Update failed.");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.commentImage = file;
        this.commentPreview = URL.createObjectURL(file);
      }
    },
    getImageUrl(path) {
      return `https://zm-westcstrike.com/${path.replace(/^\/app\//, '')}`;
    },
    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleString();
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
      return `https://ui-avatars.com/api/?rounded=true&name=${encodeURIComponent(this.user.username || '')}&background=0D8ABC&color=fff`;
    }
  },
  async mounted() {
    this.currentUser = await getCurrentUser();
    this.fetchApplication();
  }
};
</script>

<style scoped>
.details-card {
  background-color: #1a1a1a;
  border: 1px solid #333;
}
.profile-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
.profile-photo-comments {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
textarea {
  resize: none;
}

::placeholder {
    color: white;
}

.dropdown-toggle::after {
  display: none;
}

.comment-img-preview {
  max-height: 300px;
  border: 1px solid #444;
  border-radius: 6px;
}
</style>
