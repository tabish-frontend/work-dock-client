export interface HumanResourceDetails {
  _id: string
  username: string
  full_name: string
  avatar: string
  email: string
  account_status: string
  designation: string[]
  company: string
}

export interface HumanResourceInfo {
  _id: string
  bio: string
  mobile: number
  dob: Date
  country: string
  languages: string[]
  qualification: string
  gender: string
}

export interface HumanResource {
  _id: string
  bio: string
  mobile: number
  dob: Date
  country: string
  languages: string[]
  username: string
  full_name: string
  role: string
  avatar: string
  account_status: string
  company: string
  natinal_identity_number: string
  email: string
  gender: string
  qualification: string
  join_date: Date | null
  leave_date: Date | null
  designation: string[]
  qualification_certificates: string[]
}
