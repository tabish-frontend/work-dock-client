// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports

import { EmployeeCard } from 'src/components'

export const EmployeeList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5' color={'#9155FD'}>
          Employee's
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <EmployeeCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <EmployeeCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <EmployeeCard />
      </Grid>
    </Grid>
  )
}
