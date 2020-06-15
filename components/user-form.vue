<template>
  <form class="column">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-rounded" type="text" placeholder="Username" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-rounded" type="password" placeholder="Password" />
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