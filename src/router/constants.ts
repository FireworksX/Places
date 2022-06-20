import { createConstants } from 'src/utils/createConstants'

const langSlugs = createConstants('en', 'ru', 'es', 'it')

const ROUTE_NAMES = createConstants(
  '__splat_route',
  'root',
  'navigation',
  'home',
  'profile',
  'profileReview',
  'profileEdit',
  'profileCategories',
  'profileFollowers',
  'profileSubscribers',
  'trends',
  'notifications',
  'welcome',
  'register',
  'createPlace',
  'city',
  'cityList',
  'cityDetail',
  'cityInfo',
  'cityMap',
  'user',
  'userReview',
  'userFollowers',
  'userSubscribers',
  'location',
  'locationDetail',
  'locationView',
  'locationEdit',
  'locationCreate'
)
type RouteNamesType = keyof typeof ROUTE_NAMES

const ROUTE_PARAMS = createConstants('citySlug', 'userSlug', 'locationSlug')

const STORE_NAMES = createConstants(
  'mapCenterAtom',
  'mapZoomAtom',
  'mapPlacemarksAtom',
  'mapSaveCenterAtom',
  'hasNavigationAtom',
  'geoLocationAtom',
  'userAgentAtom',
  'hasNavigationMapHelpersAtom',
  'modalAtom',
  'modalContextAtom'
)

const zIndex = {
  navigation: 10,
  modal: 20
}

export const MODAL_NAMES = createConstants('createCategory', 'editCategory', 'profileSettings', 'locationFields')

export type ModalName = keyof typeof MODAL_NAMES

export { langSlugs, ROUTE_NAMES, ROUTE_PARAMS, STORE_NAMES, RouteNamesType, zIndex }
