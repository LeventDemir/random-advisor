<template>
  <div class="card">
    <div class="card-image">
      <iframe
        allowfullscreen
        style="width:100%;height:15em"
        v-if="type == 'youtube'"
        type="text/html"
        :src="'https://www.youtube.com/embed/' + data.id"
        frameborder="0"
      />
      <figure v-else class="image is-4by3">
        <img :style="type == 'book' ? {'object-fit': 'scale-down'} : ''" :src="data.photo" />
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
          <p v-else-if="type == 'music'" class="subtitle is-6 has-text-grey">{{ data.artist }}</p>
          <p v-else-if="type != 'game'" class="subtitle is-6 has-text-grey">{{ data.original_name }}</p>
        </div>
      </div>

      <div class="content">
        <p class="has-text-info">
          <span v-for="(genre, index) in data.genres" :key="genre">
            {{ genre }}
            <span v-if="data.genres.length -1 != index" class="has-text-grey">,&nbsp;</span>
          </span>
        </p>

        <audio style="width: 100%" v-if="type == 'music'" controls :src="data.preview"></audio>

        <p v-if="type == 'game'">
          <span v-for="(platform, index) in data.platforms" :key="platform" class="has-text-link">
            {{ platform }}
            <span
              v-if="data.platforms.length -1 != index"
              class="has-text-info"
            >,&nbsp;</span>
          </span>
        </p>

        <p v-if="type == 'game'">
          <span v-for="(store, index) in data.stores" :key="store" class="has-text-danger">
            {{ store }}
            <span v-if="data.stores.length -1 != index" class="has-text-grey">,&nbsp;</span>
          </span>
        </p>

        <p
          v-if="type != 'music' && type != 'youtube' && type != 'game'"
          :class="collapsible ? 'text-collapsible-active' : 'text-collapsible'"
        >
          <span @click="collapsible = !collapsible" class="icon has-text-link is-pulled-right">
            <i class="fas" :class="collapsible ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </span>
          {{ data.overview }}
        </p>

        <p v-if="type != 'music' && type != 'youtube'">
          <span class="icon has-text-warning">
            <i class="far fa-star"></i>
          </span>
          <span class="has-text-grey">{{ data.vote_average }}</span>

          <time class="is-size-6 has-text-grey is-pulled-right">{{ data.release_date }}</time>
        </p>

        <p v-if=" type == 'youtube'">
          <span class="icon has-text-warning">
            <i class="far fa-eye"></i>
          </span>
          <span>{{ new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(data.views) }}</span>
        </p>

        <p v-if=" type == 'youtube'">
          <span class="icon has-text-success">
            <i class="far fa-thumbs-up"></i>
          </span>
          <span>{{ new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(data.like) }}</span>
        </p>

        <p v-if=" type == 'youtube'">
          <span class="icon has-text-danger">
            <i class="far fa-thumbs-down"></i>
          </span>
          <span>{{ new Intl.NumberFormat( { maximumSignificantDigits: 3 }).format(data.dislike) }}</span>
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