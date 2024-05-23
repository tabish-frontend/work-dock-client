import axios from 'axios'
import Axios from 'src/configs/axios'

class AttendanceApi {
  async manageAttendance(action: string, body: object) {
    const response = await Axios.post(`/attendance/${action}`, body)

    return response
  }

  async getTodayAttendance() {
    const token = localStorage.getItem('accessToken')

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attendance/myTodayAttendance`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
    } catch (error) {
      return null
    }
  }
}

export const attendanceApi = new AttendanceApi()
