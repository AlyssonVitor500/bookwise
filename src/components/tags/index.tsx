import { TagContainer } from './styles'

interface TagProps {
  isActive: boolean
  onClick?: (value: boolean) => void
  text: string
}

export function Tag({ isActive, onClick, text }: TagProps) {
  function onHandleClick() {
    if (onClick) onClick(!isActive)
  }

  return (
    <TagContainer onClick={onHandleClick} selected={isActive}>
      {text}
    </TagContainer>
  )
}
