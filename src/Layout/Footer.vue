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
            <p>
              <router-link to="/faq" id="footerlinks">FAQ</router-link>
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text" id="footercontact">Contact</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
            <p>
            <a href="mailto:oralmeds.library@gmail.com" id="footeremail"><i class="fas fa-envelope mr-3 "></i>Email us</a>
            </p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
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
  #footerdesc {
    background-color: #101010;
    font-family: "Poppins", sans-serif;
    color: white;
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