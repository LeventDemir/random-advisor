<template>
  <div style="margin-top: -20px" class="column is-centered has-text-centered">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      fill="#DBE1EC"
      viewBox="0 0 48 48"
    >
      <path
        d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
      />
    </svg>

    <br />

    <p class="has-text-grey is-size-4">Page not found (404)</p>

    <br />

    <router-link
      :to="{ name: 'index' }"
      tag="button"
      class="button is-link is-outlined is-rounded"
    >Go to home</router-link>
  </div>
</template>