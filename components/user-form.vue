<template>
  <form @submit.prevent="submit" class="column">
    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="user.username"
          class="input is-rounded"
          type="text"
          placeholder="Username"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="user.password"
          class="input is-rounded"
          type="password"
          placeholder="Password"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>

    <br />

    <div class="has-text-centered">
      <button
        class="button is-rounded is-link is-outlined"
      >{{ $route.name == 'sign-up' ? 'Sing Up' : 'Sign In'}}</button>
    </div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    submit() {
      if (this.$route.name == "sign-up") {
        this.$store.dispatch("user/signUp", this.user);
      } else {
        this.$store.dispatch("user/signIn", this.user);
      }
    }
  }
};
</script>