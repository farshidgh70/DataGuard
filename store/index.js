export const state = () => ({
  DisableAll: false,
  tabs: [],
});

export const mutations = {
  SET_DISABLE_ALL: (state, payload) => {
    console.log(payload);
    state.DisableAll = payload;
  },
  SET_TABS: (state, payload) => {
    state.tabs = payload;
  },
};

export const actions = {
  async init({ commit }) {
    const res = await this.$axios.$get("/api/init");
    commit("SET_TABS", res.result);
    commit("SET_DISABLE_ALL", res.DisableAll);
  },
  async disableAllStatus({ commit, state }, payload) {
    const res = await this.$axios.$post("/api/status", {
      status: payload,
    });
    commit("SET_DISABLE_ALL", payload);
  },
};
