// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import { PerformanceCard, AttendanceCard, WelcomeCard, TimeLogCard } from 'src/components'

// ** Styled Component Import
import ApexChartWrapper from 'src/layouts/dashboard/libs/react-apexcharts'

export const Overview = () => {
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
        <Grid item xs={12} md={8} lg={8}>
          <AttendanceCard />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}
