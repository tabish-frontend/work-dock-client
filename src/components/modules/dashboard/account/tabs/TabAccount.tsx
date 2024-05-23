// ** React Imports
import { ChangeEvent, ElementType, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// import Link from '@mui/material/Link'
// import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

// import AlertTitle from '@mui/material/AlertTitle'
// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

import { getChangedFields } from 'src/utils/helpers'

// ** Icons Imports
// import Close from 'mdi-material-ui/Close'
import { UserAccountDetails } from 'src/types'
import { useFormik } from 'formik'
import { ImageCrop } from 'src/components/shared'
import { AuthContextType } from 'src/context/auth'
import { useAuth } from 'src/hooks'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

export const TabAccount = () => {
  const { user, updateCurrentUser } = useAuth<AuthContextType>()

  const {
    avatar = '',
    email = '',
    full_name = '',
    username = '',
    designation = '',
    account_status = '',
    company = ''
  } = user || {}

  const userDetails = { avatar, email, full_name, username, designation, account_status, company }

  const formik = useFormik({
    initialValues: userDetails,
    enableReinitialize: true,
    onSubmit: async (values, helpers): Promise<void> => {
      const updatingValues = { ...getChangedFields<UserAccountDetails>(values, formik.initialValues) }

      await updateCurrentUser(updatingValues)

      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
    }
  })

  const [photoURL, setPhotoURL] = useState(user?.avatar)

  const [modal, setModal] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setPhotoURL(URL.createObjectURL(selectedFile))
      setModal(true)
    } else {
    }
  }

  return (
    <>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={formik.values.avatar} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                      onChange={handleFileChange}
                    />
                  </ButtonStyled>

                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Username'
                value={formik.values.username}
                name='username'
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                value={formik.values.full_name}
                name='full_name'
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                name='email'
                value={formik.values.email}
                placeholder='johnDoe@example.com'
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  label='Designation'
                  value={formik.values.designation}
                  name='designation'
                  onChange={formik.handleChange}
                >
                  <MenuItem value='human resource'>Human Resource</MenuItem>
                  <MenuItem value='software engineer'>Software Engineer</MenuItem>
                  <MenuItem value='editor'>Editor</MenuItem>
                  <MenuItem value='maintainer'>Maintainer</MenuItem>
                  <MenuItem value='subscriber'>Subscriber</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Company'
                placeholder='Please add your company name'
                name='company'
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Account Status</InputLabel>
                <Select
                  label='Account Status'
                  value={formik.values.account_status}
                  name='account_status'
                  onChange={formik.handleChange}
                >
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>

      <ImageCrop
        modal={modal}
        photoURL={photoURL}
        setPhotoURL={setPhotoURL}
        setOpenCrop={setModal}
        onCancel={() => setModal(false)}
      />
    </>
  )
}
