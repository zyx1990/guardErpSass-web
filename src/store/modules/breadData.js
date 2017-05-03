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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}