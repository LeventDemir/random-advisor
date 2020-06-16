export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('advice/genres')
    }
}