// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports

import { PasswordField } from 'src/components/shared'
import { useFormik } from 'formik'
import { UpdateMyPassword, UpdateMyPasswordValidation } from 'src/formilk'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { paths } from 'src/contants/paths'
import { useRouter } from 'next/router'

export const TabSecurity = () => {
  const { changePassword } = useAuth<AuthContextType>()

  const router = useRouter()

  // ** Formik
  const formik = useFormik({
    initialValues: UpdateMyPassword,
    validationSchema: UpdateMyPasswordValidation,
    onSubmit: async (values, helpers): Promise<void> => {
      await changePassword(values)
      router.push(paths.auth.login)
      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
      formik.handleReset(formik.initialValues)
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
                  formikErrors={formik.errors.current_password}
                  formikTouched={formik.touched.current_password}
                  handleBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordField
                  handleChange={formik.handleChange}
                  label={'New Password'}
                  name={'password'}
                  values={formik.values.password}
                  formikErrors={formik.errors.password}
                  formikTouched={formik.touched.password}
                  handleBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <PasswordField
                  handleChange={formik.handleChange}
                  label={'Confirm Password'}
                  name={'password_confirm'}
                  values={formik.values.password_confirm}
                  formikErrors={formik.errors.password_confirm}
                  formikTouched={formik.touched.password_confirm}
                  handleBlur={formik.handleBlur}
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
