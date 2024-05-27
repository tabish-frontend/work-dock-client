import { SeverityPillColor } from 'src/components'

export const AttendanceStatus = {
  ONLINE: 'online',
  SHORT_ATTENDANCE: 'short_attendance',
  FULL_DAY_ABSENT: 'full_day_absent',
  HALF_DAY_PRESENT: 'half_day_present',
  FULL_DAY_PRESENT: 'full_day_present'
}

export const AttendusStatusMap: Record<string, SeverityPillColor> = {
  full_day_present: 'success',
  online: 'primary',
  full_day_absent: 'error',
  short_attendance: 'warning'
}
