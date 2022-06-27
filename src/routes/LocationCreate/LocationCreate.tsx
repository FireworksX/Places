import { FC } from 'react'
import * as Styled from './styles'
import { route } from '../../hoc/route'
import { MODAL_NAMES, ROUTE_NAMES } from '../../router/constants'
import PageHeaderButtonBack from '../../widgets/PageHeader/components/PageHeaderButtonBack/PageHeaderButtonBack'
import PageHeaderButton from 'src/widgets/PageHeader/components/PageHeaderButton/PageHeaderButton'
import GalleryFieldView from '../../widgets/locationFields/galleryField/GalleryFieldView/GalleryFieldView'
import {
  AddFieldWrapper,
  AverageBill,
  Category,
  ControlButton,
  ControlButtons,
  Description,
  Gallery,
  Kitchen,
  Rating,
  Separator,
  Tags,
  WifiSpeed
} from './styles'
import Container from '../../components/Container/Container'
import Button from '../../components/Button/Button'
import { useModal } from '../../hooks/useModal'
import UserRowCard from '../../components/UserRowCard/UserRowCard'
import { useCurrentUser } from '../../hooks/data/useCurrentUser'
import CompilationCell from '../../components/CompilationCell/CompilationCell'
import { staticImagesMap } from '../../data/staticImagesMap'
import Icon from '../../components/Icon/Icon'
import RadioButtons from 'src/widgets/RadioButtons/RadioButtons'
import RadioButtonIcon from '../../widgets/RadioButtons/components/RadioButtonIcon/RadioButtonIcon'
import { useRadioButtons } from '../../widgets/RadioButtons/hooks/useRadioButtons'
import Slider from '../../components/Slider/Slider'
import ChipsInput from '../../widgets/ChipsInput/ChipsInput'
import Chip from '../../widgets/ChipsInput/components/Chip/Chip'
import { useLocationCreate } from './hooks/useLocationCreate'

interface LocationCreateProps {
  className?: string
}

const mediaList = [
  {
    _id: '62ac2bc29fdfa7a54e24b34b',
    fileName: '1655450562_futura_2.jpeg',
    mimetype: 'image/jpeg',
    path: '/Users/arturabeltins/development/checkpoint-server/uploads/images',
    size: 177897,
    author: { $oid: '629a2d8d4a09e83ef51861a7' },
    createdAt: { $date: { $numberLong: '1655450562492' } },
    updatedAt: { $date: { $numberLong: '1655450562492' } },
    __v: 0
  },
  {
    _id: '62ac2bb89fdfa7a54e24b348',
    fileName: '1655450552_futura_1.jpeg',
    mimetype: 'image/jpeg',
    path: '/Users/arturabeltins/development/checkpoint-server/uploads/images',
    size: 161442,
    author: '629a2d8d4a09e83ef51861a7'
  },
  {
    _id: '62ac2bc99fdfa7a54e24b34e',
    fileName: '1655450569_futura_3.jpeg',
    mimetype: 'image/jpeg',
    path: '/Users/arturabeltins/development/checkpoint-server/uploads/images',
    size: 329669,
    author: { $oid: '629a2d8d4a09e83ef51861a7' },
    createdAt: { $date: { $numberLong: '1655450569394' } },
    updatedAt: { $date: { $numberLong: '1655450569394' } },
    __v: 0
  },
  {
    _id: '62ac2bd09fdfa7a54e24b351',
    fileName: '1655450576_futura_4.jpeg',
    mimetype: 'image/jpeg',
    path: '/Users/arturabeltins/development/checkpoint-server/uploads/images',
    size: 124517,
    author: { $oid: '629a2d8d4a09e83ef51861a7' },
    createdAt: { $date: { $numberLong: '1655450576751' } },
    updatedAt: { $date: { $numberLong: '1655450576751' } },
    __v: 0
  },
  {
    _id: '62ac2bd69fdfa7a54e24b354',
    fileName: '1655450582_futura_5.jpeg',
    mimetype: 'image/jpeg',
    path: '/Users/arturabeltins/development/checkpoint-server/uploads/images',
    size: 202092,
    author: { $oid: '629a2d8d4a09e83ef51861a7' },
    createdAt: { $date: { $numberLong: '1655450582488' } },
    updatedAt: { $date: { $numberLong: '1655450582488' } },
    __v: 0
  }
]

const LocationCreate: FC<LocationCreateProps> = ({ className }) => {
  const { open } = useModal(MODAL_NAMES.locationFields)
  const { user } = useCurrentUser()
  const {
    DescriptionComponent,
    TitleComponent,
    KitchenComponent,
    WifispeedComponent,
    AverageBillComponent,
    TagsComponent,
    toggleIsEdit
  } = useLocationCreate()
  const { list, onClick } = useRadioButtons([
    {
      label: 'Public',
      description: 'Открыто всем пользователям',
      before: <RadioButtonIcon iconName='image' />
    },
    { label: 'Private', description: 'Видите только вы', before: <RadioButtonIcon iconName='lock' /> }
  ])

  return (
    <Styled.Root className={className}>
      <Styled.Header
        left={
          <PageHeaderButton>
            <PageHeaderButtonBack />
          </PageHeaderButton>
        }
        right={<PageHeaderButton>Сохранить</PageHeaderButton>}
      />

      <Styled.Gallery mediaFiles={mediaList} />
      <Container>
        <Styled.Title>{TitleComponent}</Styled.Title>
        <button onClick={toggleIsEdit}>toggle is edit</button>

        <Styled.Description>{DescriptionComponent}</Styled.Description>

        <Styled.ControlButtons>
          <Styled.ControlButton size='l'>Показать на карте</Styled.ControlButton>
          <Styled.ControlButton size='l' mode='secondary'>
            <Icon name='heart' width={24} height={24} /> 150
          </Styled.ControlButton>
          <Styled.ControlButton size='l' mode='secondary'>
            <Icon name='bookmark' width={24} height={24} />
          </Styled.ControlButton>
        </Styled.ControlButtons>

        <Styled.Kitchen>{KitchenComponent}</Styled.Kitchen>

        <Styled.WifiSpeed>{WifispeedComponent}</Styled.WifiSpeed>
        <Styled.AverageBill>{AverageBillComponent}</Styled.AverageBill>
        <Styled.Rating />
        <Styled.Tags>{TagsComponent}</Styled.Tags>

        <Styled.AddFieldWrapper>
          <Button mode='secondary' onClick={open}>
            Добавить поле
          </Button>
        </Styled.AddFieldWrapper>

        <Styled.Separator />
        <Styled.Category title='Корея' description='Вайб Южной Кореи' image={staticImagesMap.potOfFood} />
        <UserRowCard
          username={user?.username}
          firstName={user?.firstName}
          lastName={user?.lastName}
          verify={user?.verify}
          phone={user?.phone}
          appLinkProps={{
            type: 'user',
            userSlug: user?.username || ''
          }}
        />
      </Container>
    </Styled.Root>
  )
}

export default route(LocationCreate, ROUTE_NAMES.locationCreate)