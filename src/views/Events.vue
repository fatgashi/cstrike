<template>
    <div>
        <br>
        <div class="latest-updates container mt-4">
          <div class="text-center mb-4">
            <button
              class="btn mx-2 text-white"
              style="background-color: #ff8000;"
              :class="{ active: showUpdates }"
              @click="showUpdates = true"
            >
              Show Updates
            </button>
            <button
              class="btn mx-2 text-white"
              style="background-color: green;"
              :class="{ active: !showUpdates }"
              @click="showUpdates = false"
            >
              Show Events
            </button>
          </div>          
          <!-- Updates Section -->
           <div v-if="showUpdates">
             <section v-for="(update, index) in updates" :key="index" class="update-section mb-5">
               <h1 class="text-center mb-4 fw-bolder">Latest Server Updates</h1>
               <div class="row align-items-center">
                   <h2 class="update-title text-center fw-bolder">{{ update.title }}</h2>
                   <p class="update-description text-center">{{ update.description }}</p>
                 <!-- Image Column -->
                 <div class="col-md-5">
                   <img :src="update.image" :alt="update.title" class="img-fluid rounded shadow-sm mb-4">
                 </div>
                 <!-- Content Column -->
                 <div class="col-md-7">            
                   <!-- Weapon Details -->
                   <div v-if="update.items && update.items.length" class="item-details mt-3">
                     <h4 class="fw-bolder">{{ update.shortDesc }}</h4>
                     <div class="row">
                       <div class="col-md-6" v-for="(item, i) in update.items" :key="i">
                         <div class="card item-card mb-3">
                           <img :src="item.image" :alt="item.name" class="card-img-top">
                           <div class="card-body">
                             <h5 class="card-title fw-bolder">{{ item.name }}</h5>
                             <p class="card-text">{{ item.description }}</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>
           </div>

          <div v-else>
            <div class="events-view container mt-4">
              <h1 class="text-center mb-4 fw-bolder">Server Events</h1>
              <div class="event-section text-white p-4 rounded">
                <h2 class="text-center fw-bolder" style="color: #ff8000;">Monthly VIP Rewards</h2>
                <p class="mt-3">
                  Compete to be in the Top 3 players in the server leaderboard and
                  win exclusive VIP rewards! The event runs every month from the 1st
                  to the 30th.
                </p>
                <ul class="list-group mt-3">
                  <li class="list-group-item bg-dark text-white">
                    <strong>Top 1:</strong> VIP for 1 month + 5000 points
                  </li>
                  <li class="list-group-item bg-dark text-white">
                    <strong>Top 2:</strong> VIP for 2 weeks + 3000 points
                  </li>
                  <li class="list-group-item bg-dark text-white">
                    <strong>Top 3:</strong> VIP for 1 week + 1000 points
                  </li>
                </ul>
                <p class="mt-4 text-center">
                  Push your limits, claim the top spot, and earn amazing rewards!
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showUpdates: true,
        updates: [
          {
            title: "New Spring Update",
            description: "Our latest spring update brings an amazing feel to the battlefield with exclusive skins and new weapons.",
            shortDesc: "Wepons and Skins",
            image: require("../assets/spring/spring-update.webp"),
            items: [
              {
                name: "Ethereal",
                description: "The Ethereal is a futuristic energy-based weapon featured in Counter-Strike 1.6, showcasing a sleek, high-tech design with glowing, dynamic energy cores. Its vivid blue and green accents give it a sci-fi aesthetic, making it stand out in the zombie game mode. Perfectly balanced between style and functionality, the Ethereal is ideal for players seeking a unique, visually stunning weapon to dominate the battlefield.",
                image: require("../assets/spring/etheral-gun.png")
              },
              {
                name: "M3 Black Dragon",
                description: "The M3 Black Dragon is a stunning shotgun with a bold golden and black dragon-scaled design, exuding power and elegance. Its intricate details, including dragon motifs and a sleek finish, make it a standout weapon in Counter-Strike 1.6. This gun combines aesthetic appeal with devastating close-range firepower, perfect for players looking to dominate in style while battling zombies or opponents.",
                image: require("../assets/spring/black-dragon.png")
              },
              {
                name: "Barlog-XI",
                description: "The Barlog-XI is a menacing shotgun with a fiery red and black design, adorned with demonic horn-like embellishments for a sinister aesthetic. This weapon exudes power and aggression, making it perfect for intense combat scenarios in Counter-Strike 1.6 zombie modes. Its intimidating appearance complements its devastating performance, offering players a visually striking and highly effective tool for survival.",
                image: require("../assets/spring/barlog.png")
              },
              {
                name: "Star Chaser AR",
                description: "The Star Chaser AR is a dazzling weapon infused with cosmic energy, featuring swirling, ethereal effects and a futuristic design. Its mesmerizing visual effects, resembling a burst of stardust and glowing orbs, make it stand out as a truly unique firearm in Counter-Strike 1.6. Perfect for players who want to combine style and impact, this gun is both a visual spectacle and a powerful tool on the battlefield.",
                image: require("../assets/spring/star-chaser.png")
              },
            ]
          },
          {
            title: "Spring In Game Effects and Knifes",
            description: "Equip yourself with exclusive holiday outfits and immerse yourself in the seasonal spirit while taking down your enemies.",
            shortDesc: "Knifes",
            image: require("../assets/spring/spring-update1.webp"),
            items: [
              {
                name: "Dual Katana (Speed)",
                description: "Swift and deadly, the X-MAS Dual Katana grants incredible speed, allowing you to outmaneuver and strike down your enemies with precision. Perfect for players who value agility and quick reflexes.",
                image: require("../assets/chrismas/katana.png")
              },
              {
                name: "Ruyi Stick (Jump)",
                description: "Leap into action with the X-MAS Ruyi Stick, a festive weapon that enhances your jump height, giving you a tactical advantage in reaching high ground or evading enemies.",
                image: require("../assets/chrismas/stick.png")
              },
              {
                name: "Shadow Axe (Damage)",
                description: "Unleash devastating power with the X-MAS Shadow Axe, designed to deliver maximum damage with every swing. Ideal for players who prioritize raw strength and impact.",
                image: require("../assets/chrismas/axe.png")
              },
              {
                name: "Hammer (Knockback)",
                description: "Send your enemies flying with the X-MAS Hammer, a mighty weapon that excels in knockback, giving you control over the battlefield and creating distance when needed.",
                image: require("../assets/chrismas/hammer.png")
              },
              {
                name: "War Hammer (Vip Only)",
                description: "The ultimate weapon for VIP players, the X-MAS War Hammer combines the speed of the Dual Katana, the jump boost of the Ruyi Stick, the damage of the Shadow Axe, and the knockback of the Hammer, with additional bonus damage. A true masterpiece of destruction for the battlefield.",
                image: require("../assets/chrismas/war-hammer.png")
              }
            ]
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .latest-updates {
    color: #fff;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
  }

  .btn.active {
    border: 3px solid #fff;
  }
  
  .update-title {
    color: #ff8000;
    font-size: 1.5em;
  }
  
  .update-description {
    color: #ccc;
    font-size: 1em;
  }
  
  .item-details h4 {
    color: #ff8000;
    margin-top: 15px;
  }
  
  .item-card {
    background-color: #2e2e2e;
    border: none;
  }
  
  .card-title {
    color: #ff8000;
    font-size: 1.1em;
    text-align: center;
  }
  
  .card-text {
    color: #ccc;
    font-size: 0.9em;
    text-align: center;
  }
  
  .img-fluid {
   
    object-fit: cover;
  }
  
  .update-section {
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
  }
  </style>
  