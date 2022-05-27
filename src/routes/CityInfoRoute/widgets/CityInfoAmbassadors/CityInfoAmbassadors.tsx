import { FC } from 'react'
import * as Styled from './styles'
import Container from 'src/components/Container/Container'
import HorizontalScroll from 'src/components/HorizontalScroll/HorizontalScroll'

interface CityInfoAmbassadorsProps {
  className?: string
}

const CityInfoAmbassadors: FC<CityInfoAmbassadorsProps> = ({ className }) => {
  return (
    <Styled.Root className={className}>
      <Container>
        <Styled.Header>Свои люди в городе</Styled.Header>
        <Styled.Description>Вы можете им написать и договориться об экскурсии или фотопрогулке</Styled.Description>
      </Container>
      <HorizontalScroll>
        <Styled.Card />
        <Styled.Card />
        <Styled.Card />
        <Styled.Card />
        <Styled.Card />
        <Styled.Card />
        <Styled.Card />
      </HorizontalScroll>
    </Styled.Root>
  )
}

export default CityInfoAmbassadors
