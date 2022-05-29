import axios from './axios';
import { reArangeFilters } from "../utils/helpers"
import { getEthAddress } from "./web3.service"

export function getTokens(filters) {
  const queryFilters = reArangeFilters(filters);
  return axios.get(`tokens${queryFilters}`)
}

export function saveToken(data) {
  return axios.post(`tokens`, data)
}

export async function updateToken(data) {
  data.ether_address = await getEthAddress()
  return axios.patch(`tokens/${data.id}`, data)
}

export function getTokenDetailByAddress(tokenAddress) {
  return axios.get(`tokens/token-address/${tokenAddress}`)
}

export function deleteToken(id) {
  return axios.delete(`tokens/${id}`)
}

export function verifyToken(tokenAddress, blockchain_id) {
  return axios.get(`tokens/verify/${tokenAddress}/${blockchain_id}`)
}

export function verifyTokenTemplate(templateName, blockchain_id) {
  return axios.get(`token-templates/verify/${templateName}/${blockchain_id}`)
}

export function getTemplates(filters) {
  const queryFilters = reArangeFilters(filters);
  return axios.get(`token-templates${queryFilters}`)
}


export function updateTemplates(data) {
  return axios.patch(`token-templates/${data?.id}`, data)
}


export function sendHackenVarificationRequest(data) {
  return axios.post(`/tokens/hacken/request`, data)
}
