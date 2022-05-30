import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiEndpoints } from 'src/data/apiEndpoints'
import { AuthUserResponse } from '../interfaces/User'
import { ApiResponseBody, GeneratedTokenResponse } from '../interfaces/Request'
import { CookieManager } from '../interfaces/CookieManager'
import { serviceContainer } from '../services/ioc/serviceContainer'
import isBrowser from './isBrowser'

interface ApiClientOptions {
  cookieManager?: CookieManager
  cache?: CookieManager
}

interface RefreshTokenResponse {
  user: AuthUserResponse
  token: GeneratedTokenResponse
}

export interface ApiClient {
  get<T>(path: string, config?: AxiosRequestConfig): Promise<T>
}

const DEFAULT_OPTIONS: ApiClientOptions = {}

const createApiClient = ({ cookieManager } = DEFAULT_OPTIONS): ApiClient => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api'
  })

  let tryRefresh = false

  apiClient.interceptors.request.use(req => {
    const accessToken = cookieManager?.get('accessToken')

    if (req.headers && accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req
  })

  apiClient.interceptors.response.use(
    config => {
      return config
    },
    async error => {
      const refreshToken = cookieManager?.get('refreshToken')
      const userPhone = cookieManager?.get('userPhone')
      const originalConfig = error.config

      if (error?.response?.status === 401 && userPhone && refreshToken && !tryRefresh) {
        tryRefresh = true
        try {
          const { data } = await apiClient.post<ApiResponseBody<RefreshTokenResponse>>(
            apiEndpoints.AUTH_REFRESH_TOKEN,
            {
              phone: userPhone,
              refreshToken
            }
          )

          if (data.success) {
            const token = data?.data?.token

            if (token) {
              apiClient.defaults.headers.common.Authorization = token.accessToken
              cookieManager?.set('accessToken', token.accessToken)
              cookieManager?.set('refreshToken', token.refreshToken)
            }
          }

          return apiClient(originalConfig)
        } catch (e) {
          return Promise.reject(e)
        }
      }
      return Promise.reject(error)
    }
  )

  const get = async <T>(path: string, config?: AxiosRequestConfig) => {
    try {
      const cache = serviceContainer().getService('cacheManager')

      if (cache?.has(path)) {
        return cache?.get(path)
      }

      const response = await apiClient.get<T>(path, config)
      cache?.set(path, response.data)

      return response.data
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  return {
    get
  }
}

export const createApiClients = ({ cookieManager } = DEFAULT_OPTIONS) => {
  const apiClient = createApiClient({ cookieManager })

  return { apiClient }
}
