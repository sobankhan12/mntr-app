// store modules auth
import Moralis from 'moralis'
import AuthService from '@/services/auth.service'
import { MORALIS } from '@/constants/common'
import { updateToken } from '@/services/token.service'
import { ethers } from "ethers"


// states
const state = (state) => ({
  user: null,
  wallet: {},
  chainId: null,
  ethAddress: null
});
// sync methods

const getters = {
  getShortEthAddress: (state) => state.user ? state.user?.eth_address?.slice(0, 6) + '...' + state.user?.eth_address?.slice(state.user?.eth_address.length - 6) : '',
  getEthAddress: (state) => state.user?.eth_address,
  isUserConnected: (state) => {
    if (!Moralis) {
      Moralis.start({ serverUrl: MORALIS.other.moralisServerUrl, appId: MORALIS.other.moralisAppID })
    }
    if (state.user?.eth_address) {
      return true
    } else {
      const user = Moralis?.User.current()
      return !!user && window?.ethereum?._state?.isUnlocked
    }
  }
}


// async methods
const actions = {
  async connectMetamask({ commit }, { connect = true, callback }) {
    if (!Moralis?.User.current() && connect) {
      await Moralis.authenticate().catch(e => { console.log(e) })
    }
    const web3 = await Moralis.enableWeb3();
    const moralisUser = Moralis.User.current()

    if (!moralisUser) return
    const ethAddresses = await web3.eth.getAccounts();

    if (ethAddresses?.length === 0) return

    await getloggedIn(ethAddresses[0], commit)
    callback && callback()
    commit('UPDATE_ETH_ADDRESS', ethAddresses[0])
    const chainId = await Moralis.getChainId()
    commit('UPDATE_CHAIN_ID', chainId)
    linkMetamastAccount(commit);
    
  },

  async switchNetwork({ commit }, { networkID, networkInfo }) {
    try {
      await Moralis.switchNetwork(
        parseInt(networkID)
      );
    } catch (e) {
      if (e.code == 4902) {// error code for networks not existing in metamask

        await Moralis.addNetwork(
          parseInt(networkID),
          networkInfo.chainName,
          networkInfo.currencyName,
          networkInfo.currencySymbol,
          networkInfo.rpcUrl,
          networkInfo.blockExplorerUrl

        )
      }
    }



  },

  async disConnectMetamask({ commit }, callback) {
    await Moralis.User.logOut();
    await AuthService.logout().catch(e => {
      console.log(e)
    })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    commit('SET_USER', null)
    commit('UPDATE_CHAIN_ID', null)
    commit('UPDATE_ETH_ADDRESS', null)

    callback && callback()
  },

}


// mutate methods
const mutations = {
  SET_LOADING(state, payload) {
    state.loading += payload
  },

  SET_USER(state, payload = null) {
    state.user = payload
  },

  UPDATE_CHAIN_ID(state, payload = null) {
    state.chainId = payload
  },

  UPDATE_ETH_ADDRESS(state, payload = null) {
    state.ethAddress = payload
  },

}


function linkMetamastAccount(commit) {

  Moralis.onAccountsChanged(async function (accounts) {
    if (!Moralis?.User.current()) return
    const confirmed = confirm(`Link ${accounts[0]} to your account?`);
    if (confirmed) {
      commit('UPDATE_ETH_ADDRESS', accounts[0])
      getloggedIn(accounts[0], commit)
    }
  });

  Moralis.onChainChanged(async function (chainId) {
    commit('UPDATE_CHAIN_ID', parseInt(chainId))
  });
}



async function getloggedIn(walletAddress, commit) {
  try {
    const moralisUser = Moralis.User.current()
    let user = await AuthService.login({ ethAddress: walletAddress }).catch(e => {
      console.log(e)
    })

    if (!user) {
      const newUser = {
        name: moralisUser.attributes.username,
        auth_data_object: moralisUser.attributes.authData.moralisEth,
        eth_address: walletAddress,
        auth_type: moralisUser.attributes.authData.moralisEth.data,
        signature: moralisUser.attributes.authData.moralisEth.signature,
        object_id: moralisUser.id,
        session_token: moralisUser.attributes.sessionToken,
        acl: moralisUser.attributes.ACL.permissionsById,
      }
      user = await AuthService.createUser(newUser).catch(e => {
        console.log(e)
      })
      if (!user) { return }
    }
    localStorage.setItem('accessToken', user.tokens?.access?.token)
    localStorage.setItem('refreshToken', user.tokens?.refresh?.token)

    commit('SET_USER', user.user)
  } catch (error) {
    console.log(error, 'error');
    // TODO: show some Error msg
  }
}



export default {
  state,
  getters,
  actions,
  mutations
}
