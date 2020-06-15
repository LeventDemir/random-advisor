<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'index' }" tag="a" class="navbar-item">
        <img src="/favicon.ico" />
        <span style="margin-left: 10px" class="is-size-4 has-text-link" tag="h4">Random Advisor</span>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <router-link :to="{ name: 'sign-in' }" tag="a" class="navbar-item">Sign In</router-link>
        <router-link :to="{ name: 'sign-up' }" tag="a" class="navbar-item">Sign Up</router-link>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  mounted() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  }
};
</script>