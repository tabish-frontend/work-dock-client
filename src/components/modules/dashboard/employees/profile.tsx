import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { NextPage } from 'next'
import { Employee } from 'src/types'
import { useRouter } from 'next/router'
import { employeesApi } from 'src/api'
import { EmployeeDetails, ShiftDetails } from 'src/components'

const EmployeeProfileComponent = () => {
  const [employeeData, setEmployeeData] = useState<Employee | undefined>()

  const router = useRouter()
  const { username } = router.query

  const handleGetEmployee = async () => {
    const response = await employeesApi.getEmployee(username)
    setEmployeeData(response)
  }

  const handleUpdateEmployee = async (values: any) => {
    const { username, ...UpdatedValues } = values

    const response = await employeesApi.updateEmployee(username, UpdatedValues)

    setEmployeeData(response)
  }

  useEffect(() => {
    if (username) {
      handleGetEmployee()
    }
  }, [username])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Employee Profile</Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <EmployeeDetails employeeData={employeeData} UpdateEmployee={handleUpdateEmployee} />
      </Grid>

      <Grid item xs={12} sm={5}></Grid>

      <Grid item xs={12} sm={7}>
        <ShiftDetails employeeID={employeeData?._id} shiftDetails={employeeData?.shift} />
      </Grid>
    </Grid>
  )
}
const EmployeeProfile: NextPage = () => {
  return <EmployeeProfileComponent />
}
EmployeeProfile.getLayout = page => <DashboardLayout>{page}</DashboardLayout>
export { EmployeeProfile }
