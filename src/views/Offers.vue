<template>
    <div>
        <br><br>
        <div class="offers container">
          <!-- Header -->
          <h1 class="text-center mb-4 fw-bolder">Special Offers</h1>
      
          <!-- Offers Section -->
          <section v-for="(offer, index) in offers" :key="index" class="offer-section mb-5" style="position: relative;">
            <div class="row align-items-center">
              <!-- Image Column -->
              <div class="col-md-5">
                <img :src="offer.image" :alt="offer.title" class="img-fluid rounded shadow-sm">
              </div>
              <!-- Content Column -->
              <div class="col-md-7">
                <h2 class="offer-title fw-bolder">{{ offer.title }}</h2>
                <p class="offer-description">
                    {{ offer.description }}
                    <router-link v-if="offer.link" :to="offer.link" class="text-decoration-none" style="color: #ff1a1a">
                        {{ offer.linkText }}
                    </router-link>
                </p>
                <div class="offer-details mt-3">
                  <p class="fw-bolder"><strong>Price:</strong> {{ offer.price }}</p>
                  <a :href="offer.buttonLink" target="_blank" class="text-decoration-none"><button class="btn text-white" style="background-color: #ff1a1a">Claim Offer</button></a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <br><br>
    </div>
  </template>
  
  <script>
  export default {
    name: "OffersView",
    data() {
      return {
        offers: [
          {
            title: "VIP Membership",
            description: `Get exclusive VIP access! Enjoy benefits like faster ammo gain, special weapons, and unique skins. 
            You want to know more about vip?`,
            link: "/vip-info",
            linkText: "Click here.",
            price: "8.00€",
            buttonLink: "https://ko-fi.com/s/2787a9d882",
            image: require("../assets/offers/vip-member.png"),
          },
          {
            title: "Administrator",
            description: "Gain full administrative powers to oversee the server, manage users, and ensure smooth gameplay.",
            price: "15.00€",
            image: require("../assets/offers/administrator.jpg"),
          },
          {
            title: "Moderator",
            description: "Help maintain order on the server with the ability to moderate chats and resolve conflicts.",
            price: "20.00€",
            image: require("../assets/offers/moderator.jpg"),
          },
          {
            title: "Semi-Elder",
            description: "Assist the team with intermediate privileges, supporting both players and server staff.",
            price: "25.00€",
            image: require("../assets/offers/semi-elder.jpg"),
          },
          {
            title: "Elder",
            description: "Enjoy respected status on the server with extended permissions and a role in community decisions.",
            price: "30.00€",
            image: require("../assets/offers/elder.jpg"),
          },
          {
            title: "Pre-Manager",
            description: "Step into a management role, coordinating with staff and helping organize server events.",
            price: "35.00€",
            image: require("../assets/offers/pre-manager.jpg"),
          },
          {
            title: "Co-Owner",
            description: "Share in the responsibilities of managing the server, from moderating to strategic planning.",
            price: "40.00€",
            image: require("../assets/offers/co-owner.jpg"),
          },
          {
            title: "Owner",
            description: "Take full control with ownership privileges, guiding the server’s future and vision.",
            price: "45.00€",
            image: require("../assets/offers/owner.jpg"),
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .offers {
    color: #fff;
    background-color: #1c1c1c;
    padding: 20px;
    border-radius: 8px;
  }
  
  .offer-title {
    color: #ff1a1a;
    font-size: 1.5em;
  }
  
  .offer-description {
    color: #ccc;
    font-size: 1em;
  }
  
  .offer-details {
    font-size: 1.1em;
    color: #ff1a1a;
  }
  
  .offer-section {
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
  }
  
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  </style>
  