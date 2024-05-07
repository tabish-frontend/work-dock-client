// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { Box, IconButton } from '@mui/material'
import RefreshIcon from 'mdi-material-ui/RefreshCircle'
import { useState } from 'react'
import { quotes } from 'src/contants/quotes'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  top: 0,
  height: 170,
  position: 'absolute',
  rotate: '270deg',
  marginTop: -10
})

// Styled component for the trophy image
// const TrophyImg = styled('img')({
//   right: 36,
//   bottom: 20,
//   height: 98,
//   position: 'absolute'
// })

const Trophy = () => {
  // ** Hook
  const theme = useTheme()

  const [quote, setQuote] = useState<string>(quotes[Math.floor(Math.random() * quotes.length)])

  const handleNewQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ height: 190 }}>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Good Morning! Zain 🥳</Typography>

          <IconButton color='secondary' onClick={handleNewQuote}>
            <RefreshIcon fontSize='large' />
          </IconButton>
        </Box>
        <br />

        <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          <q>{quote}</q>
        </Typography>
        {/* <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> */}
      </CardContent>
    </Card>
  )
}

export default Trophy
