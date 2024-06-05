import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Stack,
  Button,
  SvgIcon,
  Link,
  Box,
  IconButton,
  Tooltip
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { Plus, SquareEditOutline, TrashCanOutline, CheckCircleOutline, CloseCircleOutline } from 'mdi-material-ui'

import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { ROLES } from 'src/contants/roles'
import { LeaveModal } from './leave-modal'
import { leavesApi } from 'src/api'
import { formatDate } from 'src/utils/helpers'
import { ImageAvatar } from 'src/components/shared'
import { paths } from 'src/contants/paths'
import { LeavesStatus } from 'src/contants/status'

const employee_Screen = ['Leave Type', 'Leave From', 'Leave To', 'Reason', 'Status', 'Action']
const HR_Screen = [
  'Employee Name',
  'Leave Type',
  'Leave From',
  'Leave To',
  'Reason',
  'Status',
  'Manage Leave',
  'Action'
]

const LeavesListComponent = () => {
  const { user } = useAuth<AuthContextType>()

  const columns = user?.role === ROLES.Admin || user?.role === ROLES.HR ? HR_Screen : employee_Screen

  const [leaveModal, setLeaveModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [leavesList, setLeavesList] = useState<any[]>([])
  const [leaveValues, setLeaveValues] = useState()

  const getLeaves = async () => {
    let response = []
    if (user?.role === ROLES.HR || user?.role === ROLES.Admin) {
      response = await leavesApi.getAllLeaves()
    } else {
      response = await leavesApi.getMyLeaves()
    }
    setLeavesList(response)
  }

  const addAndUpdateHoliday = async (values: any) => {
    const { _id, ...LeaveValues } = values

    if (modalType === 'update') {
      await leavesApi.updateLeave(_id, LeaveValues)
    } else {
      if (user?.role === ROLES.Employee) {
        await leavesApi.apllyForLeave(values)
      } else {
        await leavesApi.addLeave(values)
      }
    }
    getLeaves()
    setLeaveModal(false)
    setLeaveValues(undefined)
  }

  useEffect(() => {
    getLeaves()
  }, [])

  const deleteLeave = async (_id: string) => {
    await leavesApi.deleteLeave(_id)
    setLeavesList(prevList => prevList.filter(leave => leave._id !== _id))
  }

  const handleUpdateStatus = async (leave_id: string, status: string) => {
    await leavesApi.updateLeaveStatus({ leave_id, status })
    setLeavesList(prevList => prevList.map(leave => (leave._id === leave_id ? { ...leave, status } : leave)))
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction={'row'} justifyContent='space-between' spacing={4}>
            <Typography variant='h4' color={'#9155FD'}>
              Leaves
            </Typography>

            <Button
              onClick={() => {
                setLeaveModal(true)
                setModalType('create')
              }}
              startIcon={
                <SvgIcon>
                  <Plus />
                </SvgIcon>
              }
              variant='contained'
            >
              {user?.role === ROLES.Admin || user?.role === ROLES.HR ? 'Add Leave' : 'Leave Apply'}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
              <Table stickyHeader aria-label='leave requests table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell key={index}>
                        <span style={{ fontWeight: 700 }}>{column}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leavesList.map((leave, index) => {
                    return (
                      <TableRow hover role='checkbox' key={index}>
                        {(user?.role === ROLES.Admin || user?.role === ROLES.HR) && (
                          <TableCell>
                            <Stack alignItems={'center'} direction={'row'} spacing={1}>
                              <ImageAvatar path={leave.user.avatar || ''} alt='user image' width={40} height={40} />

                              <Link
                                color='inherit'
                                href={`${paths.employees}/${leave.user.username}`}
                                variant='subtitle1'
                              >
                                {leave.user.full_name}
                              </Link>
                            </Stack>
                          </TableCell>
                        )}

                        <TableCell>{leave.leave_type}</TableCell>
                        <TableCell>{formatDate(leave.startDate)}</TableCell>
                        <TableCell>{formatDate(leave.endDate)}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{leave.status.toUpperCase()}</TableCell>

                        {(user?.role === ROLES.Admin || user?.role === ROLES.HR) && (
                          <TableCell>
                            <Box sx={{ display: 'flex', mx: 3 }}>
                              <Tooltip title='Approved'>
                                <IconButton
                                  onClick={() => handleUpdateStatus(leave._id, LeavesStatus.Approved)}
                                  disabled={leave.status === LeavesStatus.Approved}
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'green',
                                      color: 'white'
                                    },
                                    color: 'green'
                                  }}
                                >
                                  <CheckCircleOutline />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Rejected'>
                                <IconButton
                                  onClick={() => handleUpdateStatus(leave._id, LeavesStatus.Rejected)}
                                  disabled={leave.status === LeavesStatus.Rejected}
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'red',
                                      color: 'white'
                                    },
                                    color: 'red'
                                  }}
                                >
                                  <CloseCircleOutline />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        )}
                        <TableCell>
                          <Stack direction={'row'} spacing={2}>
                            <Tooltip title='Edit'>
                              <SquareEditOutline
                                color='success'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setModalType('update')
                                  setLeaveModal(true)
                                  setLeaveValues(leave)
                                }}
                              />
                            </Tooltip>

                            <Tooltip title='Delete'>
                              <TrashCanOutline
                                color='error'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => deleteLeave(leave._id)}
                              />
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {leaveModal && (
        <LeaveModal
          leaveValues={leaveValues}
          modalType={modalType}
          modal={leaveModal}
          onCancel={() => {
            setLeaveModal(false)
            setLeaveValues(undefined)
          }}
          onConfirm={addAndUpdateHoliday}
        />
      )}
    </>
  )
}

const LeavesList: NextPage = () => {
  return <LeavesListComponent />
}

LeavesList.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { LeavesList }
