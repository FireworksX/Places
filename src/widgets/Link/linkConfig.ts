import { ROUTE_NAMES, ROUTE_PARAMS } from 'src/router/constants'
import { buildName } from 'src/utils/buildName'

const linkConfig = {
  welcome: {
    name: buildName(ROUTE_NAMES.welcome),
    params: { required: [], optional: [] }
  },
  profile: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.profile),
    params: { required: [], optional: [] }
  },
  trends: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.trends),
    params: { required: [], optional: [] }
  },
  notifications: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.notifications),
    params: { required: [], optional: [] }
  },
  createPlace: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.createPlace),
    params: { required: [], optional: [] }
  },
  cityList: {
    name: buildName(ROUTE_NAMES.cityList),
    params: { required: [], optional: [] }
  },
  cityInfo: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.city, ROUTE_NAMES.cityDetail, ROUTE_NAMES.cityInfo),
    params: { required: [], optional: [ROUTE_PARAMS.citySlug] }
  },
  cityMap: {
    name: buildName(ROUTE_NAMES.navigation, ROUTE_NAMES.city, ROUTE_NAMES.cityDetail, ROUTE_NAMES.cityMap),
    params: { required: [], optional: [ROUTE_PARAMS.citySlug] }
  }
} as const

export type LinkConfig = typeof linkConfig
export type LinkType = keyof LinkConfig
type ValueOf<T> = T[keyof T]

export type LinkNavigationProps =
  | ValueOf<{
      [Type in keyof LinkConfig]: {
        type: Type
      } & {
        [P in LinkConfig[Type]['params']['required'][any]]: string
      } & { [P in LinkConfig[Type]['params']['optional'][any]]?: string }
    }>
  | {
      type?: undefined
    }

export type LinkNavigationTypeProps<T extends keyof LinkConfig> = Extract<LinkNavigationProps, { type: T }>

export default linkConfig
