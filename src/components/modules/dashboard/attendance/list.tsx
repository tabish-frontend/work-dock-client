/*eslint-disable*/

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { Paper, TableBody, TableCell, TableContainer, Table, TableRow, TableHead, Stack } from '@mui/material'
import { CheckCircleOutline, CloseCircleOutline, ClockTimeThreeOutline } from 'mdi-material-ui'
import { useState } from 'react'

const employees = [
  { id: 1, name: 'Employee 1' },
  { id: 2, name: 'Employee 2' },
  { id: 3, name: 'Employee 3' },
  { id: 4, name: 'Employee 4' },
  { id: 5, name: 'Employee 5' },
  { id: 6, name: 'Employee 6' },
  { id: 7, name: 'Employee 7' },
  { id: 8, name: 'Employee 8' },
  { id: 9, name: 'Employee 9' },
  { id: 10, name: 'Employee 10' }
]

export const AttendanceList = () => {
  const [attendance, setAttendance] = useState(
    employees.map(employee => {
      const days = []
      for (let i = 0; i < 31; i++) {
        days.push(i < 15) // Set the first 15 days to true, and the rest to false
      }
      return {
        id: employee.id,
        name: employee.name,
        days: days
      }
    })
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5' color={'#9155FD'}>
          Attendance List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Stack direction='row' spacing={5} mx={6} my={3}>
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
          <TableContainer component={Paper}>
            <Table aria-label='attendance table'>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  {[...Array(31)].map((_, index) => (
                    <TableCell sx={{ padding: 3.4 }} key={index + 1}>
                      {index + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Map through employees and generate rows */}
                {attendance.map((employee: any) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    {/* Generate cells for each day's attendance */}
                    {employee.days.map((present: any, index: number) => (
                      <TableCell key={index} sx={{ padding: 1.5 }}>
                        {present ? (
                          <CheckCircleOutline sx={{ fontSize: 18 }} color='success' />
                        ) : (
                          <CloseCircleOutline sx={{ fontSize: 18 }} color='error' />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}
