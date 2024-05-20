import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { employeesApi } from 'src/api'
import { DashboardLayout } from 'src/layouts/dashboard/UserLayout'
import { Employee } from 'src/types'

const EmployeeProfileComponent = () => {
  const [employeeData, setEmployeeData] = useState<Employee | undefined>()

  const router = useRouter()
  const { username } = router.query

  const handleGetEmployee = async () => {
    const response = await employeesApi.getEmployee(username)
    setEmployeeData(response)
  }

  useEffect(() => {
    handleGetEmployee()
  }, [])

  return (
    <div>
      <h1>Profile Screen </h1>
      <p>{employeeData?.full_name}</p>
    </div>
  )
}

const EmployeeProfile: NextPage = () => {
  return <EmployeeProfileComponent />
}

EmployeeProfile.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export { EmployeeProfile }
