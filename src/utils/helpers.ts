import { FormikValues } from 'formik'

const dayAbbreviations: { [key: string]: string } = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun'
}

export const getChangedFields = <T extends FormikValues>(values: T, initialValues: T): Partial<T> => {
  const changedFields: Partial<T> = {}

  for (const key in values) {
    const currentValue = values[key]
    const initialValue = initialValues[key]

    if (typeof currentValue === 'string' && typeof initialValue === 'string') {
      const trimmedCurrentValue = currentValue.trim()
      const trimmedInitialValue = initialValue.trim()

      if (trimmedCurrentValue !== trimmedInitialValue) {
        changedFields[key] = trimmedCurrentValue
      }
    } else if (currentValue !== initialValue) {
      changedFields[key] = currentValue
    }
  }

  return changedFields
}

export const formatDuration = (startTime: Date, endTime: Date) => {
  const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime()
  const totalMinutes = Math.floor(durationMs / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`
}

export const formatDob = (dateStr: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat('en-GB', options)

  return formatter.format(dateStr)
}

export const formatDate = (dateString: number) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  return date.toLocaleDateString('en-US', options)
}

export const getDayFromDate = (dateString: number) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const formatTime = (timeString: Date | null) => {
  const date = timeString ? new Date(timeString) : new Date()
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  }

  return date.toLocaleTimeString('en-US', options)
}

export const calculateWorkingPercentage = (startTime: Date, endTime: Date | null) => {
  const shiftDuration = 8 * 60 * 60 * 1000 // 8 hours in milliseconds
  let elapsedTime
  if (!endTime) {
    elapsedTime = new Date().getTime() - new Date(startTime).getTime()
  } else {
    elapsedTime = new Date(endTime).getTime() - new Date(startTime).getTime()
  }

  return (elapsedTime / shiftDuration) * 100
}

export const getAbbreviatedDays = (days: string[]): string[] => {
  return days.map(day => dayAbbreviations[day] || day)
}
