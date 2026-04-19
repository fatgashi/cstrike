<template>
  <div class="app">
    <router-view></router-view>
    <LoginModal ref="loginModal" />
  </div>
</template>

<script>
import LoginModal from './components/LoginModal.vue';
export default {
  name: 'App',
  components: {
    LoginModal,
  },
}
</script>

