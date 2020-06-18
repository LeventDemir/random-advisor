export const state = () => ({
    movies: [],
    musics: [],
    Books: [],
    tvSeries: []
})

export const getters = {
    getMovies(state) {
        return state.movies
    },
    getMusics(state) {
        return state.musics
    },
    getBooks(state) {
        return state.books
    },
    getTVSeries(state) {
        return state.tvSeries
    }
}

export const mutations = {
    setMovies(state, movies) {
        state.movies = movies
    },
    setMusics(state, musics) {
        state.musics = musics
    },
    setBooks(state, books) {
        state.books = books
    },
    setTVSeries(state, tvSeries) {
        state.tvSeries = tvSeries
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
                } else if (response.data.exist) this.$toast.global.warning("This user is already exist")
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
                    const musics = []
                    const books = []
                    const tvSeries = []

                    response.data.mmtvs.map(mmtv => {
                        if (mmtv.type == 'movie') movies.push(mmtv)
                        if (mmtv.type == 'music') musics.push(mmtv)
                        if (mmtv.type == 'book') books.push(mmtv)
                        if (mmtv.type == 'tv-series') tvSeries.push(mmtv)
                    })

                    commit('setMovies', movies)
                    commit('setMusics', musics)
                    commit('setBooks', books)
                    commit('setTVSeries', tvSeries)
                }
            })
    }
}