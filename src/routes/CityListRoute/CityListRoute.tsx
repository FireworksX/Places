import { FC } from 'react'
import * as Styled from './styles'
import { ROUTE_NAMES } from 'src/router/constants'
import { route } from 'src/hoc/route'
import { useCityList } from './hooks/useCityList'
import SimpleCell from 'src/components/SimpleCell/SimpleCell'
import Link from 'src/widgets/Link/Link'
import { staticImagesMap } from 'src/data/staticImagesMap'
import Button from 'src/components/Button/Button'

interface CityListRouteProps {
  className?: string
}

const CityListRoute: FC<CityListRouteProps> = ({ className }) => {
  const { list } = useCityList()
  const randomCity = list[1]

  return (
    <Styled.Root className={className}>
      <Styled.ImageWrapper>
        <Styled.Image src={staticImagesMap.sunset} />
      </Styled.ImageWrapper>
      <Styled.Title>Выберите город</Styled.Title>
      <Styled.Description>Выберите город который вы хотите исследовать</Styled.Description>

      <Styled.SurpriseWrapper>
        <Link type='cityInfo' citySlug={randomCity?.slug}>
          <Button mode='secondary' size='l' stretched>
            Удивите меня
          </Button>
        </Link>
      </Styled.SurpriseWrapper>

      {list.map(city => (
        <Link key={city.slug} type='cityInfo' citySlug={city.slug}>
          <SimpleCell expandable>{city.name}</SimpleCell>
        </Link>
      ))}
    </Styled.Root>
  )
}

export default route(CityListRoute, ROUTE_NAMES.cityList)
