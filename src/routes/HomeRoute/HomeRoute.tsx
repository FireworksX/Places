import { FC } from 'react'
import * as Styled from './styles'
import { route } from 'src/hoc/route'
import { ROUTE_NAMES } from 'src/router/constants'
import MainMap from './widgets/MainMap/MainMap'
import Icon from 'src/components/Icon/Icon'
import { useMapCreation } from './hooks/useMapCreation'
import CreationPlacemark from './components/CreationPlacemark/CreationPlacemark'

interface HomeRouteProps {
  className?: string
}

const HomeRoute: FC<HomeRouteProps> = ({ className }) => {
  const { isCreation, onToggleIsCreation } = useMapCreation()

  return (
    <Styled.Root className={className}>
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

export default route(HomeRoute, ROUTE_NAMES.root)
