<template>
  <div class="commands-view">
    <div class="page-header">
      <h2 class="page-title">Commands</h2>
      <p class="page-subtitle">Send RCON commands and use quick server actions safely.</p>
    </div>

    <div class="status-grid">
      <div class="status-card">
        <span class="label">RCON Status</span>
        <span class="value" :class="statusClass">{{ rconStatus }}</span>
      </div>
      <div class="status-card">
        <span class="label">Last command</span>
        <span class="value value-mono">{{ lastCommand || '—' }}</span>
      </div>
      <div class="status-card">
        <span class="label">Last response time</span>
        <span class="value">{{ lastResponseTimeMs != null ? `${lastResponseTimeMs} ms` : '—' }}</span>
      </div>
      <div class="status-card">
        <span class="label">Last updated</span>
        <span class="value">{{ lastUpdatedDisplay }}</span>
      </div>
    </div>

    <div class="layout-grid">
      <section class="left-column">
        <div class="card console-card">
          <h3 class="card-title">Advanced RCON Console</h3>

          <form class="console-form" @submit.prevent="trySendCommand(command, { source: 'console' })">
            <label for="rcon-command">Raw command</label>
            <div class="console-input-row">
              <input
                id="rcon-command"
                v-model="command"
                type="text"
                class="form-control"
                placeholder="Example: amx_reloadadmins"
                autocomplete="off"
                :disabled="loading"
              >
              <button type="button" class="btn btn-secondary" :disabled="loading" @click="clearConsole">
                Clear
              </button>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Sending...' : 'Send Command' }}
              </button>
            </div>
          </form>

          <div v-if="error" class="alert error-alert">{{ error }}</div>

          <div class="terminal-wrap">
            <div class="terminal-header">
              <span>Command Output</span>
              <button type="button" class="btn btn-secondary small-btn" @click="clearOutput" :disabled="loading">
                Clear Output
              </button>
            </div>
            <pre class="terminal-output">{{ terminalText }}</pre>
          </div>
        </div>
      </section>

      <aside class="right-column">
        <div class="card">
          <div class="section-header">
            <h3 class="card-title">Quick Command Helpers</h3>
            <span class="muted-text">Use fills the console, Run sends immediately.</span>
          </div>

          <div class="helper-groups">
            <div v-for="group in helperGroups" :key="group.key" class="helper-group">
              <h4>{{ group.title }}</h4>
              <div class="helper-list">
                <div v-for="helper in group.items" :key="helper.key" class="helper-card">
                  <div class="helper-card-top">
                    <strong>{{ helper.title }}</strong>
                    <button
                      type="button"
                      class="favorite-btn"
                      :class="{ active: isFavorite(helper.key) }"
                      @click="toggleFavorite(helper.key)"
                    >
                      <i class="fas fa-star" :class="{ inactive: !isFavorite(helper.key) }" />
                    </button>
                  </div>
                  <p>{{ helper.description }}</p>

                  <div v-if="helper.fields?.length" class="helper-fields">
                    <div v-for="field in helper.fields" :key="field.key" class="field">
                      <label>{{ field.label }}</label>
                      <select
                        v-if="field.type === 'select'"
                        v-model="helperFieldValues[helper.key][field.key]"
                        class="form-control small-input"
                      >
                        <option
                          v-for="option in field.options"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <input
                        v-else
                        v-model="helperFieldValues[helper.key][field.key]"
                        type="text"
                        class="form-control small-input"
                        :placeholder="field.placeholder || ''"
                      >
                    </div>
                  </div>

                  <div class="helper-actions">
                    <button type="button" class="btn btn-secondary small-btn" @click="useHelper(helper)">
                      Use
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary small-btn"
                      :disabled="loading"
                      @click="runHelper(helper)"
                    >
                      Run
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="section-header">
            <h3 class="card-title">Recent Commands</h3>
            <button type="button" class="btn btn-secondary small-btn" @click="clearHistory">Clear history</button>
          </div>
          <div v-if="!recentCommands.length" class="empty-note">No recent commands yet.</div>
          <ul v-else class="recent-list">
            <li v-for="entry in recentCommands" :key="entry.id">
              <button type="button" class="recent-command" @click="command = entry.command">
                {{ entry.command }}
              </button>
              <button
                type="button"
                class="btn btn-secondary tiny-btn"
                :disabled="loading"
                @click="trySendCommand(entry.command, { source: 'history' })"
              >
                Run again
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <div v-if="confirmState.visible" class="custom-modal-overlay" @click="closeConfirm">
      <div class="custom-modal" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">Confirm command</h5>
          <button class="btn-close" type="button" @click="closeConfirm">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ confirmState.message }}</p>
          <pre class="confirm-command">{{ confirmState.command }}</pre>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeConfirm">Cancel</button>
          <button type="button" class="btn btn-primary" :disabled="loading" @click="confirmAndRun">
            {{ loading ? 'Running...' : 'Run command' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configuration from '../config/config';
import axiosInstance from '../config/axios';

const RECENT_KEY = 'dashboard:rcon:recent';
const FAVORITES_KEY = 'dashboard:rcon:favorites';

export default {
  name: 'DashboardCommands',
  data() {
    return {
      command: '',
      loading: false,
      error: '',
      outputHistory: [],
      rconStatus: 'Unknown',
      lastCommand: '',
      lastResponseTimeMs: null,
      lastUpdatedAt: null,
      recentCommands: [],
      favoriteKeys: [],
      confirmState: {
        visible: false,
        command: '',
        message: '',
      },
      helperGroups: [
        {
          key: 'basic',
          title: 'Basic',
          items: [
            {
              key: 'reload-admins',
              title: 'Reload Admins',
              description: 'Reloads admins from AMX admin file',
              command: 'amx_reloadadmins',
            },
            {
              key: 'show-online-admins',
              title: 'Show Online Admins',
              description: 'Shows online admins and access',
              command: 'amx_who',
            },
            {
              key: 'server-status',
              title: 'Server Status',
              description: 'Shows server and player status',
              command: 'status',
            },
          ],
        },
        {
          key: 'messages',
          title: 'Messages',
          items: [
            {
              key: 'server-chat-message',
              title: 'Server Chat Message',
              description: 'Sends a message to all players',
              template: 'amx_say {message}',
              fields: [{ key: 'message', label: 'Message', type: 'text', placeholder: 'Server restart in 5 minutes' }],
            },
            {
              key: 'center-message',
              title: 'Center Message',
              description: 'Sends a centered message to all players',
              template: 'amx_csay {color} {message}',
              fields: [
                {
                  key: 'color',
                  label: 'Color',
                  type: 'select',
                  options: [
                    { label: 'Red', value: 'red' },
                    { label: 'Green', value: 'green' },
                    { label: 'Blue', value: 'blue' },
                    { label: 'Yellow', value: 'yellow' },
                    { label: 'White', value: 'white' },
                  ],
                },
                { key: 'message', label: 'Message', type: 'text', placeholder: 'Round starts now' },
              ],
            },
          ],
        },
        {
          key: 'map-round',
          title: 'Map / Round',
          items: [
            {
              key: 'change-map',
              title: 'Change Map',
              description: 'Changes the map',
              template: 'amx_map {map}',
              fields: [{ key: 'map', label: 'Map', type: 'text', placeholder: 'de_dust2' }],
              requiresConfirm: true,
            },
            {
              key: 'restart-round',
              title: 'Restart Round',
              description: 'Restarts the current round',
              command: 'sv_restartround 1',
              requiresConfirm: true,
            },
          ],
        },
        {
          key: 'amx',
          title: 'AMX',
          items: [
            {
              key: 'list-plugins',
              title: 'List Plugins',
              description: 'Shows loaded AMXX plugins',
              command: 'amx_plugins',
            },
            {
              key: 'list-modules',
              title: 'List Modules',
              description: 'Shows loaded AMXX modules',
              command: 'amx_modules',
            },
          ],
        },
      ],
      helperFieldValues: {},
      lastUpdatedTimer: null,
    };
  },
  computed: {
    terminalText() {
      if (!this.outputHistory.length) {
        return '> Waiting for command output...';
      }
      return this.outputHistory
        .slice(0, 20)
        .map((entry) => {
          const header = `[${entry.time}] > ${entry.command}`;
          const body = entry.success ? entry.output : `ERROR: ${entry.output}`;
          return `${header}\n${body}`;
        })
        .join('\n\n');
    },
    statusClass() {
      if (this.rconStatus === 'Connected') return 'status-connected';
      if (this.rconStatus === 'Error') return 'status-error';
      return 'status-unknown';
    },
    lastUpdatedDisplay() {
      if (!this.lastUpdatedAt) return '—';
      try {
        return new Date(this.lastUpdatedAt).toLocaleTimeString();
      } catch {
        return '—';
      }
    },
  },
  created() {
    this.initializeHelperFields();
    this.loadPersistedState();
    this.lastUpdatedTimer = setInterval(() => {
      this.lastUpdatedAt = Date.now();
    }, 30000);
  },
  beforeUnmount() {
    if (this.lastUpdatedTimer) {
      clearInterval(this.lastUpdatedTimer);
      this.lastUpdatedTimer = null;
    }
  },
  methods: {
    initializeHelperFields() {
      const values = {};
      this.helperGroups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.fields?.length) {
            values[item.key] = {};
            item.fields.forEach((field) => {
              if (field.type === 'select') {
                values[item.key][field.key] = field.options?.[0]?.value || '';
              } else {
                values[item.key][field.key] = '';
              }
            });
          }
        });
      });
      this.helperFieldValues = values;
    },
    loadPersistedState() {
      try {
        const recentRaw = sessionStorage.getItem(RECENT_KEY);
        if (recentRaw) {
          const parsed = JSON.parse(recentRaw);
          if (Array.isArray(parsed)) {
            this.recentCommands = parsed.slice(0, 10);
          }
        }
      } catch {
        this.recentCommands = [];
      }

      try {
        const favoritesRaw = sessionStorage.getItem(FAVORITES_KEY);
        if (favoritesRaw) {
          const parsed = JSON.parse(favoritesRaw);
          if (Array.isArray(parsed)) {
            this.favoriteKeys = parsed;
            this.sortHelpersByFavorites();
          }
        }
      } catch {
        this.favoriteKeys = [];
      }
    },
    persistRecent() {
      sessionStorage.setItem(RECENT_KEY, JSON.stringify(this.recentCommands.slice(0, 10)));
    },
    persistFavorites() {
      sessionStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favoriteKeys));
    },
    addRecentCommand(rawCommand) {
      const command = rawCommand.trim();
      if (!command) return;
      if (this.isSensitiveCommand(command)) return;

      this.recentCommands = [
        { id: `${Date.now()}-${Math.random()}`, command },
        ...this.recentCommands.filter((entry) => entry.command !== command),
      ].slice(0, 10);
      this.persistRecent();
    },
    clearHistory() {
      this.recentCommands = [];
      sessionStorage.removeItem(RECENT_KEY);
    },
    clearConsole() {
      this.command = '';
      this.error = '';
    },
    clearOutput() {
      this.outputHistory = [];
    },
    closeConfirm() {
      if (this.loading) return;
      this.confirmState.visible = false;
      this.confirmState.command = '';
      this.confirmState.message = '';
    },
    openConfirm(command, message) {
      this.confirmState.visible = true;
      this.confirmState.command = command;
      this.confirmState.message = message;
    },
    confirmAndRun() {
      const command = this.confirmState.command;
      this.closeConfirm();
      this.sendCommand(command, { source: 'confirm' });
    },
    normalizeCommand(rawCommand) {
      if (typeof rawCommand !== 'string') return '';
      return rawCommand.trim();
    },
    hasNewline(command) {
      return /[\n\r]/.test(command);
    },
    isDangerousCommand(command) {
      return /\b(quit|exit|rcon_password|exec|amx_map|sv_restartround)\b/i.test(command);
    },
    isSensitiveCommand(command) {
      return /\b(password|token|secret)\b/i.test(command);
    },
    validateCommand(command) {
      if (!command) return 'Command cannot be empty.';
      if (this.hasNewline(command)) return 'Multiple commands separated by newline are not allowed.';
      return '';
    },
    trySendCommand(rawCommand, { source = 'console', requiresConfirm = false } = {}) {
      const command = this.normalizeCommand(rawCommand);
      const validationError = this.validateCommand(command);
      if (validationError) {
        this.error = validationError;
        return;
      }

      const dangerous = this.isDangerousCommand(command);
      if (requiresConfirm || dangerous) {
        const message = requiresConfirm
          ? 'This action may affect live players. Confirm before running.'
          : 'This command is potentially dangerous. Confirm before running.';
        this.openConfirm(command, message);
        return;
      }

      this.sendCommand(command, { source });
    },
    async sendCommand(command, { source = 'console' } = {}) {
      this.loading = true;
      this.error = '';
      const startedAt = performance.now();

      try {
        const config = configuration();
        const response = await axiosInstance.post(
          '/rcon/command',
          { command },
          config
        );

        const elapsed = Math.round(performance.now() - startedAt);
        const success = Boolean(response?.data?.success);
        const output = success
          ? String(response?.data?.response || '(No output)')
          : String(response?.data?.message || 'Failed to execute command.');

        this.outputHistory.unshift({
          command,
          output,
          success,
          time: new Date().toLocaleTimeString(),
          source,
        });

        this.rconStatus = success ? 'Connected' : 'Error';
        this.lastCommand = command;
        this.lastResponseTimeMs = elapsed;
        this.lastUpdatedAt = Date.now();

        if (!success) {
          this.error = output;
        } else {
          this.command = command;
          this.addRecentCommand(command);
        }
      } catch (err) {
        const elapsed = Math.round(performance.now() - startedAt);
        const output = err?.response?.data?.error || 'Server error. Try again.';
        this.outputHistory.unshift({
          command,
          output,
          success: false,
          time: new Date().toLocaleTimeString(),
          source,
        });
        this.rconStatus = 'Error';
        this.lastCommand = command;
        this.lastResponseTimeMs = elapsed;
        this.lastUpdatedAt = Date.now();
        this.error = output;
      } finally {
        this.loading = false;
      }
    },
    buildHelperCommand(helper) {
      if (helper.command) {
        return helper.command;
      }

      let built = helper.template || '';
      if (helper.fields?.length) {
        helper.fields.forEach((field) => {
          const value = this.helperFieldValues?.[helper.key]?.[field.key] ?? '';
          built = built.replace(`{${field.key}}`, String(value).trim());
        });
      }

      return built.trim();
    },
    useHelper(helper) {
      const built = this.buildHelperCommand(helper);
      const validationError = this.validateCommand(built);
      if (validationError) {
        this.error = validationError;
        return;
      }
      this.error = '';
      this.command = built;
    },
    runHelper(helper) {
      const built = this.buildHelperCommand(helper);
      this.trySendCommand(built, { source: 'helper', requiresConfirm: Boolean(helper.requiresConfirm) });
    },
    isFavorite(key) {
      return this.favoriteKeys.includes(key);
    },
    toggleFavorite(key) {
      if (this.isFavorite(key)) {
        this.favoriteKeys = this.favoriteKeys.filter((item) => item !== key);
      } else {
        this.favoriteKeys = [key, ...this.favoriteKeys];
      }
      this.persistFavorites();
      this.sortHelpersByFavorites();
    },
    sortHelpersByFavorites() {
      this.helperGroups = this.helperGroups.map((group) => {
        const items = [...group.items].sort((a, b) => {
          const aFav = this.isFavorite(a.key) ? 0 : 1;
          const bFav = this.isFavorite(b.key) ? 0 : 1;
          return aFav - bFav;
        });
        return { ...group, items };
      });
    },
  },
};
</script>

