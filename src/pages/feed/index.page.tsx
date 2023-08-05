import { SidebarMenu } from '../../components/sidebarMenu'
import { BookInfoModal } from '../../components/bookInfoModal'
import { useContext, useEffect, useState } from 'react'
import { ModalsContext } from '@/context/modalsContext'
import { LoginModal } from '../../components/loginModal'
import { DefaultMainContainer } from '@/components/globalContainerStyled'

import { CaretRight, ChartLineUp } from '@phosphor-icons/react'
import {
  MainContainer,
  RecentReviews,
  FeedTitleSpan,
  PopularBooksSession,
} from './styles'
import { BookCardReview } from '@/components/bookCardReview'
import { Button } from '@/components/button'
import { MiniBookCard } from '@/components/miniBookCard'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import dayjs from '@/lib/dayjs'
import {
  RecentBooksReviewsPagination,
  RecentBooksReviewsPaginationData,
} from '@/interfaces/recent-books-pagination-dto'
import { CenterItem } from '@/components/bookInfoModal/styles'
import ReactLoading from 'react-loading'
import { useInView } from 'react-intersection-observer'

interface PopularBooksRaw {
  mostReaderBooks: {
    id: string
    name: string
    coverUrl: string
    authorName: string

    rating: number
  }[]
}

export default function Feed() {
  const { isModalBookReviewsVisible, isModalLoginVisible } =
    useContext(ModalsContext)

  const [pageNumber, setPageNumber] = useState(0)
  const { ref: containerRef, inView: isElementVisible } = useInView()

  const [reviewsList, setReviewsList] = useState<
    RecentBooksReviewsPaginationData[]
  >([])

  const { data: popularBooks, isFetching: popularBookIsLoading } =
    useQuery<PopularBooksRaw>(['MostPopularBooks'], async () => {
      const response = await api.get('/books/popular-books', {
        params: {
          size: 4,
        },
      })

      return response.data
    })

  const {
    data: mostRecentReviewsPaginated,
    isFetching: mostRecentReviewsIsLoading,
  } = useQuery<RecentBooksReviewsPagination>(
    [pageNumber],
    async ({ queryKey }) => {
      const [page] = queryKey

      const { data } = await api.get('reviews/most-recent-reviews', {
        params: {
          size: 4,
          page,
        },
      })

      const { data: responseData }: RecentBooksReviewsPagination = data

      if (
        responseData.every(
          (rd) => reviewsList.findIndex((rl) => rd.id === rl.id) === -1,
        )
      ) {
        setReviewsList((review) => [...review, ...data.data])
      }

      return data
    },
  )

  useEffect(() => {
    if (
      isElementVisible &&
      !mostRecentReviewsIsLoading &&
      !mostRecentReviewsPaginated?.lastPage
    ) {
      setPageNumber((page) => page + 1)
    }
  }, [isElementVisible, mostRecentReviewsIsLoading, mostRecentReviewsPaginated])

  return (
    <>
      {isModalBookReviewsVisible && <BookInfoModal />}
      {isModalLoginVisible && <LoginModal />}

      <DefaultMainContainer>
        <SidebarMenu tabActive="Feed" />

        <MainContainer>
          <header>
            <ChartLineUp size={32} />
            <span>Início</span>
          </header>
          <main>
            <RecentReviews>
              <FeedTitleSpan>Avaliações mais recentes</FeedTitleSpan>
              {!mostRecentReviewsPaginated && mostRecentReviewsIsLoading && (
                <CenterItem>
                  <ReactLoading color="#303F73" type="bubbles" />
                </CenterItem>
              )}

              {reviewsList &&
                reviewsList.length > 0 &&
                reviewsList.map((review) => {
                  return (
                    <BookCardReview
                      key={review.id}
                      review={review.userReview}
                      reviewCreatedAt={dayjs(review.createdAt).toDate()}
                      starRating={review.rating}
                      userAvatarUrl={review.user?.avatarUrl}
                      userName={review.user?.name}
                      userEmail={review.user?.email}
                      bookAuthor={review.book?.authorName}
                      bookCoverUrl={review.book?.coverUrl}
                      bookName={review.book?.name}
                    />
                  )
                })}

              {/* Container to control pages */}
              {reviewsList.length > 0 &&
                !mostRecentReviewsPaginated?.lastPage && (
                  <CenterItem ref={containerRef}>
                    <ReactLoading color="#303F73" type="bubbles" />
                  </CenterItem>
                )}
            </RecentReviews>
            <PopularBooksSession>
              <header>
                <FeedTitleSpan>Livros populares</FeedTitleSpan>
                <Link href="/explorer" prefetch={false}>
                  <Button
                    text="Ver todos"
                    variant="purple"
                    size="sm"
                    rightIcon={<CaretRight size={16} />}
                  />
                </Link>
              </header>
              <main>
                {!popularBooks && popularBookIsLoading && (
                  <CenterItem>
                    <ReactLoading color="#303F73" type="bubbles" />
                  </CenterItem>
                )}

                {popularBooks?.mostReaderBooks.map((book) => {
                  return (
                    <MiniBookCard
                      key={book.id}
                      id={book.id}
                      authorName={book.authorName}
                      coverUrl={book.coverUrl}
                      name={book.name}
                      starsAmount={book.rating}
                      imageWidth={64}
                      imageHeight={94}
                    />
                  )
                })}
              </main>
            </PopularBooksSession>
          </main>
        </MainContainer>
      </DefaultMainContainer>
    </>
  )
}
