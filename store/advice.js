const moviedb_base_url = "https://api.themoviedb.org/3";
const moviedb_api_key = "476c67076b8ad352fa3f0997042f266a";
const moviedb_poster_path = 'https://image.tmdb.org/t/p/original/'

const page = () => {
    return Math.floor(Math.random() * 500) + 1;
};


export const state = () => ({
    genres: [],
    movie: null,
    music: null,
    tvSeries: null
})

export const getters = {
    getGenres(state) {
        return state.genres
    },
    getMovie(state) {
        return state.movie
    },
    getMusic(state) {
        return state.music
    },
    getTVSeries(state) {
        return state.tvSeries
    }
}

export const mutations = {
    setGenres(state, genres) {
        state.genres = genres
    },
    setMovie(state, movie) {
        state.movie = movie
    },
    setMusic(state, music) {
        state.music = music
    },
    setTVSeries(state, tvSeries) {
        state.tvSeries = tvSeries
    }
}

export const actions = {
    movieAdvice({ getters, commit }) {
        const discover = `${moviedb_base_url}/discover/movie?api_key=${moviedb_api_key}&page=${page()}`;

        return this.$axios.get(discover).then(response => {
            const movie =
                response.data.results[
                Math.floor(Math.random() * response.data.results.length)
                ];

            movie.genres = [];
            movie.poster_path = `${moviedb_poster_path}${movie.poster_path}`

            getters['getGenres'].map(genre => {
                movie.genre_ids.map(movie_genre => {
                    if (genre.id == movie_genre) movie.genres.push(genre.name);
                });
            });

            commit('setMovie', movie)
        });
    },
    tvSeriesAdvice({ getters, commit }) {
        const discover = `${moviedb_base_url}/discover/tv?api_key=${moviedb_api_key}&page=${page()}`;

        return this.$axios.get(discover).then(response => {
            const tv =
                response.data.results[
                Math.floor(Math.random() * response.data.results.length)
                ];

            tv.genres = [];
            tv.poster_path = `${moviedb_poster_path}${tv.poster_path}`

            getters['getGenres'].map(genre => {
                tv.genre_ids.map(tv_genre => {
                    if (genre.id == tv_genre) tv.genres.push(genre.name);
                });
            });

            commit('setTVSeries', tv)
        });
    },
    genres({ commit }) {
        return this.$axios
            .get(`${moviedb_base_url}/genre/movie/list?api_key=${moviedb_api_key}&language=en-US`)
            .then(response => commit('setGenres', response.data.genres));
    }
}