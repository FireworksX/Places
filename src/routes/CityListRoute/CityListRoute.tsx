import { FC } from 'react'
import * as Styled from './styles'
import { ROUTE_NAMES } from 'src/router/constants'
import { route } from 'src/hoc/route'
import { withValidateUser } from 'src/hoc/withValidateUser'
import { useCityList } from './hooks/useCityList'
import sunsetImage from '../../../public/assets/images/emoji_subset.png'
import saintPetersburgImage from '../../../public/assets/images/saint-petersburg.png'
import SimpleCell from 'src/components/SimpleCell/SimpleCell'
import CommonLogo from 'src/components/CommonLogo/CommonLogo'
import Link from 'src/widgets/Link/Link'
import {staticImagesMap} from "src/data/staticImagesMap";

interface CityListRouteProps {
  className?: string
}

const CityListRoute: FC<CityListRouteProps> = ({ className }) => {
  const { list } = useCityList()

  return (
    <Styled.Root className={className}>
      <Styled.ImageWrapper>
        <Styled.Image src={staticImagesMap.sunset} />
      </Styled.ImageWrapper>
      <Styled.Title>Choose city</Styled.Title>
      <Styled.Description>Select city which one you want to explore</Styled.Description>
      {list.map(city => (
        <Link type='cityDetail' citySlug={city.slug}>
          <SimpleCell
            description='Locations to explore: 243'
            before={<CommonLogo size={34} src={staticImagesMap.church} />}
          >
            {city.name}
          </SimpleCell>
        </Link>
      ))}
    </Styled.Root>
  )
}

export default route(withValidateUser(CityListRoute), ROUTE_NAMES.cityList)
