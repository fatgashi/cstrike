<template>
  <div class="scheduled-messages-page" data-testid="scheduled-messages-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Scheduled Server Messages</h2>
        <p class="page-subtitle">Manage automated messages sent to the CS 1.6 server.</p>
      </div>
      <div class="header-actions">
        <button
          class="btn btn-secondary"
          :disabled="loading"
          @click="fetchMessages"
        >
          Refresh
        </button>
        <button
          class="btn btn-primary"
          data-testid="scheduled-message-add"
          @click="openCreateModal"
        >
          Add message
        </button>
      </div>
    </div>

    <div v-if="forbiddenState" class="card info-card error-card">
      <h4>Access denied</h4>
      <p>You do not have permission to manage scheduled server messages.</p>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="label">Total</span>
          <span class="value">{{ pagination.totalItems }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Enabled</span>
          <span class="value success">{{ enabledCount }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Disabled</span>
          <span class="value">{{ disabledCount }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Failed last run</span>
          <span class="value danger">{{ failedCount }}</span>
        </div>
      </div>

      <div class="card toolbar">
        <div class="filters">
          <div class="field">
            <label>Status</label>
            <select v-model="enabledFilter" class="form-control" @change="handleFilterChange">
              <option value="all">All</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div class="field grow">
            <label>Search current page</label>
            <input
              v-model.trim="searchQuery"
              type="text"
              class="form-control"
              placeholder="Filter loaded results by name or message"
            >
            <small class="hint">Search applies to the currently loaded page only.</small>
          </div>
          <div class="field">
            <label>Per page</label>
            <select v-model.number="limit" class="form-control" @change="handleLimitChange">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card table-card">
        <div v-if="loading && !messages.length" class="loading-state">Loading scheduled messages...</div>
        <div v-else-if="!messages.length" class="empty-state">
          <h4>No scheduled messages yet</h4>
          <p>Create a scheduled message to automate CS 1.6 server announcements.</p>
          <button class="btn btn-primary" @click="openCreateModal">Add message</button>
        </div>
        <div v-else-if="!filteredMessages.length" class="empty-state">
          <h4>No results for current filter</h4>
          <p>Try a different search value or status filter.</p>
        </div>
        <div v-else class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Schedule</th>
                <th>Timezone</th>
                <th>Status</th>
                <th>Last execution</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="record in filteredMessages"
                :key="record.id"
                class="scheduled-message-row"
                data-testid="scheduled-message-row"
              >
                <td class="name-cell">
                  <div class="strong" data-testid="scheduled-message-name">{{ record.name }}</div>
                </td>
                <td class="message-cell">
                  <div class="message-preview">{{ truncateText(record.message, 90) }}</div>
                  <div class="hint" :title="record.message">{{ record.message }}</div>
                </td>
                <td>
                  <div>{{ describeCronExpression(record.cronExpression) }}</div>
                  <code>{{ record.cronExpression }}</code>
                </td>
                <td>{{ record.timezone || 'Europe/Belgrade' }}</td>
                <td>
                  <span class="pill" :class="record.enabled ? 'pill-success' : 'pill-muted'">
                    {{ record.enabled ? 'Enabled' : 'Disabled' }}
                  </span>
                  <div class="hint runtime-status">{{ runtimeStatusText(record) }}</div>
                </td>
                <td>
                  <div>{{ formatDateTime(record.lastRunAt) }}</div>
                  <span
                    v-if="record.lastStatus"
                    class="pill"
                    :class="record.lastStatus === 'success' ? 'pill-success' : 'pill-danger'"
                  >
                    {{ record.lastStatus === 'success' ? 'Success' : 'Failed' }}
                  </span>
                  <div
                    v-if="record.lastStatus === 'failed' && record.lastError"
                    class="hint error-preview"
                    :title="record.lastError"
                  >
                    {{ truncateText(record.lastError, 80) }}
                  </div>
                </td>
                <td>
                  <div class="action-row">
                    <button
                      class="icon-btn"
                      title="Edit"
                      data-testid="scheduled-message-edit"
                      :disabled="isBusy(record.id)"
                      @click="openEditModal(record)"
                    >
                      <i class="fas fa-edit" />
                    </button>
                    <button
                      class="icon-btn"
                      title="Send now"
                      data-testid="scheduled-message-send-now"
                      :disabled="isBusy(record.id)"
                      @click="confirmSendNow(record)"
                    >
                      <i class="fas fa-paper-plane" />
                    </button>
                    <button
                      class="icon-btn"
                      :title="record.enabled ? 'Disable' : 'Enable'"
                      data-testid="scheduled-message-toggle"
                      :disabled="isBusy(record.id)"
                      @click="toggleMessage(record)"
                    >
                      <i :class="record.enabled ? 'fas fa-toggle-on' : 'fas fa-toggle-off'" />
                    </button>
                    <button
                      class="icon-btn danger"
                      title="Delete"
                      data-testid="scheduled-message-delete"
                      :disabled="isBusy(record.id)"
                      @click="confirmDelete(record)"
                    >
                      <i class="fas fa-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="pagination.totalPages > 1" class="pager">
          <button class="btn btn-secondary" :disabled="page <= 1 || loading" @click="changePage(page - 1)">
            Previous
          </button>
          <span>Page {{ page }} of {{ pagination.totalPages }}</span>
          <button
            class="btn btn-secondary"
            :disabled="page >= pagination.totalPages || loading"
            @click="changePage(page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </template>

    <ScheduledServerMessageForm
      v-if="showFormModal"
      :mode="formMode"
      :record="activeRecord"
      :submitting="formSubmitting"
      @close="closeFormModal"
      @submit="submitForm"
    />

    <div
      v-if="confirmModal.visible"
      class="custom-modal-overlay"
      @click="closeConfirmModal"
    >
      <div class="custom-modal" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">{{ confirmModal.title }}</h5>
          <button class="btn-close" type="button" @click="closeConfirmModal">
            <i class="fas fa-times" />
          </button>
        </div>
        <div class="modal-body">
          <p>{{ confirmModal.message }}</p>
          <div v-if="confirmModal.record" class="confirm-summary">
            <div><strong>Name:</strong> {{ confirmModal.record.name }}</div>
            <div><strong>Message:</strong> {{ confirmModal.record.message }}</div>
            <div><strong>Status:</strong> {{ confirmModal.record.enabled ? 'Enabled' : 'Disabled' }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" @click="closeConfirmModal">Cancel</button>
          <button
            class="btn btn-primary"
            type="button"
            data-testid="scheduled-message-confirm-send"
            :disabled="confirmModal.loading"
            @click="executeConfirmModal"
          >
            <span v-if="confirmModal.loading" class="spinner-border spinner-border-sm me-2" role="status" />
            {{ confirmModal.confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import ScheduledServerMessageForm from './ScheduledServerMessageForm.vue';
import {
  createScheduledServerMessage,
  deleteScheduledServerMessage,
  getScheduledServerMessages,
  sendScheduledServerMessageNow,
  toggleScheduledServerMessage,
  updateScheduledServerMessage,
} from '../api/scheduledServerMessagesApi';
import { describeCronExpression } from '../helpers/scheduledMessageScheduleHelper';
import { sanitizeScheduledMessagePayload } from '../helpers/scheduledMessagePayloadHelper';

const toast = useToast();

const loading = ref(false);
const messages = ref([]);
const page = ref(1);
const limit = ref(20);
const enabledFilter = ref('all');
const searchQuery = ref('');
const forbiddenState = ref(false);
const busyIds = ref(new Set());

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
});

const showFormModal = ref(false);
const formMode = ref('create');
const activeRecord = ref(null);
const formSubmitting = ref(false);

const confirmModal = reactive({
  visible: false,
  loading: false,
  title: '',
  message: '',
  confirmLabel: 'Confirm',
  action: null,
  record: null,
});

const filteredMessages = computed(() => {
  const query = String(searchQuery.value || '').toLowerCase();
  if (!query) return messages.value;
  return messages.value.filter((record) => {
    return (
      String(record.name || '').toLowerCase().includes(query) ||
      String(record.message || '').toLowerCase().includes(query)
    );
  });
});

const enabledCount = computed(() => messages.value.filter((item) => item.enabled).length);
const disabledCount = computed(() => messages.value.filter((item) => !item.enabled).length);
const failedCount = computed(
  () => messages.value.filter((item) => item.lastStatus === 'failed').length
);

function runtimeStatusText(record) {
  if (!record.lastRunAt) return 'Never run';
  if (record.lastStatus === 'success') return 'Last run successful';
  if (record.lastStatus === 'failed') return 'Last run failed';
  return 'Unknown runtime status';
}

function truncateText(value, maxLength = 90) {
  const text = String(value || '');
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function formatDateTime(value) {
  if (!value) return 'Never';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return 'Never';
  }
}

function currentEnabledFilterValue() {
  if (enabledFilter.value === 'enabled') return true;
  if (enabledFilter.value === 'disabled') return false;
  return undefined;
}

async function fetchMessages() {
  loading.value = true;
  try {
    const result = await getScheduledServerMessages({
      page: page.value,
      limit: limit.value,
      enabled: currentEnabledFilterValue(),
    });
    messages.value = result.items;
    pagination.currentPage = result.pagination.currentPage;
    pagination.totalPages = result.pagination.totalPages;
    pagination.totalItems = result.pagination.totalItems;
    forbiddenState.value = false;
  } catch (error) {
    if (error?.response?.status === 403) {
      forbiddenState.value = true;
      messages.value = [];
      pagination.currentPage = 1;
      pagination.totalPages = 1;
      pagination.totalItems = 0;
      return;
    }

    if (error?.response?.status === 401) {
      toast.error('Please login to access this page.');
    } else {
      toast.error(error?.response?.data?.message || 'Failed to load scheduled messages.');
    }
  } finally {
    loading.value = false;
  }
}

function handleFilterChange() {
  page.value = 1;
  fetchMessages();
}

function handleLimitChange() {
  page.value = 1;
  fetchMessages();
}

function changePage(nextPage) {
  page.value = nextPage;
  fetchMessages();
}

function openCreateModal() {
  formMode.value = 'create';
  activeRecord.value = null;
  showFormModal.value = true;
}

function openEditModal(record) {
  formMode.value = 'edit';
  activeRecord.value = { ...record };
  showFormModal.value = true;
}

function closeFormModal() {
  showFormModal.value = false;
  activeRecord.value = null;
}

async function submitForm(payload) {
  formSubmitting.value = true;
  try {
    const safePayload = sanitizeScheduledMessagePayload(payload);
    if (formMode.value === 'create') {
      const result = await createScheduledServerMessage(safePayload);
      toast.success('Scheduled message created.');
      if (result.warning) toast.warning(result.warning);
    } else if (activeRecord.value?.id) {
      const result = await updateScheduledServerMessage(activeRecord.value.id, safePayload);
      toast.success('Scheduled message updated.');
      if (result.warning) toast.warning(result.warning);
    }

    closeFormModal();
    await fetchMessages();
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to save scheduled message.');
  } finally {
    formSubmitting.value = false;
  }
}

function isBusy(id) {
  return busyIds.value.has(id);
}

function markBusy(id) {
  busyIds.value = new Set([...busyIds.value, id]);
}

function unmarkBusy(id) {
  const next = new Set(busyIds.value);
  next.delete(id);
  busyIds.value = next;
}

async function toggleMessage(record) {
  const id = record.id;
  markBusy(id);
  try {
    await toggleScheduledServerMessage(id, !record.enabled);
    toast.success(record.enabled ? 'Message disabled' : 'Message enabled');
    await fetchMessages();
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to change message status.');
  } finally {
    unmarkBusy(id);
  }
}

function confirmSendNow(record) {
  if (confirmModal.loading) return;
  confirmModal.visible = true;
  confirmModal.loading = false;
  confirmModal.title = 'Send this message now?';
  confirmModal.message = 'This will immediately send the message to the configured CS 1.6 server.';
  confirmModal.confirmLabel = 'Send now';
  confirmModal.record = record;
  confirmModal.action = async () => {
    markBusy(record.id);
    try {
      await sendScheduledServerMessageNow(record.id);
      toast.success('Message sent successfully.');
      await fetchMessages();
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.message || 'Send-now is currently cooling down.');
      } else {
        toast.error(error?.response?.data?.message || 'Failed to send message now.');
      }
    } finally {
      unmarkBusy(record.id);
    }
  };
}

function confirmDelete(record) {
  if (confirmModal.loading) return;
  confirmModal.visible = true;
  confirmModal.loading = false;
  confirmModal.title = 'Delete scheduled message?';
  confirmModal.message =
    'This removes the saved schedule and stops future automatic sends. This action cannot be undone.';
  confirmModal.confirmLabel = 'Delete';
  confirmModal.record = record;
  confirmModal.action = async () => {
    markBusy(record.id);
    try {
      await deleteScheduledServerMessage(record.id);
      toast.success('Scheduled message deleted.');
      if (messages.value.length === 1 && page.value > 1) {
        page.value -= 1;
      }
      await fetchMessages();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete scheduled message.');
    } finally {
      unmarkBusy(record.id);
    }
  };
}

function closeConfirmModal() {
  if (confirmModal.loading) return;
  confirmModal.visible = false;
  confirmModal.title = '';
  confirmModal.message = '';
  confirmModal.confirmLabel = 'Confirm';
  confirmModal.action = null;
  confirmModal.record = null;
}

async function executeConfirmModal() {
  if (!confirmModal.action) return;
  confirmModal.loading = true;
  try {
    await confirmModal.action();
  } finally {
    confirmModal.loading = false;
    closeConfirmModal();
  }
}

onMounted(fetchMessages);
</script>

<style scoped>
.scheduled-messages-page {
  max-width: 1320px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}

.page-title {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
}

.page-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  padding: 18px;
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.value.success {
  color: #059669;
}

.value.danger {
  color: #dc2626;
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
  min-width: 240px;
}

.field label {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.form-control {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 14px;
}

.hint {
  font-size: 12px;
  color: #64748b;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

.data-table th {
  background: #f8fafc;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.strong {
  font-weight: 600;
  color: #1e293b;
}

.message-preview {
  color: #1e293b;
}

.message-cell .hint {
  max-width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

code {
  display: inline-block;
  margin-top: 4px;
  font-size: 12px;
  color: #334155;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px 6px;
}

.pill {
  display: inline-block;
  font-size: 11px;
  border-radius: 999px;
  padding: 3px 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.pill-success {
  background: #d1fae5;
  color: #065f46;
}

.pill-muted {
  background: #e2e8f0;
  color: #334155;
}

.pill-danger {
  background: #fee2e2;
  color: #991b1b;
}

.runtime-status {
  margin-top: 4px;
}

.error-preview {
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-row {
  display: flex;
  gap: 6px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #e2e8f0;
  color: #334155;
}

.icon-btn.danger {
  background: #fee2e2;
  color: #991b1b;
}

.icon-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

.btn {
  border: none;
  border-radius: 9px;
  padding: 9px 13px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.btn-secondary {
  color: #334155;
  background: #e2e8f0;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state,
.empty-state {
  text-align: center;
  color: #64748b;
  padding: 32px 12px;
}

.empty-state h4 {
  margin: 0 0 6px;
  color: #1e293b;
}

.info-card h4 {
  margin: 0 0 4px;
}

.error-card {
  border-color: #fecaca;
  background: #fef2f2;
}

.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
}

.custom-modal {
  width: min(620px, 95vw);
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-header,
.modal-footer {
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  border-bottom: none;
  border-top: 1px solid #e2e8f0;
  justify-content: flex-end;
  gap: 8px;
}

.modal-title {
  margin: 0;
  color: #1e293b;
}

.btn-close {
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}

.modal-body {
  padding: 14px 16px;
}

.confirm-summary {
  margin-top: 10px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  padding: 10px;
  display: grid;
  gap: 4px;
}

@media (max-width: 840px) {
  .page-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .btn {
    flex: 1;
  }
}
</style>
