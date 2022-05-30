import { FC, useEffect } from 'react'
import * as Styled from './styles'
import { Helmet } from 'react-helmet-async'
import { route } from 'src/hoc/route'
import { ROUTE_NAMES } from 'src/router/constants'
import MainMap from './widgets/MainMap/MainMap'
import Icon from 'src/components/Icon/Icon'
import { useMapCreation } from './hooks/useMapCreation'
import CreationPlacemark from './components/CreationPlacemark/CreationPlacemark'
import { useKeepNavigation } from 'src/hooks/keepNavigation'
import { withValidateUser } from 'src/hoc/withValidateUser'
import { useMainMap } from './widgets/MainMap/hooks/useMainMap'
import CurrentLocationSelect from './components/CurrentLocationSelect/CurrentLocationSelect'
import {useRecoilState} from "recoil";
import {hasNavigationMapHelpersAtom} from "../../store/uiStore";

interface HomeRouteProps {
  className?: string
}

const CityMapRoute: FC<HomeRouteProps> = ({ className }) => {
  useKeepNavigation(true)
  const { isCreation, onToggleIsCreation } = useMapCreation()
  const { setZoom } = useMainMap()

    const [, setHelpers] = useRecoilState(hasNavigationMapHelpersAtom)

  const onZoomMore = () => setZoom(val => val + 1)
  const onZoomLess = () => setZoom(val => val - 1)

  return (
    <Styled.Root className={className}>
      <Styled.Header>
        <CurrentLocationSelect />
      </Styled.Header>
      <Styled.ZoomControl>
        <Styled.ZoomButton onClick={() => setHelpers((val) => !val)}>
          <Icon name='more' />
        </Styled.ZoomButton>
        <Styled.ZoomButton onClick={onZoomLess}>
          <Icon name='less' />
        </Styled.ZoomButton>
      </Styled.ZoomControl>
      <Styled.CreateButton isCreation={isCreation} onClick={onToggleIsCreation}>
        <Icon name='plus-circle' width={24} height={24} />
      </Styled.CreateButton>
      {isCreation && (
        <Styled.SubmitButton type='createPlace' onClick={onToggleIsCreation}>
          <Icon name='check-circle' width={24} height={24} />
        </Styled.SubmitButton>
      )}
      {isCreation && <CreationPlacemark />}
      <MainMap />
    </Styled.Root>
  )
}

export default route(withValidateUser(CityMapRoute), ROUTE_NAMES.root)