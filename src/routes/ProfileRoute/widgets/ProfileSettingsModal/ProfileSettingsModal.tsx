import { FC, useCallback } from 'react'
import { MODAL_NAMES } from 'src/router/constants'
import ActionSheetItem from 'src/widgets/ActionSheet/components/ActionSheetItem/ActionSheetItem'
import ActionSheet from 'src/widgets/ActionSheet/ActionSheet'
import { useCurrentUser } from 'src/hooks/data/useCurrentUser'
import { useRouter } from 'src/hooks/useRouter'
import { useLinkConfig } from 'src/widgets/Link/hooks/useLinkConfig'
import { useModal } from 'src/hooks/useModal'

interface ProfileSettingsModalProps {
  className?: string
}

const MODAL_NAME = MODAL_NAMES.profileSettings

const ProfileSettingsModal: FC<ProfileSettingsModalProps> = ({ className }) => {
  const { close } = useModal(MODAL_NAMES.profileSettings)
  const profileEditLink = useLinkConfig('profileEdit')
  const { logout } = useCurrentUser()
  const { routerInstance } = useRouter()

  const navigateToProfileEdit = useCallback(async () => {
    await close()
    routerInstance.navigate(profileEditLink.link.name)
  }, [profileEditLink, routerInstance, close])

  return (
    <ActionSheet className={className} name={MODAL_NAME}>
      <ActionSheetItem onClick={navigateToProfileEdit}>Настройки</ActionSheetItem>
      {/*<ActionSheetItem>Изменить категории</ActionSheetItem>*/}
      <ActionSheetItem mode='destructive' onClick={logout}>
        Выход
      </ActionSheetItem>
    </ActionSheet>
  )
}

export default ProfileSettingsModal
