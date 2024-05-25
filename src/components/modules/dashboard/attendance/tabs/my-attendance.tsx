// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { attendanceApi } from 'src/api'
import { useEffect, useState } from 'react'
import { formatDate, formatTime } from 'src/utils/helpers'

const columns = ['#', 'Date', 'ClockIn Time', 'ClockOut Time', 'Status', 'Production']

export const MyAttendance = ({ filters }: any) => {
  // ** States
  //   const [page, setPage] = useState<number>(0)
  //   const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  //   const handleChangePage = (event: unknown, newPage: number) => {
  //     setPage(newPage)
  //   }

  //   const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //     setRowsPerPage(+event.target.value)
  //     setPage(0)
  //   }

  const [attendance, setAttendance] = useState<any[]>([])

  const handleGetAttendances = async () => {
    const response = await attendanceApi.getMyAttendance(filters)

    setAttendance(response.data.attendance)
  }

  useEffect(() => {
    handleGetAttendances()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column: string, index: number) => (
                <TableCell key={index} align={'center'}>
                  <span style={{ fontWeight: 700 }}>{column}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((item: any, index: number) => {
              return (
                <TableRow hover role='checkbox' key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{formatDate(item.date)}</TableCell>
                  <TableCell align='center'>{formatTime(item.timeIn)}</TableCell>

                  <TableCell align='center'>Tabish</TableCell>
                  <TableCell align='center'>Tabish</TableCell>
                  <TableCell align='center'>Tabish</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  )
}
