<template>
  <div class="custom-modal-overlay" @click="$emit('close')">
    <div class="custom-modal" @click.stop data-testid="scheduled-message-form">
      <div class="modal-header">
        <h5 class="modal-title">
          <i class="fas fa-bullhorn" />
          {{ isEditMode ? 'Edit scheduled message' : 'Add scheduled message' }}
        </h5>
        <button type="button" class="btn-close" @click="$emit('close')">
          <i class="fas fa-times" />
        </button>
      </div>

      <form class="modal-body" @submit.prevent="submitForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="sm-name">Name</label>
            <input
              id="sm-name"
              v-model.trim="form.name"
              type="text"
              class="form-control"
              maxlength="120"
              placeholder="Discord promotion"
              required
            >
            <small class="form-text">{{ form.name.length }}/120</small>
          </div>

          <div class="form-group">
            <label class="form-label" for="sm-timezone">Timezone</label>
            <select id="sm-timezone" v-model="form.timezone" class="form-control">
              <option v-for="tz in TIMEZONE_OPTIONS" :key="tz.value" :value="tz.value">
                {{ tz.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="sm-message">Message</label>
          <div class="color-toolbar" role="toolbar" aria-label="CS color formatting toolbar">
            <button
              type="button"
              class="toolbar-btn"
              @click="applyColor('$1')"
            >
              Yellow / Default (`$1`)
            </button>
            <button
              type="button"
              class="toolbar-btn"
              @click="applyColor('$3')"
            >
              Team Color (`$3`)
            </button>
            <button
              type="button"
              class="toolbar-btn green"
              @click="applyColor('$4')"
            >
              Green (`$4`)
            </button>
            <button
              type="button"
              class="toolbar-btn danger"
              @click="clearColorFormatting"
            >
              Clear formatting
            </button>
          </div>
          <textarea
            id="sm-message"
            ref="messageTextareaRef"
            v-model="form.message"
            class="form-control"
            rows="4"
            maxlength="220"
            placeholder="$4[WCS] $1Join our Discord and receive 100 points!"
            required
          />
          <small class="form-text">
            {{ form.message.length }}/220. Line breaks are not supported by backend validation.
          </small>
        </div>

        <div class="preview-box">
          <div class="preview-label">Message preview (safe render)</div>
          <div v-if="!colorPreviewSegments.length" class="preview-content">—</div>
          <div v-else class="preview-content">
            <span
              v-for="(segment, index) in colorPreviewSegments"
              :key="`${segment.code}-${index}`"
              :class="['preview-segment', `segment-${segment.code.replace('$', '')}`]"
            >
              {{ segment.text }}
            </span>
          </div>
        </div>

        <div class="schedule-section">
          <h6>Schedule configuration</h6>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="sm-schedule-type">Schedule type</label>
              <select id="sm-schedule-type" v-model="form.scheduleType" class="form-control">
                <option :value="SCHEDULE_TYPES.INTERVAL">Every X minutes</option>
                <option :value="SCHEDULE_TYPES.HOURLY">Hourly</option>
                <option :value="SCHEDULE_TYPES.DAILY">Daily</option>
                <option :value="SCHEDULE_TYPES.WEEKLY">Weekly</option>
                <option :value="SCHEDULE_TYPES.CUSTOM">Custom cron expression</option>
              </select>
            </div>

            <div v-if="form.scheduleType === SCHEDULE_TYPES.INTERVAL" class="form-group">
              <label class="form-label" for="sm-interval">Interval in minutes</label>
              <select id="sm-interval" v-model.number="form.intervalMinutes" class="form-control">
                <option v-for="value in SAFE_INTERVAL_PRESETS" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>

            <template v-if="form.scheduleType === SCHEDULE_TYPES.HOURLY">
              <div class="form-group">
                <label class="form-label" for="sm-minute-hourly">Minute</label>
                <input
                  id="sm-minute-hourly"
                  v-model.number="form.minute"
                  type="number"
                  class="form-control"
                  min="0"
                  max="59"
                >
              </div>
            </template>

            <template
              v-if="form.scheduleType === SCHEDULE_TYPES.DAILY || form.scheduleType === SCHEDULE_TYPES.WEEKLY"
            >
              <div class="form-group">
                <label class="form-label" for="sm-hour">Hour</label>
                <input
                  id="sm-hour"
                  v-model.number="form.hour"
                  type="number"
                  class="form-control"
                  min="0"
                  max="23"
                >
              </div>
              <div class="form-group">
                <label class="form-label" for="sm-minute">Minute</label>
                <input
                  id="sm-minute"
                  v-model.number="form.minute"
                  type="number"
                  class="form-control"
                  min="0"
                  max="59"
                >
              </div>
            </template>

            <div v-if="form.scheduleType === SCHEDULE_TYPES.WEEKLY" class="form-group">
              <label class="form-label" for="sm-weekday">Weekday</label>
              <select id="sm-weekday" v-model.number="form.weekday" class="form-control">
                <option v-for="day in WEEKDAY_OPTIONS" :key="day.value" :value="day.value">
                  {{ day.label }}
                </option>
              </select>
            </div>

            <div v-if="form.scheduleType === SCHEDULE_TYPES.CUSTOM" class="form-group full-width">
              <label class="form-label" for="sm-custom-cron">Cron expression</label>
              <input
                id="sm-custom-cron"
                v-model.trim="form.customCronExpression"
                type="text"
                class="form-control"
                placeholder="*/12 * * * *"
              >
              <small class="form-text">minute hour day-of-month month day-of-week</small>
            </div>
          </div>

          <div class="cron-preview">
            <div class="preview-label">Generated cron expression</div>
            <code>{{ previewCronExpression }}</code>
          </div>
        </div>

        <label class="checkbox-item">
          <input v-model="form.enabled" type="checkbox">
          <span class="checkmark" />
          <span class="checkbox-label">Enable this scheduled message</span>
        </label>
        <small class="form-text">Disabled messages remain saved but are not sent automatically.</small>

        <div v-if="formError" class="alert error-alert">{{ formError }}</div>
      </form>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          data-testid="scheduled-message-submit"
          :disabled="submitting"
          @click="submitForm"
        >
          <span v-if="submitting" class="spinner-border spinner-border-sm me-2" role="status" />
          {{ isEditMode ? 'Save changes' : 'Create message' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue';
import {
  SCHEDULE_TYPES,
  SAFE_INTERVAL_PRESETS,
  TIMEZONE_OPTIONS,
  WEEKDAY_OPTIONS,
  buildCronExpression,
  parseCronExpression,
} from '../helpers/scheduledMessageScheduleHelper';
import { sanitizeScheduledMessagePayload } from '../helpers/scheduledMessagePayloadHelper';
import {
  applyColorToken,
  clearColorTokens,
  parseColorSegments,
} from '../helpers/scheduledMessageColorHelper';

const props = defineProps({
  mode: {
    type: String,
    default: 'create',
  },
  record: {
    type: Object,
    default: null,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'submit']);
const messageTextareaRef = ref(null);

const form = reactive({
  name: '',
  message: '',
  scheduleType: SCHEDULE_TYPES.INTERVAL,
  intervalMinutes: 12,
  minute: 0,
  hour: 0,
  weekday: 1,
  customCronExpression: '',
  timezone: 'Europe/Belgrade',
  enabled: true,
});

const formError = computed(() => {
  if (!String(form.name || '').trim()) return 'Name is required.';
  if (!String(form.message || '').trim()) return 'Message is required.';
  if (/[\r\n]/.test(form.message)) return 'Message cannot contain line breaks.';
  if (String(form.message || '').length > 220) return 'Message cannot exceed 220 characters.';
  if (String(form.name || '').length > 120) return 'Name cannot exceed 120 characters.';

  try {
    buildCronExpression({
      scheduleType: form.scheduleType,
      intervalMinutes: form.intervalMinutes,
      minute: form.minute,
      hour: form.hour,
      weekday: form.weekday,
      customCronExpression: form.customCronExpression,
    });
    return '';
  } catch (error) {
    return error.message || 'Invalid schedule configuration.';
  }
});

const previewCronExpression = computed(() => {
  try {
    return buildCronExpression({
      scheduleType: form.scheduleType,
      intervalMinutes: form.intervalMinutes,
      minute: form.minute,
      hour: form.hour,
      weekday: form.weekday,
      customCronExpression: form.customCronExpression,
    });
  } catch {
    return 'Invalid schedule';
  }
});

const isEditMode = computed(() => props.mode === 'edit');

const colorPreviewSegments = computed(() => parseColorSegments(form.message));

function loadFromRecord(record) {
  if (!record) return;
  const parsed = parseCronExpression(record.cronExpression || '');
  form.name = record.name || '';
  form.message = record.message || '';
  form.scheduleType = parsed.type;
  form.intervalMinutes = parsed.intervalMinutes ?? 12;
  form.minute = parsed.minute ?? 0;
  form.hour = parsed.hour ?? 0;
  form.weekday = parsed.weekday ?? 1;
  form.customCronExpression = parsed.customCronExpression || record.cronExpression || '';
  form.timezone = record.timezone || 'Europe/Belgrade';
  form.enabled = Boolean(record.enabled);
}

function resetForm() {
  form.name = '';
  form.message = '';
  form.scheduleType = SCHEDULE_TYPES.INTERVAL;
  form.intervalMinutes = 12;
  form.minute = 0;
  form.hour = 0;
  form.weekday = 1;
  form.customCronExpression = '';
  form.timezone = 'Europe/Belgrade';
  form.enabled = true;
}

watch(
  () => props.record,
  (record) => {
    if (record && isEditMode.value) {
      loadFromRecord(record);
      return;
    }
    resetForm();
  },
  { immediate: true }
);

function submitForm() {
  if (formError.value) return;

  const payload = sanitizeScheduledMessagePayload({
    name: String(form.name || '').trim(),
    message: String(form.message || '').trim(),
    cronExpression: previewCronExpression.value,
    timezone: form.timezone || 'Europe/Belgrade',
    enabled: Boolean(form.enabled),
  });

  emit('submit', payload);
}

function focusTextareaWithSelection(start, end) {
  nextTick(() => {
    const textarea = messageTextareaRef.value;
    if (!textarea) return;
    textarea.focus();
    textarea.setSelectionRange(start, end);
  });
}

function applyColor(code) {
  const textarea = messageTextareaRef.value;
  const start = textarea?.selectionStart ?? form.message.length;
  const end = textarea?.selectionEnd ?? form.message.length;
  const result = applyColorToken({
    text: form.message,
    selectionStart: start,
    selectionEnd: end,
    token: code,
  });
  form.message = result.value;
  focusTextareaWithSelection(result.selectionStart, result.selectionEnd);
}

function clearColorFormatting() {
  const textarea = messageTextareaRef.value;
  const start = textarea?.selectionStart ?? 0;
  const end = textarea?.selectionEnd ?? 0;
  const result = clearColorTokens({
    text: form.message,
    selectionStart: start,
    selectionEnd: end,
  });
  form.message = result.value;
  focusTextareaWithSelection(result.selectionStart, result.selectionEnd);
}
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
  width: min(860px, 95vw);
  max-height: 92vh;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 18px 22px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  border-bottom: none;
  border-top: 1px solid #e2e8f0;
  justify-content: flex-end;
  gap: 10px;
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
  cursor: pointer;
  color: #64748b;
}

.modal-body {
  padding: 20px 22px;
  overflow-y: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
}

.form-control {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  padding: 10px 12px;
  font-size: 14px;
}

.color-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.toolbar-btn {
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  border-radius: 8px;
  padding: 6px 9px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.toolbar-btn.green {
  background: #dcfce7;
  border-color: #86efac;
  color: #166534;
}

.toolbar-btn.danger {
  background: #fee2e2;
  border-color: #fecaca;
  color: #991b1b;
}

.preview-box,
.cron-preview {
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 14px;
  background: #f8fafc;
}

.preview-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600;
  margin-bottom: 4px;
}

.preview-content {
  white-space: pre-wrap;
  word-break: break-word;
  color: #1e293b;
}

.preview-segment {
  white-space: pre-wrap;
}

.segment-1 {
  color: #a16207;
}

.segment-3 {
  color: #1d4ed8;
}

.segment-4 {
  color: #166534;
}

.schedule-section h6 {
  margin: 0 0 10px;
  color: #1e293b;
}

.checkbox-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-item input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  display: inline-block;
  position: relative;
}

.checkbox-item input:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-item input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: #fff;
  font-size: 12px;
  left: 3px;
  top: -1px;
}

.checkbox-label {
  color: #1e293b;
  font-weight: 500;
}

.form-text {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
}

.alert.error-alert {
  margin-top: 12px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  padding: 10px 12px;
  border-radius: 9px;
}

.btn {
  border: none;
  border-radius: 9px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.btn-secondary {
  color: #334155;
  background: #e2e8f0;
}
</style>
