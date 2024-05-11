// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ClockIcon from 'mdi-material-ui/ClockOutline'
import ClockInIcon from 'mdi-material-ui/ClockCheckOutline'
import ClockOutIcon from 'mdi-material-ui/ClockMinus'

// ** Types
import { Button, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

export const TimeLogCard = () => {
  const theme = useTheme()

  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const newTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      setTime(newTime)
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card>
      <CardHeader title='Attendance' titleTypographyProps={{ sx: { lineHeight: '1.2', letterSpacing: '0.31px' } }} />
      <CardContent sx={{ pt: theme.spacing(2) }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <ClockIcon fontSize='large' />
          <Typography variant='h5' sx={{ my: 4 }}>
            {time}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}>
            <Button variant='contained' sx={{ m: 2 }} color='info' startIcon={<ClockInIcon />}>
              CHECK IN
            </Button>
            <Button variant='contained' color='secondary' sx={{ m: 2 }} startIcon={<ClockOutIcon />}>
              CHECK OUT
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: theme.spacing(5)
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <Typography variant='body1'>Time In</Typography>
            <Typography variant='subtitle2'>08:30 am</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <Typography variant='body1'>Time Out</Typography>
            <Typography variant='subtitle2'>08:30 am</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <Typography variant='body1'>Duration</Typography>
            <Typography variant='subtitle2'>08:54 min</Typography>
          </Box>
        </Box>

        <Typography variant='body1' mt={10} textAlign='center'>
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography variant='body1' textAlign='center'>
          Lorem ipsum dolor sit amet
        </Typography>
      </CardContent>
    </Card>
  )
}
