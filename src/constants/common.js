export const COMMON_CONSTANTS = {
    DISABLELOADER: -1,
    ENABLELOADER: 1,
    ERRORSNACKBARCOLOR: '#f56c6c',
    SUCCESSSNACKBARCOLOR: '#43a047',
    INFOSNACKBARCOLOR: '#2196f3',

    CLOUDINARY_CLOUD_NAME: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.VUE_APP_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.VUE_APP_CLOUDINARY_API_SECRET,

    APILAYER_API_KEY: process.env.VUE_APP_APILAYER_API_KEY,

    ETHERSCAN_API_KEY: process.env.VUE_APP_ETHERSCAN_API_KEY
}

export const MINT_TOKEN_STEPS_LIST = [{
    id: 1,
    name: "Basic Information",
    isDone: false
},
{
    id: 2,
    name: "Tokenomics",
    isDone: false
},
{
    id: 3,
    name: "Capabilities",
    isDone: false
},
{
    id: 4,
    name: "Auditing",
    isDone: false
},
{
    id: 5,
    name: "Summary & Confirmation",
    isDone: false
},
]

export const CAPABILITIES_NAMES = {
    BLACKLIST: "Blacklist",
    BURN: "Burn",
    MINT: "Mint",
    TX_FEE: "TxFee",
    WHITELIST: "WhiteList",
    SNAPSHOT: 'Snapshot'
}

export const BLOCKCHAIN_ROLES = {
    BLACKLIST_MANAGER_ROLE: 'BLACKLIST_MANAGER_ROLE',
    BLACKLISTED_ROLE: 'BLACKLISTED_ROLE',
    PAUSE_MANAGER_ROLE: 'PAUSE_MANAGER_ROLE',
    WHITELISTED_FROM_ROLE: 'WHITELISTED_FROM_ROLE',
    WHITELISTED_SENDER_ROLE: 'WHITELISTED_SENDER_ROLE'
}

export const TOKEN_FACTORY_ADDRESS = process.env.VUE_APP_TOKEN_FACTORY_ADDRESS
export const CONTRACT_ADDRESS = process.env.VUE_APP_CONTRACT_ADDRESS

export const MORALIS = {
    rinkeby: {
        moralisAppID: process.env.VUE_APP_DEV_APP_ID,
        moralisServerUrl: process.env.VUE_APP_DEV_SERVER_URL
    },
    other: {
        moralisAppID: process.env.VUE_APP_DEV_APP_ID_OTHER,
        moralisServerUrl: process.env.VUE_APP_DEV_SERVER_URL_OTHER
    },
}

export const BLOCKCHAIN = {
    TOKEN_FACTORY_ADDRESS_ROPSTEN: process.env.VUE_APP_TOKEN_FACTORY_ADDRESS_ROPSTEN,
    TOKEN_FACTORY_ADDRESS_RINKEBY: process.env.VUE_APP_TOKEN_FACTORY_ADDRESS_RINKEBY,
    TOKEN_FACTORY_ADDRESS_BSC_TESTNET: process.env.VUE_APP_TOKEN_FACTORY_ADDRESS_BSC_TESTNET,
    TOKEN_FACTORY_ADDRESS_MUMBAI: process.env.VUE_APP_TOKEN_FACTORY_ADDRESS_MUMBAI,
}

export const ALL_TEMPLATES_NAME = [
    "BaseTemplate",
    'BlacklistBurnMintSnapshotTemplate',
    'BlacklistBurnMintSnapshotTxFeeWhiteListTemplate',
    'BlacklistBurnMintSnapshotWhiteListTemplate',
    'BlacklistBurnMintTemplate',
    'BlacklistBurnMintTxFeeTemplate',
    'BlacklistBurnMintTxFeeWhiteListTemplate',
    'BlacklistBurnMintWhiteListTemplate',
    'BlacklistBurnSnapshotTemplate',
    'BlacklistBurnSnapshotTxFeeTemplate',
    'BlacklistBurnSnapshotTxFeeWhiteListTemplate',
    'BlacklistBurnSnapshotWhiteListTemplate',
    'BlacklistBurnTemplate',
    'BlacklistBurnTxFeeTemplate',
    'BlacklistBurnTxFeeWhiteListTemplate',
    'BlacklistBurnWhiteListTemplate',
    'BlacklistMintSnapshotTemplate',
    'BlacklistMintSnapshotTxFeeTemplate',
    'BlacklistMintSnapshotTxFeeWhiteListTemplate',
    'BlacklistMintSnapshotWhiteListTemplate',
    'BlacklistMintTemplate',
    'BlacklistMintTxFeeTemplate',
    'BlacklistMintTxFeeWhiteListTemplate',
    'BlacklistMintWhiteListTemplate',
    'BlacklistSnapshotTemplate',
    'BlacklistSnapshotTxFeeTemplate',
    'BlacklistSnapshotTxFeeWhiteListTemplate',
    'BlacklistSnapshotWhiteListTemplate',
    'BlacklistTemplate',
    'BlacklistTxFeeTemplate',
    'BlacklistTxFeeWhiteListTemplate',
    'BlacklistWhiteListTemplate',
    'BurnMintSnapshotTemplate',
    'BurnMintSnapshotWhiteListTemplate',
    'BurnMintTemplate',
    'BurnMintTxFeeTemplate',
    'BurnMintTxFeeWhiteListTemplate',
    'BurnMintWhiteListTemplate',
    'BurnSnapshotTemplate',
    'BurnSnapshotTxFeeTemplate',
    'BurnSnapshotTxFeeWhiteListTemplate',
    'BurnSnapshotWhiteListTemplate',
    'BurnTemplate',
    'BurnTxFeeTemplate',
    'BurnTxFeeWhiteListTemplate',
    'BurnWhiteListTemplate',
    'MintSnapshotTemplate',
    'MintSnapshotTxFeeTemplate',
    'MintSnapshotTxFeeWhiteListTemplate',
    'MintSnapshotWhiteListTemplate',
    'MintTemplate',
    'MintTxFeeTemplate',
    'MintTxFeeWhiteListTemplate',
    'MintWhiteListTemplate',
    'SnapshotTemplate',
    'SnapshotTxFeeTemplate',
    'SnapshotTxFeeWhiteListTemplate',
    'SnapshotWhiteListTemplate',
    'TxFeeTemplate',
    'TxFeeWhiteListTemplate',
    'WhiteListTemplate',
]