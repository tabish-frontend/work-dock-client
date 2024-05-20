// ** React Imports

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// import InputAdornment from '@mui/material/InputAdornment'
import { ArrowLeft } from 'mdi-material-ui'

// ** Configs

// ** Layout Import
import { useFormik } from 'formik'
import { ForgotPasswordInitialValues } from 'src/formilk'
import { paths } from 'src/contants/paths'
import { NextPage } from 'next'
import { AuthLayout } from 'src/layouts/auth'
import { Stack, SvgIcon } from '@mui/material'
import { authApi } from 'src/api'
import { toast } from 'react-toastify'

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

const ForgotPasswordComponent = () => {
  const formik = useFormik({
    initialValues: ForgotPasswordInitialValues,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await authApi.forgotPassword(values)
        toast.success('reset password link sent to your email!')
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
            <Typography variant='h6'>Forgot Password</Typography>
          </Stack>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              label='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ marginBottom: 4 }}
            />

            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
              Send reset link
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

const Forgot: NextPage = () => {
  return <ForgotPasswordComponent />
}

Forgot.getLayout = page => <AuthLayout>{page}</AuthLayout>

export { Forgot }
