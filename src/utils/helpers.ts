import { FormikValues } from 'formik'

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

export const formatTime = (timeString: number) => {
  const date = new Date(timeString)
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
