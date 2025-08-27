<template>
    <div class="dashboard-view">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <h2 class="page-title">User Management</h2>
            <p class="page-subtitle">Manage registered users, roles, and permissions</p>
          </div>
          <div class="header-actions">
            <div class="search-container">
              <div class="search-input-group">
                <i class="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  class="search-input" 
                  v-model="search" 
                  placeholder="Search by username or email..."
                  @keyup.enter="fetchUsers"
                >
                <button class="search-btn" @click="fetchUsers">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ users.length }}</div>
            <div class="stat-label">Total Users</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon vip">
            <i class="fas fa-crown"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ vipUsersCount }}</div>
            <div class="stat-label">VIP Users</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon admin">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ adminUsersCount }}</div>
            <div class="stat-label">Admin Users</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon suspended">
            <i class="fas fa-ban"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ suspendedUsersCount }}</div>
            <div class="stat-label">Suspended</div>
          </div>
        </div>
      </div>

      <!-- Website Visits Tracking Section -->
      <div class="visits-section">
        <div class="visits-header">
          <h3 class="visits-title">
            <i class="fas fa-chart-line"></i>
            Website Visits Analytics
          </h3>
          <div class="date-selector">
            <label for="visit-date" class="date-label">Select Date:</label>
            <input 
              type="date" 
              id="visit-date" 
              class="date-input" 
              v-model="selectedDate"
              @change="fetchVisitStats"
            >
          </div>
        </div>
        
        <div class="visits-content">
          <div v-if="visitsLoading" class="visits-loading">
            <div class="loading-spinner">
              <div class="spinner"></div>
              <p>Loading visit statistics...</p>
            </div>
          </div>
          
          <div v-else-if="visitStats" class="visits-stats">
            <div class="visit-stat-card">
              <div class="visit-stat-icon">
                <i class="fas fa-calendar-day"></i>
              </div>
              <div class="visit-stat-content">
                <div class="visit-stat-number">{{ visitStats.date }}</div>
                <div class="visit-stat-label">Selected Date</div>
              </div>
            </div>
            
            <div class="visit-stat-card">
              <div class="visit-stat-icon total">
                <i class="fas fa-eye"></i>
              </div>
              <div class="visit-stat-content">
                <div class="visit-stat-number">{{ visitStats.totalVisits }}</div>
                <div class="visit-stat-label">Total Visits</div>
              </div>
            </div>
            
            <div class="visit-stat-card">
              <div class="visit-stat-icon unique">
                <i class="fas fa-user-friends"></i>
              </div>
              <div class="visit-stat-content">
                <div class="visit-stat-number">{{ visitStats.uniqueVisits }}</div>
                <div class="visit-stat-label">Unique Visits</div>
              </div>
            </div>
          </div>
          
          <div v-else class="visits-empty">
            <div class="empty-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <p>Select a date to view visit statistics</p>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="table-container">
        <div class="table-header">
          <h3 class="table-title">User List</h3>
          <div class="table-actions">
            <span class="results-count">Showing {{ users.length }} users</span>
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Stats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id" class="user-row">
                <td class="user-info">
                  <div class="user-avatar">
                    <img 
                      :src="`https://ui-avatars.com/api/?rounded=true&name=${encodeURIComponent(user.username)}&background=0D8ABC&color=fff`" 
                      :alt="user.username"
                      class="avatar-img"
                    >
                  </div>
                  <div class="user-details">
                    <div class="username">{{ user.username }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                </td>
                <td class="user-role">
                  <span class="role-badge" :class="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="user-status">
                  <div class="status-indicators">
                    <span class="status-badge vip" v-if="user.isVIP">
                      <i class="fas fa-crown"></i> VIP
                    </span>
                    <span class="status-badge suspended" v-if="user.suspended">
                      <i class="fas fa-ban"></i> Suspended
                    </span>
                    <span class="status-badge active" v-if="!user.suspended && !user.isVIP">
                      <i class="fas fa-check"></i> Active
                    </span>
                  </div>
                </td>
                <td class="user-stats">
                  <div class="stats-grid-small">
                    <div class="stat-item">
                      <span class="stat-label">AP</span>
                      <span class="stat-value">{{ user.AP || 0 }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Points</span>
                      <span class="stat-value">{{ user.POINTS || 0 }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Level</span>
                      <span class="stat-value">{{ user.LEVEL || 0 }}</span>
                    </div>
                  </div>
                </td>
                <td class="user-actions">
                  <button class="action-btn edit" @click="openEditModal(user)" title="Edit User">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn vip" @click="openVipModal(user)" title="Add VIP">
                    <i class="fas fa-crown"></i>
                  </button>
                  <button class="action-btn delete" @click="deleteUser(user.ID)" title="Delete User">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper" v-if="totalPages > 1">
          <div class="pagination-info">
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <nav class="pagination-nav">
            <button 
              class="pagination-btn prev" 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1"
            >
              <i class="fas fa-chevron-left"></i>
              <span>Previous</span>
            </button>
            
            <div class="pagination-numbers">
              <template v-for="(page, index) in visiblePages" :key="`page-${index}`">
                <button
                  v-if="page !== '...'"
                  class="pagination-number"
                  :class="{ active: page === currentPage }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
                <span v-else class="pagination-ellipsis">...</span>
              </template>
            </div>
            
            <button 
              class="pagination-btn next" 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
            >
              <span>Next</span>
              <i class="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEditModal" class="custom-modal-overlay" @click="closeEditModal">
        <div class="custom-modal" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-user-edit"></i>
              Edit User: {{ editUser.username }}
            </h5>
            <button type="button" class="btn-close" @click="closeEditModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="editUser.username" :disabled="loadingSave">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="text" class="form-control" v-model="editUser.email" :disabled="loadingSave">
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <select class="form-control" v-model="editUser.role" :disabled="loadingSave">
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Hours Played</label>
                <input type="number" class="form-control" v-model="editUser.hoursPlayed" :disabled="loadingSave">
              </div>
            </div>
            
            <div class="form-section">
              <h6 class="section-title">User Status</h6>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="editUser.isVIP" :disabled="loadingSave">
                  <span class="checkmark"></span>
                  <span class="checkbox-label">VIP Member</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="editUser.suspended" :disabled="loadingSave">
                  <span class="checkmark"></span>
                  <span class="checkbox-label">Suspended</span>
                </label>
              </div>
            </div>

            <div class="form-section">
              <h6 class="section-title">Add Resources</h6>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    Ammo Packs
                    <small class="current-value">(Current: {{ editUser.AP || 0 }})</small>
                  </label>
                  <input type="number" class="form-control" v-model.number="editUser.apAdd" :disabled="loadingSave">
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Points
                    <small class="current-value">(Current: {{ editUser.POINTS || 0 }})</small>
                  </label>
                  <input type="number" class="form-control" v-model.number="editUser.pointsAdd" :disabled="loadingSave">
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Level
                    <small class="current-value">(Current: {{ editUser.LEVEL || 0 }})</small>
                  </label>
                  <input type="number" class="form-control" v-model.number="editUser.levelAdd" :disabled="loadingSave">
                </div>
                <div class="form-group">
                  <label class="form-label">
                    EXP
                    <small class="current-value">(Current: {{ editUser.EXP || 0 }})</small>
                  </label>
                  <input type="number" class="form-control" v-model.number="editUser.expAdd" :disabled="loadingSave">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              :disabled="loadingSave"
              @click="saveChanges"
            >
              <span v-if="loadingSave" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <i class="fas fa-save"></i> Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- VIP Modal -->
      <div v-if="showVipModal" class="custom-modal-overlay" @click="closeVipModal">
        <div class="custom-modal" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-crown"></i>
              Add VIP: {{ vipUser.username }}
            </h5>
            <button type="button" class="btn-close" @click="closeVipModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="vipUser.username" :disabled="loadingVip" readonly>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password-input-group">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control password-input" 
                    v-model="vipUser.password" 
                    :disabled="loadingVip" 
                    placeholder="Enter VIP password"
                  >
                  <button 
                    type="button" 
                    class="password-toggle-btn" 
                    @click="togglePassword" 
                    :disabled="loadingVip"
                    :title="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <small class="form-text" v-if="!vipUser.password">Password is required</small>
              </div>
              <div class="form-group">
                <label class="form-label">VIP Type</label>
                <select class="form-control" v-model="vipUser.vipType" :disabled="loadingVip">
                  <option value="">Select VIP Type</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                </select>
                <small class="form-text" v-if="!vipUser.vipType">VIP Type is required</small>
              </div>
              <div class="form-group">
                <label class="form-label">VIP Expiry Date & Time</label>
                <input type="datetime-local" class="form-control" v-model="vipUser.expiryDate" :disabled="loadingVip">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeVipModal">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              :disabled="loadingVip || !vipUser.password || !vipUser.vipType || !vipUser.expiryDate"
              @click="addVip"
            >
              <span v-if="loadingVip" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <i class="fas fa-crown"></i> Add VIP
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useToast } from 'vue-toastification'
  import configuration from '../config/config'
  import axiosInstance from '../config/axios' // Use configured axios instance

  // Toast
  const toast = useToast()

  // Reactive Data
  const users = ref([])
  const search = ref('')
  const currentPage = ref(1)
  const totalPages = ref(1)
  const limit = ref(10)
  const editUser = ref({})
  const loadingSave = ref(false)
  const showEditModal = ref(false)
  const showVipModal = ref(false)
  const vipUser = ref({})
  const loadingVip = ref(false)
  const showPassword = ref(false)

  // Website Visits Tracking
  const selectedDate = ref('')
  const visitStats = ref(null)
  const visitsLoading = ref(false)

  // Computed Properties
  const vipUsersCount = computed(() => {
    return users.value.filter(user => user.isVIP).length
  })

  const adminUsersCount = computed(() => {
    return users.value.filter(user => user.role === 'admin' || user.role === 'superadmin').length
  })

  const suspendedUsersCount = computed(() => {
    return users.value.filter(user => user.suspended).length
  })

  const visiblePages = computed(() => {
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages = []
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }

    return pages
  })

  // Methods
  const getRoleClass = (role) => {
    switch (role) {
      case 'superadmin':
        return 'superadmin'
      case 'admin':
        return 'admin'
      case 'client':
        return 'client'
      default:
        return 'client'
    }
  }

  const fetchUsers = async () => {
    try {
      const config = configuration()
      const res = await axiosInstance.get(`/user/users?page=${currentPage.value}&limit=${limit.value}&search=${search.value}`, config)
      users.value = res.data.data
      totalPages.value = res.data.pagination.totalPages
      currentPage.value = res.data.pagination.currentPage
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to fetch users")
    }
  }

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      fetchUsers()
    }
  }

  const openEditModal = (user) => {
    editUser.value = { 
      ...user, 
      apAdd: 0,
      pointsAdd: 0,
      levelAdd: 0,
      expAdd: 0 
    }
    showEditModal.value = true
  }

  const closeEditModal = () => {
    showEditModal.value = false
    editUser.value = {}
  }

  const saveChanges = async () => {
    loadingSave.value = true
    try {
      const config = configuration()

      // 1. Update basic user info
      await axiosInstance.put(`/user/users/${editUser.value.ID}`, editUser.value, config)

      // 2. If any stats are modified, call RCON update endpoint
      const { apAdd, pointsAdd, levelAdd, expAdd } = editUser.value
      if (apAdd || pointsAdd || levelAdd || expAdd) {
        await axiosInstance.post(
          `/rcon/updatePlayerData`,
          {
            playerName: editUser.value.username,
            ammoPacksToAdd: apAdd,
            pointsToAdd: pointsAdd,
            levelToAdd: levelAdd,
            expToAdd: expAdd
          },
          config
        )
      }

      closeEditModal()
      await fetchUsers()
      toast.success("User updated successfully.")
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error(error.response?.data?.message || "Failed to update user.")
    } finally {
      loadingSave.value = false
    }
  }

  const deleteUser = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?")
    if (!confirmed) return

    try {
      const config = configuration()
      await axiosInstance.delete(`/user/users/${id}`, config)
      await fetchUsers()
      toast.success("User deleted successfully.")
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user.")
    }
  }

  const openVipModal = (user) => {
    // Set default expiry date to 30 days from now
    const defaultExpiry = new Date()
    defaultExpiry.setDate(defaultExpiry.getDate() + 30)
    const defaultExpiryString = defaultExpiry.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:MM
    
    vipUser.value = {
      ...user,
      password: '',
      vipType: '',
      expiryDate: defaultExpiryString
    }
    showPassword.value = false
    showVipModal.value = true
  }

  const closeVipModal = () => {
    showVipModal.value = false
    vipUser.value = {}
    showPassword.value = false
  }

  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  const addVip = async () => {
    // Validate expiry date is in the future
    const selectedDate = new Date(vipUser.value.expiryDate)
    const now = new Date()
    
    if (selectedDate <= now) {
      toast.error("VIP expiry date must be in the future")
      return
    }

    loadingVip.value = true
    try {
      const config = configuration()
      await axiosInstance.post(
        `/rcon/add-vip`,
        {
          name: vipUser.value.username,
          password: vipUser.value.password,
          vipType: vipUser.value.vipType,
          expiresISO: selectedDate.toISOString()
        },
        config
      )
      closeVipModal()
      await fetchUsers()
      toast.success("VIP added successfully.")
    } catch (error) {
      console.error("Error adding VIP:", error)
      toast.error(error.response?.data?.message || "Failed to add VIP.")
    } finally {
      loadingVip.value = false
    }
  }

  // Website Visits Tracking Methods
  const fetchVisitStats = async () => {
    if (!selectedDate.value) {
      visitStats.value = null
      return
    }

    visitsLoading.value = true
    try {
      const config = configuration()
      const response = await axiosInstance.get(`/tracker/stats?date=${selectedDate.value}`, config)
      
      if (response.data.ok) {
        visitStats.value = response.data
        toast.success("Visit statistics loaded successfully.")
      } else {
        visitStats.value = null
        toast.error("Failed to load visit statistics.")
      }
    } catch (error) {
      console.error("Error fetching visit statistics:", error)
      visitStats.value = null
      toast.error("Failed to fetch visit statistics.")
    } finally {
      visitsLoading.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    fetchUsers()
    
    // Initialize date to today and fetch visit stats
    const today = new Date().toISOString().split('T')[0]
    selectedDate.value = today
    fetchVisitStats()
  })
  </script>
  
  <style scoped>
  .dashboard-view {
    padding: 0;
  }

  /* Page Header */
  .page-header {
    background: white;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 24px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    flex-wrap: wrap;
  }

  .header-left {
    flex: 1;
    min-width: 0;
  }

  .page-title {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 8px 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .page-subtitle {
    font-size: 16px;
    color: #64748b;
    margin: 0;
  }

  .header-actions {
    flex-shrink: 0;
    min-width: 0;
  }

  /* Search */
  .search-container {
    min-width: 280px;
    max-width: 100%;
  }

  .search-input-group {
    position: relative;
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    width: 100%;
  }

  .search-input-group:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 16px;
    color: #64748b;
    font-size: 16px;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 16px 16px 16px 48px;
    font-size: 16px;
    color: #1e293b;
    outline: none;
    min-width: 0;
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  .search-btn {
    background: #3b82f6;
    border: none;
    color: white;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    flex-shrink: 0;
  }

  .search-btn:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
  }

  .stat-icon.vip {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }

  .stat-icon.admin {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  .stat-icon.suspended {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }

  .stat-content {
    flex: 1;
  }

  .stat-number {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }

  /* Table Container */
  .table-container {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }

  .table-header {
    padding: 24px 32px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table-title {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .results-count {
    font-size: 14px;
    color: #64748b;
  }

  /* Users Table */
  .users-table {
    width: 100%;
    border-collapse: collapse;
  }

  .users-table th {
    background: #f8fafc;
    padding: 16px 24px;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  .users-table td {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  .user-row:hover {
    background: #f8fafc;
  }

  /* User Info Column */
  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-details {
    flex: 1;
  }

  .username {
    font-weight: 600;
    color: #1e293b;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .user-email {
    color: #64748b;
    font-size: 14px;
  }

  /* Role Badges */
  .role-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .role-badge.superadmin {
    background: #fef3c7;
    color: #92400e;
  }

  .role-badge.admin {
    background: #d1fae5;
    color: #065f46;
  }

  .role-badge.client {
    background: #e0e7ff;
    color: #3730a3;
  }

  /* Status Badges */
  .status-indicators {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .status-badge.vip {
    background: #fef3c7;
    color: #92400e;
  }

  .status-badge.suspended {
    background: #fee2e2;
    color: #991b1b;
  }

  .status-badge.active {
    background: #d1fae5;
    color: #065f46;
  }

  /* Stats Grid Small */
  .stats-grid-small {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .stat-item {
    text-align: center;
  }

  .stat-item .stat-label {
    display: block;
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .stat-item .stat-value {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }

  /* Action Buttons */
  .user-actions {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  .action-btn.edit {
    background: #fbbf24;
    color: white;
  }

  .action-btn.edit:hover {
    background: #f59e0b;
    transform: scale(1.1);
  }

  .action-btn.vip {
    background: #667eea;
    color: white;
  }

  .action-btn.vip:hover {
    background: #5a67d8;
    transform: scale(1.1);
  }

  .action-btn.delete {
    background: #ef4444;
    color: white;
  }

  .action-btn.delete:hover {
    background: #dc2626;
    transform: scale(1.1);
  }

  /* Pagination */
  .pagination-wrapper {
    padding: 24px 32px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination-info {
    font-size: 14px;
    color: #64748b;
  }

  .pagination-nav {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-numbers {
    display: flex;
    gap: 4px;
  }

  .pagination-number {
    width: 36px;
    height: 36px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
  }

  .pagination-number:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  .pagination-number.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }

  .pagination-ellipsis {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 14px;
  }

  /* Modal Styling */
  .custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
    animation: fadeIn 0.3s ease;
  }

  .custom-modal {
    background: white;
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    width: 90%;
    max-width: 600px;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    animation: slideIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    border-bottom: 1px solid #e2e8f0;
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .modal-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #6b7280;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .btn-close:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .modal-body {
    padding: 32px;
    flex-grow: 1;
    overflow-y: auto;
  }

  .form-section {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .form-group {
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .current-value {
    color: #6b7280;
    font-weight: normal;
    margin-left: 8px;
  }

  .form-control {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    background: white;
  }

  .form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-control:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  .form-text {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #ef4444;
    font-weight: 500;
  }

  /* Password Input Group */
  .password-input-group {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-input {
    padding-right: 48px;
  }

  .password-toggle-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-size: 16px;
  }

  .password-toggle-btn:hover:not(:disabled) {
    background: #f3f4f6;
    color: #374151;
  }

  .password-toggle-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Datetime input styling */
  .form-control[type="datetime-local"] {
    font-family: inherit;
    color: #374151;
  }

  .form-control[type="datetime-local"]::-webkit-calendar-picker-indicator {
    background: transparent;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .form-control[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
    background: #f3f4f6;
  }

  /* Checkbox Group */
  .checkbox-group {
    display: flex;
    gap: 24px;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .checkbox-item input[type="checkbox"] {
    display: none;
  }

  .checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
  }

  .checkbox-item input[type="checkbox"]:checked + .checkmark {
    background: #3b82f6;
    border-color: #3b82f6;
  }

  .checkbox-item input[type="checkbox"]:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  .checkbox-label {
    font-weight: 500;
    color: #374151;
    font-size: 14px;
  }

  .modal-footer {
    border-top: 1px solid #e2e8f0;
    padding: 24px 32px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .btn-secondary {
    background: #6b7280;
    color: white;
  }

  .btn-secondary:hover {
    background: #4b5563;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Website Visits Tracking Section */
  .visits-section {
    background: white;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
  }

  .visits-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
  }

  .visits-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .date-selector {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .date-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }

  .date-input {
    padding: 12px 16px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #374151;
    width: 180px;
    transition: all 0.3s ease;
  }

  .date-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .visits-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .visits-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }

  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .visits-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
  }

  .visit-stat-card {
    background: #f8fafc;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
  }

  .visit-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .visit-stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
  }

  .visit-stat-icon.total {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }

  .visit-stat-icon.unique {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  .visit-stat-content {
    flex: 1;
  }

  .visit-stat-number {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
    margin-bottom: 4px;
  }

  .visit-stat-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }

  .visits-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    color: #64748b;
    font-size: 16px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .visits-stats {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .page-header {
      padding: 24px;
    }

    .header-content {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .header-left {
      text-align: center;
    }

    .header-actions {
      width: 100%;
    }

    .search-container {
      min-width: 100%;
      width: 100%;
    }

    .search-input-group {
      width: 100%;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .visits-section {
      padding: 24px;
    }

    .visits-header {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }

    .date-selector {
      width: 100%;
    }

    .date-input {
      width: 100%;
    }

    .visits-stats {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .table-header {
      padding: 20px 24px;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }

    .pagination-wrapper {
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }

    .modal-body {
      padding: 24px;
    }

    .modal-header,
    .modal-footer {
      padding: 20px 24px;
    }
  }

  @media (max-width: 480px) {
    .page-header {
      padding: 20px;
    }

    .page-title {
      font-size: 24px;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      padding: 20px;
    }

    .visits-section {
      padding: 20px;
    }

    .visits-title {
      font-size: 18px;
    }

    .visit-stat-card {
      padding: 20px;
    }

    .table-header {
      padding: 16px 20px;
    }

    .users-table th,
    .users-table td {
      padding: 16px 20px;
    }

    .user-info {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .stats-grid-small {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .modal-body {
      padding: 20px;
    }

    .modal-header,
    .modal-footer {
      padding: 16px 20px;
    }
  }
  </style>
  