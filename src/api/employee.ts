import Axios from 'src/configs/axios'

class EmployeesApi {
  async getEmployees() {
    const response = await Axios.get(`/employees`)

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
