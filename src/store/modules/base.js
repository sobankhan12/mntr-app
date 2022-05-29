// store modules base
import { COMMON_CONSTANTS } from "../../constants/common"
// states
const state = (state) => ({
    user: {},
    wallet: {},
    formData: {},
    common: {
        loading: 0
    },
    customer: {},
    isConnected: false,
    walletModalIsOpen: false,
    blockChains: {
        // '3': {
        //     chainName: 'Ropsten',
        //     currencyName: 'ETH',
        //     currencySymbol: 'ETH',
        //     rpcUrl: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        //     blockExplorerUrl: 'https://ropsten.etherscan.io/',
        //     icon: require('@/assets/Bitmap.png'),
        //     factoryAddress: '0x6E555e7e7b75649e4aDdc2890336C8a520753e50',
        //     shortName: 'Eth',
        // providerLink: 'https://ropsten.infura.io/v3/69fcd09ee17248e1b324874787745e24'
        // },
        '97': {
            chainName: 'BNB - Testnet',
            currencyName: 'BNB',
            currencySymbol: 'BNB',
            rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            blockExplorerUrl: 'https://testnet.bscscan.com/',
            icon: require('@/assets/Binance.png'),
            factoryAddress: '0x1544C002eE52716Fd5d01B0e8f177fbB29F380d2',
            shortName: 'Bsc',
            providerLink: 'wss://speedy-nodes-nyc.moralis.io/d7cf9e6f7f77dc924b0953f5/bsc/testnet/ws'
        },
        '80001': {
            chainName: 'Polygon Mumbai',
            currencyName: 'Matic',
            currencySymbol: 'MATIC',
            rpcUrl: 'https://rpc-mumbai.maticvigil.com',
            blockExplorerUrl: 'https://mumbai.polygonscan.com/',
            icon: require('@/assets/polygon.svg'),
            factoryAddress: '0x6E555e7e7b75649e4aDdc2890336C8a520753e50',
            shortName: 'Polygon',
            providerLink: 'wss://speedy-nodes-nyc.moralis.io/d7cf9e6f7f77dc924b0953f5/polygon/mumbai/ws'
        },
        '4': {
            chainName: 'Rinkeby',
            currencyName: 'ETH',
            currencySymbol: 'ETH',
            rpcUrl: 'https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            blockExplorerUrl: 'https://rinkeby.etherscan.io/',
            icon: require('@/assets/Bitmap.png'),
            factoryAddress: '0x6bfC083A435851405f88c616FC331be18F705325',
            shortName: 'Eth',
            providerLink: 'wss://speedy-nodes-nyc.moralis.io/d7cf9e6f7f77dc924b0953f5/eth/rinkeby/ws'
        }

    },
    snackStatus: false,
    snackbars: [],
    snackbarColor: 'red',
});
// sync methods
const getters = {
    getLoading: (state) => state.common.loading,
    getCustomer: (state) => state.customer,
    getIsConnected: (state) => state.isConnected,
    getWalletModalIsOpen: (state) => state.walletModalIsOpen,
    getSnackStatus: (state) => state.snackStatus,
    getSnackBars: (state) => state.snackbars,
    getColor: (state) => state.snackbarColor,
}
// async methods
const actions = {
    activateLoader({ commit }, payload) {
        commit('SET_LOADING', payload)
    },
    fillCustomerData({ commit }, payload) {
        commit('SET_CUSTOMER_DATA', payload)
    },
    fillIsConnected({ commit }, payload) {
        commit('SET_IS_CONNECTED', payload)
    },
    fillWalletModalStatus({ commit }, payload) {
        commit('SET_WALLET_MODAL_STATUS', payload)
    },
    setSnackStatus({ commit }, payload) {
        commit('SET_SNACK_STATUS', payload)
    },
    createSnackBar({ commit }, payload) {
        /* params
        message --> string,
        icon --> string,
        color --> string,
        type --> string // success, error, info ..... default: success
        action --> object { link, label }
         */
        if (payload.type == 'error') {
            payload.color = COMMON_CONSTANTS.ERRORSNACKBARCOLOR
        } else if (payload.type == 'info') {
            payload.color = COMMON_CONSTANTS.INFOSNACKBARCOLOR
        } else {
            payload.color = COMMON_CONSTANTS.SUCCESSSNACKBARCOLOR
        }
        commit('SET_CREATE_SNACKBAR', { ...payload, status: true, id: Math.random() })
    },
    closeSnackBar({ commit }, payload) {
        commit('SET_CLOSE_SNACKBAR', payload)
    },
}
// mutate methods
const mutations = {
    SET_LOADING(state, payload) {
        state.common.loading += payload
    },
    SET_CUSTOMER_DATA(state, payload) {
        state.customer = payload
    },
    SET_IS_CONNECTED(state, payload) {
        state.isConnected = payload
    },
    SET_WALLET_MODAL_STATUS(state, payload) {
        state.walletModalIsOpen = payload
    },
    SET_SNACK_STATUS(state, payload) {
        state.snackStatus = payload
    },
    SET_SNACKBAR_COLOR(state, payload) {
        state.snackbarColor = payload
    },
    SET_CREATE_SNACKBAR(state, payload) {
        state.snackbars = [...state.snackbars, payload]
    },
    SET_CLOSE_SNACKBAR(state, payload) {
        state.snackbars = state.snackbars.filter((item) => {
            return JSON.stringify(item) !== JSON.stringify(payload)
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
