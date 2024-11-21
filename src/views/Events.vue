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
            title: "New Winter Update",
            description: "Our latest winter update brings a frosty feel to the battlefield with exclusive skins and new weapons.",
            shortDesc: "Wepons and Skins",
            image: require("../assets/chrismas/chrismas-update.webp"),
            items: [
              {
                name: "AK Long",
                description: "Unleash powerful rounds with the AK Long, a modified classic with extended range and increased accuracy. Perfect for taking down enemies from a distance in any environment.",
                image: require("../assets/chrismas/ak-long.jpg")
              },
              {
                name: "M1887 XMAS",
                description: "Celebrate the season with the M1887 XMAS edition, a festive twist on a powerful shotgun. With its holiday-themed design, it brings a touch of cheer to even the most intense firefights.",
                image: require("../assets/chrismas/m1887-xmas.png")
              },
              {
                name: "Rail Cannon",
                description: "Blast through the battlefield with the Rail Cannon, a high-tech weapon that delivers devastating power with every shot. Ideal for players who demand maximum impact with minimal shots.",
                image: require("../assets/chrismas/rail-cannon.jpg")
              },
              {
                name: "VSK-94",
                description: "Stealth and precision come together with the VSK-94, a compact sniper rifle engineered for silent, lethal accuracy. Perfect for ambushing foes and dominating long-range encounters.",
                image: require("../assets/chrismas/vsk-94.png")
              },
              {
                name: "Deagle",
                description: "The iconic Deagle returns with unmatched stopping power and style. Known for its heavy rounds and high impact, this gun is ideal for players who want to make every shot count.",
                image: require("../assets/chrismas/deagle.jpg")
              },
            ]
          },
          {
            title: "Winter In Game Effects and Knifes",
            description: "Equip yourself with exclusive holiday outfits and immerse yourself in the seasonal spirit while taking down your enemies.",
            shortDesc: "Effects and Players Skin",
            image: require("../assets/chrismas/chrismas-update1.webp"),
            items: [
              {
                name: "Winter View",
                description: "The Winter Wonderland update transforms the game with snowy landscapes, twinkling lights, and holiday-themed player skins. Battle it out in a frosty environment with seasonal decorations, bringing a magical holiday feel to every map.",
                image: require("../assets/chrismas/snow.png")
              },
              {
                name: "Players Skin",
                description: "Transform into a frosty fighter with this exclusive winter-themed player skin. Featuring icy blue tones and festive details, this skin helps you blend into snowy environments while spreading holiday cheer on the battlefield.",
                image: require("../assets/chrismas/chrismas-skin.png")
              },
              {
                name: "X-MAS Dual Katana (Speed)",
                description: "Swift and deadly, the X-MAS Dual Katana grants incredible speed, allowing you to outmaneuver and strike down your enemies with precision. Perfect for players who value agility and quick reflexes.",
                image: require("../assets/chrismas/katana.png")
              },
              {
                name: "X-MAS Ruyi Stick (Jump)",
                description: "Leap into action with the X-MAS Ruyi Stick, a festive weapon that enhances your jump height, giving you a tactical advantage in reaching high ground or evading enemies.",
                image: require("../assets/chrismas/stick.png")
              },
              {
                name: "X-MAS Shadow Axe (Damage)",
                description: "Unleash devastating power with the X-MAS Shadow Axe, designed to deliver maximum damage with every swing. Ideal for players who prioritize raw strength and impact.",
                image: require("../assets/chrismas/axe.png")
              },
              {
                name: "X-MAS Hammer (Knockback)",
                description: "Send your enemies flying with the X-MAS Hammer, a mighty weapon that excels in knockback, giving you control over the battlefield and creating distance when needed.",
                image: require("../assets/chrismas/hammer.png")
              },
              {
                name: "X-MAS War Hammer (Vip Only)",
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
  