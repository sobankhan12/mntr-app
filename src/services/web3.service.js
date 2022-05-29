
import Moralis from "moralis";
import contractAbi from "../utils/contracts/abi.json";
import { ethers } from "ethers";
// import BaseTemplate from "../contracts/templates/BaseTemplate.json"
// import ProxyTemplate from "../contracts/templates/ERC1967Proxy.json"
import { getTemplates, updateTemplates, updateToken, verifyToken, verifyTokenTemplate } from "./token.service";
import { getTemplateForCapability, formatUnits } from "../utils/helpers";
import TokenFactoryAbi from "../contracts/abi/TokenFactory.abi.json";
import TokenAbi from "../contracts/abi/Token.abi.json";
import store from "../store";
import { CAPABILITIES_NAMES, BLOCKCHAIN_ROLES } from "../constants/common";
const Web3EthContract = require('web3-eth-contract');


export async function getContract() {
  const web3 = await Moralis.enableWeb3();
  return new web3.eth.Contract(
    contractAbi,
    process.env.VUE_APP_CONTRACT_ADDRESS
  );
}

export async function getEthAddress() {
  // const moralisUser = Moralis.User.current()
  // return moralisUser?.get('ethAddress');

  const web3 = await Moralis.enableWeb3();
  const ethAddresses = await web3.eth.getAccounts();
  return ethAddresses[0];
}

