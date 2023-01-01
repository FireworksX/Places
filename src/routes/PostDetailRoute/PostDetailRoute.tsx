import { FC, useEffect, useRef } from 'react'
import * as Styled from './styles'
import { route } from '../../hoc/route'
import { MODAL_NAMES, ROUTE_NAMES, ROUTE_PARAMS } from '../../router/constants'
import Container from '../../components/Container/Container'
import LocationCard from '../../widgets/LocationCard/LocationCard'
import Button from '../../components/Button/Button'
import Separator from '../../components/Separator/Separator'
import { useModal } from '../../hooks/useModal'
import { getRandomPost } from '../../data/mocks'
import isBrowser from '../../utils/isBrowser'
import Link from '../../widgets/Link/Link'
import PageHeaderButtonBack from '../../widgets/PageHeader/components/PageHeaderButtonBack/PageHeaderButtonBack'
import { CreatePostsModalContext } from '../../modals/CreatePostModal/CreatePostModal'
import { useRouter } from '../../hooks/useRouter'
import GroupWrapper from '../../widgets/GroupWrapper/GroupWrapper'
import Counter from '../NotificationsRoute/components/Counter/Counter'
import { useShare } from '../../hooks/useShare'

interface PostDetailRouteProps {
  className?: string
}

const PostDetailRoute: FC<PostDetailRouteProps> = ({ className }) => {
  const commentsSectionRef = useRef<HTMLDivElement>()
  const { open, close } = useModal<CreatePostsModalContext>(MODAL_NAMES.postCreate)
  const { getParam, route } = useRouter()
  const { isAvailable, share } = useShare()

  const post = getRandomPost()
  const refer = post.refer

  const comments = post.comments

  const postSlug = getParam(ROUTE_PARAMS.postSlug)

  useEffect(() => {
    setTimeout(() => {
      if ('comments' in route.params) {
        const offset = commentsSectionRef?.current?.getBoundingClientRect()?.top

        if (offset) {
          window.scrollTo(0, offset)
        }
      }
    }, 100)

  }, [route.params])

  if (!isBrowser) {
    return null
  }

  return (
    <Styled.Root className={className} headerLeft={<PageHeaderButtonBack />} title='Post'>
      <Container>
        {refer && isBrowser && (
          <Styled.ConnectedSection>Connected from @{refer.user?.userName}</Styled.ConnectedSection>
        )}
        <div />

        <Link type='user' userSlug={post.user?.userName || ''}>
          <Styled.Header
            hasRefer={!!refer}
            avatar={post.user?.avatar}
            firstName={post.user?.firstName}
            lastName={post.user?.lastName}
            userName={post.user?.userName}
          />
        </Link>

        <Styled.Text>{post.content}</Styled.Text>
        <Styled.Date>10:06 - Nov 23, 2022</Styled.Date>

        <Styled.Target type='location' locationSlug='testLocation'>
          <LocationCard
            name={post.target?.name || ''}
            location={post.target?.location || ''}
            avatar={post.target?.logo}
          />
        </Styled.Target>

        <Styled.Metrics>
          <Styled.Metric type='postConnections' postSlug={postSlug}>
            <span>{post.metrics.connections}</span> Connections
          </Styled.Metric>
          <Styled.Metric type='postLikes' postSlug={postSlug}>
            <span>{post.metrics.likes}</span> Likes
          </Styled.Metric>
        </Styled.Metrics>

        <Button
          size='l'
          icon='lightning'
          stretched
          onClick={() =>
            open({
              onCancel: close
            })
          }
        >
          Connect
        </Button>

        <Styled.Actions>
          <Styled.Action icon='map-pin-alt' size='m' mode='secondary'>
            Show on map
          </Styled.Action>
          <Styled.Action icon='heart' size='m' mode='secondary'>
            Like
          </Styled.Action>
          {isAvailable && (
            <Styled.Action icon='share' size='m' mode='secondary' onClick={share}>
              Share
            </Styled.Action>
          )}
        </Styled.Actions>

        <Separator icon='message-circle' />

        {/*<EmptyPlaceholder header='No comments yet'>Yet no one has left feedback on this place</EmptyPlaceholder>*/}
        <div ref={commentsSectionRef} />
        <GroupWrapper title='Comments' counter={<Counter mode='accent'>{post.metrics.comments}</Counter>}>
          {comments.map((comment, index) => (
            <Styled.Comment key={index} user={comment.user}>
              {comment.content}
            </Styled.Comment>
          ))}
        </GroupWrapper>
      </Container>
    </Styled.Root>
  )
}

export default route(PostDetailRoute, ROUTE_NAMES.postDetail)
