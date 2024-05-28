import { Dialog, DialogTitle, Divider, Grid, IconButton, MenuItem, TextField, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { CloseCircleOutline } from 'mdi-material-ui'

import { forwardRef, useEffect, useState, type FC } from 'react'
import { leaveInitialValues } from 'src/formilk'

import DatePickerWrapper from 'src/layouts/dashboard/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { employeesApi } from 'src/api'
import { LeavesTypes } from 'src/contants/status'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { ROLES } from 'src/contants/roles'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Date' fullWidth {...props} />
})

interface LeaveModalProps {
  modal: boolean
  modalType: string
  onConfirm: (values: any) => void
  onCancel: () => void
}

export const LeaveModal: FC<LeaveModalProps> = ({ modal, modalType, onCancel, onConfirm }) => {
  const { user } = useAuth<AuthContextType>()

  const formik = useFormik({
    initialValues: leaveInitialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers): Promise<void> => {
      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
      onConfirm(values)
    }
  })

  // HR ROLE --> STATES AND FUNCTIONS
  const [employees, setEmployees] = useState<any[]>([])

  const handleGetEmployees = async () => {
    const response = await employeesApi.getAllEmployees('full_name,avatar')
    setEmployees(response.users)
  }

  useEffect(() => {
    user?.role === ROLES.Admin || (user?.role === ROLES.HR && handleGetEmployees())
  }, [user])

  return (
    <Dialog fullWidth maxWidth='sm' open={modal} onClose={onCancel} sx={{ '& .MuiPaper-root': { overflowY: 'unset' } }}>
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={12} sx={{ py: 3 }}>
          <DialogTitle sx={{ m: 0, p: 3, fontSize: 24, fontWeight: 600 }}>
            {modalType === 'create' ? 'Add Holiday' : 'Update Holiday'}
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={onCancel}
            sx={{
              position: 'absolute',
              right: 12,
              top: 16,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseCircleOutline />
          </IconButton>

          <Divider />

          <Grid container spacing={4} p={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Leave Type'
                name='leave_type'
                select
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.leave_type}
              >
                {LeavesTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  required
                  selected={formik.values.date}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  onChange={(date: Date) => formik.setFieldValue('date', new Date(date))}
                />
              </DatePickerWrapper>
            </Grid>

            {(user?.role === ROLES.Admin || user?.role === ROLES.HR) && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Select User'
                  name='user'
                  select
                  required
                  onBlur={formik.handleBlur}
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: '300px'
                      }
                    }
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.user}
                >
                  {employees.map(({ _id, full_name }: any) => (
                    <MenuItem key={_id} value={_id}>
                      {full_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                name='reason'
                value={formik.values.reason}
                label='Leave Reason'
                multiline
                rows={2}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pb: 3,
              px: 3
            }}
          >
            <Button color='inherit' sx={{ mr: 2 }} onClick={onCancel}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </Box>
        </Paper>
      </form>
    </Dialog>
  )
}
