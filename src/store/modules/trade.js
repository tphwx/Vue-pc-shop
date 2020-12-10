import {
  reqGetTrade
} from '../../api/trade'

export default {
  state: {
    cartTrade: {
    }
  },
  getters: {},
  actions: {
    async getTrade({
      commit
    }) {
      const cartTrade = await reqGetTrade()
      commit('GET_TRADE', cartTrade)
    }
  },
  mutations: {
    GET_TRADE(state, cartTrade) {
      state.cartTrade = cartTrade
    }
  }
}