import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material'
import { Cake, Email, Cellphone, MapMarker } from 'mdi-material-ui'
import { styled } from '@mui/material/styles'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { NextPage } from 'next'
import { Employee } from 'src/types'
import { useRouter } from 'next/router'
import { employeesApi } from 'src/api'
import { formatDob } from 'src/utils/helpers'

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const EmployeeProfileComponent = () => {
  const [employeeData, setEmployeeData] = useState<Employee | undefined>()

  const router = useRouter()
  const { username } = router.query

  const handleGetEmployee = async () => {
    const response = await employeesApi.getEmployee(username)
    setEmployeeData(response)
  }

  useEffect(() => {
    if (username) {
      handleGetEmployee()
    }
  }, [username])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Employee Profile</Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Card>
          <Grid container spacing={6}>
            <StyledGrid item md={4} xs={12}>
              <CardContent>
                <img
                  style={{ borderRadius: '50%' }}
                  width={137}
                  height={137}
                  alt='Profile'
                  src='/images/avatars/1.png'
                />
                <Typography variant='subtitle1' fontWeight={500} sx={{ my: 2, textAlign: 'center' }}>
                  {employeeData?.username}
                </Typography>
              </CardContent>
            </StyledGrid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
              }}
            >
              <CardContent>
                <Typography variant='h6'>{employeeData?.full_name}</Typography>
                <Typography variant='body2' textTransform={'capitalize'}>
                  {employeeData?.designation}
                </Typography>
                <Typography variant='body2' sx={{ my: 3 }}>
                  {employeeData?.bio ||
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur saepe, quasi unde illo eum placeat harum vitae eos sapiente possimus quam assumenda quia'}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction='row' spacing={2}>
                      <Cellphone fontSize='small' />
                      <Typography variant='subtitle2'>{employeeData?.mobile}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction='row' spacing={2}>
                      <Email fontSize='small' />
                      <Typography variant='subtitle2'>{employeeData?.email}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction='row' spacing={2}>
                      <Cake fontSize='small' />
                      <Typography variant='subtitle2'>
                        {employeeData?.dob && formatDob(new Date(employeeData?.dob))}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction='row' spacing={2}>
                      <MapMarker fontSize='small' />
                      <Typography variant='subtitle2' textTransform={'capitalize'}>
                        {employeeData?.country}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* <Grid item xs={12} sm={5}>
        <Card>
          <Grid container spacing={6}>
            <StyledGrid item md={5} xs={12}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
              </CardContent>
            </StyledGrid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                  Apple iPhone 11 Pro
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                  Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8″ display Apple A13 Bionic
                </Typography>
                <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
                  Price:{' '}
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    $899
                  </Box>
                </Typography>
              </CardContent>
              <CardActions className='card-action-dense'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Button>
                    <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                    Add to Card
                  </Button>
                  <IconButton id='long-button' aria-label='share' aria-haspopup='true' aria-controls='long-menu'>
                    <ShareVariant fontSize='small' />
                  </IconButton>
                </Box>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Grid> */}
    </Grid>
  )
}
const EmployeeProfile: NextPage = () => {
  return <EmployeeProfileComponent />
}
EmployeeProfile.getLayout = page => <DashboardLayout>{page}</DashboardLayout>
export { EmployeeProfile }
