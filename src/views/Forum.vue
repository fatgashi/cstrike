<template>
  <div class="container">
    <h2 class="text-center mb-4">Forum</h2>
    <div class="row">
      <!-- Admin Applications -->
      <div class="col-md-4 mb-3">
        <router-link to="/forum/admin-applications" class="text-decoration-none">
          <div class="card forum-card" :style="{ backgroundImage: 'url(' + require('@/assets/forum/admin-applications.webp') + ')' }">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <h4 class="fw-bolder" style="color: #ff1a1a;">Admin Applications</h4>
              <p>View all admin applications and vote.</p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-4 mb-3">
        <router-link to="/forum/admin-promotions" class="text-decoration-none">
          <div class="card forum-card" :style="{ backgroundImage: 'url(' + require('@/assets/forum/admin-promotions.png') + ')' }">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <h4 class="fw-bolder" style="color: #ff1a1a;">Admin Promotions</h4>
              <p>View all admin promotions and vote.</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Rules -->
      <div class="col-md-4 mb-3">
        <router-link to="/forum/rules" class="text-decoration-none">
          <div class="card forum-card" :style="{ backgroundImage: 'url(' + require('@/assets/forum/rules.webp') + ')' }">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <h4 class="fw-bolder" style="color: #ff1a1a;">Rules</h4>
              <p>Read the server rules and guidelines.</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Announcements -->
      <div class="col-md-4 mb-3">
        <router-link to="" class="text-decoration-none">
          <div class="card forum-card" :style="{ backgroundImage: 'url(' + require('@/assets/forum/announcements.webp') + ')' }">
            <div class="card-body text-center d-flex flex-column justify-content-center">
              <h4 class="fw-bolder" style="color: #ff1a1a;">Announcements</h4>
              <p>Stay updated with server news.</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForumView"
};
</script>

<style scoped>
.forum-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  min-height: 250px;
  height: auto; 
}

/* Add a semi-transparent overlay for readability */
.forum-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border-radius: 10px;
}

.forum-card .card-body {
  position: relative;
  z-index: 2;
}

.forum-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.forum-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
}
</style>
