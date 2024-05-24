// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { useRouter } from 'next/router'

// ** Types Imports
import { Employee } from 'src/types'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
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

const truncateBio = (bio: string | undefined, maxLength: number) => {
  const defaultText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime debitis autem '
  if (!bio) {
    return defaultText
  }
  if (bio.length <= maxLength) {
    return bio
  }

  return bio.substring(0, maxLength) + '...'
}

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const router = useRouter()

  return (
    <Card sx={{ cursor: 'pointer' }} onClick={() => router.push(`${router.pathname}/${employee.username}`)}>
      <Grid container spacing={4}>
        <StyledGrid item md={4.5} xs={12}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              style={{ borderRadius: '50%' }}
              width={120}
              height={120}
              alt='Apple iPhone 11 Pro'
              src={employee.avatar || '/images/avatars/1.png'}
            />
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
              {employee.full_name}
            </Typography>
            <Button style={{ backgroundColor: '#EEE5FF', padding: 5 }}>{employee.designation}</Button>
            <Typography variant='body2' sx={{ marginBottom: 3.5, marginTop: 3.5 }}>
              {truncateBio(employee?.bio, 70)}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
