const cookies = require('js-cookie')


export const state = () => ({
    token: null,
    auth: null
})

export const getters = {
    getToken(state) {
        return state.token
    },
    getAuth(state) {
        return state.auth
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setAuth(state, auth) {
        state.auth = auth
    }
}


export const actions = {
    signUp({ commit }, user) {
        this.$axios.post('/user/sign-up', user)
            .then(response => {
                if (response.data.token) {
                    // set token to cookies
                    cookies.set('token', response.data.token)
                    // set token to vuex
                    commit('setToken', response.data.token)
                    // set auth to Vuex 
                    commit('setAuth', true)

                    // send success notification
                    this.$toast.global.success("Signed Up")

                    // redicect to home page
                    this.$router.push({ name: 'index' })
                } else if (response.data.exist) {
                    // send error notification
                    this.$toast.global.warning("This user is already exist")
                    // send error notification
                } else this.$toast.global.error("Something went wrong")
            })
    },
    signIn({ commit, dispatch }, user) {
        this.$axios.post('/user/sign-in', user).then(response => {
            if (response.data.token) {
                // set token to cookies
                cookies.set('token', response.data.token)
                // set token to vuex
                commit('setToken', response.data.token)
                // set auth to Vuex 
                commit('setAuth', true)

                dispatch('mmtv/mmtvs', null, { root: true })

                // send success notification
                this.$toast.global.success("Signed In")

                // redicect to home page
                this.$router.push({ name: 'index' })
                // send error notification
            } else this.$toast.global.error("Username or password incorrect")
        })
    },
    signOut({ getters, commit }) {
        this.$axios.post('/user/sign-out', { token: getters.getToken })
            .then(response => {
                if (response.data.success) {
                    // delete token from cookies
                    cookies.remove('token')
                    //delete token from vuex
                    commit('setToken', null)
                    // delete auth from vuex
                    commit('setAuth', null)

                    commit('mmtv/setMovies', null, { root: true })
                    commit('mmtv/setBooks', null, { root: true })
                    commit('mmtv/setTVSeries', null, { root: true })
                    commit('mmtv/setGames', null, { root: true })
                    commit('mmtv/setMusics', null, { root: true })

                    commit('advice/setMovie', null, { root: true })
                    commit('advice/setBook', null, { root: true })
                    commit('advice/setTVSeries', null, { root: true })
                    commit('advice/setGame', null, { root: true })
                    commit('advice/setMusic', null, { root: true })

                    // send success notification
                    this.$toast.global.success("Logged out")

                    // redicect to home page
                    this.$router.push({ name: 'index' })
                } else this.$toast.global.error("Something went wrong")
            })
    },
    isAuth({ getters, commit }) {
        return this.$axios.get('/user/is-auth', { params: { token: getters.getToken } })
            .then(response => commit('setAuth', response.data.auth || false))
    }
}