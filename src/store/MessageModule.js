import axios from "axios";

const getDefaultState = () => {
    return {
        messagesByChat: [],
        messagesByUser: [],
        idsForCurrentChat: {},
    }
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        updateMessagesByChat(state, payload) {
            state.messagesByChat = payload
        },
        updateMessagesByUser(state, payload) {
            state.messagesByUser = payload
        },
        updateIdsForCurrentChat(state, payload) {
            state.idsForCurrentChat = payload
        },
    },
    actions: {
        async messageSeller({ commit }, payload) {
            try {
                const res = await axios.post('api/messages', payload)
            } catch (err) {
                console.log(err)
            }
        },

        async fetchMessagesByChat({ commit }, payload) {
            try {
                const res = await axios.get('api/messages/' + payload.user_id + '/' +payload.seller_id + '/' + payload.ad_id)
                commit('updateMessagesByChat', res.data);
            } catch (err) {
                console.log(err)
            }
        },

        async fetchMessagesByUser({ commit }, payload) {
            try {
                const res = await axios.get('api/messages/user/' + payload.id)
                commit('updateMessagesByUser', res.data);
            } catch (err) {
                console.log(err)
            }
        },
        
        storeIdsForCurrentChat({ commit }, payload) {
            commit('updateIdsForCurrentChat', payload);
        },
    },
    getters: {
        getMessagesByUser(state) {
            return state.messagesByUser
        },
        getMessagesByChat(state) {
            return state.messagesByChat
        },
        getIdsForCurrentChat(state) {
            return state.idsForCurrentChat
        },
    }
}