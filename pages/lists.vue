<template>
  <div class="column">
    <Tabs />

    <br />

    <div class="columns is-multiline is-centered">
      <div
        v-for="mmtv in $store.getters[`mmtv/get${list}`]"
        :key="mmtv._id"
        class="column is-one-third"
      >
        <Card :type="$route.query.list" :data="mmtv" />
      </div>
    </div>
  </div>
</template>


<script>
import Tabs from "@/components/tabs";
import Card from "@/components/card";

export default {
  middleware: "auth",
  components: { Tabs, Card },
  mounted() {
    const lists = ["movie", "music", "book", "tv-series"];
    const list = this.$route.query.list;

    if (!list || !lists.includes(list)) {
      this.$router.push({ name: "lists", query: { list: "movie" } });
    }
  },
  computed: {
    list() {
      const list = this.$route.query.list;

      return list == "movie"
        ? "Movies"
        : list == "music"
        ? "Musics"
        : list == "tv-series"
        ? "TVSeries"
        : "Books";
    }
  }
};
</script>