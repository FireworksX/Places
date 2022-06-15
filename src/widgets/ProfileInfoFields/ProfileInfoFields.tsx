import { FC } from 'react'
import * as Styled from './styles'
import { InputProps } from 'src/components/Input/Input'

interface ProfileFields {
  phone: string
  username: InputProps
  firstName: InputProps
  lastName: InputProps
  bio: Omit<InputProps, 'textarea'>
}

interface ProfileInfoFieldsProps {
  fields: ProfileFields
  avatarText: string
  className?: string
}

const ProfileInfoFields: FC<ProfileInfoFieldsProps> = ({ className, fields, avatarText }) => {
  return (
    <Styled.Root className={className}>
      <Styled.AvatarWrapper>
        <Styled.AvatarComponent uniqueId={fields.phone}>{avatarText}</Styled.AvatarComponent>
      </Styled.AvatarWrapper>

      <Styled.Field placeholder='Username' {...fields.username} />
      <Styled.Field placeholder='First name' {...fields.firstName} />
      <Styled.Field placeholder='Last name' {...fields.lastName} />
      <Styled.Field placeholder='Bio' textarea {...fields.bio} />
    </Styled.Root>
  )
}

export default ProfileInfoFields
