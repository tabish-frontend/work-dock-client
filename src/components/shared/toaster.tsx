import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toaster = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme='dark'
    />
  )
}

export default Toaster
