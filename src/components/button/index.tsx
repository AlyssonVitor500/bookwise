import { ComponentProps, ReactNode } from 'react'
import { ButtonContainer } from './styles'

interface ButtonProps extends ComponentProps<typeof ButtonContainer> {
  text: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({ text, rightIcon, leftIcon, ...props }: ButtonProps) {
  return (
    <ButtonContainer {...props}>
      {!!leftIcon && leftIcon}
      <span>{text}</span>
      {!!rightIcon && rightIcon}
    </ButtonContainer>
  )
}
