<template>
  <div v-if="isOpen" class="custom-modal-overlay" @click="handleClose">
    <div class="custom-modal" @click.stop>
      <div class="modal-header">
        <h5 class="modal-title">
          <i class="fas fa-shield-alt"></i>
          Add AMX Admin
        </h5>
        <button type="button" class="btn-close" @click="handleClose" :disabled="submitting">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="user-summary">
          <h6 class="section-title">Selected user</h6>
          <div class="summary-grid">
            <div class="summary-item"><strong>Username:</strong> {{ selectedUser?.username || '—' }}</div>
            <div class="summary-item"><strong>Email:</strong> {{ selectedUser?.email || '—' }}</div>
            <div class="summary-item"><strong>Current role:</strong> {{ selectedUser?.role || '—' }}</div>
            <div class="summary-item">
              <strong>Status:</strong> {{ selectedUser?.suspended ? 'Suspended' : 'Active' }}
            </div>
            <div class="summary-item"><strong>AP:</strong> {{ selectedUser?.AP ?? 0 }}</div>
            <div class="summary-item"><strong>Points:</strong> {{ selectedUser?.POINTS ?? 0 }}</div>
            <div class="summary-item"><strong>Level:</strong> {{ selectedUser?.LEVEL ?? 0 }}</div>
          </div>
        </div>

        <div v-if="loadingRanks" class="loading-state">Loading ranks...</div>
        <div v-else-if="ranksError" class="error-state">{{ ranksError }}</div>

        <form v-else class="form-grid" @submit.prevent="submit">
          <div class="form-group">
            <label for="amx-identifier">AMX identifier</label>
            <input
              id="amx-identifier"
              v-model.trim="form.identifier"
              type="text"
              class="form-control"
              placeholder="STEAM_0:0:123456 or player name"
              :readonly="!allowIdentifierEdit"
              :disabled="submitting"
              required
            >
            <small class="helper-text">
              This is taken from the selected dashboard user. Use SteamID if available, otherwise player name.
            </small>
            <small v-if="identifierMissingMessage" class="helper-text helper-text-error">
              {{ identifierMissingMessage }}
            </small>
            <button
              type="button"
              class="btn btn-secondary inline-btn"
              :disabled="submitting"
              @click="allowIdentifierEdit = !allowIdentifierEdit"
            >
              {{ allowIdentifierEdit ? 'Lock identifier' : 'Advanced edit identifier' }}
            </button>
          </div>

          <div class="form-group">
            <label for="amx-rank">Rank</label>
            <select
              id="amx-rank"
              v-model="form.rank"
              class="form-control"
              :disabled="submitting"
              required
            >
              <option value="" disabled>Select rank</option>
              <option v-for="rank in ranks" :key="rank.key" :value="rank.key">
                {{ rank.label }} — {{ rank.accessFlags }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="amx-password">Password</label>
            <input
              id="amx-password"
              v-model="form.password"
              type="password"
              class="form-control"
              autocomplete="new-password"
              :disabled="submitting"
            >
            <small class="helper-text">
              Required for name-based admins. Leave empty for SteamID or IP admins.
            </small>
          </div>

          <div class="form-group">
            <button
              type="button"
              class="btn btn-secondary inline-btn"
              :disabled="submitting"
              @click="showAdvanced = !showAdvanced"
            >
              {{ showAdvanced ? 'Hide advanced options' : 'Advanced options' }}
            </button>
          </div>

          <div v-if="showAdvanced" class="form-group">
            <label for="amx-id-type">ID Type</label>
            <select
              id="amx-id-type"
              v-model="form.idType"
              class="form-control"
              :disabled="submitting"
            >
              <option value="">Auto</option>
              <option value="name">Name</option>
              <option value="steamid">SteamID</option>
              <option value="ip">IP</option>
            </select>
            <small class="helper-text">
              Usually leave this on Auto. The backend detects SteamID, IP, or name automatically.
            </small>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="submitting || !canSubmit">
              {{ submitting ? 'Adding...' : 'Add Admin' }}
            </button>
          </div>
        </form>

        <div v-if="lastSuccess" class="success-summary">
          <h6 class="section-title">AMX admin added</h6>
          <ul>
            <li><strong>Identifier:</strong> {{ lastSuccess.identifier }}</li>
            <li><strong>Rank:</strong> {{ lastSuccess.rankLabel }} ({{ lastSuccess.rank }})</li>
            <li><strong>Access flags:</strong> {{ lastSuccess.accessFlags }}</li>
            <li><strong>ID type:</strong> {{ lastSuccess.idType }}</li>
            <li><strong>Has password:</strong> {{ lastSuccess.hasPassword ? 'Yes' : 'No' }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { addAmxAdmin, getAmxAdminRanks } from '../../api/amxAdminsApi';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  selectedUser: { type: Object, default: null },
});

const emit = defineEmits(['close', 'success']);

const toast = useToast();

const loadingRanks = ref(false);
const ranksError = ref('');
const submitting = ref(false);
const showAdvanced = ref(false);
const allowIdentifierEdit = ref(false);
const ranks = ref([]);
const lastSuccess = ref(null);

const form = ref({
  identifier: '',
  rank: '',
  password: '',
  idType: '',
});

