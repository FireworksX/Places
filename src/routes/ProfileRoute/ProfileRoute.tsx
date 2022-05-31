import { FC } from 'react'
import * as Styled from './styles'
import { route } from 'src/hoc/route'
import { ROUTE_NAMES } from 'src/router/constants'
import PageHeaderButtonBack from 'src/widgets/PageHeader/components/PageHeaderButtonBack/PageHeaderButtonBack'
import { withValidateUser } from 'src/hoc/withValidateUser'
import { useGeoLocation } from 'src/hooks/useGeoLocation'
import { useNotifications } from 'src/hooks/useNotifications'
import { useProfileRoute } from './hooks/useProfileRoute'
import Icon from 'src/components/Icon/Icon'
import { staticImagesMap } from 'src/data/staticImagesMap'
import Container from 'src/components/Container/Container'
import Button from 'src/components/Button/Button'

interface ProfileRouteProps {
  className?: string
}

const list = [
  {
    title: 'От местных',
    description: 'Куда ходят местные',
    image: staticImagesMap.manWalkingLightSkinTone
  },
  {
    title: 'Известное',
    description: 'Места с открыток',
    image: staticImagesMap.classicalBuilding
  },
  {
    title: 'Поесть',
    description: 'Где покушать',
    image: staticImagesMap.potOfFood
  },
  {
    title: 'Маршруты',
    description: 'Где гулять',
    image: staticImagesMap.worldMap
  },
  {
    title: 'Пофоткаться',
    description: 'Для фото в Инстаграм',
    image: staticImagesMap.cameraWithFlash
  },
  {
    title: 'Бары',
    description: 'Где пить',
    image: staticImagesMap.beerMug
  }
]

const ProfileRoute: FC<ProfileRouteProps> = ({ className }) => {
  const { user, fullName } = useProfileRoute()
  const geoLocations = useGeoLocation()
  const notifications = useNotifications()

  return (
    <Styled.Root className={className}>
      <Styled.Header
        left={<PageHeaderButtonBack />}
        right={
          <Styled.HeaderButton>
            <Icon name='ellipsis' />
          </Styled.HeaderButton>
        }
      >
        <Styled.HeaderTitle>@{user?.username}</Styled.HeaderTitle>
      </Styled.Header>
      <Styled.Head>
        <Styled.Avatar src='https://avatars.githubusercontent.com/u/22668125?v=4' />
        <Styled.NameWrapper>
          <Styled.Name>{fullName}</Styled.Name>
          <Styled.Description>{user?.bio}</Styled.Description>
        </Styled.NameWrapper>
      </Styled.Head>

      <Styled.Metrics>
        <Styled.MetricCell>
          <Styled.MetricValue>83</Styled.MetricValue>
          <Styled.MetricLabel>публикаций</Styled.MetricLabel>
        </Styled.MetricCell>
        <Styled.MetricCell>
          <Styled.MetricValue>152</Styled.MetricValue>
          <Styled.MetricLabel>подписчиков</Styled.MetricLabel>
        </Styled.MetricCell>
        <Styled.MetricCell>
          <Styled.MetricValue>36</Styled.MetricValue>
          <Styled.MetricLabel>подписок</Styled.MetricLabel>
        </Styled.MetricCell>
      </Styled.Metrics>

      <Styled.CompilationWrapper>
        {list.map((el, index) => (
          <Styled.Compilation
            key={`${el.title}_${index}`}
            title={el.title}
            image={el.image}
            description={el.description}
          />
        ))}
      </Styled.CompilationWrapper>

      <Container>
        <Button stretched size='l'>
          Показать на карте
        </Button>
      </Container>

      <Styled.LocationsWrapper>
        <Styled.LocationCell />
        <Styled.LocationCell />
        <Styled.LocationCell />
        <Styled.LocationCell />
        <Styled.LocationCell />
        <Styled.LocationCell />
      </Styled.LocationsWrapper>
    </Styled.Root>
  )
}

export default route(withValidateUser(ProfileRoute), ROUTE_NAMES.profile)
