import axios from 'axios'
import router from '../router'
import { authHeader } from '../utils/helpers'
import store from '../store'
import { COMMON_CONSTANTS } from '../constants/common'
import { baseDevApi } from "../../config/api";

const requestService = axios.create({
    baseURL: baseDevApi || '',
    timeout: 100000, //@note timeout changed from 30000 to 100000
    rejectUnauthorized: false
})

requestService.interceptors.request.use(
    async (config) => {
        config &&
            config.loading &&
            store.dispatch('activateLoader', COMMON_CONSTANTS.ENABLELOADER)
        if (config.url !== 'account/token') {
            config.headers.authorization = await authHeader()
            // config.headers['Access-Control-Allow-Methods'] = '*'
            // config.headers['Access-Control-Allow-Origin'] = '*'
            //config.headers['X-IR-API-KEY'] = APP_CONFIG.VUE_APP_API_KEY

        }
        return config
    },
    (config) => {
        if (!config.loader) store.dispatch('activateLoader', COMMON_CONSTANTS.DISABLELOADER)
    }
)

requestService.interceptors.response.use(
    (response) => {
        //if there is global loader param
        response.config.loading &&
            store.dispatch('activateLoader', COMMON_CONSTANTS.DISABLELOADER)
        const { snackbar } = response.config
        //if there is snackbar obj
        if (snackbar && snackbar.show) {
            store.dispatch('createSnackBar', {
                message: response.data.message,
                icon: snackbar.icon,
                color: snackbar.color
            })
        }
        return response
    },
    (error) => {
        //if there is global loader param
        error.config.loading && store.dispatch('activateLoader', COMMON_CONSTANTS.DISABLELOADER)
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(error)
        } else if (!error.response) {
            return Promise.reject(error)
        } else if (error.response.status === 401 || error.response.status === 306) {
            // AuthenticationService.removeToken()
            router.push({ name: 'login', params: { isSessionExpired: 'true' } })
        } else if (error.response && error.response.status !== 404) {
            if (
                error.request.responseType === 'blob' &&
                error.response.data instanceof Blob &&
                error.response.data.type &&
                error.response.data.type.toLowerCase().indexOf('json') != -1
            ) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.onload = () => {
                        error.response.data = JSON.parse(reader.result)
                        store.dispatch(
                            'createSnackBar',
                            {
                                message:
                                    error.response.data.message ||
                                    error.response.data.Message,
                                icon: 'mdi-alert',
                                type: 'error'
                            },
                            { root: true }
                        )
                        resolve(Promise.reject(error))
                    }

                    reader.onerror = () => {
                        reject(error)
                    }

                    reader.readAsText(error.response.data)
                })
            } else {
                store.dispatch(
                    'createSnackBar',
                    {
                        message:
                            error.response.data.message ||
                            error.response.data.Message ||
                            'Something Went Wrong',
                        icon: 'mdi-alert',
                        type: 'error'
                    },
                    { root: true }
                )
            }
        }
        if (
            // AuthenticationService.getToken() == null ||
            error.response.status === 401 ||
            error.response.status === 306
        ) {
            if (error.response.status === 401) {
                // AuthenticationService.removeToken()
                router.push({ name: '' })
            } else {
                router.push('/')
            }
        }
        return Promise.reject(error)
    }
)

export default requestService