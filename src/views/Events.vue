<template>
    <div>
        <br>
        <div class="latest-updates container mt-4">
          <!-- Header -->
          <h1 class="text-center mb-4">Latest Server Updates</h1>
      
          <!-- Updates Section -->
          <section v-for="(update, index) in updates" :key="index" class="update-section mb-5">
            <div class="row align-items-center">
                <h2 class="update-title text-center">{{ update.title }}</h2>
                <p class="update-description text-center">{{ update.description }}</p>
              <!-- Image Column -->
              <div class="col-md-5">
                <img :src="update.image" :alt="update.title" class="img-fluid rounded shadow-sm mb-4">
              </div>
              <!-- Content Column -->
              <div class="col-md-7">            
                <!-- Weapon Details -->
                <div v-if="update.items && update.items.length" class="item-details mt-3">
                  <h4>{{ update.shortDesc }}</h4>
                  <div class="row">
                    <div class="col-md-6" v-for="(item, i) in update.items" :key="i">
                      <div class="card item-card mb-3">
                        <img :src="item.image" :alt="item.name" class="card-img-top">
                        <div class="card-body">
                          <h5 class="card-title">{{ item.name }}</h5>
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
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
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
            title: "Winter In Game Effects",
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
  