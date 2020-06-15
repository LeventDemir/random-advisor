<template>
  <div class="column">
    <div class="columns">
      <div class="column">
        <app-switch v-model="filters.movie" checked>Movie</app-switch>
      </div>
      <div class="column has-text-centered">
        <app-switch v-model="filters.music" checked>Music</app-switch>
      </div>
      <div class="column">
        <app-switch class="is-pulled-right" v-model="filters.tvSeries" checked>Tv Series</app-switch>
      </div>
    </div>

    <br />
    <br />

    <button
      @click="advise = !advise"
      class="button is-link is-rounded is-outlined is-fullwidth"
    >Advise</button>

    <br />
    <br />
    <br />

    <div v-if="advise" class="columns">
      <div class="column is-one-third">
        <Card />
      </div>
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
import Switch from "@/components/switch";
import Card from "@/components/card";

export default {
  components: {
    "app-switch": Switch,
    Card
  },
  data() {
    return {
      advise: false,
      filters: {
        movie: true,
        music: true,
        tvSeries: true
      }
    };
  }
};
</script>