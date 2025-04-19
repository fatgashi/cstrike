<template>
  <div class="container">
    <br>
    <h2 v-if="user" class="text-start text-white mb-3 fw-bolder">Admin Request: {{ user.username }}</h2>
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

    <div v-if="currentUser && currentUser.role === 'superadmin'" class="dropdown">
      <button class="btn dropdown-toggle" style="background-color: #1a1a1a;" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa fa-ellipsis-h text-white" aria-hidden="true"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li><button class="btn dropdown-item" @click="finishApplication">🔄 Finish Application</button></li>
        <li><button class="btn dropdown-item text-success" @click="updateApplicationStatus('approved')">✅ Approve</button></li>
        <li><button class="btn dropdown-item text-danger" @click="updateApplicationStatus('rejected')">❌ Reject</button></li>
      </ul>
    </div>
</div>
    </div>

    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-else-if="!application" class="text-center">Application not found.</div>

    <div v-else class="card details-card">
      <div class="card-body text-white">
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Nickname:</strong> {{ application.nickname }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Country:</strong> {{ application.country }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Experience:</strong> {{ application.experience }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Hours Played:</strong> {{ application.hoursPlayed }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Activity Schedule:</strong> {{ application.activitySchedule }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Joined Discord Server?:</strong> {{ application.joinedDiscord ? "Yes" : "No" }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Use TeamSpeak?:</strong> {{ application.useTeamSpeak ? "Yes" : "No" }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Did you read the rules?:</strong> {{ application.rulesRead ? "Yes" : "No" }}</p>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> <strong>Vote on TeamSpeak Community Server?:</strong> {{ application.voteTeamSpeak ? "Yes" : "No" }}</p>
        <p><strong>Status:</strong> <span class="fw-bolder" :class="statusClass(application.status)">{{ application.status }}</span></p>

        <!-- ✅ Approved/Rejected Counter -->
         <hr class="bg-white">
        <h5 class="fw-bolder">Vote Count:</h5>
        <p>✅ Approved: <strong>{{ approvedVotes }}</strong> | ❌ Rejected: <strong>{{ rejectedVotes }}</strong></p>

        <!-- ✅ Display Attachments -->
        <hr class="bg-white">
        <h5>Attachments:</h5>
        <div class="row">
          <div class="col-12 col-md-6">
            <img :src="getImageUrl(application.photoAttachment)" class="img-fluid mb-2" alt="Application Photo">
          </div>
          <div class="col-12 col-md-6" v-if="application.votePhotoAttachment">
            <img :src="getImageUrl(application.votePhotoAttachment)" class="img-fluid" alt="Vote Screenshot">
          </div>
        </div>

        <div v-if="!hasVoted && currentUser && (currentUser.role === 'superadmin' || currentUser.role === 'admin') && application.status === 'pending'">
          <hr class="bg-white">
          <h5>Vote on Application</h5>
          <div class="vote-buttons">
            <button class="btn btn-success me-2" @click="submitVote('approve')">✅ Approve</button>
            <button class="btn btn-danger" @click="submitVote('reject')">❌ Reject</button>
          </div>
        </div>

        <!-- ✅ Comments Section -->
        <hr class="bg-white">
        <h5 class="text-center fw-bolder">Admin Comments</h5>
        <div v-if="comments.length === 0" class="text-white">No comments yet.</div>
        <div v-for="(comment, index) in comments" :key="index" class="comment">
          <hr class="bg-white">
          <div class="comment-header">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="d-flex align-items-center">
                  <img
                    :src="comment.profilePhoto ? getFullProfilePhotoUrl(comment.profilePhoto) : commentAvatarUrl(comment.adminUsername)"
                    class="profile-photo-comments"
                    alt="CommentAvatar"
                  />
                  <div class="d-flex flex-column ms-2">
                    <strong>{{ comment.adminUsername }}</strong>
                    <span class="text-white">({{ formatDate(comment.createdAt) }})</span>
                  </div>
                </div>
              </div>

              <!-- ✅ Compare by username instead of _id -->
              <button v-if="currentUser && comment.adminUsername === currentUser.username && application.status === 'pending'" 
                class="btn bg-danger" 
                @click="removeComment(comment._id)">
                <i class="fa fa-trash-o text-white" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <p>{{ comment.comment }}</p>

          <div v-if="comment.photoAttachment" class="row">
            <div class="col-12 col-md-6">
              <img :src="getCommentImageUrl(comment.photoAttachment)" class="img-fluid" />
            </div>
          </div>
        </div>

        <!-- ✅ Add Comment Form -->
        <hr class="bg-white">
        <div class="mt-3" v-if="application.status === 'pending' && currentUser && (currentUser.role === 'superadmin' || currentUser.role === 'admin')">
          <form @submit.prevent="submitComment" class="mb-3">
            <textarea 
              v-model="newCommentText" 
              class="form-control mb-2 bg-dark text-white" 
              placeholder="Write a comment..."
              required
            ></textarea>
  
            <input 
              type="file" 
              @change="handleFileUpload" 
              class="form-control mb-2 bg-dark text-white"
            >
  
            <div v-if="commentPreview" class="my-3 row">
              <div class="col-12 col-md-6">
                <img :src="commentPreview" class="img-fluid comment-img-preview" alt="Comment Image Preview">
              </div>
            </div>
  
            <button 
              class="btn btn-primary" 
              type="submit"
            >
              Submit Comment
            </button>
          </form>
        </div>
        <div v-else-if="application.status !== 'pending'">
          This application is already {{ application.status }} and you can't comment!.
        </div>
        <div v-else>
          You should be logged in and as Admin to comment on this application.
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
import configuration from "../config/config";
import { getCurrentUser } from "../config/userLogic";

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
        const response = await this.$axios.get(`/admin/get-applications/${this.$route.params.id}`);
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

    async fetchUser(userId) {
      try {
        const response = await this.$axios.get(`/user/${userId}`);
        this.user = response.data.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    async fetchVotes() {
      try {
        const response = await this.$axios.get(`/admin/votes/${this.$route.params.id}`);
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
        const response = await this.$axios.get(`/admin/comments/${this.$route.params.id}`);
        this.comments = response.data.comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },

    async submitVote(voteType) {
      try {
        await this.$axios.post("/admin/vote", {
          applicationId: this.$route.params.id,
          vote: voteType
        }, configuration());

        this.hasVoted = true;
        this.fetchVotes();
        this.$toast.success("Vote submitted successfully.");
      } catch (error) {
        this.$toast.error(error.response?.data?.message || "Error submitting vote.");
      }
    },

    async submitComment() {
      const formData = new FormData();
      formData.append("applicationId", this.$route.params.id);
      formData.append("comment", this.newCommentText);
      if (this.commentImage) {
        formData.append("photoAttachment", this.commentImage);
      }

      try {
        await this.$axios.post("/admin/comment", formData, configuration());
        this.newCommentText = "";
        this.commentImage = null;
        this.commentPreview = null;
        this.fetchComments();
        this.$toast.success("Comment submitted successfully.");
      } catch (error) {
        this.$toast.error("Error submitting comment.");
        console.error("Error submitting comment:", error);
      }
    },

    async finishApplication() {
      try {
        await this.$axios.post(`/admin/finish/${this.$route.params.id}`, {}, configuration());
        this.fetchApplication();
        this.$toast.success("Application status updated based on votes.");
      } catch (error) {
        console.error("Error finishing application:", error);
        this.$toast.error(error.response?.data?.message || "Error finishing application.");
      }
    },

    async updateApplicationStatus(status) {
      try {
        await this.$axios.post(`/admin/change-status/${this.$route.params.id}`, { status }, configuration());
        this.fetchApplication();
        this.$toast.success(`Application status updated to ${status}.`);
      } catch (error) {
        this.$toast.error(error.response?.data?.message || "Error updating application status.");
      }
    },

    async removeComment(commentId) {
      const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
      
      if (!isConfirmed) {
        return; // Stop execution if the user cancels
      }

      try {
        await this.$axios.delete(`/admin/comment/${this.$route.params.id}/${commentId}`, configuration());
        this.fetchComments();
        this.$toast.success("Comment deleted successfully.");
      } catch (error) {
        this.$toast.error("Error deleting comment.");
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
  }
};
</script>

<style scoped>
  .details-card {
    background-color: #1a1a1a;
    border: 1px solid #333;
  }

  ::placeholder {
    color: white;
  }

  textarea {
    resize: none;
  }

  .dropdown-toggle::after {
    display: none;
  }
  .profile-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}

.profile-photo-comments {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}
</style>