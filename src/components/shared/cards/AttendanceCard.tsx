// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ReactApexcharts } from 'src/components'
import { MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { statisticsApi } from 'src/api'

const monthOptions = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
]

export const AttendanceCard = () => {
  const currentDate = new Date()

  const [filters, setFilters] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  })

  const [attendanceData, setAttendanceData] = useState<any>(null)
  const [chartData, setChartData] = useState<any>({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'top',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'last', // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 600
              }
            }
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: []
      },
      yaxis: {
        labels: {
          show: false // Hide y-axis labels
        }
      },
      legend: {
        position: 'top'
      },
      fill: {
        opacity: 1
      },
      colors: ['#56CA00', '#cc3b3b', '#ddd'],
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val.toFixed(0) // Removes the decimal points
          }
        }
      }
    }
  })

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await statisticsApi.getAllUserMonthlyAttendance(filters)
      setAttendanceData(response.data)
    }

    fetchAttendance()
  }, [filters])

  useEffect(() => {
    const processChartData = () => {
      if (!attendanceData) return

      const currentDate = new Date().getDate()
      const currentMonth = new Date().getMonth() + 1

      const dates = Object.keys(attendanceData)
      const presents: any[] = []
      const absents: any[] = []
      const noValues: any[] = []

      dates.forEach((date: any) => {
        const responseDate = new Date(date).getDate()
        const responseMonth = new Date(date).getMonth() + 1

        if (responseMonth > currentMonth || (responseMonth === currentMonth && responseDate > currentDate)) {
          noValues.push(0.12)
          presents.push(0)
          absents.push(0)
        } else {
          noValues.push(0)
          presents.push(attendanceData[date].present)
          absents.push(attendanceData[date].absent)
        }
      })

      setChartData((prev: any) => ({
        ...prev,
        series: [
          { name: 'Present', data: presents },
          { name: 'Absent', data: absents },
          { name: 'No Values', data: noValues }
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: dates.map(date => `${date}/2023 GMT`)
          }
        }
      }))
    }

    processChartData()
  }, [attendanceData])

  return (
    <Card>
      <CardHeader
        title='Monthly Attendance'
        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={
          <TextField
            variant='standard'
            select
            value={filters.month}
            onChange={e =>
              setFilters((prevFilters: any) => ({
                ...prevFilters,
                month: e.target.value
              }))
            }
            SelectProps={{
              MenuProps: {
                style: {
                  maxHeight: '250px'
                }
              }
            }}
          >
            {monthOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
        {chartData.series.length > 0 ? (
          <ReactApexcharts height={350} options={chartData.options} series={chartData.series} type='bar' />
        ) : (
          <p>Loading chart data...</p>
        )}
      </CardContent>
    </Card>
  )
}
