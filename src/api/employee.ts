import Axios from 'src/configs/axios'

class EmployeesApi {
  async getAllEmployees(fields = '') {
    const response = await Axios.get(`/employees?fields=${fields}`)

    return response.data
  }

  async getEmployee(username: string | string[] | undefined) {
    const response = await Axios.get(`/employees/${username}`)

    return response.data
  }

  async createEmployee(body: object) {
    const response = await Axios.post(`/employees`, body)

    return response
  }
}

export const employeesApi = new EmployeesApi()
