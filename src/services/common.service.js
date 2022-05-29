import axios from 'axios';
import customAxios from './axios';
import { COMMON_CONSTANTS } from '../constants/common'

export function subscribeNewsLetter(data) {
   return customAxios.post(`newsletters`, data)
}

export function profanityCheck(data) {
   return axios.post(`https://api.promptapi.com/bad_words`, data, { headers: { "apikey": COMMON_CONSTANTS.APILAYER_API_KEY } })
}