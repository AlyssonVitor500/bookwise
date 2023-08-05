import {
  ArrowLeft,
  BookOpen,
  BookmarkSimple,
  Books,
  User,
  UserList,
} from '@phosphor-icons/react'
import {
  ProfileMainContainer,
  ReaderAnalytics,
  Separtor,
  UserDetails,
  UserReviewOrderByDate,
  UserReviewsContainer,
} from './styles'
import { Input } from '@/components/inputText'
import { UserReviewCard } from '@/components/userReviewCard'
import { Avatar } from '@/components/avatar'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth'
import { BookInfoModal } from '../../components/bookInfoModal'
import { LoginModal } from '../../components/loginModal'
import { useContext, useMemo, useState } from 'react'
import { ModalsContext } from '@/context/modalsContext'
import { DefaultMainContainer } from '@/components/globalContainerStyled'
import { SidebarMenu } from '../../components/sidebarMenu'
import { getUserWithServerSideProps } from '../api/users/[email].api'
import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import {
  RecentBooksReviewsPagination,
  RecentBooksReviewsPaginationData,
} from '@/interfaces/recent-books-pagination-dto'
import { api } from '@/lib/axios'
import { captalizeFirstLetter } from '@/utils/captlizeFirstLetter'
import { CenterItem } from '@/components/bookInfoModal/styles'
import ReactLoading from 'react-loading'
import { NextSeo } from 'next-seo'

interface ProfileProps {
  user: {
    id: string
    name: string
    email: string
    avatar_url: string
    created_at: Date
  }

  statics: {
    numberOfReadPages: number
    evaluatedBooksAmount: number
    numberOfAuthorsRead: number
    mostReadGenre: string
  }
}

interface UserReviews {
  time: string
  reviews: RecentBooksReviewsPaginationData[]
}

export default function Profile(props: ProfileProps) {
  const { isModalBookReviewsVisible, isModalLoginVisible } =
    useContext(ModalsContext)

  const [searchText, setSearchText] = useState<string>('')

  const session = useSession()
  const { back } = useRouter()

  const isOwnProfile =
    session.status === 'authenticated' &&
    session.data.user.email === props.user.email

  const { data: userReviewsRaw, isFetching: isLoading } =
    useQuery<RecentBooksReviewsPagination>(
      [searchText],
      async ({ queryKey }) => {
        const [bookName] = queryKey

        const response = await api.get(`reviews/most-recent-reviews`, {
          params: {
            userId: props.user.id,
            bookName,
          },
        })

        return response.data
      },
    )

  const userReviews = useMemo(() => {
    return (
      userReviewsRaw?.data.reduce((acc, value) => {
        const time = captalizeFirstLetter(dayjs(value.createdAt).fromNow())
        const indexOfTime = acc.findIndex((item) => item.time === time)

        if (indexOfTime < 0) {
          acc.push({
            time,
            reviews: [value],
          })
        } else {
          acc[indexOfTime].reviews.push(value)
        }

        return acc
      }, [] as UserReviews[]) ?? []
    )
  }, [userReviewsRaw])

  return (
    <>
      <NextSeo
        title={`Perfil de ${session?.data?.user.name} | Bookwise`}
        noindex
      />

      {isModalBookReviewsVisible && <BookInfoModal />}
      {isModalLoginVisible && <LoginModal />}

      <DefaultMainContainer>
        <SidebarMenu tabActive="Profile" />

        <ProfileMainContainer>
          {isOwnProfile && (
            <header className="own-profile">
              <User size={32} />
              <span>Perfil</span>
            </header>
          )}

          {!isOwnProfile && (
            <header>
              <Button
                text="Voltar"
                leftIcon={<ArrowLeft />}
                size="md"
                variant="white"
                onClick={() => back()}
              />
            </header>
          )}

          <main>
            <UserReviewsContainer>
              <Input
                placeholder="Buscar livro avaliado"
                inputWithoutMaxWidth
                onSearch={setSearchText}
                enableEmitNoData
              />

              {!userReviews && isLoading && (
                <CenterItem>
                  <ReactLoading color="#303F73" type="bubbles" />
                </CenterItem>
              )}

              {userReviews?.map((userReview) => {
                return (
                  <UserReviewOrderByDate key={userReview.time}>
                    <span>{userReview.time}</span>

                    {userReview.reviews.map((review) => {
                      return (
                        <UserReviewCard
                          key={review.id}
                          bookAuthorName={review.book.authorName}
                          bookCoverUrl={review.book.coverUrl}
                          bookName={review.book.name}
                          rating={review.rating}
                          review={review.userReview}
                        />
                      )
                    })}
                  </UserReviewOrderByDate>
                )
              })}
            </UserReviewsContainer>

            <UserDetails>
              <header>
                <Avatar size="lg" src={props.user.avatar_url} />

                <div>
                  <span>{props.user.name}</span>
                  <span>
                    ingressou {dayjs(props.user.created_at).fromNow()}
                  </span>
                </div>
              </header>

              <Separtor />

              <main>
                <ReaderAnalytics>
                  <BookOpen width={32} height={32} />

                  <div>
                    <span>{props.statics.numberOfReadPages}</span>
                    <span>Páginas lidas</span>
                  </div>
                </ReaderAnalytics>

                <ReaderAnalytics>
                  <Books width={32} height={32} />

                  <div>
                    <span>{props.statics.evaluatedBooksAmount}</span>
                    <span>Livros avaliados</span>
                  </div>
                </ReaderAnalytics>

                <ReaderAnalytics>
                  <UserList width={32} height={32} />

                  <div>
                    <span>{props.statics.numberOfAuthorsRead}</span>
                    <span>Autores lidos</span>
                  </div>
                </ReaderAnalytics>

                <ReaderAnalytics>
                  <BookmarkSimple width={32} height={32} />

                  <div>
                    <span>{props.statics.mostReadGenre}</span>
                    <span>Categoria mais lida</span>
                  </div>
                </ReaderAnalytics>
              </main>
            </UserDetails>
          </main>
        </ProfileMainContainer>
      </DefaultMainContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  const { email } = query
  try {
    const { body: userDetails } = await getUserWithServerSideProps(
      String(email),
    )

    if (!userDetails) {
      throw new Error()
    }

    return {
      props: {
        session,
        ...userDetails,
      },
    }
  } catch (e) {
    return {
      redirect: { permanent: false, destination: '/feed' },
      props: {},
    }
  }
}
