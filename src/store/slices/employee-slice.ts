// // employeeSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import Axios from 'src/configs/axios'

// // Define the initial state of the employee slice
// const initialState = {
//   employees: [],
//   status: 'idle',
//   error: null
// }

// export const fetchEmployees = async () => {
//   const response = await Axios.get('/users/me')

//   return response.data
// }

// // Create the employee slice
// const employeeSlice = createSlice({
//   name: 'employees',
//   initialState,
//   reducers: {
//     getEmployyes: (state, action) => {
//       if (state.employees.length) {
//         state.employees
//       }

//       const employee = action.payload
//       state.employees = employee
//     }
//   }
// })

// // Export the async thunk to be used in your components
// export { fetchEmployees }

// // Export the reducer to be included in the store
// export default employeeSlice.reducer
