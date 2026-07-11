import axiosInstance from '../config/axios';
import configuration from '../config/config';
import { sanitizeScheduledMessagePayload } from '../helpers/scheduledMessagePayloadHelper';

function normalizeRecord(record = {}) {
  return {
    id: record.id || record._id || '',
    name: record.name || '',
    message: record.message || '',
    cronExpression: record.cronExpression || '',
    timezone: record.timezone || 'Europe/Belgrade',
    enabled: Boolean(record.enabled),
    lastRunAt: record.lastRunAt || null,
    lastStatus: record.lastStatus || null,
    lastError: record.lastError || null,
    createdAt: record.createdAt || null,
    updatedAt: record.updatedAt || null,
  };
}

function normalizeListResponse(data = {}) {
  const itemsRaw = Array.isArray(data.data) ? data.data : [];
  const paginationRaw = data.pagination || {};

  const currentPage =
    paginationRaw.currentPage ?? paginationRaw.page ?? paginationRaw.current_page ?? 1;
  const totalPages =
    paginationRaw.totalPages ?? paginationRaw.pages ?? paginationRaw.total_pages ?? 1;
  const totalItems =
    paginationRaw.totalItems ??
    paginationRaw.total ??
    paginationRaw.totalApplications ??
    itemsRaw.length;

  return {
    success: Boolean(data.success),
    items: itemsRaw.map(normalizeRecord),
    pagination: {
      currentPage: Number(currentPage) || 1,
      totalPages: Number(totalPages) || 1,
      totalItems: Number(totalItems) || 0,
    },
  };
}

async function getScheduledServerMessages(params = {}) {
  const config = configuration();
  const search = new URLSearchParams();

  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (typeof params.enabled === 'boolean') search.set('enabled', String(params.enabled));

  const query = search.toString();
  const url = query ? `/admin/server-messages?${query}` : '/admin/server-messages';
  const response = await axiosInstance.get(url, config);
  return normalizeListResponse(response.data);
}

async function getScheduledServerMessage(id) {
  const config = configuration();
  const response = await axiosInstance.get(`/admin/server-messages/${id}`, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizeRecord(response.data?.data || {}),
  };
}

async function createScheduledServerMessage(payload) {
  const config = configuration();
  const safePayload = sanitizeScheduledMessagePayload(payload);
  const response = await axiosInstance.post('/admin/server-messages', safePayload, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizeRecord(response.data?.data || {}),
    warning: response.data?.warning || null,
  };
}

async function updateScheduledServerMessage(id, payload) {
  const config = configuration();
  const safePayload = sanitizeScheduledMessagePayload(payload);
  const response = await axiosInstance.patch(`/admin/server-messages/${id}`, safePayload, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizeRecord(response.data?.data || {}),
    warning: response.data?.warning || null,
  };
}

async function deleteScheduledServerMessage(id) {
  const config = configuration();
  const response = await axiosInstance.delete(`/admin/server-messages/${id}`, config);
  return response.data;
}

async function toggleScheduledServerMessage(id, enabled) {
  const config = configuration();
  const payload = {};
  if (typeof enabled === 'boolean') {
    payload.enabled = enabled;
  }
  const response = await axiosInstance.post(`/admin/server-messages/${id}/toggle`, payload, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizeRecord(response.data?.data || {}),
  };
}

async function sendScheduledServerMessageNow(id) {
  const config = configuration();
  const response = await axiosInstance.post(`/admin/server-messages/${id}/send-now`, {}, config);
  return {
    success: Boolean(response.data?.success),
    data: normalizeRecord(response.data?.data || {}),
    message: response.data?.message || '',
  };
}

export {
  getScheduledServerMessages,
  getScheduledServerMessage,
  createScheduledServerMessage,
  updateScheduledServerMessage,
  deleteScheduledServerMessage,
  toggleScheduledServerMessage,
  sendScheduledServerMessageNow,
  normalizeListResponse,
  normalizeRecord,
};
