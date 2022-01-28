import axios from "axios";

const getDefaultState = () => {
    return {
        categories: []
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        updateCategories(state, payload) {
            state.categories = payload
        },
    },
    actions: {
        async fetchCategories({ commit }) {
            try {
                const res = await axios.get('api/categories')
                commit('updateCategories', res.data);
            } catch (err) {
                console.log(err)
            }
        },
    },
    getters: {
        getCategories(state) {
            return state.categories
        }
    }
}