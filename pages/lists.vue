<template>
  <div class="column">
    <Tabs />

    <br />

    <div class="columns is-multiline is-centered">
      <div v-for="i in 2" :key="i" class="column is-one-third">
        <Card />
      </div>
    </div>
  </div>
</template>


<script>
import Tabs from "@/components/tabs";
import Card from "@/components/card";

export default {
  components: { Tabs, Card },
  mounted() {
    const lists = ["movie", "music", "tv-series"];
    const list = this.$route.query.list;

    if (!list || !lists.includes(list)) {
      this.$router.push({ name: "lists", query: { list: "movie" } });
    }
  }
};
</script>