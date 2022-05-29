import { getTokenDetailByAddress, updateToken, verifyToken } from "./../../services/token.service"
import { getBlackWhiteListWallets, getTokenDetailFromBlockchain, getTokenPrice } from '@/services/web3.service'
// states
const state = () => ({
  tokenDetail: null,
  loading: false
});
// sync methods
const getters = {};
// async methods
const actions = {

  async getTokenDetail({ commit }, { callback, tokenAddress }) {
    commit('LOADING', true)
    getTokenDetailByAddress(tokenAddress).then(response => {
      commit('SYNC_TOKEN_DETAIL', response?.data)
      commit('LOADING', false)
    }).catch(error => {
      console.log(error)
      commit('LOADING', false)
    })
    callback && callback()
  },

  async syncTokenDetail({ commit }, { callback, token }) {
    commit('LOADING', true)
    // const tokenMetaData = await getTokenMetaData({ address: token?.token_address });
    const tokenMetaData = await getTokenDetailFromBlockchain(token?.token_address, token?.blockchain_id);
    if (!tokenMetaData) {
      commit('LOADING', false)
      console.log(tokenMetaData, 'tokenMetaData error');
      return
    }

    // Getting whitelisted_wallets, blacklisted_wallets 
    const { whitelisted_wallets, blacklisted_wallets } = await getBlackWhiteListWallets(token?.token_address, token?.blockchain_id);
    // Getting/Setting Price 
    const tokenPrice = await getTokenPrice({ address: token?.token_address })
    console.log(tokenMetaData, 'tokenMetaData');
    tokenMetaData.value = tokenPrice?.usdPrice;

    tokenMetaData.whitelisted_wallets = whitelisted_wallets;
    tokenMetaData.blacklisted_wallets = blacklisted_wallets;

    tokenMetaData.updatedAt = new Date();
    commit('SYNC_TOKEN_DETAIL', tokenMetaData)
    commit('LOADING', false)
    updateToken({ ...tokenMetaData, id: token.id }).catch(error => {
      console.log(error, 'error while syncing');
    })
    verifyToken(token?.token_address, token?.blockchain_id)
    callback && callback()
  }
}

// mutate methods
const mutations = {
  LOADING(state, payload) {
    state.loading = payload
  },

  SYNC_TOKEN_DETAIL(state, payload = null) {
    if (state.tokenDetail) {
      state.tokenDetail = { ...state.tokenDetail, ...payload }
    } else {
      state.tokenDetail = payload
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
