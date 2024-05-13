import axios from 'axios'

// import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  config => {
    // You can modify the request config here if needed
    return config
  },
  error => {
    // Handle request error
    console.error('Request error:', error)

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    // Handle successful responses
    return response.data
  },
  error => {
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response error:', error.response.status)

      //   toast.error(error.response.status)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
