<template>
    <div class="mt-5">
      <h2 class="text-black mb-4 fw-bolder">User Management</h2>
  
      <!-- Search -->
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="search" placeholder="Search by username or email...">
        <button class="btn btn-primary" @click="fetchUsers">Search</button>
      </div>
  
      <!-- Table -->
       <div class="table-responsive">
           <table class="table table-dark table-hover">
             <thead>
               <tr>
                 <th>Username</th>
                 <th>Email</th>
                 <th>Role</th>
                 <th>VIP</th>
                 <th>Suspended</th>
                 <th>AP</th>
                <th>Points</th>
                <th>Level</th>
                <th>EXP</th>
                 <th class="text-center">Actions</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="user in users" :key="user._id">
                 <td>{{ user.username }}</td>
                 <td>{{ user.email }}</td>
                 <td>{{ user.role }}</td>
                 <td>{{ user.isVIP ? '✅' : '❌' }}</td>
                 <td>{{ user.suspended ? '✅' : '❌' }}</td>
                 <td>{{ user.AP || 0 }}</td>
                <td>{{ user.POINTS || 0 }}</td>
                <td>{{ user.LEVEL || 0 }}</td>
                <td>{{ user.EXP || 0 }}</td>
                 <td>
                   <button class="btn btn-sm btn-warning me-2 mb-2" @click="openEditModal(user)"><i class="fa fa-edit"></i> Edit</button>
                   <button class="btn btn-sm btn-danger mb-2" @click="deleteUser(user.ID)">
                    <i class="fa fa-trash"></i> Delete
                  </button>
                 </td>
               </tr>
             </tbody>
           </table>
       </div>
  
      <nav v-if="totalPages > 1" class="pagination-container">
      <div class="d-flex justify-content-between align-items-center numbers-row">
        <!-- Previous Button -->
        <ul class="pagination mb-0 ms-3">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
              <span class="d-none d-sm-inline">previous</span>
              <span class="d-sm-none">«</span> <!-- Compact icon for small screens -->
            </button>
          </li>
        </ul>

        <!-- Numbered Pagination -->
        <ul class="pagination mb-0">
          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button
              class="page-link"
              v-if="page !== '...'"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
            <span v-else class="page-link">...</span>
          </li>
        </ul>

        <!-- Next Button -->
        <ul class="pagination mb-0 me-3">
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
              <span class="d-none d-sm-inline">next</span>
              <span class="d-sm-none">»</span> <!-- Compact icon for small screens -->
            </button>
          </li>
        </ul>
      </div>
    </nav>
  
      <!-- Edit Modal -->
      <div class="modal fade" id="editUserModal" ref="myModal1" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">Edit Registered User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="editUser.username" :disabled="loadingSave">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="editUser.email" :disabled="loadingSave">
              </div>
              <div class="form-group">
                <label>Role</label>
                <select class="form-control" v-model="editUser.role" :disabled="loadingSave">
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="editUser.isVIP" :disabled="loadingSave">
                <label class="form-check-label">VIP</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="editUser.suspended" :disabled="loadingSave">
                <label class="form-check-label">Suspended</label>
              </div>
              <div class="form-group">
                <label>Hours Played</label>
                <input type="number" class="form-control" v-model="editUser.hoursPlayed" :disabled="loadingSave">
              </div>
              <div class="form-group mt-2">
                <label>
                  + Ammo Packs 
                  <small class="text-white" v-if="editUser.AP !== undefined">(Current: {{ editUser.AP }})</small>
                </label>
                <input type="number" class="form-control" v-model.number="editUser.apAdd" :disabled="loadingSave">
              </div>

              <div class="form-group mt-2">
                <label>
                  + Points 
                  <small class="text-white" v-if="editUser.POINTS !== undefined">(Current: {{ editUser.POINTS }})</small>
                </label>
                <input type="number" class="form-control" v-model.number="editUser.pointsAdd" :disabled="loadingSave">
              </div>

              <div class="form-group mt-2">
                <label>
                  + Level 
                  <small class="text-white" v-if="editUser.LEVEL !== undefined">(Current: {{ editUser.LEVEL }})</small>
                </label>
                <input type="number" class="form-control" v-model.number="editUser.levelAdd" :disabled="loadingSave">
              </div>

              <div class="form-group mt-2">
                <label>
                  + EXP 
                  <small class="text-white" v-if="editUser.EXP !== undefined">(Current: {{ editUser.EXP }})</small>
                </label>
                <input type="number" class="form-control" v-model.number="editUser.expAdd" :disabled="loadingSave">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button 
                type="button" 
                class="btn btn-success"
                :disabled="loadingSave"
                @click="saveChanges"
              >
                <span v-if="loadingSave" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';