<style scoped>
.commands-view {
  max-width: 1360px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
}

.page-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.status-card {
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.value {
  color: #1e293b;
  font-weight: 700;
}

.value-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  font-weight: 600;
}

.status-connected {
  color: #059669;
}

.status-unknown {
  color: #475569;
}

.status-error {
  color: #dc2626;
}

.layout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 18px;
}

.card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
  padding: 18px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}

.console-form {
  display: grid;
  gap: 8px;
}

.console-form label {
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
}

.console-input-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
}

.form-control {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
}

.form-control:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.65;
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

.small-btn {
  padding: 7px 11px;
  font-size: 12px;
}

.tiny-btn {
  padding: 5px 9px;
  font-size: 11px;
}

.error-alert {
  margin-top: 10px;
  margin-bottom: 0;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 10px;
  padding: 10px 12px;
}

.terminal-wrap {
  margin-top: 14px;
  border: 1px solid #0f172a;
  border-radius: 12px;
  overflow: hidden;
}

.terminal-header {
  background: #0f172a;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 600;
}

.terminal-output {
  margin: 0;
  background: #020617;
  color: #e2e8f0;
  min-height: 220px;
  max-height: 520px;
  overflow: auto;
  padding: 12px;
  white-space: pre-wrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.muted-text {
  color: #64748b;
  font-size: 12px;
}

.helper-groups {
  display: grid;
  gap: 12px;
}

.helper-group h4 {
  margin: 0 0 8px;
  color: #334155;
  font-size: 14px;
}

.helper-list {
  display: grid;
  gap: 10px;
}

.helper-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px;
  background: #f8fafc;
}

