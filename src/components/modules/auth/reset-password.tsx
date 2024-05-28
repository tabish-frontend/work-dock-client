// ** React Imports

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack, SvgIcon } from '@mui/material'

// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// import InputAdornment from '@mui/material/InputAdornment'
import { ArrowLeft } from 'mdi-material-ui'

// ** Formik Imports
import { useFormik } from 'formik'
import { ResetPasswordInitialValues, ResetPasswordValidation } from 'src/formilk'

// ** Layout Import
import { paths } from 'src/contants/paths'
import { NextPage } from 'next'
import { AuthLayout } from 'src/layouts/auth'
import { PasswordField } from 'src/components/shared'
import { authApi } from 'src/api'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '1.1rem',
  display: 'flex',
  color: theme.palette.secondary.dark,
  textDecoration: 'none',
  flexDirection: 'row'
}))

const ResetPasswordComponent = () => {
  const router = useRouter()
  const { reset_token } = router.query

  const formik = useFormik({
    initialValues: ResetPasswordInitialValues,
    validationSchema: ResetPasswordValidation,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await authApi.resetPassword(reset_token, { password: values.password })
        const href = paths.auth.login
        router.push(href)
      } catch (err) {
        helpers.setStatus({ success: false })
        helpers.setSubmitting(false)
      }
    }
  })

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Link passHref href={paths.auth.login}>
              <LinkStyled>
                <SvgIcon sx={{ mr: 2 }}>
                  <ArrowLeft fontSize='medium' />
                </SvgIcon>
                <Typography variant='body1'>Login</Typography>
              </LinkStyled>
            </Link>
          </Box>
          <Stack sx={{ mb: 6 }} spacing={1}>
            <Typography variant='h6'>Reset Password</Typography>
          </Stack>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <PasswordField
                formikErrors={formik.errors.password}
                formikTouched={formik.touched.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                label={'Password'}
                name={'password'}
                values={formik.values.password}
              />
              <PasswordField
                formikErrors={formik.errors.password_confirm}
                formikTouched={formik.touched.password_confirm}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                label={'Confirm Password'}
                name={'password_confirm'}
                values={formik.values.password_confirm}
              />

              <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
                Reset
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

const ResetPassword: NextPage = () => {
  return <ResetPasswordComponent />
}

ResetPassword.getLayout = page => <AuthLayout>{page}</AuthLayout>

export { ResetPassword }
