// ** MUI Imports
import { Grid } from '@mui/material'
import { NextPage } from 'next'

// ** Icons Imports

// ** Custom Components Imports
import {
  PerformanceCard,
  WelcomeCard,
  TimeLogCard,
  TotalEmployees,
  EmployeesAvailability,
  AttendanceCard
} from 'src/components'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'

// ** Styled Component Import
import ApexChartWrapper from 'src/layouts/dashboard/libs/react-apexcharts'

const OverviewComponent = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <PerformanceCard />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <TimeLogCard />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <EmployeesAvailability />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <TotalEmployees />
        </Grid>

        <Grid item xs={12}>
          <AttendanceCard />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

const Overview: NextPage = () => {
  return <OverviewComponent />
}

Overview.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { Overview }
