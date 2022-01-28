import axios from "axios";

const getDefaultState = () => {
    return {
        hideNavBar: false,
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        updateHideNavBar(state, payload) {
            state.hideNavBar = payload
        },
    },
    actions: {
        storeHideNavBar({ commit }, payload) {
            commit('updateHideNavBar', payload);
        },
    },
    getters: {
        getHideNavBar(state) {
            return state.hideNavBar
        },
    }
}