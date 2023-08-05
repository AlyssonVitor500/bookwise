import Image from 'next/image'
import {
  Container,
  WelcomeContainer,
  WelcomeContainerButton,
  WelcomeContainerButtonGroup,
  WelcomeContainerHeader,
} from './styles'
import homeImage from '@/../public/homeImage.svg'
import gitIcon from '@/../public/login/github.svg'
import googleIcon from '@/../public/login/google.svg'
import rocketIcon from '@/../public/login/guest-rocket.svg'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { NextSeo } from 'next-seo'

export default function Home() {
  const router = useRouter()

  async function handleUserSignIn(provider?: 'google' | 'github') {
    if (provider) {
      await signIn(provider)
      return
    }

    router.push('/feed')
  }

  return (
    <Container>
      <NextSeo title="Bookwise" />

      <Image src={homeImage} alt="Home image" />

      <WelcomeContainer>
        <WelcomeContainerHeader>
          <h2>Boas vindas!</h2>
          <span>Faça seu login ou acesse como visitante.</span>
        </WelcomeContainerHeader>
        <WelcomeContainerButtonGroup>
          <WelcomeContainerButton onClick={() => handleUserSignIn('google')}>
            <Image src={googleIcon} alt="Google icon" />
            Entrar com Google
          </WelcomeContainerButton>
          <WelcomeContainerButton onClick={() => handleUserSignIn('github')}>
            <Image src={gitIcon} alt="GitHub icon" />
            Entrar com GitHub
          </WelcomeContainerButton>
          <WelcomeContainerButton onClick={() => handleUserSignIn()}>
            <Image src={rocketIcon} alt="Rocket icon" />
            Acessar como visitante
          </WelcomeContainerButton>
        </WelcomeContainerButtonGroup>
      </WelcomeContainer>
    </Container>
  )
}
