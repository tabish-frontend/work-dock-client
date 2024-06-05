import Axios from 'src/configs/axios'

class StaticticsApi {
  async getAllUserMonthlyAttendance(query: any) {
    const response = await Axios.get(`/statistics/employeesMonthlyAttendance?month=${query.month}&year=${query.year}`)

    return response
  }
}

export const statisticsApi = new StaticticsApi()
