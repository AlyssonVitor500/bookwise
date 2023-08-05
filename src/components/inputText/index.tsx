import { MagnifyingGlass } from '@phosphor-icons/react'
import { InputTextComponent, InputTextDiv } from './styles'
import { ComponentProps, useState, KeyboardEvent, ChangeEvent } from 'react'

interface InputProps extends ComponentProps<typeof InputTextComponent> {
  onSearch?: (value: string) => void
  disableSearchWhenEnter?: boolean
  disableClearOnSearch?: boolean
  inputWithoutMaxWidth?: boolean
  enableEmitNoData?: boolean
}

export function Input({
  onSearch,
  disableSearchWhenEnter = false,
  disableClearOnSearch = false,
  inputWithoutMaxWidth = false,
  enableEmitNoData = false,
  ...props
}: InputProps) {
  const [inputTextValue, setInputTextValue] = useState('')

  function onHandleSearch() {
    if ((enableEmitNoData || inputTextValue) && !!onSearch) {
      onSearch(inputTextValue)
    }

    if (!disableClearOnSearch) setInputTextValue('')
  }

  function onPressKey(e: KeyboardEvent) {
    if (e.keyCode === 13 && !disableSearchWhenEnter) onHandleSearch()
  }

  function onTextValueChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('')
    setInputTextValue(e.target.value)
  }

  return (
    <InputTextDiv inputWithoutMaxWidth={inputWithoutMaxWidth}>
      <InputTextComponent
        value={inputTextValue}
        onChange={(e) => onTextValueChange(e)}
        onKeyUp={(e) => onPressKey(e)}
        {...props}
      />
      <button>
        <MagnifyingGlass size={20} onClick={() => onHandleSearch()} />
      </button>
    </InputTextDiv>
  )
}