.helper-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.helper-card p {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 12px;
}

.favorite-btn {
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 6px;
}

.favorite-btn.active {
  color: #f59e0b;
}

.favorite-btn .inactive {
  opacity: 0.35;
}

.favorite-btn:hover {
  background: #e2e8f0;
}

.helper-fields {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
}

.field {
  display: grid;
  gap: 4px;
}

.field label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #64748b;
  font-weight: 600;
}

.small-input {
  padding: 8px 10px;
  font-size: 12px;
}

.helper-actions {
  display: flex;
  gap: 6px;
}

.empty-note {
  font-size: 13px;
  color: #64748b;
}

.recent-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.recent-list li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px;
  align-items: center;
}

.recent-command {
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #f8fafc;
  color: #1e293b;
  text-align: left;
  font-size: 12px;
  padding: 8px 10px;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.recent-command:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.custom-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.custom-modal {
  background: white;
  border-radius: 14px;
  width: 92%;
  max-width: 560px;
}

.modal-header {
  border-bottom: 1px solid #e2e8f0;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 16px;
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

.modal-body p {
  margin: 0 0 10px;
  color: #475569;
}

.confirm-command {
  margin: 0;
  background: #0f172a;
  color: #f8fafc;
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
  white-space: pre-wrap;
}

.modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

@media (max-width: 980px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .console-input-row {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>