// ** React Imports
import { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import {
  Badge,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { CheckCircleOutline, ClockTimeThreeOutline, CloseCircleOutline, TimerSandEmpty } from 'mdi-material-ui'
import { AttendanceStatus } from 'src/contants/status'
import { attendanceApi } from 'src/api'

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 3,
  height: 3,
  borderRadius: '50%',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

export const AllUserAttendance = ({ filters }: any) => {
  const [employees, setEmployees] = useState<undefined | []>([])

  const handleGetAttendances = async () => {
    const response = await attendanceApi.getAllUserAttendance(filters)

    setEmployees(response.data)
  }

  useEffect(() => {
    handleGetAttendances()
  }, [])

  const isPastDate = (date: Date, joinDate: Date) => {
    return date < joinDate
  }

  const isFutureDate = (date: Date, currentDate: Date) => {
    return date > currentDate
  }

  const renderBadge = (
    dayAttendance: { timeOut: any; status: string },
    date: number,
    joinDate: Date,
    currentDate: Date,
    month: number,
    year: number
  ) => {
    const viewingDate = new Date(year, month - 1, date)

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
      if (isPastDate(viewingDate, joinDate) || isFutureDate(viewingDate, currentDate)) {
        return (
          <Badge
            overlap='circular'
            badgeContent={<BadgeContentSpan style={{ backgroundColor: 'grey', width: 3, height: 3 }} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        )
      } else {
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
              employees.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.full_name}</TableCell>
                  {[...Array(31)].map((_, index) => {
                    const date = index + 1
                    const currentDate = new Date()

                    const joinDate = new Date(item.join_date)

                    const dayAttendance = item.attendance.find(
                      (attendanceItem: { date: string | number | Date }) =>
                        new Date(attendanceItem.date).getDate() === date
                    )

                    return (
                      <TableCell key={index} sx={{ width: 2 }} align='center'>
                        {renderBadge(dayAttendance, date, joinDate, currentDate, filters.month, filters.year)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
