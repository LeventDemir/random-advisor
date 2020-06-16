<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="$store.getters[`advice/get${type}`].poster_path " />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p
            class="title is-4"
          >{{ $store.getters[`advice/get${type}`][type == 'Movie' ? 'title' : 'name'] }}</p>
          <p
            class="subtitle is-6 has-text-grey"
          >{{ $store.getters[`advice/get${type}`][type == 'Movie' ? 'original_title' : 'original_name'] }}</p>
        </div>
      </div>

      <div class="content">
        <p class="has-text-info">
          <span v-for="(genre, index) in $store.getters[`advice/get${type}`].genres" :key="genre">
            {{ genre }}
            <span
              v-if="$store.getters[`advice/get${type}`].genres.length -1 != index"
              class="has-text-grey"
            >,&nbsp;</span>
          </span>
        </p>

        <p>{{ $store.getters[`advice/get${type}`].overview }}</p>

        <p>
          <span class="icon has-text-warning">
            <i class="far fa-star"></i>
          </span>
          <span class="has-text-grey">{{ $store.getters[`advice/get${type}`].vote_average }}</span>

          <time
            class="is-size-6 has-text-grey is-pulled-right"
          >{{ $store.getters[`advice/get${type}`][type == 'Movie' ? 'release_date' : 'first_air_date'] }}</time>
        </p>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Add to {{ type == 'Movie' ? type : 'TV Series' }} list</a>
    </footer>
  </div>
</template>


<script>
export default {
  props: {
    type: String
  }
};
</script>