<template>

  <div class="page" id="top">

    <!-- Logo Section -->
    <section class="small-section pt-30 pt-xs-20 pb-30 pb-xs-20">

      <div class="container align-center">
        <div class="row">
          <div class="col-xs-6 col-xs-offset-3">
            <a href="special-construction-3.html"><img src="images/logo.png" width="216" height="119" alt="" /></a>
          </div>
        </div>
      </div>

    </section>
    <!-- End Logo Section -->

    <!-- Menu Wrapper -->
    <div class="container">

      <!-- Divider -->
      <hr class="mt-0 mb-0 "/>
      <!-- End Divider -->

      <!-- Navigation panel -->
      <nav class="main-nav mn-centered not-top mb-30">
        <div class="relative clearfix">

          <div class="mobile-nav">
            <i class="fa fa-bars"></i>
          </div>

          <!-- Main Menu -->
          <div class="inner-nav desktop-nav">
            <ul class="clearlist">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to='/test'>Test</router-link></li>
              <li><router-link to='/documents'>Documents</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
          </div>
          <!-- End Main Menu -->
        </div>
      </nav>
      <router-view/>
      <!-- End Navigation panel -->
    </div>
    <!-- End Menu Wrapper -->

    <!-- Foter -->
    <footer class="small-section bg-gray-lighter footer pb-60">
      <div class="container">
        <!-- Footer Text -->
        <div class="footer-text">

          <!-- Copyright -->
          <div class="footer-copy font-alt">
            <a href="http://themeforest.net/user/theme-guru/portfolio" target="_blank">&copy; NAVER CAMPUS HACKDAY 2018</a>.
          </div>
          <!-- End Copyright -->

          <div class="footer-made">
            YAAASSSSSSS XD
          </div>

        </div>
        <!-- End Footer Text -->

      </div>


      <!-- Top Link -->
      <div class="local-scroll">
        <a href="#top" class="link-to-top"><i class="fa fa-caret-up"></i></a>
      </div>
      <!-- End Top Link -->

    </footer>
    <!-- End Foter -->
  </div>

  <!--
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to='/test'>Test</router-link> |
      <router-link to='/documents'>Documents</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
  -->
</template>


<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
/*}*/
/*#nav {*/
  /*padding: 30px;*/
/*}*/

/*#nav a {*/
  /*font-weight: bold;*/
  /*color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
  /*color: #42b983;*/
/*}*/
</style>
