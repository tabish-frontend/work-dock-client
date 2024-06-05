// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/layouts/dashboard/libs/react-datepicker'
import { UserBasicInformation } from 'src/types'
import { useFormik } from 'formik'
import { getChangedFields } from 'src/utils/helpers'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { LoadingButton } from '@mui/lab'
import { Countries, Languages } from 'src/contants/list-items'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

export const TabInfo = () => {
  const { user, updateCurrentUser } = useAuth<AuthContextType>()

  const {
    bio = '',
    mobile = 0,
    dob: rawDob = null, // Use an alias to avoid conflict with the dob conversion
    country = '',
    natinal_identity_number = 0,
    qualification = '',
    languages = []
  } = user || {}

  // Convert dob to a Date object if it exists
  const dob = rawDob ? new Date(rawDob) : null

  // Combine all properties into userInfo object
  const userInfo = { bio, mobile, dob, country, natinal_identity_number, qualification, languages }

  const formik = useFormik({
    initialValues: userInfo,
    enableReinitialize: true,
    onSubmit: async (values, helpers): Promise<void> => {
      const updatingValues = { ...getChangedFields<UserBasicInformation>(values, formik.initialValues) }

      await updateCurrentUser(updatingValues)
      helpers.setSubmitting(false)
    }
  })

  return (
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Add Bio'
              name='bio'
              value={formik.values.bio}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={formik.values.dob}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => formik.setFieldValue('dob', date)}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              value={formik.values.mobile}
              name='mobile'
              placeholder='(123) 456-7890'
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Qualification'
              name='qualification'
              value={formik.values.qualification}
              placeholder='Graduate'
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Country'
              fullWidth
              select
              name='country'
              value={formik.values.country}
              onChange={formik.handleChange}
            >
              {Countries.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Languages'
              fullWidth
              select
              name='languages'
              value={formik.values.languages}
              SelectProps={{
                multiple: true,
                value: formik.values.languages,
                onChange: formik.handleChange
              }}
            >
              {Languages.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='National Identity'
              value={formik.values.natinal_identity_number}
              name='natinal_identity_number'
              placeholder='(123) 456-7890'
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              loading={formik.isSubmitting}
              loadingPosition='start'
              startIcon={<></>}
              type='submit'
              variant='contained'
              sx={{
                pl: formik.isSubmitting ? '40px' : '16px'
              }}
            >
              Save Changes
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}
