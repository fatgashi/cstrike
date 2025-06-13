<template>
  <div class="container">
    <br>
    <h2 class="text-center text-white mb-3 fw-bolder">Apply for Admin Promotion</h2>
    <div v-if="loading" class="text-center text-white">Loading...</div>
    <div v-if="!['admin', 'superadmin'].includes(currentUser?.role)" class="alert alert-danger text-center mt-4">
  🚫 You are not part of the staff team. Only Admins and Superadmins can view promotion applications.
    </div>
    <div v-else class="card application-form-card">
      <div class="card-body text-white">
        <form @submit.prevent="submitApplication">

          <div class="mb-3">
            <label class="form-label">Nickname</label>
            <input disabled type="text" v-model="application.nickname" class="form-control" required placeholder="Your current nickname">
          </div>

          <div class="mb-3">
            <label class="form-label">Actual Rank</label>
            <select v-model="application.actualRank" class="form-select" required>
              <option value="" disabled>Select your current rank</option>
              <option v-for="rank in rankOptions" :key="rank" :value="rank">
                {{ rank }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Steam Status</label>
            <input type="text" v-model="application.steamStatus" class="form-control" required placeholder="e.g. Steam ON / OFF">
          </div>

          <div class="mb-3">
            <label class="form-label">Attach a Photo of Your Activity</label>
            <input type="file" @change="handleFileUpload" class="form-control bg-dark text-white" required>
          </div>

          <div v-if="photoPreview" class="my-3">
            <img :src="photoPreview" class="img-fluid img-preview" alt="Activity Preview">
          </div>

          <div class="text-center mt-4">
            <button type="submit" :disabled="!photoAttachment" class="btn btn-success fw-bold">🚀 Submit Promotion Request</button>
          </div>

        </form>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import configuration from "../config/config";

export default {
  data() {
    return {
      application: {
        nickname: this.$store.state.user.username || "",
        actualRank: "",
        steamStatus: ""
      },
      currentUser: this.$store.state.user,
      rankOptions: [
        "Administrator",
        "Moderator",
        "Semi-Elder",
        "Elder",
        "Pre-Manager",
        "Co-Owner",
        "Owner",
        "Team-Leader",
        "Head of ZM"
      ],
      loading: false,
      photoAttachment: null,
      photoPreview: null
    };
  },
  methods: {
    async submitApplication() {
      const toast = useToast();
      this.loading = true;

      const formData = new FormData();
      formData.append("nickname", this.application.nickname);
      formData.append("actualRank", this.application.actualRank);
      formData.append("steamStatus", this.application.steamStatus);

      if (this.photoAttachment) {
        formData.append("activityPhoto", this.photoAttachment);
      }

      try {
        await this.$axios.post("/admin-promotion/apply", formData, configuration());
        this.$router.push("/forum/admin-promotions");
        toast.success("Promotion application submitted successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.photoAttachment = file;
        this.photoPreview = URL.createObjectURL(file);
      }
    }
  }
};
</script>

<style scoped>
.application-form-card {
  max-width: 600px;
  margin: auto;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.img-preview {
  border-radius: 8px;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #444;
}
</style>
