import { useSWRConfig } from 'swr'
import { useCallback, useState } from 'react'
import { useApiClient } from './useApiClient'
import { ApiResponseBody } from 'server/interfaces/Request'

export const useMutation = <RESDATA = any, DATA = any>(path: string) => {
  const apiClient = useApiClient()
  const [fetching, setFetching] = useState(false)
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (data?: DATA) => {
      setFetching(true)
      const response = (await apiClient.post<ApiResponseBody<RESDATA>>(path, data)).data
      setFetching(false)

      return response
    },
    [path]
  )

  return {
    execute,
    mutate,
    fetching
  }
}
