// ** MUI Imports
import { Button, Stack, SvgIcon } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Plus } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

// ** Demo Components Imports
import router from 'next/router'
import { EmployeeCard } from 'src/components'
import axiosInstance from 'src/configs/axios'
import { Employee } from 'src/types'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'

const EmployeeListComponent = () => {
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
        <Stack direction={'row'} justifyContent='space-between' spacing={4}>
          <Typography variant='h4' color={'#9155FD'}>
            Employee's
          </Typography>

          <Button
            onClick={() => router.push(`${router.pathname}/new`)}
            startIcon={
              <SvgIcon>
                <Plus />
              </SvgIcon>
            }
            variant='contained'
          >
            Add Employee
          </Button>
        </Stack>
      </Grid>

      {employeesList.map((employee: Employee) => (
        <Grid item xs={12} md={6} lg={4} key={employee._id}>
          <EmployeeCard employee={employee} />
        </Grid>
      ))}
    </Grid>
  )
}

const EmployeeList: NextPage = () => {
  return <EmployeeListComponent />
}

EmployeeList.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { EmployeeList }
