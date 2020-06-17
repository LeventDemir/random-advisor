<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="data.photo" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ data.name }}</p>
          <p v-if="type == 'book'" class="subtitle is-6 has-text-grey">
            <span v-for="(author, index) in data.authors" :key="author">
              {{ author }}
              <span v-if="data.authors.length -1 != index" class="has-text-grey">,&nbsp;</span>
            </span>
          </p>
          <p v-else class="subtitle is-6 has-text-grey">{{ data.subtitle }}</p>
        </div>
      </div>

      <div class="content">
        <p class="has-text-info">
          <span v-for="(genre, index) in data.genres" :key="genre">
            {{ genre }}
            <span v-if="data.genres.length -1 != index" class="has-text-grey">,&nbsp;</span>
          </span>
        </p>

        <p :class="collapsible ? 'text-collapsible-active' : 'text-collapsible'">
          <span @click="collapsible = !collapsible" class="icon has-text-link is-pulled-right">
            <i class="fas" :class="collapsible ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </span>
          {{ data.overview }}
        </p>

        <p>
          <span v-if="type != 'book'" class="icon has-text-warning">
            <i class="far fa-star"></i>
          </span>
          <span v-if="type != 'book'" class="has-text-grey">{{ data.vote_average }}</span>

          <time class="is-size-6 has-text-grey is-pulled-right">{{ data.release_date }}</time>

          <br v-if="type == 'book'" />
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a
        v-if="$route.name == 'index'"
        @click="$store.dispatch('mmtv/create', { type, ...data})"
        class="card-footer-item has-text-success"
      >Add to {{ type == 'tv-series' ? 'TV Series': type }} list</a>

      <a
        v-if="$route.name == 'lists'"
        @click="$store.dispatch('mmtv/delete', data._id)"
        class="card-footer-item has-text-danger"
      >Delete {{ type == 'tv-series' ? 'TV Series': type }}</a>
    </footer>
  </div>
</template>


<script>
export default {
  props: {
    type: {
      String
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      collapsible: false
    };
  }
};
</script>