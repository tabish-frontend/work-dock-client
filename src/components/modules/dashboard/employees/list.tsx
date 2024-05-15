// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

// ** Demo Components Imports

import { EmployeeCard } from 'src/components'
import axiosInstance from 'src/configs/axios'
import { Employee } from 'src/types'

export const EmployeeList = () => {
  const [employeesList, setEmployeesList] = useState([])

  const handleGetEmployees = async () => {
    const response = await axiosInstance.get('/employees?account_status=active')
    setEmployeesList(response.data.users)
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5' color={'#9155FD'}>
          Employee's
        </Typography>
      </Grid>

      {employeesList.map((employee: Employee) => (
        <Grid item xs={12} md={6} lg={4} key={employee._id}>
          <EmployeeCard employee={employee} />
        </Grid>
      ))}
    </Grid>
  )
}
