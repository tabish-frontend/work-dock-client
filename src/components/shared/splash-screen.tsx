import type { FC } from 'react'
import Box from '@mui/material/Box'
import themeConfig from 'src/configs/themeConfig'
import { styled } from '@mui/material/styles'
import { Typography, TypographyProps } from '@mui/material'

// import { Logo } from "src/components/shared/logos/logo";

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 900,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  fontFamily: 'Inter, sans-serif'
}))

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 1400
    }}
  >
    <Box
      sx={{
        display: 'inline-flex'
      }}
    >
      {/* <Logo color="#2B91BD" /> */}
      {/* <img src='/images/logo.png' alt='logo' width={250} /> */}
      <img src='/images/apple-touch-icon.png' alt='logo' width={50} />
      <HeaderTitle variant='h5' sx={{ ml: 1, mt: 3 }}>
        {themeConfig.templateName}
      </HeaderTitle>
    </Box>
  </Box>
)
