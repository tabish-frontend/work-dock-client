/* eslint-disable */

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Stack, styled, Box } from '@mui/material'
import {
  CheckCircleOutline,
  CloseCircleOutline,
  ClockTimeThreeOutline,
  AccountOutline,
  LockOpenOutline
} from 'mdi-material-ui'
import { SyntheticEvent, useState } from 'react'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { AllUserAttendance } from './tabs/all-user-attendance'
import { MyAttendance } from './tabs/my-attendance'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { ROLES } from 'src/contants/roles'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AttendanceListComponent = () => {
  const { user } = useAuth<AuthContextType>()

  const [filters, setFilters] = useState({
    month: 5,
    year: 2024
  })

  const [tabValue, setTabValue] = useState<string | string[]>(
    user?.role === ROLES.Employee ? 'my_attendance' : 'employee_attendance'
  )

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} mb={3}>
        <Typography variant='h4' color={'#9155FD'}>
          Attendance List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TabContext value={tabValue as string}>
          {user?.role === ROLES.HR && (
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='employee_attendance'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline />
                    <TabName>Employees Attendance</TabName>
                  </Box>
                }
              />
              <Tab
                value='my_attendance'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline />
                    <TabName>My Attendance</TabName>
                  </Box>
                }
              />
            </TabList>
          )}

          <Card sx={{ mt: 8 }}>
            <Stack direction='row' spacing={5} mx={6} my={6}>
              <Stack direction='row' spacing={2}>
                <CheckCircleOutline sx={{ fontSize: 16 }} color='success' />
                <Typography variant='subtitle1' lineHeight={1}>
                  Full Day Presnt
                </Typography>
              </Stack>
              <Stack direction='row' spacing={2}>
                <ClockTimeThreeOutline sx={{ fontSize: 16 }} color='warning' />
                <Typography variant='subtitle1' lineHeight={1}>
                  Half Day present
                </Typography>
              </Stack>
              <Stack direction='row' spacing={2}>
                <CloseCircleOutline sx={{ fontSize: 16 }} color='error' />
                <Typography variant='subtitle1' lineHeight={1}>
                  Full Day Absent
                </Typography>
              </Stack>
            </Stack>

            <TabPanel sx={{ p: 0 }} value='employee_attendance'>
              <AllUserAttendance filters={filters} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='my_attendance'>
              <MyAttendance filters={filters} />
            </TabPanel>
          </Card>
        </TabContext>
      </Grid>
    </Grid>
  )
}

const AttendanceList: NextPage = () => {
  return <AttendanceListComponent />
}

AttendanceList.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { AttendanceList }
