import Touchable from 'src/components/Touchable/Touchable'
import styled from 'styled-components'
import BaseImage from 'src/components/BaseImage/BaseImage'
import Container from 'src/components/Container/Container'

export const Root = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 15px;
`
