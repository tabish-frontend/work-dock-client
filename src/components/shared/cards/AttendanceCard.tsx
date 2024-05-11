// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { FormControl, MenuItem, Select } from '@mui/material'

const chartLabels = [
  {
    label: 'Late',
    color: '#00A8AD'
  },
  {
    label: 'On Time',
    color: '#0089FA'
  },
  {
    label: 'Absents',
    color: '#94A7C2'
  },
  {
    label: 'Leaves',
    color: '#B7D1F6'
  }
]

const chart: any = {
  series: [11, 17, 5, 3, 4],
  options: {
    labels: ['Late', 'On-time', 'Absents', 'Leave', 'Holidays'],
    colors: ['#00A8AD', '#0089FA', '#94A7C2', '#B7D1F6'],
    chart: {
      width: '50px'
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
    }
  }
}

export const AttendanceCard = () => {
  const theme = useTheme()

  return (
    <Card>
      <CardHeader
        title='Overall Status'
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={
          <FormControl variant='standard'>
            <Select label='Status' defaultValue='monthly'>
              <MenuItem value='monthly'>Monthly</MenuItem>
              <MenuItem value='yearly'>Yearly</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}
      >
        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' }, marginRight: { md: theme.spacing(2) } }}>
          <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
            <ReactApexcharts height={290} options={chart.options} series={chart.series} type='donut' />
          </CardContent>
        </Box>

        <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' }, marginTop: { xs: 0, md: 10 } }}>
          <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
            {chartLabels.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ backgroundColor: item.color, padding: 1, borderRadius: '50%' }} />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.label}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Box>
      </CardContent>
    </Card>
  )
}
