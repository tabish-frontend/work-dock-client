// ** Types
import { NextRouter } from 'next/router'

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */
export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
  console.log('hell')
  if (Object.keys(router.query).length && path) {
    console.log('check 1', router)

    console.log('check 2', Object.keys(router.query))

    const arr = Object.keys(router.query)

    console.log('check 3', arr)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]] as string) && path !== '/'
  }

  return false
}
