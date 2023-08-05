import { User } from '@phosphor-icons/react'
import {
  AvatarContainer,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from './styles'
import { ComponentProps } from 'react'

interface AvatarProps extends ComponentProps<typeof AvatarImage> {
  size?: 'lg' | 'sm' | 'md'
  onUserClickInAvatar?: () => void
}

export function Avatar({ size, onUserClickInAvatar, ...props }: AvatarProps) {
  function handleClick() {
    if (onUserClickInAvatar) {
      onUserClickInAvatar()
    }
  }

  return (
    <AvatarContainer
      size={size}
      onClick={() => handleClick()}
      userCanClick={!!onUserClickInAvatar}
    >
      <AvatarRoot>
        <AvatarImage {...props} />

        <AvatarFallback delayMs={600}>
          <User size={26} />
        </AvatarFallback>
      </AvatarRoot>
    </AvatarContainer>
  )
}
