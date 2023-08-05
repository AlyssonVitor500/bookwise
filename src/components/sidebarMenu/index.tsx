import Image from 'next/image'
import {
  Container,
  MenuButton,
  MenuButtonGroup,
  UserSessionButton,
} from './styles'
import bookwiseLogo from '@/../public/bookwiseLogosvg.svg'
import { Binoculars, ChartLineUp, SignIn, User } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ModalsContext } from '@/context/modalsContext'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/avatar'

interface SidebarMenuProps {
  tabActive: 'Feed' | 'Explorer' | 'Profile'
}

export function SidebarMenu({ tabActive }: SidebarMenuProps) {
  const router = useRouter()

  const session = useSession()
  const isSessionActive = session.status === 'authenticated'

  const { changeModalLoginVisibility } = useContext(ModalsContext)

  function handleChangeTab(path: string) {
    router.push(`/${path}`)
  }

  async function handleLoginOrLogout() {
    if (!isSessionActive) {
      changeModalLoginVisibility()
      return
    }

    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <Container>
      <Image src={bookwiseLogo} alt="Logo bookwise" />
      <MenuButtonGroup>
        <MenuButton
          active={tabActive === 'Feed'}
          onClick={() => handleChangeTab('feed')}
        >
          <ChartLineUp size={24} />
          Início
        </MenuButton>
        <MenuButton
          active={tabActive === 'Explorer'}
          onClick={() => handleChangeTab('explorer')}
        >
          <Binoculars size={24} />
          Explorar
        </MenuButton>
        {isSessionActive && (
          <MenuButton
            active={tabActive === 'Profile'}
            onClick={() =>
              handleChangeTab(`profile/${session.data.user.email}`)
            }
          >
            <User size={24} />
            Perfil
          </MenuButton>
        )}
      </MenuButtonGroup>
      <UserSessionButton
        onClick={() => handleLoginOrLogout()}
        isSessionActive={isSessionActive}
      >
        {isSessionActive && (
          <>
            <Avatar size="sm" src={session.data.user.avatar_url} />
            <span>{session.data.user.name}</span> <SignIn size={20} />
          </>
        )}
        {!isSessionActive && (
          <>
            <span>Fazer Login</span> <SignIn size={20} />
          </>
        )}
      </UserSessionButton>
    </Container>
  )
}
