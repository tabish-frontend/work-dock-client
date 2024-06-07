// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ReactApexcharts } from 'src/components'
import { useEffect, useState } from 'react'
import { statisticsApi } from 'src/api'

const chart: any = {
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
  const [chartSeries, setChartSeries] = useState([1, 0])

  const handleGetTotalEmployees = async () => {
    const response = await statisticsApi.getTotalUsers()
    setChartSeries([response.data.man, response.data.women])
  }

  useEffect(() => {
    handleGetTotalEmployees()
  }, [])

  return (
    <Card>
      <CardHeader
        title='Total Employees'
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography variant='h5'>{chartSeries[0] + chartSeries[1]}</Typography>}

        // action={<Typography variant='h5'>{(([a, b]) => a + b)(chartSeries)}</Typography>}
      />

      <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
        <ReactApexcharts height={320} options={chart.options} series={chartSeries} type='donut' />
      </CardContent>
    </Card>
  )
}
