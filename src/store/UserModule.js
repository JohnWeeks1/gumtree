import axios from "axios";

const getDefaultState = () => {
    return {
        user: {}
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        updateUser(state, payload) {
            state.user = payload
        },
    },
    actions: {
        async fetchLoggedInUser({ commit }) {
            try {
                const res = await axios.get('api/user')
                commit('updateUser', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        
        async updateUserById({ commit, dispatch }, payload) {
            try {
                const res = await axios.put('api/user/' + payload.id, payload)
                dispatch('fetchLoggedInUser');
            } catch (err) {
                console.log(err)
            }
        },
        
        async logout({ commit }) {
            try {
                const res = await axios.post('logout')
                    commit('resetState');
                    localStorage.removeItem('mexgumtree');
            } catch (err) {
                console.log(err)
            }
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
    }
}