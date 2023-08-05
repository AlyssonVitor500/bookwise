import { ReactNode, createContext, useState } from 'react'

type ModalContextType = {
  isModalBookReviewsVisible: boolean
  changeModalBookReviewsVisibility: (bookId: string) => void
  modalBookId: string

  isModalLoginVisible: boolean
  changeModalLoginVisibility: () => void
}

export const ModalsContext = createContext({} as ModalContextType)

interface ModalsContextProviderProps {
  children: ReactNode
}
export function ModalsContextProvider({
  children,
}: ModalsContextProviderProps) {
  const [modalBookReviewVisibility, setModalBookReviewVisibility] =
    useState(false)

  const [modalBookId, setModalBookId] = useState<string>('')

  const [modalLoginVisibility, setModalLoginVisibility] = useState(false)

  function changeModalBookReviewsVisibility(bookId: string) {
    setModalBookId(bookId)
    setModalBookReviewVisibility((value) => {
      return !value
    })
  }

  function changeModalLoginVisibility() {
    setModalLoginVisibility((value) => {
      return !value
    })
  }

  return (
    <ModalsContext.Provider
      value={{
        isModalBookReviewsVisible: modalBookReviewVisibility,
        changeModalBookReviewsVisibility,
        modalBookId,

        isModalLoginVisible: modalLoginVisibility,
        changeModalLoginVisibility,
      }}
    >
      {children}
    </ModalsContext.Provider>
  )
}
