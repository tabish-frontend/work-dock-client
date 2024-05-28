import {
  Autocomplete,
  Badge,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  TextField,
  Paper,
  Avatar
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { CloseCircleOutline } from 'mdi-material-ui'

import { forwardRef, useEffect, useState, type FC } from 'react'
import { holidayInitialValues } from 'src/formilk'

import DatePickerWrapper from 'src/layouts/dashboard/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { employeesApi } from 'src/api'
import { Holiday } from 'src/types'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Date' fullWidth {...props} />
})

interface HolidayModalProps {
  modal: boolean
  modalType: string
  holidayValues: any
  onConfirm: (values: any) => void
  onCancel: () => void
}

export const HolidayModal: FC<HolidayModalProps> = ({ modal, modalType, holidayValues, onCancel, onConfirm }) => {
  const formik = useFormik({
    initialValues: holidayValues
      ? {
          ...holidayValues,
          date: new Date(holidayValues.date),
          users: holidayValues.users.map((user: Holiday) => user._id)
        }
      : holidayInitialValues,

    enableReinitialize: true,
    onSubmit: async (values, helpers): Promise<void> => {
      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
      onConfirm(values)
    }
  })

  const [employees, setEmployees] = useState<any[]>([])

  const handleGetEmployees = async () => {
    const response = await employeesApi.getAllEmployees('full_name,avatar')
    setEmployees(response.users)
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  const handleAutocompleteChange = (event: any, value: any[]) => {
    formik.setFieldValue(
      'users',
      value.map(v => v._id)
    )
  }

  const getSelectedUsers = () => {
    return employees.filter(employee => formik.values.users.includes(employee._id))
  }

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
                label='Title'
                value={formik.values.title}
                name='title'
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  selected={formik.values.date}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  onChange={(date: Date) => formik.setFieldValue('date', new Date(date))}
                />
              </DatePickerWrapper>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={employees}
                value={getSelectedUsers()}
                getOptionLabel={option => option.full_name}
                disableCloseOnSelect
                onChange={handleAutocompleteChange}
                renderTags={() => {
                  const selectedUsers = getSelectedUsers()

                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingLeft: 5
                      }}
                    >
                      {selectedUsers.length > 1 ? (
                        <Badge
                          color='info'
                          badgeContent={`+${selectedUsers.length - 1}`}
                          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                          <div
                            style={{
                              paddingRight: '4px'
                            }}
                          >
                            <span style={{ fontSize: 16, marginRight: '8px' }}>
                              {selectedUsers[0].full_name.length > 15
                                ? `${selectedUsers[0].full_name.slice(0, 15)}...`
                                : selectedUsers[0].full_name}
                            </span>
                          </div>
                        </Badge>
                      ) : (
                        <span style={{ fontSize: 16, marginRight: '8px' }}>{selectedUsers[0]?.full_name}</span>
                      )}
                    </div>
                  )
                }}
                renderOption={(props, option) => (
                  <MenuItem key={option._id} value={option._id} sx={{ justifyContent: 'space-between' }} {...props}>
                    <Checkbox checked={formik.values.users.indexOf(option._id) > -1} />
                    <Avatar alt='user' src={option.avatar} sx={{ width: '2rem', height: '2rem', m: 2 }} />
                    <ListItemText primary={option.full_name} />
                  </MenuItem>
                )}
                renderInput={params => (
                  <TextField {...params} required={!formik.values.users.length} label='Users' name='users' />
                )}
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
