import { FC, useEffect } from 'react'
import * as Styled from './styles'
import { route } from 'src/hoc/route'
import { ROUTE_NAMES } from 'src/router/constants'
import PageHeaderButtonBack from 'src/widgets/PageHeader/components/PageHeaderButtonBack/PageHeaderButtonBack'
import { useCurrentUser } from 'src/hooks/data/useCurrentUser'
import { withValidateUser } from 'src/hoc/withValidateUser'
import { useGeoLocation } from '../../hooks/useGeoLocation'
import { useNotifications } from '../../hooks/useNotifications'

interface ProfileRouteProps {
  className?: string
}

const ProfileRoute: FC<ProfileRouteProps> = ({ className }) => {
  const { data } = useCurrentUser()
  const geoLocations = useGeoLocation()
  const notifications = useNotifications()

  return (
    <Styled.Root className={className}>
      <Styled.Header>
        <PageHeaderButtonBack />
        <Styled.HeaderTitle>@{data?.data?.login}</Styled.HeaderTitle>
      </Styled.Header>
      <Styled.Avatar src='https://avatars.githubusercontent.com/u/22668125?v=4' />
      <Styled.Name>Arthur Abeltinsh</Styled.Name>
      <Styled.Description>{data?.data?.bio}</Styled.Description>
      <Styled.Row>
        <Styled.Group>
          <Styled.GroupTitle>Followers</Styled.GroupTitle>
          <Styled.GroupValue>48k</Styled.GroupValue>
        </Styled.Group>
        <Styled.Group>
          <Styled.GroupTitle>Following</Styled.GroupTitle>
          <Styled.GroupValue>311</Styled.GroupValue>
        </Styled.Group>
      </Styled.Row>
      <Styled.Row>
        <Styled.Group>
          <Styled.GroupTitle>Total maps</Styled.GroupTitle>
          <Styled.GroupValue>314</Styled.GroupValue>
        </Styled.Group>
        <Styled.Group>
          <Styled.GroupTitle>Total stories</Styled.GroupTitle>
          <Styled.GroupValue>1.2k</Styled.GroupValue>
        </Styled.Group>
        <Styled.Group>
          <Styled.GroupTitle>Total likes</Styled.GroupTitle>
          <Styled.GroupValue>560k</Styled.GroupValue>
        </Styled.Group>
      </Styled.Row>
      {!geoLocations.hasPermissions && (
        <Styled.FollowButton onClick={geoLocations.onGetPermissions}>Get geolocation</Styled.FollowButton>
      )}
      {!notifications.hasPermissions && (
        <Styled.FollowButton onClick={notifications.onGetPermissions}>Get notifications</Styled.FollowButton>
      )}
    </Styled.Root>
  )
}

export default route(withValidateUser(ProfileRoute), ROUTE_NAMES.profile)
