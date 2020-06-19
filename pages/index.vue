<template>
  <div class="column">
    <div class="columns">
      <div class="column">
        <app-switch v-model="filters.movie" :checked="filters.movie">Movie</app-switch>
      </div>

      <div id="middle-switch-2" class="column has-text-centered">
        <app-switch v-model="filters.book" :checked="filters.book">Book</app-switch>
      </div>

      <div class="column has-text-centered">
        <app-switch :checked="filters.tvSeries" v-model="filters.tvSeries">TV Series</app-switch>
      </div>

      <div id="middle-switch" class="column has-text-centered">
        <app-switch v-model="filters.game" :checked="filters.game">Game</app-switch>
      </div>

      <div class="column">
        <app-switch
          id="right-switch"
          class="is-pulled-right"
          :checked="filters.music"
          v-model="filters.music"
        >Music</app-switch>
      </div>
    </div>

    <br />
    <br />

    <button @click="advice" class="button is-link is-rounded is-outlined is-fullwidth">advice</button>

    <br />
    <br />
    <br />

    <div v-if="adviced" class="columns is-multiline is-centered">
      <div v-if="filters.movie && $store.getters['advice/getMovie']" class="column is-one-third">
        <Card type="movie" :data="$store.getters['advice/getMovie']" />
      </div>

      <div v-if="filters.book && $store.getters['advice/getBook']" class="column is-one-third">
        <Card type="book" :data="$store.getters['advice/getBook']" />
      </div>

      <div
        v-if="filters.tvSeries && $store.getters['advice/getTVSeries']"
        class="column is-one-third"
      >
        <Card type="tv-series" :data="$store.getters['advice/getTVSeries']" />
      </div>

      <div v-if="filters.game && $store.getters['advice/getGame']" class="column is-one-third">
        <Card type="game" :data="$store.getters['advice/getGame']" />
      </div>

      <div v-if="filters.music && $store.getters['advice/getMusic']" class="column is-one-third">
        <Card type="music" :data="$store.getters['advice/getMusic']" />
      </div>
    </div>
  </div>
</template>


<script>
import Switch from "@/components/switch";
import Card from "@/components/card";

export default {
  components: {
    "app-switch": Switch,
    Card
  },
  data() {
    return {
      adviced: false,
      filters: {
        movie: true,
        music: true,
        book: true,
        tvSeries: true,
        game: true
      }
    };
  },
  methods: {
    advice() {
      if (this.filters.movie) {
        this.$store
          .dispatch("advice/movieAdvice")
          .then(() => (this.adviced = true));
      }
      if (this.filters.music) {
        this.$store
          .dispatch("advice/musicAdvice")
          .then(() => (this.adviced = true));
      }
      if (this.filters.book) {
        this.$store
          .dispatch("advice/bookAdvice")
          .then(() => (this.adviced = true));
      }
      if (this.filters.tvSeries) {
        this.$store
          .dispatch("advice/tvSeriesAdvice")
          .then(() => (this.adviced = true));
      }
      if (this.filters.game) {
        this.$store
          .dispatch("advice/gameAdvice")
          .then(() => (this.adviced = true));
      }
    }
  }
};
</script>