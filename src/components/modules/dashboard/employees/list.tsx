// ** MUI Imports
import { Button, Stack, SvgIcon } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Plus } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

// ** Demo Components Imports
import { EmployeeCard } from 'src/components'
import { Employee } from 'src/types'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { employeesApi } from 'src/api'
import { useRouter } from 'next/router'

const EmployeeListComponent = () => {
  const router = useRouter()

  const [employeesList, setEmployeesList] = useState([])

  const handleGetEmployees = async () => {
    const response = await employeesApi.getAllEmployees()
    setEmployeesList(response.users)
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
