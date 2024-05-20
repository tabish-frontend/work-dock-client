// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// // Define a service using a base URL and expected endpoints
// export const employeesAPI = createApi({
//   reducerPath: 'employeesAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://work-dock-server.vercel.app/api/v1' }),
//   endpoints: builder => ({
//     getEmployees: builder.query({
//       query: () => 'employees'
//     })
//   })
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetEmployeesQuery } = employeesAPI
