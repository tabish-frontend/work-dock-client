// ** React Import
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { Settings } from 'src/context/settingsContext'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out',
  fontFamily: 'Poppins-SemiBold, Poppins'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <img src='/images/logos/work-dock-logo.png' alt='logo' width={50} />
            <HeaderTitle variant='h5' sx={{ ml: 1, mt: 1.6 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader

// ** React Import
// import { ReactNode } from 'react'

// // ** Next Import
// import Link from 'next/link'

// // ** MUI Imports
// import Box, { BoxProps } from '@mui/material/Box'
// import { styled } from '@mui/material/styles'

// // ** Type Import
// import { Settings } from 'src/@core/context/settingsContext'

// // ** Configs

// interface Props {
//   hidden: boolean
//   settings: Settings
//   toggleNavVisibility: () => void
//   saveSettings: (values: Settings) => void
//   verticalNavMenuBranding?: (props?: any) => ReactNode
// }

// // ** Styled Components
// const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   paddingRight: theme.spacing(4.5),
//   marginTop: 20,
//   transition: 'padding .25s ease-in-out',
//   minHeight: theme.mixins.toolbar.minHeight
// }))

// // const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
// //   fontWeight: 600,
// //   lineHeight: 'normal',
// //   textTransform: 'uppercase',
// //   color: theme.palette.text.primary,
// //   transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
// // }))

// const StyledLink = styled('a')({
//   display: 'flex',
//   alignItems: 'center',
//   textDecoration: 'none'
// })

// const VerticalNavHeader = (props: Props) => {
//   // ** Props
//   const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

//   // ** Hooks

//   return (
//     <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
//       {userVerticalNavMenuBranding ? (
//         userVerticalNavMenuBranding(props)
//       ) : (
//         <Link href='/' passHref>
//           <StyledLink>
//             {/* <svg
//               width={30}
//               height={25}
//               version='1.1'
//               viewBox='0 0 30 23'
//               xmlns='http://www.w3.org/2000/svg'
//               xmlnsXlink='http://www.w3.org/1999/xlink'
//             >
//               <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
//                 <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
//                   <g id='logo' transform='translate(95.000000, 50.000000)'>
//                     <path
//                       id='Combined-Shape'
//                       fill={theme.palette.primary.main}
//                       d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
//                     />
//                     <polygon
//                       id='Rectangle'
//                       opacity='0.077704'
//                       fill={theme.palette.common.black}
//                       points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
//                     />
//                     <polygon
//                       id='Rectangle'
//                       opacity='0.077704'
//                       fill={theme.palette.common.black}
//                       points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
//                     />
//                     <polygon
//                       id='Rectangle'
//                       opacity='0.077704'
//                       fill={theme.palette.common.black}
//                       points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
//                       transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
//                     />
//                     <polygon
//                       id='Rectangle'
//                       opacity='0.077704'
//                       fill={theme.palette.common.black}
//                       points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
//                       transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
//                     />
//                     <path
//                       id='Rectangle'
//                       fillOpacity='0.15'
//                       fill={theme.palette.common.white}
//                       d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
//                     />
//                     <path
//                       id='Rectangle'
//                       fillOpacity='0.35'
//                       fill={theme.palette.common.white}
//                       transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
//                       d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
//                     />
//                   </g>
//                 </g>
//               </g>
//             </svg> */}

//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               id='Layer_1'
//               data-name='Layer 1'
//               viewBox='0 0 250 80.12'
//               width={180}
//             >
//               <g>
//                 <path
//                   fill='#7c1522'
//                   d='m92.94,26.25h-27.4v44.53h3.52c1.86-1.3,3.02-3.25,3.02-5.46v-17h20.86c5.34,0,8.94-3.61,8.94-8.94v-4.2c0-5.33-3.6-8.94-8.94-8.94Zm2.41,15.96c0,.83-.67,1.49-1.49,1.49h-21.77v-12.82h21.77c.82,0,1.49.66,1.49,1.49v9.84Z'
//                 />
//                 <path
//                   fill='#7c1522'
//                   d='m135,26.25v24.11c0,.82-.67,1.49-1.49,1.49h-20.28c-.82,0-1.49-.67-1.49-1.49v-24.11h-6.53v21.27c0,5.34,3.6,8.94,8.92,8.94h18.48c5.33,0,8.94-3.6,8.94-8.94v-21.27h-6.55Z'
//                 />
//                 <path fill='#7c1522' d='m153.01,51.85v-25.6h-6.55v30.21h29.81v-4.61h-23.26Z' />
//                 <path
//                   fill='#7c1522'
//                   d='m205.69,39.12h-19.62c-.83,0-1.49-.67-1.49-1.49v-5.26c0-.83.66-1.49,1.49-1.49h26.82v-4.63h-26.17c-5.2,0-8.68,3.5-8.68,8.68v.11c0,5.19,3.48,8.68,8.68,8.68h19.62c.83,0,1.49.66,1.49,1.49v5.14c0,.82-.66,1.49-1.49,1.49h-28.31v4.61h27.66c5.2,0,8.68-3.48,8.68-8.68s-3.5-8.67-8.68-8.67Z'
//                 />
//                 <path
//                   fill='#7c1522'
//                   d='m225.34,30.95h21.77v-4.61h-20.87c-5.33,0-8.94,3.61-8.94,8.94v12.25c0,5.34,3.61,8.94,8.94,8.94h20.87v-4.61h-21.77c-.82,0-1.49-.67-1.49-1.49v-6.63h20.28v-4.61h-20.28v-6.68c0-.82.67-1.49,1.49-1.49Z'
//                 />
//               </g>
//               <path
//                 fill='#7c1522'
//                 d='m72.09,26.24v39.09c0,2.21-1.16,4.15-3.02,5.46-1.52,1.07-3.52,1.72-5.73,1.72-4.91,0-8.75-3.15-8.75-7.18V21.73c-.19-.21-.92-.7-2.16-.7h-3.08c-1.25,0-1.98.49-2.16.7v36.28c0,4.01-3.84,7.16-8.75,7.16h-1.66c-4.9,0-8.75-3.15-8.75-7.16V10.27c-.19-.21-.92-.7-2.16-.7h-1.42c-1.23,0-1.98.49-2.16.7v60.05c0,4.01-3.84,7.16-8.75,7.16h-1.17c-4.91,0-8.75-3.15-8.75-7.16V26.07h6.59v44.12c.19.21.92.7,2.16.7h1.17c1.25,0,1.98-.49,2.16-.7V10.15c0-4.03,3.85-7.18,8.75-7.18h1.42c4.91,0,8.75,3.15,8.75,7.18v47.73c.2.23.93.7,2.16.7h1.66c1.25,0,1.98-.47,2.16-.7V21.61c0-4.03,3.84-7.18,8.75-7.18h3.08c4.91,0,8.75,3.15,8.75,7.18v43.6c.19.21.93.7,2.16.7s1.98-.49,2.16-.7V26.24h6.59Z'
//               />
//             </svg>
//           </StyledLink>
//         </Link>
//       )}
//     </MenuHeaderWrapper>
//   )
// }

// export default VerticalNavHeader
