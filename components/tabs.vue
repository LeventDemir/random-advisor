<template>
  <div class="tabs is-centered is-medium">
    <ul>
      <router-link
        :to="{ name: 'lists', query: { list: 'movie' } }"
        :class="{  'is-active': $route.query.list == 'movie' }"
        tag="li"
      >
        <a>
          <span class="icon is-small">
            <i class="fas fa-film" aria-hidden="true"></i>
          </span>
          <span>Movies</span>
        </a>
      </router-link>
      <router-link
        :to="{ name: 'lists', query: { list: 'book' } }"
        :class="{  'is-active': $route.query.list == 'book' }"
        tag="li"
      >
        <a>
          <span class="icon is-small">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          <span>Book</span>
        </a>
      </router-link>
      <router-link
        :to="{ name: 'lists', query: { list: 'tv-series' } }"
        :class="{  'is-active': $route.query.list == 'tv-series' }"
        tag="li"
      >
        <a>
          <span class="icon is-small">
            <i class="fas fa-tv" aria-hidden="true"></i>
          </span>
          <span>TV Series</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>