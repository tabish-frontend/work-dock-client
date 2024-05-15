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
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import { TabInfo } from './tabs'
import { TabAccount } from './tabs'
import { TabSecurity } from './tabs'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useGetResponse } from 'src/hooks'

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

export const AccountSettings = () => {
  const router = useRouter()
  const { tab } = router.query

  // ** State

  const [tabValue, setTabValue] = useState<string | string[]>(tab ? tab : 'account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }
  const { response } = useGetResponse('/users/me')

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
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            userDetails={{
              _id: response._id || '',
              avatar: response.avatar || '',
              email: response.email || '',
              full_name: response.full_name || '',
              username: response.full_name || '',
              designation: response.designation || [],
              qualification: response.qualification || '',
              company: response.company || ''
            }}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo
            userInfo={{
              _id: response._id || '',
              bio: response.bio || '',
              mobile: response.mobile || '',
              dob: response.dob || '',
              country: response.country || '',
              gender: response.gender || '',
              languages: response.language || []
            }}
          />
        </TabPanel>
      </TabContext>
    </Card>
  )
}
