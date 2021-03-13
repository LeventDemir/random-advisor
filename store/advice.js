const randomWords = require('random-words');
const moviedb_base_url = 'https://api.themoviedb.org/3'
const moviedb_poster_path = 'https://image.tmdb.org/t/p/original/'
const youtube_api_base_url = 'https://www.googleapis.com/youtube/v3'

const page = (number) => {
    return Math.floor(Math.random() * number) + 1;
};

export const state = () => ({
    genres: null,
    movie: null,
    book: null,
    tvSeries: null,
    game: null,
    music: null,
    youtube: null
})

export const getters = {
    getGenres(state) {
        return state.genres
    },
    getMovie(state) {
        return state.movie
    },
    getBook(state) {
        return state.book
    },
    getTVSeries(state) {
        return state.tvSeries
    },
    getGame(state) {
        return state.game
    },
    getMusic(state) {
        return state.music
    },
    getYoutube(state) {
        return state.youtube
    }
}

export const mutations = {
    setGenres(state, genres) {
        state.genres = genres
    },
    setMovie(state, movie) {
        state.movie = movie
    },
    setBook(state, book) {
        state.book = book
    },
    setTVSeries(state, tvSeries) {
        state.tvSeries = tvSeries
    },
    setGame(state, game) {
        state.game = game
    },
    setMusic(state, music) {
        state.music = music
    },
    setYoutube(state, youtube) {
        state.youtube = youtube
    }
}

export const actions = {
    genres({ commit }) {
        return this.$axios
            .get(`${moviedb_base_url}/genre/movie/list?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`)
            .then(response => commit('setGenres', response.data.genres));
    },
    movieAdvice({ getters, commit }) {
        const discover = `${moviedb_base_url}/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&page=${page(500)}`;

        return this.$axios.get(discover).then(response => {
            const movie =
                response.data.results[
                Math.floor(Math.random() * response.data.results.length)
                ];

            movie.genres = [];
            movie.photo = movie.poster_path ? `${moviedb_poster_path}${movie.poster_path}` : '/no-photo.png'
            movie.name = movie.title
            movie.original_name = movie.original_title
            movie.overview = movie.overview || 'This movie has no description so I have to add this line or it looks bad'

            getters['getGenres'].map(genre => {
                movie.genre_ids.map(movie_genre => {
                    if (genre.id == movie_genre) movie.genres.push(genre.name);
                });
            });

            commit('setMovie', movie)
        });
    },
    bookAdvice({ commit }) {
        this.$axios.get(`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}`)
            .then(response => {
                const book = {}
                const randomBook =
                    response.data.items[
                    Math.floor(Math.random() * response.data.items.length)
                    ];

                book.id = randomBook.id
                book.photo = randomBook.volumeInfo.imageLinks.thumbnail || '/no-photo.png'
                book.name = randomBook.volumeInfo.title
                book.authors = randomBook.volumeInfo.authors
                book.genres = randomBook.volumeInfo.categories
                book.overview = randomBook.volumeInfo.description || 'This book has no description so I have to add this line or it looks bad'
                book.release_date = randomBook.volumeInfo.publishedDate
                book.vote_average = randomBook.volumeInfo.averageRating

                commit('setBook', book)
            })
    },
    tvSeriesAdvice({ getters, commit }) {
        const discover = `${moviedb_base_url}/discover/tv?api_key=${process.env.MOVIEDB_API_KEY}&page=${page(500)}`;

        return this.$axios.get(discover).then(response => {
            const tv =
                response.data.results[
                Math.floor(Math.random() * response.data.results.length)
                ];

            tv.genres = [];
            tv.photo = tv.poster_path ? `${moviedb_poster_path}${tv.poster_path}` : '/no-photo.png'
            tv.release_date = tv.first_air_date
            tv.overview = tv.overview || 'This tv series has no description so I have to add this line or it looks bad'

            getters['getGenres'].map(genre => {
                tv.genre_ids.map(tv_genre => {
                    if (genre.id == tv_genre) tv.genres.push(genre.name);
                });
            });

            commit('setTVSeries', tv)
        });
    },
    gameAdvice({ commit }) {
        this.$axios.get(`https://api.rawg.io/api/games?page_size=1&page=${page(40600)}`)
            .then(response => {
                const game = {}
                const randomGame = response.data.results[0]

                game.id = randomGame.id
                game.photo = randomGame.background_image || '/no-photo.png'
                game.name = randomGame.name
                game.genres = []
                game.release_date = randomGame.released
                game.vote_average = randomGame.rating
                game.platforms = []
                game.stores = []

                randomGame.platforms.map(platform => game.platforms.push(platform.platform.name))
                randomGame.stores.map(store => game.stores.push(store.store.name))
                randomGame.genres.map(genre => game.genres.push(genre.name))

                commit('setGame', game)
            })
    },
    musicAdvice({ commit }) {
        this.$axios.get("https://deezerdevs-deezer.p.rapidapi.com/search", {
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": process.env.DEEZER_API_KEY,
                "useQueryString": true
            }, "params": {
                "q": randomWords()
            }
        }).then(response => {
            const music = {}
            const randomMusic =
                response.data.data[
                Math.floor(Math.random() * response.data.data.length)
                ];

            music.id = randomMusic.id
            music.photo = randomMusic.album.cover_big || '/no-photo.png'
            music.name = randomMusic.album.title
            music.artist = randomMusic.artist.name
            music.preview = randomMusic.preview

            commit('setMusic', music)
        })
    },
    youtubeAdvice({ commit }) {
        this.$axios.get(`${youtube_api_base_url}/search?q=${randomWords()}&maxResults=20&order=title&type=video&key=${process.env.YOUTUBE_API_KEY}`).then(response => {
            const youtube = {}
            const randomYoutube =
                response.data.items[
                Math.floor(Math.random() * response.data.items.length)
                ];

            this.$axios.get(`${youtube_api_base_url}/videos?id=${randomYoutube.id.videoId}&part=snippet&part=statistics&key=${process.env.YOUTUBE_API_KEY}`)
                .then(response => {
                    const details = response.data.items[0]

                    youtube.id = randomYoutube.id.videoId
                    youtube.name = details.snippet.title
                    youtube.views = details.statistics.viewCount
                    youtube.like = details.statistics.likeCount
                    youtube.dislike = details.statistics.dislikeCount

                    commit('setYoutube', youtube)
                })
        })
    }
}