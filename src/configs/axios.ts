import axios from 'axios'

import { toast } from 'react-toastify'

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
})

Axios.interceptors.request.use(
  config => {
    if (typeof document !== 'undefined' && document.cookie) {
      // Append cookies to headers
      config.headers.Cookie = document.cookie
    }

    return config
  },
  error => {
    // Handle request error
    console.error('Request error:', error)

    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      const htmlResponse = error.response.data
      const errorMessageStart = 'Error: '
      const errorMessageEnd = '<br>'
      const startIndex = htmlResponse.indexOf(errorMessageStart)
      const endIndex = htmlResponse.indexOf(errorMessageEnd, startIndex)

      const duplicate = htmlResponse.includes('E11000')

      if (duplicate) {
        const isEmail = htmlResponse.includes('email')
        toast.error(
          `${isEmail ? 'Email' : 'Mobile'} is duplicate please enter different ${isEmail ? 'Email' : 'Mobile'}`
        )
      } else if (startIndex !== -1 && endIndex !== -1) {
        const errorMessage = htmlResponse.substring(startIndex + errorMessageStart.length, endIndex)
        toast.error(errorMessage)
      } else {
      }
    }

    return Promise.reject(error)
  }
)

export default Axios
