export const state = () => ({
    movies: [],
    Books: [],
    tvSeries: [],
    games: [],
    musics: []
})

export const getters = {
    getMovies(state) {
        return state.movies
    },
    getBooks(state) {
        return state.books
    },
    getTVSeries(state) {
        return state.tvSeries
    },
    getGames(state) {
        return state.game
    },
    getMusics(state) {
        return state.musics
    }
}

export const mutations = {
    setMovies(state, movies) {
        state.movies = movies
    },
    setBooks(state, books) {
        state.books = books
    },
    setTVSeries(state, tvSeries) {
        state.tvSeries = tvSeries
    },
    setGames(state, game) {
        state.game = game
    },
    setMusics(state, musics) {
        state.musics = musics
    }
}

export const actions = {
    create({ rootGetters, dispatch }, data) {
        if (!rootGetters['user/getAuth']) this.$toast.global.error("Sign in so you can do this")

        else {
            this.$axios.post('/mmtv/create', { token: rootGetters['user/getToken'], ...data }).then(response => {
                if (response.data.success) {
                    this.$toast.global.success("Item successfully added to list")

                    dispatch('mmtvs')
                } else if (response.data.exist) this.$toast.global.warning("This item is already exist")
                // send error notification
                else this.$toast.global.error("Something went wrong")
            })
        }
    },
    delete({ rootGetters, dispatch }, id) {
        this.$axios.post('/mmtv/delete', { token: rootGetters['user/getToken'], id })
            .then(response => {
                if (response.data.success) {
                    this.$toast.global.success("Item successfully deleted to list")

                    dispatch('mmtvs')
                } else this.$toast.global.error("Something went wrong")
            })
    },
    mmtvs({ rootGetters, commit }) {
        return this.$axios.get('/mmtv/mmtvs', { params: { token: rootGetters['user/getToken'] } })
            .then(response => {
                if (response.data.mmtvs) {
                    const movies = []
                    const books = []
                    const tvSeries = []
                    const games = []
                    const musics = []

                    response.data.mmtvs.map(mmtv => {
                        if (mmtv.type == 'movie') movies.push(mmtv)
                        if (mmtv.type == 'book') books.push(mmtv)
                        if (mmtv.type == 'tv-series') tvSeries.push(mmtv)
                        if (mmtv.type == 'game') games.push(mmtv)
                        if (mmtv.type == 'music') musics.push(mmtv)
                    })

                    commit('setMovies', movies)
                    commit('setBooks', books)
                    commit('setTVSeries', tvSeries)
                    commit('setGames', games)
                    commit('setMusics', musics)
                }
            })
    }
}