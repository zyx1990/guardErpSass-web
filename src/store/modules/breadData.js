const state = {
    breadData: []
};

const getters = {
    getBreadData: state => state.breadData
};

const actions = {
    setBreadData: ({ commit }, data) => {
        commit('breadData', data);
    }
};

const mutations = {
    breadData(state, data) {
        state.breadData = data;
        let _key = data[data.length - 1].url
        window.sessionStorage.setItem(_key, JSON.stringify(data))
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}