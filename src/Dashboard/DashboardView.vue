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
  
      <!-- Pagination -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
  
      <!-- Edit Modal -->
      <div class="modal fade" id="editUserModal" ref="myModal1" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">Edit User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="editUser.username">
              </div>
              <div class="form-group">
                <label>Role</label>
                <select class="form-control" v-model="editUser.role">
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="editUser.isVIP">
                <label class="form-check-label">VIP</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="editUser.suspended">
                <label class="form-check-label">Suspended</label>
              </div>
              <div class="form-group">
                <label>Hours Played</label>
                <input type="number" class="form-control" v-model="editUser.hoursPlayed">
              </div>
              <div class="form-group mt-2">
                <label>+ Ammo Packs</label>
                <input type="number" class="form-control" v-model.number="editUser.apAdd">
              </div>
              <div class="form-group mt-2">
                <label>+ Points</label>
                <input type="number" class="form-control" v-model.number="editUser.pointsAdd">
              </div>
              <div class="form-group mt-2">
                <label>+ Level</label>
                <input type="number" class="form-control" v-model.number="editUser.levelAdd">
              </div>
              <div class="form-group mt-2">
                <label>+ EXP</label>
                <input type="number" class="form-control" v-model.number="editUser.expAdd">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" @click="saveChanges">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
        editUser: {}
      };
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
          this.$toast.success("User updated successfully.");
        } catch (error) {
          console.error("Error updating user:", error);
          this.$toast.error("Failed to update user.");
        }
      },
      async deleteUser(id) {
        const confirmed = confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
          const config = configuration();
          await this.$axios.delete(`/user/users/${id}`, config);
          this.fetchUsers();
          this.$toast.success("User deleted successfully.");
        } catch (error) {
          console.error("Error deleting user:", error);
          this.$toast.error("Failed to delete user.");
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
  </style>
  