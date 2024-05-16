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
