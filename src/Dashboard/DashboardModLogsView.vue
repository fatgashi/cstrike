<template>
  <div class="mod-logs">
    <div class="page-header">
      <h2 class="page-title">Moderation logs</h2>
      <p class="page-subtitle">
        Audit trail for VIP changes, role updates, and in-game stat grants (super-admin only).
      </p>
    </div>

    <div class="toolbar card">
      <div class="filters">
        <div class="field">
          <label>Action</label>
          <select v-model="action" class="form-control" @change="resetPage">
            <option value="">All</option>
            <option value="vip_add">VIP add</option>
            <option value="vip_update">VIP update</option>
            <option value="role_update">Role update</option>
            <option value="player_stats">Player stats</option>
          </select>
        </div>
        <div class="field grow">
          <label>Target name contains</label>
          <input
            v-model.trim="target"
            type="text"
            class="form-control"
            placeholder="Substring match"
            @keyup.enter="fetchLogs"
          >
        </div>
        <div class="field">
          <label>Per page</label>
          <select v-model.number="limit" class="form-control" @change="resetPage">
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary" :disabled="loading" @click="fetchLogs">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" />
          Refresh
        </button>
      </div>
      <p v-if="pagination" class="meta">
        Page {{ pagination.page }} of {{ pagination.pages }} — {{ pagination.total }} entries
      </p>
    </div>

    <div class="table-card card">
      <div v-if="loading && !logs.length" class="loading-state">Loading…</div>
      <div v-else-if="!logs.length" class="empty-state">No log entries for this filter.</div>
      <div v-else class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Action</th>
              <th>Actor</th>
              <th>Target</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in logs" :key="row._id">
              <td class="nowrap">{{ formatDate(row.createdAt) }}</td>
              <td><span class="pill">{{ row.action }}</span></td>
              <td>
                <div class="actor">
                  <span class="strong">{{ row.actorUsername }}</span>
                  <span class="muted">#{{ row.actorId }} · {{ row.actorRole }}</span>
                </div>
              </td>
              <td>{{ row.targetPlayerName }}</td>
              <td class="payload-cell">
                <pre class="payload">{{ formatPayload(row) }}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="pagination && pagination.pages > 1" class="pager">
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="page <= 1 || loading"
          @click="goPage(page - 1)"
        >
          Previous
        </button>
        <span>Page {{ page }} / {{ pagination.pages }}</span>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="page >= pagination.pages || loading"
          @click="goPage(page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import configuration from '../config/config'
import axiosInstance from '../config/axios'

const toast = useToast()

const logs = ref([])
const pagination = ref(null)
const loading = ref(false)
const page = ref(1)
const limit = ref(50)
const action = ref('')
const target = ref('')

const resetPage = () => {
  page.value = 1
  fetchLogs()
}

const goPage = (p) => {
  page.value = p
  fetchLogs()
}

const formatDate = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

const formatPayload = (row) => {
  const parts = []
  if (row.payload && Object.keys(row.payload).length) {
    parts.push(`payload: ${JSON.stringify(row.payload, null, 0)}`)
  }
  if (row.meta && Object.keys(row.meta).length) {
    parts.push(`meta: ${JSON.stringify(row.meta, null, 0)}`)
  }
  return parts.length ? parts.join('\n') : '—'
}

const fetchLogs = async () => {
  loading.value = true
  try {
    const config = configuration()
    const params = new URLSearchParams({
      page: String(page.value),
      limit: String(limit.value),
    })
    if (action.value) params.set('action', action.value)
    if (target.value) params.set('target', target.value)

    const res = await axiosInstance.get(`/mod-logs?${params.toString()}`, config)
    const data = res.data
    if (!data.success) {
      toast.error(data.message || 'Failed to load logs.')
      return
    }
    logs.value = data.logs || []
    pagination.value = data.pagination || null
  } catch (e) {
    console.error(e)
    toast.error(e.response?.data?.message || 'Failed to load moderation logs.')
    logs.value = []
    pagination.value = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchLogs)
</script>

<style scoped>
.mod-logs {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
}

.page-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.toolbar .filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
}

.field.grow {
  flex: 1;
  min-width: 200px;
}

.field label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.form-control {
  padding: 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.meta {
  margin: 12px 0 0;
  font-size: 13px;
  color: #64748b;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  height: 38px;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}

.btn-secondary {
  background: #e2e8f0;
  color: #334155;
}

.loading-state,
.empty-state {
  padding: 32px;
  text-align: center;
  color: #64748b;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

.data-table th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  background: #f8fafc;
}

.nowrap {
  white-space: nowrap;
}

.pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #ede9fe;
  color: #5b21b6;
  font-size: 12px;
  font-weight: 600;
}

.actor {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.strong {
  font-weight: 600;
  color: #1e293b;
}

.muted {
  font-size: 12px;
  color: #94a3b8;
}

.payload-cell {
  max-width: 360px;
}

.payload {
  margin: 0;
  font-size: 11px;
  white-space: pre-wrap;
  word-break: break-word;
  color: #334155;
  background: #f1f5f9;
  padding: 8px;
  border-radius: 8px;
  max-height: 120px;
  overflow: auto;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
</style>
