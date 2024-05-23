export interface Employee {
  _id?: string
  full_name: string
  bio?: string
  dob?: Date | null
  country?: string
  designation: string
  username: string
  mobile: number | undefined
  email: string
  qualification: string
  company: string
  account_status: string
  national_identity_number?: number | undefined
}
