// ** MUI Imports
import { CardContent, Grid, Stack, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Cancel, CheckboxMarkedOutline, ClockTimeTwoOutline, UmbrellaBeachOutline } from 'mdi-material-ui'

export const EmployeesAvailability = () => {
  return (
    <Card>
      <CardHeader title='Employees Availability' />
      <CardContent sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} border={'1px solid #ddd'} p={3} borderRadius={1}>
              <CheckboxMarkedOutline fontSize='large' sx={{ fontWeight: 900, color: 'black' }} />
              <Typography variant='subtitle1' fontWeight={600}>
                Attendance
              </Typography>
              <Typography variant='subtitle1'>40</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} border={'1px solid #ddd'} p={3} borderRadius={1}>
              <ClockTimeTwoOutline fontSize='large' sx={{ fontWeight: 900, color: 'black' }} />
              <Typography variant='subtitle1' fontWeight={600}>
                Late Coming
              </Typography>
              <Typography variant='subtitle1'>10</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} border={'1px solid #ddd'} p={3} borderRadius={1}>
              <Cancel fontSize='large' sx={{ fontWeight: 900, color: 'black' }} />
              <Typography variant='subtitle1' fontWeight={600}>
                Absent
              </Typography>
              <Typography variant='subtitle1'>5</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} border={'1px solid #ddd'} p={3} borderRadius={1}>
              <UmbrellaBeachOutline fontSize='large' sx={{ fontWeight: 900, color: 'black' }} />
              <Typography variant='subtitle1' fontWeight={600}>
                Leave Apply
              </Typography>
              <Typography variant='subtitle1'>2</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
