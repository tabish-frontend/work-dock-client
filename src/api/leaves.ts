import Axios from 'src/configs/axios'
import { Leaves } from 'src/types'

class LeavesAPI {
  async getAllLeaves() {
    const response = await Axios.get(`/leaves`)

    return response.data
  }

  async addLeave(body: Leaves) {
    const response = await Axios.post(`/leaves`, body)

    return response
  }

  //   async updateHoliday(holiday_id: string, body: Holiday) {
  //     const response = await Axios.patch(`/holidays/${holiday_id}`, body)

  //     return response.data
  //   }

  //   async deleteHoliday(holiday_id: string) {
  //     const response = await Axios.delete(`/holidays/${holiday_id}`)

  //     return response.data
  //   }

  async getMyLeaves() {
    const response = await Axios.get(`/users/getMyLeaves`)

    return response.data
  }

  async apllyForLeave(body: Leaves) {
    const response = await Axios.post(`/users/leaveApply`, body)

    return response.data
  }
}

export const leavesApi = new LeavesAPI()
