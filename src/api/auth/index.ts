import { toast } from 'react-toastify'
import Axios from 'src/configs/axios'
import { Login } from 'src/types'

type ChangePasswordRequest = {
  current_password: string
  password: string
  password_confirm: string
}

type ForgotPassword = {
  email: string
}

class AuthApi {
  async signIn(body: Login) {
    try {
      const response = await Axios.post('/auth/login', body)
      toast.success('Login Success')

      return response
    } catch (error) {}
  }

  async me() {
    try {
      const response = await Axios.get(`/users/me`)

      return response
    } catch (error) {
      throw new Error('Failed to sign in')
    }
  }

  async update_me(body: object) {
    const response = await Axios.patch('/users/update-me', body)

    return response
  }

  async changePassword(body: ChangePasswordRequest) {
    try {
      const response = await Axios.patch('/auth/updateMyPassword', body)

      return response
    } catch (error) {
      throw new Error('Failed to sign in')
    }
  }

  async forgotPassword(body: ForgotPassword) {
    const response = await Axios.post('/auth/forgotPassword', body)

    return response
  }

  async resetPassword(reset_token: string | string[] | undefined, body: object) {
    const response = await Axios.patch(`/auth/resetPassword/${reset_token}`, body)

    return response
  }
}

export const authApi = new AuthApi()
