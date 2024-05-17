import { NextPage } from 'next'
import React from 'react'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'

const EmployeeProfileComponent = () => {
  return <div>profile</div>
}

const EmployeeProfile: NextPage = () => {
  return <EmployeeProfileComponent />
}

EmployeeProfile.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { EmployeeProfile }
