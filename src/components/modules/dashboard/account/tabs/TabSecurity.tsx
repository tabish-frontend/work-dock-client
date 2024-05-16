// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports

import { PasswordField } from 'src/components/shared'
import { useFormik } from 'formik'
import { updateMyPassword } from 'src/formilk'
import { toast } from 'react-toastify'
import { authApi } from 'src/api/auth'

export const TabSecurity = () => {
  // ** Formik
  const formik = useFormik({
    initialValues: updateMyPassword,
    enableReinitialize: true,
    onSubmit: async (values, helpers): Promise<void> => {
      await authApi.changePassword(values)
      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
      formik.handleReset(formik.initialValues)
      toast.success('Password Changed Succesfully')
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordField
                  handleChange={formik.handleChange}
                  label={'Current Password'}
                  name={'current_password'}
                  values={formik.values.current_password}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordField
                  handleChange={formik.handleChange}
                  label={'New Password'}
                  name={'password'}
                  values={formik.values.password}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordField
                  handleChange={formik.handleChange}
                  label={'Confirm Password'}
                  name={'password_confirm'}
                  values={formik.values.password_confirm}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Box sx={{ mt: 11 }}>
          <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
