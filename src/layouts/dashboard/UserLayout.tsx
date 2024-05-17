// ** React Imports
import { ReactNode } from 'react'
import PropTypes from 'prop-types'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/layouts/dashboard/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/layouts/dashboard/navigation/config.ts'

// ** Component Import
// import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './AppBarContent'

// ** Hook Import
import { useSettings } from 'src/hooks'
import { AuthGuard } from 'src/components'

interface Props {
  children: ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const component = (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      verticalAppBarContent={(
        props: { toggleNavVisibility: () => void } // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )

  return <AuthGuard>{component}</AuthGuard>
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}
