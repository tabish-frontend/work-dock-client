// ** Icon imports
// import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/layouts/dashboard/types'
import { paths } from 'src/contants/paths'
import { useAuth } from 'src/hooks'
import { AuthContextType } from 'src/context/auth'

const navigation = (): VerticalNavItemsType => {
  const navItems = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: paths.index
    },
    {
      title: 'Employees',
      icon: AccountCogOutline,
      path: paths.employees,
      roles: ['admin', 'hr']
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
      title: 'Tasks',
      icon: Table,
      path: '#'
    }
  ]

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => {
    const { user } = useAuth<AuthContextType>()

    // If the item doesn't have a roles property, it's visible to all roles
    if (!item.roles) return true

    // Check if the user's role is included in the item's roles array
    return item.roles.includes(user?.role ? user.role : '')
  })

  return filteredNavItems
}

export default navigation
