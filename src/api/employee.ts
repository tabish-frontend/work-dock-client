import Axios from 'src/configs/axios'

// type GetAdminsRequest = {
//   page: number
//   limit?: number
//   search?: string
//   fields?: string
//   sort?: string
//   status?: string
// }

class EmployeesApi {
  async getEmployees() {
    // eslint-disable-next-line prefer-const

    // const url = `/employees?page=${page}&limit=${limit}&search=${search}&fields=${fields}&sort=${sort}&status=${status}`

    // let { page = 0, limit = 10, search = '', fields = '', sort = 'full_name', status = 'active' } = request
    // page += 1

    const response = await Axios.get(`/employees`)

    return response.data
  }

  async getEmployee(username: string | string[] | undefined) {
    const response = await Axios.get(`/employees/${username}`)

    return response.data
  }

  //   async deleteAdmin(admin_id: string | string[] | undefined) {
  //     const response = await axios.delete(`/admins/${admin_id}`)
  //     setDataUpdated(true)
  //     return response
  //   }

  //   async updateAdmin(admin_id: string | string[] | undefined, body: object) {
  //     const response = await axios.patch(`/admins/${admin_id}`, body)
  //     setDataUpdated(true)
  //     return response
  //   }

  async createEmployee(body: object) {
    const response = await Axios.post(`/employees`, body)

    return response
  }
}

export const employeesApi = new EmployeesApi()
