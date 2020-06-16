<template>
  <div class="column">
    <div class="columns">
      <div class="column">
        <app-switch v-model="filters.movie" :checked="filters.movie">Movie</app-switch>
      </div>
      <div id="middle-switch" class="column has-text-centered">
        <app-switch v-model="filters.music" :checked="filters.music">Music</app-switch>
      </div>
      <div class="column">
        <app-switch
          class="is-pulled-right"
          :checked="filters.tvSeries"
          v-model="filters.tvSeries"
        >TV Series</app-switch>
      </div>
    </div>

    <br />
    <br />

    <button @click="advice" class="button is-link is-rounded is-outlined is-fullwidth">advice</button>

    <br />
    <br />
    <br />

    <div v-if="adviced" class="columns is-multiline is-centered">
      <div v-if="filters.movie && $store.getters[`advice/getMovie`]" class="column is-one-third">
        <Card type="Movie" />
      </div>
      <div
        v-if="filters.tvSeries && $store.getters[`advice/getTVSeries`]"
        class="column is-one-third"
      >
        <Card type="TVSeries" />
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
        tvSeries: true
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
      if (this.filters.tvSeries) {
        this.$store
          .dispatch("advice/tvSeriesAdvice")
          .then(() => (this.adviced = true));
      }
    }
  }
};
</script>