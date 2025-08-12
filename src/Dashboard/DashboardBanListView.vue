<template>
    <div class="mt-4">
      <div class="card text-white" style="background-color: transparent !important;">
        <div class="card-header text-center fw-bolder">Ban List</div>
        <div class="card-body table-responsive">
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Steam ID</th>
                <th>IP</th>
                <th>Reason</th>
                <th>Unban Time</th>
                <th>Admin</th>
                <th>Admin Steam ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ban, index) in banList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ ban.name }}</td>
                <td>{{ ban.steamID || 'N/A' }}</td>
                <td>{{ ban.ip || 'N/A' }}</td>
                <td>{{ ban.reason }}</td>
                <td>{{ ban.unbanTime }}</td>
                <td>{{ ban.adminName }}</td>
                <td>{{ ban.adminSteamID || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Pagination -->
      <div class="d-flex justify-content-between mt-3">
        <button @click="prevPage" class="btn btn-secondary" :disabled="page === 1">Previous</button>
        <span>Page: {{ page }}</span>
        <button @click="nextPage" class="btn btn-secondary">Next</button>
      </div>
    </div>
  </template>
  
  <script>
import configuration from '../config/config';
import axiosInstance from '../config/axios'

  
  export default {
    data() {
      return {
        banList: [],
        page: 1
      };
    },
    methods: {
      async fetchBanList(retry = 3) {
        try {
          const config = configuration();
          const response = await axiosInstance.get(`/rcon/banlist?list=${this.page}`, config);
          if (response.data.success) {
            this.banList = response.data.banList;
          }
        } catch (error) {
          console.error("Error fetching ban list:", error);
  
          // If we receive a 500 error and have retries left, try the next or previous page
          if (error.response && error.response.status === 500 && retry > 0) {
            if (this.lastAction === "next") {
              this.page += 10;
            } else if (this.lastAction === "prev" && this.page > 1) {
              this.page -= 10;
            }
            this.fetchBanList(retry - 1); // Retry again with updated page
          }
        }
      },
      nextPage() {
        this.lastAction = "next";
        this.page += 10;
        this.fetchBanList();
      },
      prevPage() {
        if (this.page > 1) {
          this.lastAction = "prev";
          this.page -= 10;
          this.fetchBanList();
        }
      }
    },
    mounted() {
      this.fetchBanList();
    }
  };
  </script>
  
  <style scoped>
  .card {
        border-radius: 8px;
        border: 1px solid #3a3a3a;
    }
    .card-header {
        font-weight: bold;
        font-size: 1.1em;
        background-color: #ff1a1a;
    }
  </style>