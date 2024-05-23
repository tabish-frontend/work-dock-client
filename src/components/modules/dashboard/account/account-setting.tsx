// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import { AccountOutline, LockOpenOutline, InformationOutline, Bank } from 'mdi-material-ui'

// ** Demo Tabs Imports
import { TabAccount, TabSecurity, TabInfo, TabBank } from './tabs'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettingsComponent = () => {
  const router = useRouter()
  const { tab } = router.query

  // ** State

  const [tabValue, setTabValue] = useState<string | string[]>(tab ? tab : 'account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // const [user, setUser] = useState<User>()

  // const handleGetMe = async () => {
  //   const response = await authApi.me()
  //   setUser(response.data)
  // }

  // useEffect(() => {
  //   handleGetMe()
  // }, [])

  // const UpdateUser = async (updatingValues: any) => {
  //   const response = await authApi.update_me(updatingValues)
  //   setUser(response.data)

  //   return response.data
  // }

  return (
    <Card>
      <TabContext value={tabValue as string}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
          <Tab
            value='bank'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Bank />
                <TabName>Bank Details</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='bank'>
          <TabBank />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

const AccountSettings: NextPage = () => {
  return <AccountSettingsComponent />
}

AccountSettings.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { AccountSettings }
