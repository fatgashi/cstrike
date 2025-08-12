<template>
    <div class="container my-5">
      <div class="rcon-box bg-dark text-white p-4 rounded shadow-lg">
        <h3 class="mb-4">🛠 RCON Command Console</h3>
  
        <form @submit.prevent="sendRconCommand">
          <div class="form-group mb-3">
            <label for="commandInput">Enter RCON Command:</label>
            <input
              v-model="command"
              type="text"
              id="commandInput"
              class="form-control bg-dark text-white border-secondary"
              placeholder="e.g., status"
              required
            />
          </div>
  
          <button type="submit" class="btn btn-warning w-100 fw-bold">Send Command</button>
        </form>
  
        <div v-if="response !== null" class="mt-4">
          <h5>🔧 Server Response:</h5>
          <pre class="bg-black p-3 rounded text-white overflow-auto">{{ response }}</pre>
        </div>
  
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
import configuration from '../config/config';
import axiosInstance from '../config/axios'

  export default {
    name: "RconView",
    data() {
      return {
        command: "",
        response: null,
        error: null
      };
    },
    methods: {
      async sendRconCommand() {
        this.response = null;
        this.error = null;
  
        try {
            const config = configuration();
          const res = await axiosInstance.post("/rcon/command", {
            command: this.command
          }, config);
  
          if (res.data.success) {
            this.response = res.data.response;
          } else {
            this.error = res.data.message || "Failed to execute command.";
          }
        } catch (err) {
          this.error = err.response?.data?.error || "Server error. Try again.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .rcon-box {
    max-width: 600px;
    margin: auto;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
    font-size: 0.95rem;
    max-height: 400px;
  }
  </style>
  