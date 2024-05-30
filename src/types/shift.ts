interface timeDetails {
  start: Date | null
  end: Date | null
  days: string[]
}

export interface Shift {
  _id?: string
  user: string
  times: timeDetails[]
  weekends: string[]
}
