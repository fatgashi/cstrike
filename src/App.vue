<template>
  <div class="app">
    <router-view></router-view>
    <LoginModal ref="loginModal" />
  </div>
</template>

<script>
import LoginModal from './components/LoginModal.vue';
import { eventBus } from './router';
export default {
  name: 'App',
  components: {
    LoginModal,
  },
  mounted() {
    // ✅ Listen for the event
    eventBus.on("showLoginModal", () => {
      console.log("🔥 showLoginModal event received in App.vue");
      if (this.$refs.loginModal) {
        this.$refs.loginModal.modal.show();
      } else {
        console.error("❌ LoginModal component reference not found.");
      }
    });
  }
}
</script>

