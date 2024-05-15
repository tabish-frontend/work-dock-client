import { useEffect, useState } from 'react'
import Axios from 'src/configs/axios'

export const useGetResponse = (url: string) => {
  const [response, setResponse] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (!url) return
      setIsLoading(true)
      try {
        const response = await Axios.get(url)

        setResponse(response.data)
      } catch (error) {
        console.log('ERROR', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [url])

  return {
    isLoading,
    response
  }
}
