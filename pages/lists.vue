<template>
  <div>
    <div class="tabs is-centered is-medium">
      <ul>
        <router-link
          :to="{ name: 'lists', query: { list: 'movie' } }"
          :class="{  'is-active': $route.query.list == 'movie' }"
          tag="li"
        >
          <a>Movies</a>
        </router-link>
        <router-link
          :to="{ name: 'lists', query: { list: 'music' } }"
          :class="{  'is-active': $route.query.list == 'music' }"
          tag="li"
        >
          <a>Musics</a>
        </router-link>
        <router-link
          :to="{ name: 'lists', query: { list: 'tv-series' } }"
          :class="{  'is-active': $route.query.list == 'tv-series' }"
          tag="li"
        >
          <a>TV Series</a>
        </router-link>
      </ul>
    </div>

    <br />

    <div class="columns is-multiline is-centered">
      <div class="column is-one-third">
        <Card />
      </div>

      <div class="column is-one-third">
        <Card />
      </div>
    </div>
  </div>
</template>


<script>
import Card from "@/components/card";

export default {
  components: { Card },
  mounted() {
    const lists = ["movie", "music", "tv-series"];
    const list = this.$route.query.list;

    if (!list || !lists.includes(list)) {
      this.$router.push({ name: "lists", query: { list: "movie" } });
    }
  }
};
</script>