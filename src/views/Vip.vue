<template>
    <div>
        <br><br>
        <div class="vip-info container">
          <!-- Header -->
          <h1 class="text-center mb-4 fw-bolder" style="color: #ff8000;">VIP Benefits</h1>
      
          <!-- VIP Skins Section -->
          <section class="vip-section">
            <h2 class="vip-header fw-bolder">Exclusive VIP Skins</h2>
            <p>As a VIP member, you gain access to exclusive character and weapon skins to stand out on the battlefield.</p>
            <div class="row">
              <div class="col-md-6 mb-4" v-for="(skin, index) in vipSkins" :key="index">
                <div class="card">
                  <img :src="skin.image" :alt="skin.name" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title fw-bolder">{{ skin.name }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <!-- VIP Menu Guns Section -->
          <section class="vip-section">
            <h2 class="vip-header fw-bolder">VIP Normal Guns</h2>
            <p>Unlock powerful guns without any ammo as a VIP member. Equip these to dominate your opponents.</p>
            <div class="row">
              <div class="col-md-4 mb-4" v-for="(gun, index) in vipNormalGuns" :key="index">
                <div class="card">
                  <img :src="gun.image" :alt="gun.name" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title fw-bolder">{{ gun.name }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- VIP Menu Guns Section -->
          <section class="vip-section">
            <h2 class="vip-header fw-bolder">VIP Menu Guns</h2>
            <p>Unlock powerful guns and special weapons from VIP MENU. Equip these and make extra damage to your opponents.</p>
            <div class="row">
              <div class="col-md-4 mb-4" v-for="(gun, index) in vipGuns" :key="index">
                <div class="card">
                  <img :src="gun.image" :alt="gun.name" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title fw-bolder">{{ gun.name }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="vip-section">
            <h2 class="vip-header fw-bolder">Exclusive Zombie Classes</h2>
            <p>As a VIP member, you gain access to unique zombie classes, each with special abilities.</p>
            <div class="row">
                <div class="col-md-4 mb-4" v-for="(zombie, index) in zombieClasses" :key="index">
                <div class="card">
                    <img :src="zombie.image" :alt="zombie.name" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title fw-bolder">{{ zombie.name }}</h5>
                    <p class="card-text text-white">{{ zombie.description }}</p>
                    </div>
                </div>
                </div>
            </div>
          </section>
      
          <!-- VIP Benefits Section -->
          <section class="vip-section">
            <h2 class="vip-header fw-bolder">Extra Benefits</h2>
            <ul class="list-group">
              <li class="list-group-item" v-for="(benefit, index) in vipBenefits" :key="index">
                {{ benefit }}
              </li>
            </ul>
          </section>
        </div>
        <br><br>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // List of VIP Skins
        vipSkins: [
          { name: "Christmas Skin", image: require("../assets/vip-skins/christmas-skin.jpg") },
          { name: "Ghost Face", image: require("../assets/vip-skins/ghost-face.webp") },
          // Add more skins as needed
        ],

        vipNormalGuns: [
            {name: "XM1014 M4", image: require("../assets/weapons/xm1014.png")},
            {name: "M4A1 Carbine", image: require("../assets/weapons/m4a1-carbine.png")},
            {name: "AK47 Kalashnikov", image: require("../assets/weapons/ak47-kalashnikov.png")},
        ],
        
        // List of VIP Guns
        vipGuns: [
          { name: "MP5 Gold", image: require("../assets/vipmenu/mp5.png") },
          { name: "Water Gun", image: require("../assets/vipmenu/water-gun.png") },
          { name: "Janus-3", image: require("../assets/vipmenu/janus-3.png") },
          { name: "Rail Cannon", image: require("../assets/chrismas/rail-cannon.jpg") },
          { name: "Thantos-7", image: require("../assets/vipmenu/thantos-7.png") },
          // Add more guns as needed
        ],

        zombieClasses: [
        {
          name: "Revenant Ice",
          description: "Throw an Ice ball and freze you opponent!",
          image: require("../assets/vip-zombie/revenant-ice.png")
        },
        {
          name: "Smoker",
          description: "Drag your opponents when you are near them.",
          image: require("../assets/vip-zombie/smoker.png")
        },
        {
          name: "Furien",
          description: "You are invisible and can hang in walls.",
          image: require("../assets/vip-zombie/furien.png")
        },
        {
          name: "Boomer",
          description: "You have an extra infection granade.",
          image: require("../assets/vip-zombie/boomer.png")
        },
        // Add more zombie classes as needed
      ],
        
        // List of VIP Benefits
        vipBenefits: [
          "1000 HP and 100 Armor on Every Round",
          "5x Jumps",
          "Gain Ammo Faster",
          "Gain Level Faster",
          "Extra Damage",
          "Special Model Knife (War Hammer)",
          // Add more benefits as needed
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .vip-info {
    color: #fff;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
  }
  
  .vip-header {
    color: #ff8000;
  }
  
  .vip-section {
    margin-top: 30px;
  }
  
  .card {
    background-color: #2e2e2e;
    border: none;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.1);
  }
  
  .card-img-top {
    height: 250px;
    object-fit: fill;
  }
  
  .card-title {
    color: #ff8000;
    font-size: 1.2em;
    text-align: center;
  }
  
  .list-group-item {
    background-color: #2e2e2e;
    color: #ffffff;
  }
  </style>
  