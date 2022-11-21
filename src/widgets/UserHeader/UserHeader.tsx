import { FC, ReactNode } from 'react'
import * as Styled from './styles'
import { BaseUser } from 'src/interfaces/User'
import { useInitialAvatarPlaceholder } from 'src/widgets/Avatar/hooks/useInitialAvatarPlaceholder'
import { buildFullName } from 'src/utils/buildFullName'
import { Actions, Counters } from './styles'
import CounterCell from './components/CounterCell/CounterCell'
import HashtagCell from '../../components/HashtagCell/HashtagCell'
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'

interface UserHeaderProps extends Pick<BaseUser, 'firstName' | 'lastName' | 'mail' | 'bio' | 'username' | 'verify'> {
  className?: string
  actions?: ReactNode
}

const UserHeader: FC<UserHeaderProps> = ({ className, bio, actions, firstName, lastName, verify, username, mail }) => {
  const avatarText = useInitialAvatarPlaceholder({ username, firstName, lastName })

  return (
    <Styled.Root className={className}>
      <Styled.Wrapper>
        <Styled.Head>
          <Styled.AvatarComponent uniqueId={mail}>{avatarText}</Styled.AvatarComponent>
          <Styled.Counters>
            <CounterCell value='1.214' description='Connections' />
            <CounterCell
              appLinkProps={{
                type: 'profileFollowers'
              }}
              value='852'
              description='Followers'
            />
            <CounterCell
              appLinkProps={{
                type: 'profileSubscribers'
              }}
              value='137'
              description='Following'
            />
            {actions && <Styled.Actions>{actions}</Styled.Actions>}
          </Styled.Counters>
        </Styled.Head>
        <Styled.Name>
          {/*{buildFullName(firstName, lastName)}*/}
          Arthur Abeltinsh
          {verify && <Styled.VerifyIcon />}
        </Styled.Name>
        <Styled.Description>
          Saint-Peterburg, Russia | Founder of Checkpoint | Traveler | Front-end developer
        </Styled.Description>
      </Styled.Wrapper>

      <HorizontalScroll>
        <HashtagCell>breakfast</HashtagCell>
        <HashtagCell isActive>breakfast</HashtagCell>
        <HashtagCell isActive>breakfast</HashtagCell>
        <HashtagCell>breakfast</HashtagCell>
        <HashtagCell>breakfast</HashtagCell>
        <HashtagCell>breakfast</HashtagCell>
        <HashtagCell>breakfast</HashtagCell>
      </HorizontalScroll>
    </Styled.Root>
  )
}

export default UserHeader