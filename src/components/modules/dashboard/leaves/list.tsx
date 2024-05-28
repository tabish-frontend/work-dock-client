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
  Link
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { Plus, SquareEditOutline } from 'mdi-material-ui'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { ROLES } from 'src/contants/roles'
import { LeaveModal } from './leave-modal'
import { leavesApi } from 'src/api'
import { Leaves } from 'src/types'
import { formatDate } from 'src/utils/helpers'
import { ImageAvatar } from 'src/components/shared'
import { paths } from 'src/contants/paths'

const employee_Screen = ['Date', 'Leave Type', 'Reason', 'Status', 'Action']
const HR_Screen = ['Employee Name', 'Date', 'Leave Type', 'Reason', 'Status', 'Action']

const LeavesListComponent = () => {
  const { user } = useAuth<AuthContextType>()

  const columns = user?.role === ROLES.Admin || user?.role === ROLES.HR ? HR_Screen : employee_Screen

  const [leaveModal, setLeaveModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [leavesList, setLeavesList] = useState<any[]>([])

  const getLeaves = async () => {
    let response = []
    if (user?.role === ROLES.HR || user?.role === ROLES.Admin) {
      response = await leavesApi.getAllLeaves()
    } else {
      response = await leavesApi.getMyLeaves()
      console.log('response', response)
    }
    setLeavesList(response)
  }

  const addLeave = async (values: Leaves) => {
    if (user?.role === ROLES.Employee) {
      await leavesApi.apllyForLeave(values)
    } else {
      await leavesApi.addLeave(values)
    }
    getLeaves()
    setLeaveModal(false)
  }

  useEffect(() => {
    getLeaves()
  }, [])

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

                        <TableCell>{formatDate(leave.date)}</TableCell>
                        <TableCell>{leave.leave_type}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{leave.status.toUpperCase()}</TableCell>

                        <TableCell>
                          <Stack justifyContent={'space-evenly'} direction={'row'}>
                            <SquareEditOutline
                              color='success'
                              sx={{ cursor: 'pointer' }}

                              // onClick={() => {
                              //   setModalType('update')
                              //   setHolidayModal(true)
                              //   setHolidayValues(holiday)
                              // }}
                            />
                            {/* <TrashCanOutline
                                  color='error'
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() => deleteHoliday(holiday._id)}
                                /> */}
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
          modalType={modalType}
          modal={leaveModal}
          onCancel={() => {
            setLeaveModal(false)
          }}
          onConfirm={addLeave}
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