const AMX_ADMIN_ERROR_MESSAGES = {
  INVALID_AMX_ADMIN_RANK: 'Invalid AMX admin rank.',
  PASSWORD_REQUIRED_FOR_NAME_ADMIN: 'Password is required when adding a name-based admin.',
  INVALID_AMX_ADMIN_ID_TYPE: 'Invalid ID type.',
  INVALID_AMX_ADMIN_AUTH_TYPE: 'Invalid legacy auth type. Use name, steamid, or ip.',
  INVALID_AMX_ADMIN_IDENTIFIER: 'Invalid player name, SteamID, or IP.',
  INVALID_AMX_ADMIN_PASSWORD: 'Invalid password format.',
  RCON_COMMAND_FAILED:
    'The backend could not add the admin through RCON. Check if the game server is online and RCON is configured.',
};

const identifierMissingMessage = computed(() => {
  if (form.value.identifier.trim()) {
    return '';
  }
  return 'No identifier was detected for this user. Enter SteamID, player name, or IP to continue.';
});

const canSubmit = computed(() => Boolean(form.value.identifier.trim()) && Boolean(form.value.rank));

const getFirstNonEmpty = (source, keys) => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
};

const resolveIdentifierFromUser = (user) => {
  const steamCandidates = ['steamId', 'steamID', 'steam_id', 'steamid', 'auth', 'STEAMID'];
  const nameCandidates = ['playerName', 'nickname', 'displayName', 'name', 'username', 'Name'];

  const steamIdentifier = getFirstNonEmpty(user, steamCandidates);
  if (steamIdentifier) {
    return steamIdentifier;
  }

  return getFirstNonEmpty(user, nameCandidates);
};

const resetStateFromUser = async () => {
  const initialIdentifier = resolveIdentifierFromUser(props.selectedUser);

  form.value.identifier = initialIdentifier;
  form.value.rank = '';
  form.value.password = '';
  form.value.idType = '';
  showAdvanced.value = false;
  allowIdentifierEdit.value = !initialIdentifier;
  lastSuccess.value = null;

  if (!ranks.value.length) {
    await loadRanks();
  }
};

const loadRanks = async () => {
  loadingRanks.value = true;
  ranksError.value = '';
  try {
    const response = await getAmxAdminRanks();
    if (!response?.success || !Array.isArray(response.ranks) || !response.ranks.length) {
      throw new Error('Invalid AMX rank response.');
    }
    ranks.value = response.ranks;
  } catch {
    ranks.value = [];
    ranksError.value = 'Failed to load AMX ranks.';
  } finally {
    loadingRanks.value = false;
  }
};

const getErrorMessage = (error) => {
  const code = error?.response?.data?.code;
  if (code && AMX_ADMIN_ERROR_MESSAGES[code]) {
    return AMX_ADMIN_ERROR_MESSAGES[code];
  }
  if (typeof error?.response?.data?.message === 'string') {
    return error.response.data.message;
  }
  return 'Failed to add AMX admin.';
};

const submit = async () => {
  const identifier = form.value.identifier.trim();
  if (!identifier) {
    toast.error('AMX identifier is required.');
    return;
  }
  if (!form.value.rank) {
    toast.error('AMX rank is required.');
    return;
  }

  submitting.value = true;
  try {
    const payload = {
      identifier,
      rank: form.value.rank,
    };

    const password = form.value.password.trim();
    if (password) {
      payload.password = password;
    }
    if (form.value.idType) {
      payload.idType = form.value.idType;
    }

    const response = await addAmxAdmin(payload);
    if (!response?.success || !response?.admin) {
      throw new Error('Unexpected AMX add response.');
    }

    lastSuccess.value = {
      identifier: response.admin.identifier,
      rank: response.admin.rank,
      rankLabel: response.admin.rankLabel,
      accessFlags: response.admin.accessFlags,
      idType: response.admin.idType,
      hasPassword: Boolean(response.admin.hasPassword),
    };

    form.value.password = '';
    toast.success(response.message || 'AMX admin added successfully.');
    emit('success', lastSuccess.value);
  } catch (error) {
    toast.error(getErrorMessage(error));
    form.value.password = '';
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  if (submitting.value) return;
  form.value.password = '';
  emit('close');
};

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      await resetStateFromUser();
    }
  }
);
</script>

<style scoped>
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
  z-index: 1100;
}

.custom-modal {
  background: white;
  border-radius: 16px;
  width: 92%;
  max-width: 700px;
  max-height: 90%;
  overflow-y: auto;
}

.modal-header {
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e293b;
}

.btn-close {
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
}

.section-title {
  margin: 0 0 12px;
  font-size: 15px;
  color: #1e293b;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px 12px;
  margin-bottom: 18px;
}

.summary-item {
  color: #334155;
  font-size: 14px;
}

.form-grid {
  display: grid;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.form-control {
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
}

.helper-text {
  font-size: 12px;
  color: #64748b;
}

.helper-text-error {
  color: #b91c1c;
  font-weight: 600;
}

.inline-btn {
  align-self: flex-start;
  margin-top: 2px;
}

.form-actions {
  margin-top: 4px;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-secondary {
  background: #e2e8f0;
  color: #334155;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.loading-state,
.error-state {
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 14px;
}

.loading-state {
  background: #f8fafc;
  color: #334155;
}

.error-state {
  background: #fef2f2;
  color: #b91c1c;
}

.success-summary {
  margin-top: 16px;
  border-top: 1px solid #e2e8f0;
  padding-top: 14px;
}

.success-summary ul {
  margin: 0;
  padding-left: 18px;
  color: #334155;
}
</style>
