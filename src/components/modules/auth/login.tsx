// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/layouts/dashboard/BlankLayout'
import { useFormik } from 'formik'
import { LoginInitialValues } from 'src/formilk'
import { PasswordField } from 'src/components'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'
import { paths } from 'src/contants/paths'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const router = useRouter()

  const { signIn } = useAuth<AuthContextType>()

  const formik = useFormik({
    initialValues: LoginInitialValues,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signIn(values)
        router.push(paths.index)
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
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logos/work-dock-logo.png' alt='logo' width={50} />
            <Typography
              variant='h6'
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important',
                fontFamily: 'Poppins-SemiBold, Poppins'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
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
            <PasswordField
              formikErrors={formik.errors.password}
              formikTouched={formik.touched.password}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              label={'Password'}
              name={'password'}
              values={formik.values.password}
            />
            <Box
              sx={{
                mb: 6,
                mt: 6,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export { LoginPage }
