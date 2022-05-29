/* eslint-disable no-unreachable */
import Moralis from "moralis";
// import { ethers } from "ethers";
import TokenAbi from "../contracts/abi/Token.abi.json";
import store from "../store"
const Web3EthContract = require('web3-eth-contract');


export async function getTokenTransfers(tokenAddress, blockchainId) {
  const blockchainShortName = store.state?.base.blockChains[blockchainId] && store.state?.base.blockChains[blockchainId]?.shortName
  if (!blockchainShortName) return
  const tableName = `${blockchainShortName}TokenTransfers`;
  const EthTokenTransfers = Moralis.Object.extend(tableName);
  const query = new Moralis.Query(EthTokenTransfers);
  query.equalTo("token_address", tokenAddress);
  query.equalTo('confirmed', true)
  const results = await query.find();
  const dataList = results.map(item => {
    return { ...item, ...item.attributes }
  })
  return dataList
}

export async function getTokenHolders(tokenAddress, blockchainId, transfers = []) {

  let addresses = [];

  const providerLink = store.state?.base.blockChains[blockchainId] && store.state?.base.blockChains[blockchainId]?.providerLink
  Web3EthContract.setProvider(providerLink);
  const tokenContract = new Web3EthContract(TokenAbi, tokenAddress);

  addresses = transfers?.map(item => item.to_address)

  const uniqeAddresses = addresses.filter(function (item, pos) {
    return addresses.indexOf(item) == pos;
  })

  const holders = [];
  for (let addr of uniqeAddresses) {
    var balance = await tokenContract.methods.balanceOf(addr).call();
    holders.push({ address: addr, balance })
  }
  return holders
}

export async function getTokenHolders2(tokenAddress, blockchainId) {
  const blockchainShortName = store.state?.base.blockChains[blockchainId] && store.state?.base.blockChains[blockchainId]?.shortName
  if (!blockchainShortName) return
  const tableName = `${blockchainShortName}TokenBalance`;
  const EthTokenBalance = Moralis.Object.extend(tableName);
  const query = new Moralis.Query(EthTokenBalance);
  query.equalTo("token_address", tokenAddress);
  const results = await query.find();
  const dataList = results.map(item => {
    return { ...item, ...item.attributes }
  })
  return dataList.sort((a, b) => b.balance - a.balance)
}