export async function getTotalSupply() {
  try {
    const contract = await getContract();
    const ethAddress = await getEthAddress();
    const totalSupply = await contract.methods
      .totalSupply()
      .call({ from: ethAddress });
    return totalSupply;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
}

export async function getTokenMetaData(
  options = {}
) {
  try {
    const tokenMetaData = await Moralis.Web3API.token.getTokenMetadata(options);
    if (tokenMetaData && tokenMetaData.length > 0) {
      return tokenMetaData[0];
    }
  } catch (error) {
    console.log(error, "error");
    return null;
  }
}

export async function getTokenDetailFromBlockchain(address = "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",blockchainId) {

  try {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const tokenContract = new ethers.Contract(
    //   address,
    //   TokenAbi,
    //   signer
    // );

    const providerLink = store.state?.base.blockChains[blockchainId] && store.state?.base.blockChains[blockchainId]?.providerLink
    Web3EthContract.setProvider(providerLink);

    const tokenContract = new Web3EthContract(TokenAbi, address);
console.log(tokenContract, 'tokenContract tokenContract tokenContract');
    const token = {};
    token.name = await tokenContract.methods.name()?.call()
    console.log(token, 'token token token');
    token.symbol = await tokenContract.methods.symbol()?.call()
    token.decimals = await tokenContract.methods.decimals()?.call();
    token.totalSupply = formatUnits(await tokenContract.methods.totalSupply()?.call(), token.decimals)
    token.initial_supply = token.totalSupply;
    token.max_supply = token.totalSupply;
console.log(token, 'tokne');
    // console.log(await tokenContract.balanceOf(address), 'await tokenContract.balanceOf(address)');
    // token._balances = (await tokenContract.balanceOf(address))?.toNumber()
    return token
  } catch (error) {
    console.log(error, "error");
    return null;
  }
}



export async function getTokenPrice(options) {
  try {
    const tokenPrice = await Moralis.Web3API.token.getTokenPrice(options);
    return tokenPrice;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
}


export async function deployContract(options, changeLoadingStatus) {
  try {
    changeLoadingStatus({ status: true, msg: 'Minting your token', tx_url: null, description: 'System is deploying your token contract on blockchain' })
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider?.getSigner();

    // User Wallet Address
    const myAddress = await signer?.getAddress();
    const templateName = getTemplateForCapability(options.capabilities || []);
    const templateResponse = await getTemplates({ name: templateName });

    // TODO: Handle this if template not found from DB
    if (templateResponse?.data?.length === 0) {
      // Error Popup
      store.dispatch("createSnackBar", {
        message: "Template not found, Contact to support Team",
        type: "error",
      });
      // Returning.. if Template not found in DB
      return;
    }

    console.log(templateName);

    const templateData = templateResponse.data[0];
    if (!templateData?.network || !templateData?.network[options.blockchain_id]) {
      // Deploying Template.. if template-address is null (not deployed on Ether yet).
      const factory = new ethers.ContractFactory(
        templateData.abi,
        templateData.bytecode,
        signer
      );
      const contract = await factory.deploy();
      await contract.deployTransaction.wait();
      if (!templateData.network) {
        templateData.network = {}
      }
      templateData.network[options.blockchain_id] = {}
      templateData.network[options.blockchain_id].address = contract.address;
      templateData.network[options.blockchain_id].deployed_by = myAddress;

      // Updating template-ether-address in DB
      updateTemplates(templateData);
    }

    if (!!templateData?.network && !templateData?.network[options.blockchain_id]?.verified) {
      verifyTokenTemplate(templateData.name, options.blockchain_id);
    }

    const blockchainList = store.state.base.blockChains;
    const tokenFactoryAddress = blockchainList[options.blockchain_id]?.factoryAddress;

    const tokenFactory = new ethers.Contract(
      tokenFactoryAddress,
      TokenFactoryAbi,
      signer
    );

    // Formating max_supply according to the decimals
    const max_supply = ethers.utils.parseUnits(
      String(options.max_supply),
      parseInt(options.decimals)
    );

    const itf = new ethers.utils.Interface([templateData?.initializer]);

    const dataArr = [
      options.name,
      options.symbol,
      options.decimals,
      max_supply,
    ];

    // Checking initializer ... i.e "function initialize(string name_, string symbol_, uint8 decimals_, uint256 amount_, uint256 txFee, address txFeeBeneficiary)"
    if (templateData?.name?.includes(CAPABILITIES_NAMES.TX_FEE)) {
      // Converting Tx_fee in Ether ..
      // options.transaction_fee_percentage = ethers.utils.formatUnits(options.transaction_fee_percentage, parseInt(options.decimals));

      // 0.25 => 0.0025
      // 25 => 0.0025

      const val = String(options.transaction_fee_percentage / 100);
      const transaction_fee_percentage = ethers.utils.parseEther(val);

      // i.e 10000000000000000 .. if transaction_fee_percentage = 1

      dataArr.push(transaction_fee_percentage);
      const nominatedWallet = options?.nominated_wallet || myAddress;
      dataArr.push(nominatedWallet);
    }

    const data = itf.encodeFunctionData(itf.fragments[0].name, dataArr);

    // Deploying Token
    const tokenDeployRssponse = await tokenFactory.deployToken(
      templateData.network[options.blockchain_id]?.address,
      myAddress,
      data
    );

    const tx_url = `${blockchainList[options.blockchain_id]?.blockExplorerUrl}tx/${tokenDeployRssponse.hash} `;

    // Setting URL for Transaction Button
    changeLoadingStatus({ status: true, tx_url })

    const deployedToken = await tokenDeployRssponse.wait();
    const event = deployedToken.events.find((ev) => ev.event === "Deploy");
    if (!event) {
      // Error Popup
      store.dispatch("createSnackBar", {
        message: "Something went Wrong!, Try again later",
        type: "error",
      });
      return;
    }

    options.token_address = event.args?.tokenProxy;
    options.mint_transaction_id = event.transactionHash;
    options.blockNumber = event.blockNumber;
    options.info_level = 10;
    options.ether_address = myAddress;

    // Updateding token in DB
    const updatedTokenRes = await updateToken(options);
    // Requesting for Token Verification
    verifyToken(options.token_address, options.blockchain_id)

    // if user selected the blacklisting capability
    if (options?.capabilities?.includes(CAPABILITIES_NAMES.BLACKLIST)) {
      changeLoadingStatus({ msg: 'Granting Role', status: true, description: 'Since you have selected Blacklisting capability so system is granting you role of blacklist manager on blockchain' })
      // granting Manager role to token owner
      await grantRole(options.token_address, templateData.abi, BLOCKCHAIN_ROLES.BLACKLIST_MANAGER_ROLE, myAddress);
    }

    // adding addresses to Blacklist in Blockchain
    if (
      options?.capabilities?.includes(CAPABILITIES_NAMES.BLACKLIST) &&
      options?.blacklisted_wallets?.length > 0
    ) {
      // Template Contract Instance
      const templateContract = new ethers.Contract(
        options.token_address, // Token address
        templateData.abi, // template abi
        signer
      );

      changeLoadingStatus({ msg: 'Deploying Wallet Addresses', status: true, description: 'You have added blacklisted wallet addresses so system is passing that into your token contract' })
      // Adding address to blacklist
      const transactionResp = await templateContract.addAddressesToBlacklist(
        options?.blacklisted_wallets // addresses to blacklist
      );
      await transactionResp.wait();
    }

    // if user selected the blacklisting capability
    if (options?.capabilities?.includes(CAPABILITIES_NAMES.WHITELIST)) {
      changeLoadingStatus({ msg: 'Granting Role', status: true, description: 'Since you have selected whitelisting capability so system is granting you role of whitelist manager in your token contract' })
      // granting Manager role to token owner
      await grantRole(options.token_address, templateData.abi, BLOCKCHAIN_ROLES.PAUSE_MANAGER_ROLE, myAddress);
    }

    // adding addresses to whitelist in Blockchain
    if (
      options?.capabilities?.includes(CAPABILITIES_NAMES.WHITELIST)
    ) {
      // Template Contract Instance
      const templateContract = new ethers.Contract(
        options.token_address, // Token address
        templateData.abi, // template abi
        signer
      );

      changeLoadingStatus({ msg: 'Deploying Wallet Addresses', status: true, description: 'You have added whitelisted wallet addresses so system is passing that into your token contract' })

      // Adding address to Whitelist
      const transactionResp = await templateContract.addAddressesToWhitelistSender(
        [...options?.whitelisted_wallets, myAddress] // addresses to Whitelist 
      );
      await transactionResp.wait();

      changeLoadingStatus({ msg: 'Pause', status: true, description: 'Since you have selected pausing capability so system is applying that capability into your token contract' })
      await templateContract.pause()

    }

    // Success Popup
    store.dispatch("createSnackBar", {
      message: "Token Minted Successfully!",
    });

    return updatedTokenRes.data;
  } catch (error) {
    console.log(error, "error");
    store.dispatch("createSnackBar", {
      message: error.message || "Something went Wrong!, Try again later",
      type: "error",
    });
    return null;
  }
}


export async function grantRole(proxyAddress, templateABI, role, address) {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Template Instance
  const templateContract = new ethers.Contract(
    proxyAddress, // Token address
    templateABI, // template abi
    signer
  );

  // Hashing the role
  const role256 = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(role)
  );

  // granting roles
  const transactionResp = await templateContract.grantRole(
    role256, // role
    address // address to assign the role
  );

  const transaction = await transactionResp.wait();
  return transaction;
}




export async function getBlackWhiteListWallets(tokenAddress, networkId) {

  try {

    const providerLink = store.state.base.blockChains[networkId]?.providerLink;
    const provider = new ethers.providers.WebSocketProvider(providerLink);
    const signer = provider.getSigner();

    // contract instance
    const tokenContract = new ethers.Contract(
      tokenAddress,
      TokenFactoryAbi,
      signer
    );

    // getting "RoleGranted" filter
    let eventFilter = [tokenContract?.filters?.RoleGranted()];
    console.log(eventFilter, 'eventFilter', tokenContract.queryFilter);
    // getting logs of "RoleGranted"
    if (!tokenContract.queryFilter) return
    const logs = await tokenContract.queryFilter(eventFilter);
    // hashing roles
    const blackListRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(BLOCKCHAIN_ROLES.BLACKLISTED_ROLE))
    const whiteListRole = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(BLOCKCHAIN_ROLES.WHITELISTED_SENDER_ROLE))
    // filtering role
    const blacklisted_logs = logs.filter(log => log?.args?.role === blackListRole && log.event === "RoleGranted")
    const whitelisted_logs = logs.filter(log => log?.args?.role === whiteListRole && log.event === "RoleGranted")

    const blacklisted_revoked_logs = logs.filter(log => log?.args?.role === blackListRole && log.event === "RoleRevoked")
    const whitelisted_revoked_logs = logs.filter(log => log?.args?.role === whiteListRole && log.event === "RoleRevoked")
    // getting array of addressess
    console.log(blacklisted_logs, whitelisted_logs);
    const blacklisted_wallets = blacklisted_logs?.map(log => log.args.account)
    const whitelisted_wallets = whitelisted_logs?.map(log => log.args.account)

    for (let revokedLog of blacklisted_revoked_logs) {
      let index = blacklisted_wallets.indexOf(revokedLog.args?.account);
      if (index > -1) {
        blacklisted_wallets.splice(index, 1)
      }
    }

    for (let revokedLog of whitelisted_revoked_logs) {
      let index = whitelisted_wallets.indexOf(revokedLog.args?.account);
      if (index > -1) {
        whitelisted_wallets.splice(index, 1)
      }
    }

    const addresses = {
      whitelisted_wallets: whitelisted_wallets || [],
      blacklisted_wallets: blacklisted_wallets || [],
    }
    return addresses;
  } catch (error) {
    console.log('got error while getting whitelisted_wallets & blacklisted_wallets', error);
    return {
      whitelisted_wallets: [],
      blacklisted_wallets: [],
    }
  }

}
