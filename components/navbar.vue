<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'index' }" tag="a" class="navbar-item">
        <img src="/favicon.ico" />
        <span style="margin-left: 10px" class="is-size-4 has-text-link" tag="h4">Random Advicer</span>
      </router-link>

      <a
        ref="burgerButton"
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
        <router-link
          v-if="!$store.getters['user/getAuth']"
          @click.native="close"
          :to="{ name: 'sign-in' }"
          tag="a"
          class="navbar-item"
        >Sign In</router-link>

        <router-link
          v-if="!$store.getters['user/getAuth']"
          @click.native="close"
          :to="{ name: 'sign-up' }"
          tag="a"
          class="navbar-item"
        >Sign Up</router-link>

        <router-link
          v-if="$store.getters['user/getAuth']"
          @click.native="close"
          :to="{ name: 'lists' }"
          tag="a"
          class="navbar-item"
        >Lists</router-link>

        <a v-if="$store.getters['user/getAuth']" @click="signOut" class="navbar-item">Sign Out</a>
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
  },
  methods: {
    close() {
      document
        .getElementById("navbarBasicExample")
        .classList.toggle("is-active");
      this.$refs.burgerButton.classList.toggle("is-active");
    },
    signOut() {
      this.$store.dispatch("user/signOut");
      this.close();
    }
  }
};
</script>