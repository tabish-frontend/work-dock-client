/*eslint-disable*/

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Stack,
  styled,
  Badge
} from '@mui/material'
import { CheckCircleOutline, CloseCircleOutline, ClockTimeThreeOutline, TimerSandEmpty } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { attendanceApi } from 'src/api'
import { AttendanceStatus } from 'src/contants/status'

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 3,
  height: 3,
  borderRadius: '50%',
  // backgroundColor: theme.palette.secondary.light,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const AttendanceListComponent = () => {
  const [filters, setFilters] = useState({
    month: 5,
    year: 2024
  })
  const [employees, setEmployees] = useState<undefined | []>([])

  const handleGetAttendances = async () => {
    const response = await attendanceApi.getAllUserAttendance(filters)

    setEmployees(response.data)
  }

  useEffect(() => {
    handleGetAttendances()
  }, [])

  // Function to check if a date is in the past
  const isPastDate = (date: number, joinDate: number) => {
    return date < joinDate
  }

  // Function to check if a date is in the future
  const isFutureDate = (date: number, currentDate: number) => {
    return date > currentDate
  }

  const renderBadge = (
    dayAttendance: { timeOut: any; status: string },
    date: number,
    joinDate: number,
    currentDate: number
  ) => {
    if (dayAttendance) {
      if (dayAttendance.status === AttendanceStatus.SHORT_ATTENDANCE) {
        return <TimerSandEmpty sx={{ fontSize: 16 }} color='success' />
      } else if (dayAttendance.status === AttendanceStatus.FULL_DAY_PRESENT) {
        return <CheckCircleOutline sx={{ fontSize: 16 }} color='success' />
      } else if (dayAttendance.status === AttendanceStatus.HALF_DAY_PRESENT) {
        return <ClockTimeThreeOutline sx={{ fontSize: 16 }} color='warning' />
      } else if (dayAttendance.status === AttendanceStatus.FULL_DAY_ABSENT) {
        return <CloseCircleOutline sx={{ fontSize: 16 }} color='error' />
      } else {
        return (
          <Badge
            overlap='circular'
            badgeContent={<BadgeContentSpan style={{ backgroundColor: 'green', width: 6, height: 6 }} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )
      }
    } else {
      if (isPastDate(date, joinDate) || isFutureDate(date, currentDate)) {
        // If the date is in the past or future, show grey badge
        return (
          <Badge
            overlap='circular'
            badgeContent={<BadgeContentSpan style={{ backgroundColor: 'grey', width: 3, height: 3 }} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )
      } else {
        // If attendance data is missing and the date is not in the past or future, show red badge
        return (
          <Badge
            overlap='circular'
            badgeContent={<BadgeContentSpan style={{ backgroundColor: 'red', width: 6, height: 6 }} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' color={'#9155FD'}>
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
                {!employees ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant='h6'>Loading....</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.full_name}</TableCell>
                      {[...Array(31)].map((_, index) => {
                        const date = index + 1
                        const currentDate = new Date().getDate()
                        const currentMonth = new Date().getMonth() + 1
                        const currentYear = new Date().getFullYear()

                        const joinDate = new Date(item.join_date).getDate()

                        const dayAttendance = item.attendance.find(
                          (attendanceItem: { date: string | number | Date }) =>
                            new Date(attendanceItem.date).getDate() === date
                        )

                        return (
                          <TableCell key={index} sx={{ width: 2 }} align='center'>
                            {renderBadge(dayAttendance, date, joinDate, currentDate)}
                            {/* {dayAttendance ? (
                              <CheckCircleOutline sx={{ fontSize: 18 }} color='success' />
                            ) : (
                              <Badge
                                overlap='circular'
                                badgeContent={<BadgeContentSpan />}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              />
                            )} */}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
              {/* <TableBody>
                {attendance.map((employee: any) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
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
              </TableBody> */}
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

const AttendanceList: NextPage = () => {
  return <AttendanceListComponent />
}

AttendanceList.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { AttendanceList }
