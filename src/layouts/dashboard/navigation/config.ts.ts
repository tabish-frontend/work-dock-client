/* eslint-disable */

// ** Icon imports
// import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/layouts/dashboard/types'
import { paths } from 'src/contants/paths'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: paths.index
    },
    {
      title: 'Employees',
      icon: AccountCogOutline,
      path: paths.employees
    },
    {
      title: 'Attendance',
      icon: CubeOutline,
      path: paths.attendance
    },
    {
      title: 'Leaves',
      icon: FormatLetterCase,
      path: paths.leaves
    },
    {
      title: 'Salaries',
      icon: AccountPlusOutline,
      path: '#'
    },
    {
      title: 'Taks',
      icon: Table,
      path: '#'
    }
  ]
}

export default navigation
