<template>
    <!-- Footer -->
    <footer class="page-footer font-small" id="footeri">
      <div style="background-color: rgb(242, 142, 38)">
        <div class="container">
          <!-- Grid row-->
          <div class="row py-4 d-flex align-items-center" id="footershirit">
            <!-- Grid column -->
            <div
              class="col-md-6 col-lg-5 text-center text-md-left mb-2 mb-md-0"
            ></div>
            <!-- Grid column -->
          </div>
          <!-- Grid row-->
        </div>
      </div>
  
      <!-- Footer Links -->
      <div class="container text-center text-md-left mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text" id="footertitle">Zm-WestCStrike </h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
            <p>
              Welcome to <span class="company">Zm-WestCStrike</span>  your number one cs1.6 server. We're dedicated to providing you the <span class="company">best</span> experience with a focus on fun.
            </p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text" id="footerproducts">Info Links</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
            <p>
              <router-link to="/about" id="footerlinks">About</router-link>
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text" id="footercontact">Contact</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
            <p>
              Discord:
              <a href="https://discordapp.com/users/947193667188306011" target="_blank" class="important">
                emosbg
              </a>
              ,
              <a href="https://discordapp.com/users/1150374397606113370" target="_blank" class="important">
                assos13-14
              </a>
              ,
              <a href="https://discordapp.com/users/594462265630261250" target="_blank" class="important">
                smack
              </a>
            </p>
            <p>
              Discord Server:
              <a href="https://discord.gg/wAHXeZkc" target="_blank" class="important">
                ZM-WESTCSTRIKE.RO
              </a>
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
        <div class="seo-text mt-4">
          <div class="mt-4" style="color: #ccc; font-size: 14px;">
            <p>
              Looking for a top-tier <strong>CS 1.6 Zombie Plague server</strong>? Zm-WestCStrike is the best choice for <strong>Counter-Strike 1.6</strong> zombie survival and custom mod gameplay. Our active community and real-time battles offer a one-of-a-kind experience for fans of the genre.
            </p>
            <p>
              Connect to our server at <strong>51.77.72.157:27015</strong> or join us through Steam. Enjoy nonstop zombie action, ranking systems, and events — all hosted on our high-performance servers.
            </p>
          </div>
        </div>
      </div>
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3" id="footerdesc">
        © 2025 Copyright:
        <a> ZM-WESTCSTRIKE </a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </template>
  <script>
  export default {
    name: "FooterLayout",
  };
  </script>
  <style>
  #footeri {
    background-color:#212529;
    color: white;
  }
  footer .seo-text p {
    color: #aaa;
    font-size: 13px;
    line-height: 1.5;
    margin-top: 8px;
  }
  #footerdesc {
    background-color: #101010;
    font-family: "Poppins", sans-serif;
    color: white;
  }
  .important {
    color: rgb(242, 142, 38);
  }
  #footertitle {
    color: rgb(242, 142, 38);
    font-family: "Comfortaa", cursive;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }
  #footerproducts {
    color: rgb(242, 142, 38);
    font-family: "Poppins", sans-serif;
    font-size: 18px;
  }
  #footercontact {
    color: rgb(242, 142, 38);
    font-family: "Poppins", sans-serif;
    font-size: 18px;
  }
  #footerlinks {
    font-family: "Roboto", sans-serif;
    text-decoration: none !important;
    color: white !important;
    border-bottom:0.5px solid gray;
    margin-bottom:1px !important;
  }
  #footerlinks:hover{
      border-bottom: 0.5px solid white;
  }
  #footeremail{
      font-family: "Poppins", sans-serif;
      color:white;
      text-decoration: none;
  }
  #footeremail:hover{
      border-bottom: 0.5px solid white;
  }
  .company{
      color: rgb(242, 142, 38);
      border-bottom: 0.5px solid white;
  }
  footer p {
      margin-bottom:5px;
  }
  </style>