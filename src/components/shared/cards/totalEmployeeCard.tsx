// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ReactApexcharts } from 'src/components'

const chart: any = {
  series: [11, 17],
  options: {
    labels: ['Man', 'Women'],
    colors: ['#00A8AD', '#0089FA', '#94A7C2', '#B7D1F6'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 600
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    hover: { mode: null },
    tooltip: {
      enabled: true,
      theme: 'dark'
    }
  }
}

export const TotalEmployees = () => {
  return (
    <Card>
      <CardHeader
        title='Total Employees'
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography variant='h5'>400</Typography>}
      />

      <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
        <ReactApexcharts height={320} options={chart.options} series={chart.series} type='donut' />
      </CardContent>
    </Card>
  )
}
