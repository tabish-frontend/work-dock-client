import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from '@mui/material'
import React from 'react'

export const LeavesList = () => {
  const leaveRequests = [
    // assuming you have an array of leave requests
    {
      employeeId: '00001',
      reason: 'Going to Holiday',
      fromDate: '14/03/2021',
      toDate: '12/03/2021',
      leaveType: 'Medical Leave',
      employeeName: 'Joan Dyer'
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' color={'#9155FD'}>
          Leaves Request
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
            <Table aria-label='leave requests table'>
              <TableHead>
                <TableRow>
                  <TableCell>EMPLOYEE ID</TableCell>
                  <TableCell>EMPLOYEE NAME</TableCell>
                  <TableCell>LEAVE TYPE</TableCell>
                  <TableCell>FROM</TableCell>
                  <TableCell>TO</TableCell>
                  <TableCell>REASON</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map(leaveRequest => (
                  <TableRow key={leaveRequest.employeeId}>
                    <TableCell>{leaveRequest.employeeId}</TableCell>
                    <TableCell>{leaveRequest.employeeName}</TableCell>
                    <TableCell>{leaveRequest.leaveType}</TableCell>
                    <TableCell>{leaveRequest.fromDate}</TableCell>
                    <TableCell>{leaveRequest.toDate}</TableCell>
                    <TableCell>{leaveRequest.reason}</TableCell>
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
