import axiosInstance from '../config/axios';
import configuration from '../config/config';

function normalizePayment(record = {}) {
  return {
    id: record.id || record._id || '',
    receivedAt: record.receivedAt || null,
    source: record.source || '',
    eventType: record.eventType || '',
    transactionId: record.transactionId || '',
    messageId: record.messageId || '',
    productName: record.productName || '',
    amount: record.amount || '',
    currency: record.currency || '',
    buyerSubmittedDetails: record.buyerSubmittedDetails || '',
    submittedNickname: record.submittedNickname || '',
    resolvedPlayerName: record.resolvedPlayerName || '',
    plannedAction: record.plannedAction || '',
    status: record.status || '',
    reviewStatus: record.reviewStatus || '',
    fulfillmentOutcome: record.fulfillmentOutcome || '',
    reviewReasonCode: record.reviewReasonCode || '',
    discordSentAt: record.discordSentAt || null,
    lastAttemptAt: record.lastAttemptAt || null,
    canFulfill: Boolean(record.canFulfill),
    readOnly: Boolean(record.readOnly),
    entitlementCode: record.entitlementCode || '',
    enrichmentStatus: record.enrichmentStatus || '',
    fulfillmentExecutionStatus: record.fulfillmentExecutionStatus || '',
    processingAttempts: record.processingAttempts || 0,
    enrichmentAttempts: record.enrichmentAttempts || 0,
    lastErrorCode: record.lastErrorCode || '',
    lastErrorMessage: record.lastErrorMessage || '',
    wasReconciled: Boolean(record.wasReconciled),
    appliedAt: record.appliedAt || null,
    fulfillmentVerifiedAt: record.fulfillmentVerifiedAt || null,
    completedAt: record.completedAt || null,
    intendedAction: record.intendedAction || '',
    baselineExpiry: record.baselineExpiry || '',
    targetExpiry: record.targetExpiry || '',
    finalExpiry: record.finalExpiry || '',
    resolvedPlayerId: record.resolvedPlayerId || null,
    manualResolvedPlayerId: record.manualResolvedPlayerId || null,
    manualResolvedPlayerName: record.manualResolvedPlayerName || '',
    manualResolvedAt: record.manualResolvedAt || null,
    manualResolvedByUsername: record.manualResolvedByUsername || '',
    reviewResolvedAt: record.reviewResolvedAt || null,
    reviewResolvedByUsername: record.reviewResolvedByUsername || '',
    reviewResolutionReason: record.reviewResolutionReason || '',
    reviewResolutionNote: record.reviewResolutionNote || '',
    resolutionDiscordSentAt: record.resolutionDiscordSentAt || null,
    providerTitleRaw: record.providerTitleRaw || '',
    customerMessage: record.customerMessage || '',
    buyer: {
      displayName: record.buyer && record.buyer.displayName ? record.buyer.displayName : '',
      email: record.buyer && record.buyer.email ? record.buyer.email : '',
    },
    orderSnapshot: record.orderSnapshot || null,
  };
}

function normalizeListResponse(data = {}) {
  const itemsRaw = Array.isArray(data.data) ? data.data : [];
  const paginationRaw = data.pagination || {};
  return {
    success: Boolean(data.success),
    items: itemsRaw.map((record) => {
      const item = normalizePayment(record);
      delete item.buyer;
      return item;
    }),
    pagination: {
      currentPage: Number(paginationRaw.currentPage ?? paginationRaw.page ?? 1) || 1,
      totalPages: Number(paginationRaw.totalPages ?? paginationRaw.pages ?? 1) || 1,
      totalItems: Number(paginationRaw.totalItems ?? paginationRaw.total ?? itemsRaw.length) || 0,
    },
    stats: data.stats || {},
  };
}

async function getKofiPayments(params = {}) {
  const config = configuration();
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.review) search.set('review', String(params.review));
  if (params.status) search.set('status', String(params.status));
  if (params.source) search.set('source', String(params.source));
  if (params.outcome) search.set('outcome', String(params.outcome));
  if (params.q) search.set('q', String(params.q));
  const query = search.toString();
  const url = query ? `/admin/kofi-payments?${query}` : '/admin/kofi-payments';
  const response = await axiosInstance.get(url, config);
  return normalizeListResponse(response.data);
}

async function getKofiPayment(id) {
  const config = configuration();
  const response = await axiosInstance.get(`/admin/kofi-payments/${id}`, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizePayment(response.data?.data || {}),
  };
}

async function getKofiPaymentAudit(id) {
  const config = configuration();
  const response = await axiosInstance.get(`/admin/kofi-payments/${id}/audit`, config);
  return {
    success: Boolean(response.data?.success),
    data: Array.isArray(response.data?.data) ? response.data.data : [],
  };
}

async function searchRegisterSysPlayers(q) {
  const config = configuration();
  const search = new URLSearchParams();
  if (q) search.set('q', String(q));
  const response = await axiosInstance.get(`/admin/kofi-payments/registersys-search?${search}`, config);
  return {
    success: Boolean(response.data?.success),
    data: Array.isArray(response.data?.data) ? response.data.data : [],
  };
}

async function resolveKofiPaymentPlayer(id, playerId) {
  const config = configuration();
  const response = await axiosInstance.post(
    `/admin/kofi-payments/${id}/resolve-player`,
    { playerId },
    config
  );
  return {
    success: Boolean(response.data?.success),
    data: normalizePayment(response.data?.data || {}),
  };
}

async function fulfillKofiPayment(id) {
  const config = configuration();
  const response = await axiosInstance.post(`/admin/kofi-payments/${id}/fulfill`, {}, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizePayment(response.data?.data || {}),
    reconciled: Boolean(response.data?.reconciled),
  };
}

async function resolveKofiPaymentWithoutFulfillment(id, payload) {
  const config = configuration();
  const response = await axiosInstance.post(
    `/admin/kofi-payments/${id}/resolve-without-fulfillment`,
    payload,
    config
  );
  return {
    success: Boolean(response.data?.success),
    data: normalizePayment(response.data?.data || {}),
  };
}

export {
  getKofiPayments,
  getKofiPayment,
  getKofiPaymentAudit,
  searchRegisterSysPlayers,
  resolveKofiPaymentPlayer,
  fulfillKofiPayment,
  resolveKofiPaymentWithoutFulfillment,
  normalizePayment,
  normalizeListResponse,
};
