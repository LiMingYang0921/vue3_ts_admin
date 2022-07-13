import { createStore } from 'vuex'

export default createStore({
  state: {
    menuIsCollapse: false
  },
  getters: {
    menuIsCollapse (state) {
      console.log(state.menuIsCollapse)
      if (state.menuIsCollapse) {
        return state.menuIsCollapse
      }
      setTimeout(() => {
        return state.menuIsCollapse
      }, 1000)
    }
  },
  mutations: {
    setMenuIsCollapse (state) {
      state.menuIsCollapse = !state.menuIsCollapse
    }
  },
  actions: {
  },
  modules: {
  }
})
