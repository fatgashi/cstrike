<template>
  <div class="kofi-payments-page" data-testid="kofi-payments-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Ko-fi Payments</h2>
        <p class="page-subtitle">Superadmin review for paid VIP events that need a registered CS player.</p>
      </div>
      <button class="btn btn-secondary" :disabled="loading" @click="fetchPayments">Refresh</button>
    </div>

    <div v-if="forbiddenState" class="card info-card error-card">
      <h4>Access denied</h4>
      <p>Only platform Superadmin can view Ko-fi payments.</p>
    </div>

    <template v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="label">Needs Review</span>
          <span class="value danger">{{ stats.needsReview || 0 }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Completed Today</span>
          <span class="value">{{ stats.completedToday || 0 }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Fulfilled</span>
          <span class="value success">{{ stats.fulfilled || 0 }}</span>
        </div>
        <div class="stat-card">
          <span class="label">Failed/Review</span>
          <span class="value">{{ stats.failedOrReview || 0 }}</span>
        </div>
      </div>

      <div class="card toolbar">
        <div class="filters">
          <div class="field">
            <label>Review</label>
            <select v-model="reviewFilter" class="form-control" @change="resetPage">
              <option value="open">Needs review</option>
              <option value="resolved">Resolved</option>
              <option value="all">All</option>
            </select>
          </div>
          <div class="field">
            <label>Status</label>
            <select v-model="statusFilter" class="form-control" :disabled="reviewFilter !== 'all'" @change="resetPage">
              <option value="">Any</option>
              <option value="received">received</option>
              <option value="processing">processing</option>
              <option value="completed">completed</option>
              <option value="needs_review">needs_review</option>
              <option value="failed">failed</option>
            </select>
          </div>
          <div class="field">
            <label>Source</label>
            <select v-model="sourceFilter" class="form-control" @change="resetPage">
              <option value="">All</option>
              <option value="shop">Shop</option>
              <option value="commission">Service/Commission</option>
            </select>
          </div>
          <div class="field">
            <label>Outcome</label>
            <select v-model="outcomeFilter" class="form-control" @change="resetPage">
              <option value="">Any</option>
              <option value="granted">granted</option>
              <option value="extended">extended</option>
              <option value="already_permanent">already permanent</option>
              <option value="player_not_registered">player not registered</option>
              <option value="nickname_missing">nickname missing</option>
              <option value="invalid_nickname">invalid nickname</option>
              <option value="player_ambiguous">ambiguous player</option>
              <option value="fulfillment_verification_failed">verification failed</option>
            </select>
          </div>
          <div class="field grow">
            <label>Search</label>
            <input
              v-model.trim="searchQuery"
              type="text"
              class="form-control"
              placeholder="Transaction, message, nickname, player"
              @keyup.enter="resetPage"
            >
          </div>
          <button type="button" class="btn btn-primary" :disabled="loading" @click="resetPage">Apply</button>
        </div>
      </div>

      <div class="card table-card">
        <div v-if="loading && !payments.length" class="loading-state">Loading Ko-fi payments...</div>
        <div v-else-if="!payments.length" class="empty-state">
          <h4>No payments for this filter</h4>
          <p>Open reviews appear here by default.</p>
        </div>
        <div v-else class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Transaction ID</th>
                <th>Service/Product</th>
                <th>Amount</th>
                <th>Buyer submitted details</th>
                <th>Resolved player</th>
                <th>Planned action</th>
                <th>Status</th>
                <th>Fulfillment outcome</th>
                <th>Review reason</th>
                <th>Discord</th>
                <th>Last attempt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in payments"
                :key="row.id"
                class="kofi-payment-row"
                data-testid="kofi-payment-row"
                @click="openDetail(row)"
              >
                <td class="nowrap">{{ formatDate(row.receivedAt) }}</td>
                <td>{{ row.source }}</td>
                <td class="mono">{{ row.transactionId }}</td>
                <td>{{ row.productName }}</td>
                <td>{{ row.amount }} {{ row.currency }}</td>
                <td class="message-cell">{{ truncateText(row.buyerSubmittedDetails, 80) }}</td>
                <td>{{ row.resolvedPlayerName || '—' }}</td>
                <td>{{ row.plannedAction || '—' }}</td>
                <td><span class="pill" :class="statusClass(row.status)">{{ row.status }}</span></td>
                <td>{{ row.fulfillmentOutcome || '—' }}</td>
                <td>{{ row.reviewReasonCode || '—' }}</td>
                <td>{{ row.discordSentAt ? 'sent' : '—' }}</td>
                <td class="nowrap">{{ formatDate(row.lastAttemptAt) }}</td>
                <td>
                  <button class="btn btn-secondary" data-testid="kofi-payment-open" @click.stop="openDetail(row)">Open</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="pagination.totalPages > 1" class="pager">
          <button class="btn btn-secondary" :disabled="page <= 1" @click="page -= 1; fetchPayments()">Previous</button>
          <span>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
          <button class="btn btn-secondary" :disabled="page >= pagination.totalPages" @click="page += 1; fetchPayments()">Next</button>
        </div>
      </div>
    </template>

    <div v-if="detail" class="custom-modal-overlay" data-testid="kofi-payment-detail" @click.self="closeDetail">
      <div class="custom-modal wide">
        <div class="modal-header">
          <h3 class="modal-title">Payment {{ detail.transactionId }}</h3>
          <button class="btn-close" type="button" @click="closeDetail">×</button>
        </div>
        <div class="modal-body">
          <section>
            <h4>Payment</h4>
            <dl class="detail-grid">
              <div><dt>Transaction</dt><dd>{{ detail.transactionId }}</dd></div>
              <div><dt>Message ID</dt><dd>{{ detail.messageId }}</dd></div>
              <div><dt>Source</dt><dd>{{ detail.source }}</dd></div>
              <div><dt>Received</dt><dd>{{ formatDate(detail.receivedAt) }}</dd></div>
              <div><dt>Amount</dt><dd>{{ detail.amount }} {{ detail.currency }}</dd></div>
              <div><dt>Service/Product</dt><dd>{{ detail.productName }}</dd></div>
              <div><dt>Entitlement</dt><dd>{{ detail.entitlementCode || '—' }}</dd></div>
            </dl>
          </section>
          <section>
            <h4>Buyer input</h4>
            <p class="preserve">{{ detail.buyerSubmittedDetails || detail.customerMessage || 'Not provided' }}</p>
            <p class="hint">Submitted nickname (immutable): {{ detail.submittedNickname || '—' }}</p>
          </section>
          <section>
            <h4>Resolution</h4>
            <dl class="detail-grid">
              <div><dt>Canonical player</dt><dd>{{ detail.manualResolvedPlayerName || detail.resolvedPlayerName || '—' }}</dd></div>
              <div><dt>RegisterSys ID</dt><dd>{{ detail.manualResolvedPlayerId || detail.resolvedPlayerId || '—' }}</dd></div>
              <div><dt>Planned action</dt><dd>{{ detail.plannedAction || '—' }}</dd></div>
              <div><dt>Intended action</dt><dd>{{ detail.intendedAction || '—' }}</dd></div>
              <div><dt>Baseline expiry</dt><dd>{{ detail.baselineExpiry || '—' }}</dd></div>
              <div><dt>Target expiry</dt><dd>{{ detail.targetExpiry || '—' }}</dd></div>
              <div><dt>Final expiry</dt><dd>{{ detail.finalExpiry || '—' }}</dd></div>
            </dl>
          </section>
          <section>
            <h4>Processing</h4>
            <dl class="detail-grid">
              <div><dt>Status</dt><dd>{{ detail.status }}</dd></div>
              <div><dt>Enrichment</dt><dd>{{ detail.enrichmentStatus || '—' }}</dd></div>
              <div><dt>Execution</dt><dd>{{ detail.fulfillmentExecutionStatus || '—' }}</dd></div>
              <div><dt>Outcome</dt><dd>{{ detail.fulfillmentOutcome || '—' }}</dd></div>
              <div><dt>Attempts</dt><dd>{{ detail.processingAttempts }} / {{ detail.enrichmentAttempts }}</dd></div>
              <div><dt>Last error</dt><dd>{{ detail.lastErrorCode || '—' }} {{ detail.lastErrorMessage }}</dd></div>
              <div><dt>Reconciled</dt><dd>{{ detail.wasReconciled ? 'yes' : 'no' }}</dd></div>
              <div><dt>Discord sent</dt><dd>{{ formatDate(detail.discordSentAt) }}</dd></div>
              <div><dt>Resolution Discord</dt><dd>{{ formatDate(detail.resolutionDiscordSentAt) }}</dd></div>
              <div><dt>Applied</dt><dd>{{ formatDate(detail.appliedAt) }}</dd></div>
              <div><dt>Verified</dt><dd>{{ formatDate(detail.fulfillmentVerifiedAt) }}</dd></div>
              <div><dt>Completed</dt><dd>{{ formatDate(detail.completedAt) }}</dd></div>
            </dl>
          </section>
          <section v-if="!detail.readOnly && detail.status === 'needs_review'">
            <h4>Resolve Player</h4>
            <div class="filters">
              <div class="field grow">
                <label>Search RegisterSys</label>
                <input v-model.trim="playerQuery" class="form-control" placeholder="Nickname" @keyup.enter="searchPlayers">
              </div>
              <button class="btn btn-secondary" type="button" data-testid="kofi-player-search" @click="searchPlayers">Search</button>
            </div>
            <ul class="player-results">
              <li v-for="player in playerResults" :key="player.id">
                <button type="button" class="btn btn-secondary" @click="selectPlayer(player)">
                  ID: {{ player.id }} — {{ player.name }}
                  <span class="hint">VIP {{ player.isVip ? 'yes' : 'no' }} · {{ player.role }}{{ player.suspended ? ' · suspended' : '' }}</span>
                </button>
              </li>
            </ul>
            <p v-if="selectedPlayer" class="hint">Selected: ID {{ selectedPlayer.id }} Name {{ selectedPlayer.name }}</p>
            <button class="btn btn-primary" data-testid="kofi-resolve-player" :disabled="!selectedPlayer || busy" @click="savePlayer">Save player</button>
          </section>
          <section>
            <h4>Audit trail</h4>
            <div v-if="!audit.length" class="hint">No Superadmin actions yet.</div>
            <ul v-else class="audit-list">
              <li v-for="entry in audit" :key="entry._id || entry.createdAt">
                <strong>{{ entry.action }}</strong>
                by {{ entry.actorUsername || '—' }}
                at {{ formatDate(entry.createdAt) }}
                <span v-if="entry.selectedPlayerName"> → {{ entry.selectedPlayerName }} (#{{ entry.selectedPlayerId }})</span>
                <span v-if="entry.reason"> · {{ entry.reason }}</span>
                <span v-if="entry.note"> · {{ entry.note }}</span>
              </li>
            </ul>
          </section>
        </div>
        <div class="modal-footer">
          <button
            v-if="canAct"
            class="btn btn-primary"
            data-testid="kofi-fulfill"
            :disabled="busy || !(detail.manualResolvedPlayerId || selectedPlayer)"
            @click="confirmFulfill = true"
          >
            Fulfill Payment
          </button>
          <button
            v-if="canAct"
            class="btn btn-secondary"
            data-testid="kofi-resolve-without"
            :disabled="busy"
            @click="showCloseForm = true"
          >
            Resolve Without Fulfillment
          </button>
          <button class="btn btn-secondary" type="button" @click="closeDetail">Close</button>
        </div>
      </div>
    </div>

    <div v-if="confirmFulfill && detail" class="custom-modal-overlay" data-testid="kofi-fulfill-confirm">
      <div class="custom-modal">
        <div class="modal-header">
          <h3 class="modal-title">Fulfill this payment?</h3>
        </div>
        <div class="modal-body">
          <p>
            You are about to fulfill this already-paid Ko-fi transaction for:
          </p>
          <div class="confirm-summary">
            <div>Player: {{ detail.manualResolvedPlayerName || selectedPlayer?.name }}</div>
            <div>Entitlement: Gold VIP — 1 Month</div>
            <div>Transaction: {{ detail.transactionId }}</div>
          </div>
          <p class="hint">Existing fulfillment safety checks will run before any game-server mutation.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" :disabled="busy" @click="confirmFulfill = false">Cancel</button>
          <button class="btn btn-primary" data-testid="kofi-fulfill-confirm-btn" :disabled="busy" @click="runFulfill">Fulfill Payment</button>
        </div>
      </div>
    </div>

    <div v-if="showCloseForm && detail" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="modal-header">
          <h3 class="modal-title">Resolve without fulfillment</h3>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Reason</label>
            <select v-model="closeReason" class="form-control">
              <option value="">Select reason</option>
              <option value="no_fulfillment">No fulfillment</option>
              <option value="refunded_external">Refunded externally</option>
              <option value="duplicate_external">Duplicate external</option>
              <option value="invalid_purchase">Invalid purchase</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="field">
            <label>Note (optional)</label>
            <textarea v-model.trim="closeNote" class="form-control" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showCloseForm = false">Cancel</button>
          <button class="btn btn-primary" :disabled="!closeReason || busy" @click="runCloseWithout">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import toast from '../utils/toast';
import {
  fulfillKofiPayment,
  getKofiPayment,
  getKofiPaymentAudit,
  getKofiPayments,
  resolveKofiPaymentPlayer,
  resolveKofiPaymentWithoutFulfillment,
  searchRegisterSysPlayers,
} from '../api/kofiPaymentsApi';

const loading = ref(false);
const busy = ref(false);
const forbiddenState = ref(false);
const payments = ref([]);
const stats = reactive({ needsReview: 0, completedToday: 0, fulfilled: 0, failedOrReview: 0 });
const pagination = reactive({ currentPage: 1, totalPages: 1, totalItems: 0 });
const page = ref(1);
const reviewFilter = ref('open');
const statusFilter = ref('');
const sourceFilter = ref('');
const outcomeFilter = ref('');
const searchQuery = ref('');
const detail = ref(null);
const audit = ref([]);
const playerQuery = ref('');
const playerResults = ref([]);
const selectedPlayer = ref(null);
const confirmFulfill = ref(false);
const showCloseForm = ref(false);
const closeReason = ref('');
const closeNote = ref('');

const canAct = computed(() => Boolean(detail.value && !detail.value.readOnly && detail.value.status === 'needs_review'));

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
}

function truncateText(value, max) {
  const text = String(value || '');
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function statusClass(status) {
  if (status === 'completed') return 'pill-success';
  if (status === 'needs_review' || status === 'failed') return 'pill-danger';
  return 'pill-muted';
}

function resetPage() {
  page.value = 1;
  fetchPayments();
}

async function fetchPayments() {
  loading.value = true;
  forbiddenState.value = false;
  try {
    const result = await getKofiPayments({
      page: page.value,
      limit: 20,
      review: reviewFilter.value,
      status: reviewFilter.value === 'all' ? statusFilter.value : '',
      source: sourceFilter.value,
      outcome: outcomeFilter.value,
      q: searchQuery.value,
    });
    payments.value = result.items;
    pagination.currentPage = result.pagination.currentPage;
    pagination.totalPages = result.pagination.totalPages;
    pagination.totalItems = result.pagination.totalItems;
    Object.assign(stats, result.stats || {});
  } catch (error) {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      forbiddenState.value = true;
      payments.value = [];
      return;
    }
    toast.error(error?.response?.data?.message || 'Failed to load Ko-fi payments.');
  } finally {
    loading.value = false;
  }
}

async function openDetail(row) {
  try {
    const [paymentResult, auditResult] = await Promise.all([
      getKofiPayment(row.id),
      getKofiPaymentAudit(row.id),
    ]);
    detail.value = paymentResult.data;
    audit.value = auditResult.data;
    selectedPlayer.value = paymentResult.data.manualResolvedPlayerId
      ? { id: paymentResult.data.manualResolvedPlayerId, name: paymentResult.data.manualResolvedPlayerName }
      : null;
    playerResults.value = [];
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to load payment.');
  }
}

function closeDetail() {
  detail.value = null;
  confirmFulfill.value = false;
  showCloseForm.value = false;
}

async function searchPlayers() {
  try {
    const result = await searchRegisterSysPlayers(playerQuery.value);
    playerResults.value = result.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Player search failed.');
  }
}

function selectPlayer(player) {
  selectedPlayer.value = player;
}

async function savePlayer() {
  if (!detail.value || !selectedPlayer.value) return;
  busy.value = true;
  try {
    const result = await resolveKofiPaymentPlayer(detail.value.id, selectedPlayer.value.id);
    detail.value = result.data;
    toast.success('Player saved. Original buyer details were not changed.');
    await fetchPayments();
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Could not save player.');
  } finally {
    busy.value = false;
  }
}

async function runFulfill() {
  if (!detail.value) return;
  busy.value = true;
  try {
    const result = await fulfillKofiPayment(detail.value.id);
    detail.value = result.data;
    confirmFulfill.value = false;
    toast.success(result.reconciled ? 'Payment reconciled without a new mutation.' : 'Payment fulfilled.');
    await fetchPayments();
    const auditResult = await getKofiPaymentAudit(detail.value.id);
    audit.value = auditResult.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Fulfillment failed.');
  } finally {
    busy.value = false;
  }
}

async function runCloseWithout() {
  if (!detail.value || !closeReason.value) return;
  busy.value = true;
  try {
    const result = await resolveKofiPaymentWithoutFulfillment(detail.value.id, {
      reason: closeReason.value,
      note: closeNote.value,
    });
    detail.value = result.data;
    showCloseForm.value = false;
    toast.success('Review closed without fulfillment.');
    await fetchPayments();
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Could not close review.');
  } finally {
    busy.value = false;
  }
}

onMounted(fetchPayments);
</script>

<style scoped>
.kofi-payments-page { max-width: 1480px; }
.page-header { display: flex; justify-content: space-between; gap: 14px; margin-bottom: 18px; }
.page-title { margin: 0 0 6px; font-size: 28px; font-weight: 700; color: #1e293b; }
.page-subtitle { margin: 0; color: #64748b; }
.card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08); padding: 18px; margin-bottom: 16px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 16px; }
.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 4px; }
.label { font-size: 12px; color: #64748b; text-transform: uppercase; }
.value { font-size: 24px; font-weight: 700; }
.value.success { color: #059669; }
.value.danger { color: #dc2626; }
.toolbar .filters, .modal-body .filters { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end; }
.field { display: flex; flex-direction: column; gap: 4px; min-width: 140px; }
.field.grow { flex: 1; min-width: 220px; }
.form-control { border: 1px solid #cbd5e1; border-radius: 8px; padding: 9px 10px; }
.table-wrap { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; font-size: 13px; }
.data-table th { background: #f8fafc; font-size: 11px; color: #64748b; text-transform: uppercase; }
.kofi-payment-row { cursor: pointer; }
.mono { font-family: ui-monospace, monospace; font-size: 12px; }
.nowrap { white-space: nowrap; }
.pill { display: inline-block; font-size: 11px; border-radius: 999px; padding: 3px 9px; font-weight: 700; }
.pill-success { background: #d1fae5; color: #065f46; }
.pill-muted { background: #e2e8f0; color: #334155; }
.pill-danger { background: #fee2e2; color: #991b1b; }
.btn { border: none; border-radius: 9px; padding: 9px 13px; cursor: pointer; font-weight: 600; }
.btn-primary { color: #fff; background: linear-gradient(135deg, #667eea, #764ba2); }
.btn-secondary { color: #334155; background: #e2e8f0; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.pager { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 14px; }
.loading-state, .empty-state { text-align: center; color: #64748b; padding: 32px 12px; }
.error-card { border-color: #fecaca; background: #fef2f2; }
.custom-modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1200; }
.custom-modal { width: min(640px, 95vw); background: #fff; border-radius: 14px; max-height: 90vh; overflow: auto; }
.custom-modal.wide { width: min(920px, 96vw); }
.modal-header, .modal-footer { padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.modal-footer { border-top: 1px solid #e2e8f0; justify-content: flex-end; }
.modal-body { padding: 14px 16px; }
.modal-title { margin: 0; }
.btn-close { border: none; background: transparent; font-size: 22px; cursor: pointer; }
.detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px 16px; }
.detail-grid dt { font-size: 12px; color: #64748b; }
.detail-grid dd { margin: 0; font-weight: 600; }
.preserve { white-space: pre-wrap; }
.hint { font-size: 12px; color: #64748b; }
.player-results, .audit-list { list-style: none; padding: 0; }
.player-results li, .audit-list li { margin-bottom: 8px; }
.confirm-summary { margin-top: 10px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #f8fafc; padding: 10px; display: grid; gap: 4px; }
</style>
