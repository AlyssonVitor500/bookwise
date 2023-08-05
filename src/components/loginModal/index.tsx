import { createPortal } from 'react-dom'
import { LoginPortal, LoginOverlay, LoginContent, LoginButton } from './styles'
import { X } from '@phosphor-icons/react'

import googleIcon from '@/../public/login/google.svg'
import gitIcon from '@/../public/login/github.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { ModalsContext } from '@/context/modalsContext'
import { signIn } from 'next-auth/react'

function LoginModalPortal() {
  const { changeModalLoginVisibility } = useContext(ModalsContext)

  async function handleUserSignIn(provider: 'google' | 'github') {
    await signIn(provider)
  }

  return (
    <LoginPortal>
      <LoginOverlay onClick={() => changeModalLoginVisibility()} />
      <LoginContent>
        <header>
          <button onClick={() => changeModalLoginVisibility()}>
            <X size={24} />
          </button>
        </header>

        <main>
          <span>Faça login para deixar sua avaliação</span>

          <div>
            <LoginButton onClick={() => handleUserSignIn('google')}>
              <Image
                src={googleIcon}
                alt="Google icon"
                width={32}
                height={32}
              />
              Entrar com Google
            </LoginButton>
            <LoginButton onClick={() => handleUserSignIn('github')}>
              <Image src={gitIcon} alt="GitHub icon" width={32} height={32} />
              Entrar com GitHub
            </LoginButton>
          </div>
        </main>
      </LoginContent>
    </LoginPortal>
  )
}

export function LoginModal() {
  return <>{createPortal(<LoginModalPortal />, document.body)}</>
}
