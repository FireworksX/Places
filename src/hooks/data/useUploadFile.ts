import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiEndpoints } from 'src/data/apiEndpoints'
import { MediaFile } from 'src/interfaces/MediaFile'
import isBrowser from 'src/utils/isBrowser'
import { useQueue } from 'src/hooks/useQueue'

export const useUploadFile = (files?: File[] | null) => {
  const [progress, setProgress] = useState(0)
  const [resultFiles, setResultFiles] = useState<MediaFile[]>([])

  const { currentValue, currentIndex, goNext, hasNext } = useQueue(files || [])

  const formData = useMemo(() => (isBrowser ? new FormData() : undefined), [])

  if (currentValue && isBrowser) {
    formData?.delete('file')
    formData?.append('file', currentValue)
  }

  const { fetching, execute } = {}

  const runHandler = useCallback(async () => {
    if (formData && currentValue) {
      const result = await execute(formData)

      if (result.success && result.data) {
        setResultFiles(curr => [...curr, result.data!])
        setProgress(0)
      }

      if (hasNext) {
        goNext()
      }
    }
  }, [currentValue, execute, formData, goNext, hasNext])

  useEffect(() => {
    runHandler()
  }, [currentIndex, runHandler])

  return {
    runHandler,
    fetching,
    currentIndex,
    progress,
    resultFiles,
    hasNext
  }
}
