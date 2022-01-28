import axios from "axios";

const getDefaultState = () => {
    return {
        ads: [],
        adById: {},
        adsByUserId: [],
        adsByCategory: [],
        adsBySearch: []
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        updateAds(state, payload) {
            state.ads = payload
        },
        updateAdById(state, payload) {
            state.adById = payload
        },
        updateAdsByUserId(state, payload) {
            state.adsByUserId = payload
        },
        updateAdsByCategory(state, payload) {
            state.adsByCategory = payload
        },
        updateAdsBySearch(state, payload) {
            state.adsBySearch = payload
        },
    },
    actions: {
        async createNewAd({ commit }, payload) {
            try {
                const res = await axios.post('api/ads', payload)
            } catch (err) {
                console.log(err)
            }
        },
        
        async updateAdById({ commit }, payload) {
            try {
                const res = await axios.put('api/ads/' + payload.id, payload)
            } catch (err) {
                console.log(err)
            }
        },

        async fetchAds({ commit }) {
            try {
                const res = await axios.get('api/ads')
                commit('updateAds', res.data);
            } catch (err) {
                console.log(err)
            }
        },

        async fetchAdById({ commit }, payload) {
            try {
                const res = await axios.get('api/ads/' + payload.id)
                commit('updateAdById', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        
        async fetchAdsByUserId({ commit }, payload) {
            try {
                const res = await axios.get('api/ads/user/' + payload.id)
                commit('updateAdsByUserId', res.data);
            } catch (err) {
                console.log(err)
            }
        },

        async fetchAdsByCategory({ commit }, payload) {
            try {
                const res = await axios.get('api/ads/category/' + payload.categoryId)
                commit('updateAdsByCategory', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        
        async fetchAdsBySearch({ commit }, payload) {
            try {
                const res = await axios.get('api/search/ads/'+payload.location)
                console.log(res.data);
                commit('updateAdsBySearch', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        
        clearAdsBySearch({ commit }) {
            commit('updateAdsBySearch', null);
        },
    },
    getters: {
        getAds(state) {
            return state.ads
        },
        getAdById(state) {
            return state.adById[0]
        },
        getAdsByUserId(state) {
            return state.adsByUserId
        },
        getAdsByCategory(state) {
            return state.adsByCategory
        },
        getAdsBySearch(state) {
            return state.adsBySearch
        },
    }
}