import configuration from '../config/config';
  import { Modal } from 'bootstrap';

  export default {
    data() {
      return {
        users: [],
        search: '',
        currentPage: 1,
        totalPages: 1,
        limit: 10,
        editUser: {},
        loadingSave: false
      };
    },
    computed: {
      visiblePages() {
        const totalPages = this.totalPages;
        const currentPage = this.currentPage;

        if (totalPages <= 7) {
          // Show all pages if total pages are 7 or less
          return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [];
        if (currentPage <= 4) {
          // Show first 5 pages and '...'
          pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
          // Show '...' and last 5 pages
          pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          // Show '...', current page range, and '...'
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }

        return pages;
      },
    },
    methods: {
      async fetchUsers() {
        try {
          const config = configuration();
          const res = await this.$axios.get(`/user/users?page=${this.currentPage}&limit=${this.limit}&search=${this.search}`, config);
          this.users = res.data.data;
          this.totalPages = res.data.pagination.totalPages;
          this.currentPage = res.data.pagination.currentPage;
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.fetchUsers();
        }
      },
      openEditModal(user) {
        this.editUser = { 
          ...user, 
          apAdd: 0,
          pointsAdd: 0,
          levelAdd: 0,
          expAdd: 0 
      }; 
        this.modal.show(); // show modal
      },
      async saveChanges() {
        const toast = useToast()
        this.loadingSave = true;
        try {
          const config = configuration();

          // 1. Update basic user info
          await this.$axios.put(`/user/users/${this.editUser.ID}`, this.editUser, config);

          // 2. If any stats are modified, call RCON update endpoint
          const { apAdd, pointsAdd, levelAdd, expAdd } = this.editUser;
          if (apAdd || pointsAdd || levelAdd || expAdd) {
            await this.$axios.post(
              `/rcon/updatePlayerData`,
              {
                playerName: this.editUser.username,
                ammoPacksToAdd: apAdd,
                pointsToAdd: pointsAdd,
                levelToAdd: levelAdd,
                expToAdd: expAdd
              },
              config
            );
          }

          this.modal.hide();
          this.fetchUsers();
          toast.success("User updated successfully.");
        } catch (error) {
          console.error("Error updating user:", error);
          toast.error(error.response?.data?.message || "Failed to update user.");
        } finally {
          this.loadingSave = false;
        }
      },
      async deleteUser(id) {
        const toast = useToast()
        const confirmed = confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
          const config = configuration();
          await this.$axios.delete(`/user/users/${id}`, config);
          this.fetchUsers();
          toast.success("User deleted successfully.");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        }
      }
    },
    mounted() {
      this.modal = new Modal(this.$refs.myModal1);
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .table th,
  .table td {
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    .pagination-container {
      justify-content: center; /* Center pagination on smaller devices */
    }
  }

  @media (max-width: 480px) {
    .pagination-container {
      align-items: start !important;
    }
    
    .numbers-row {
      justify-content: start !important;
    }
  }

  .modal-body small.text-white {
    font-weight: normal;
    font-size: 0.85rem;
    margin-left: 4px;
  }

.pagination .page-item .page-link {
  color: #fff;
  background-color: #222; /* Dark background for pagination buttons */
  border-color: #444;
  transition: background-color 0.2s ease-in-out;
}

.pagination .page-item .page-link:hover {
  background-color: #ff8000; /* Highlighted background on hover */
  border-color: #ff8000;
}

.pagination .page-item.active .page-link {
  background-color: #ff8000; /* Active page button */
  border-color: #ff8000;
  color: #fff;
}

.pagination .page-item.disabled .page-link {
  color: #666;
  background-color: #333;
  border-color: #444;
  pointer-events: none;
}

.pagination-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
  