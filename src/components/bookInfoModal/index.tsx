import { createPortal } from 'react-dom'
import {
  BookInfoContent,
  BookInfoOverlay,
  BookInfoPortal,
  BookInfoMainContainer,
  BookInfoSession,
  BookInfoHeader,
  BookInfoDetails,
  BookReviews,
  CenterItem,
  UserReviewForm,
  UserReviewTextArea,
  UserReviewTextAreaError,
  UserReviewButtonActionGroup,
  UserActionButton,
} from './styles'
import { BookOpen, BookmarkSimple, Check, X } from '@phosphor-icons/react'
import { StarRating } from '@/components/starRating'
import Image from 'next/image'
import { Button } from '@/components/button'
import { BookCardReview } from '@/components/bookCardReview'
import { ModalsContext } from '@/context/modalsContext'
import { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import ReactLoading from 'react-loading'
import { RecentBooksReviewsPagination } from '@/interfaces/recent-books-pagination-dto'
import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '../avatar'

const UserReviewSchema = z.object({
  review: z
    .string()
    .min(5, { message: 'A análise deve conter pelo menos 5 caracteres.' })
    .max(450, { message: 'A análise só pode ter até 450 caracteres.' }),
  rating: z.number().min(1).max(5),
})

interface BookQuery {
  id: string
  authorName: string
  coverUrl: string
  genres: string[]
  name: string
  starsAmount: number
  totalOfReviews: number
  totalOfPages: number
  bookAlreadyRead: boolean
}

function BookInfoModalPortal() {
  const {
    changeModalBookReviewsVisibility,
    changeModalLoginVisibility,
    modalBookId,
  } = useContext(ModalsContext)

  const session = useSession()

  const [showUserReviewForm, setShowUserReviewForm] = useState(false)

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.output<typeof UserReviewSchema>>({
    resolver: zodResolver(UserReviewSchema),
    defaultValues: {
      rating: 1,
      review: '',
    },
  })

  const { data: book, refetch: refetchBookData } = useQuery<BookQuery>(
    ['book', modalBookId],
    async () => {
      const response = await api.get(`/books/${modalBookId}`)

      return response.data
    },
    {
      enabled: !!modalBookId,
    },
  )

  const {
    data: bookReviews,
    isFetching: loadingReviews,
    refetch: refetchReviews,
  } = useQuery<RecentBooksReviewsPagination>(
    ['recentBooksPagination'],
    async () => {
      const response = await api.get(`reviews/most-recent-reviews`, {
        params: {
          bookId: modalBookId,
        },
      })

      return response.data
    },
    {
      enabled: !!modalBookId,
    },
  )

  async function handleReviewFormSubmit(
    data: z.output<typeof UserReviewSchema>,
  ) {
    await api.post('/reviews', {
      review: data.review,
      rating: data.rating,
      bookId: book?.id,
    })

    setShowUserReviewForm(false)
    refetchBookData()
    refetchReviews()
  }

  function onHandleDoReview() {
    if (session.status === 'authenticated') setShowUserReviewForm(true)
    else changeModalLoginVisibility()
  }

  function handleOnClearForm() {
    reset()
  }

  const showDoReviewButton = !(
    showUserReviewForm ||
    (session.status === 'authenticated' && book != null && book.bookAlreadyRead)
  )

  return (
    <BookInfoPortal>
      <BookInfoOverlay onClick={() => changeModalBookReviewsVisibility('')} />
      <BookInfoContent>
        <header>
          <button onClick={() => changeModalBookReviewsVisibility('')}>
            <X size={24} />
          </button>
        </header>

        {!book && (
          <CenterItem>
            <ReactLoading color="#303F73" type="bubbles" />
          </CenterItem>
        )}

        {book && (
          <BookInfoMainContainer>
            <BookInfoSession>
              <BookInfoHeader>
                <Image
                  src={book.coverUrl}
                  alt="O Hobbit cover"
                  width={171}
                  height={242}
                />

                <div>
                  <div>
                    <span>{book.name}</span>
                    <span>{book.authorName}</span>
                  </div>

                  <div>
                    <div>
                      <StarRating
                        disableStarSelect
                        starsNumber={book?.starsAmount}
                      />
                    </div>
                    <span>
                      {book?.totalOfReviews}
                      {book.totalOfReviews === 1 && <> avaliação</>}
                      {book.totalOfReviews !== 1 && <> avaliações</>}
                    </span>
                  </div>
                </div>
              </BookInfoHeader>
              <BookInfoDetails>
                <div>
                  <BookmarkSimple size={24} />
                  <div>
                    <span>Categoria</span>
                    <span>{book.genres.join(', ')}</span>
                  </div>
                </div>

                <div>
                  <BookOpen size={24} />
                  <div>
                    <span>Páginas</span>
                    <span>{book.totalOfPages}</span>
                  </div>
                </div>
              </BookInfoDetails>
            </BookInfoSession>

            <BookReviews>
              <header>
                Avaliações
                {showDoReviewButton && (
                  <Button
                    text="Avaliar"
                    size="sm"
                    onClick={() => onHandleDoReview()}
                  />
                )}
              </header>
              <main>
                {showUserReviewForm && (
                  <UserReviewForm
                    onSubmit={handleSubmit(handleReviewFormSubmit)}
                  >
                    <header>
                      <div>
                        <Avatar size="md" src={session.data?.user.avatar_url} />
                        <span>{session.data?.user.name}</span>
                      </div>

                      <div>
                        <Controller
                          control={control}
                          name="rating"
                          render={({ field }) => {
                            return (
                              <StarRating
                                starsNumber={field.value}
                                onHandleSelectStar={field.onChange}
                              />
                            )
                          }}
                        />
                      </div>
                    </header>

                    <main>
                      <UserReviewTextArea {...register('review')} />

                      {errors.review?.message && (
                        <UserReviewTextAreaError>
                          {errors.review.message}
                        </UserReviewTextAreaError>
                      )}

                      <UserReviewButtonActionGroup>
                        <UserActionButton
                          iconColor="purple"
                          disabled={isSubmitting}
                          onClick={() => handleOnClearForm()}
                        >
                          <X size={24} />
                        </UserActionButton>
                        <UserActionButton
                          iconColor="green"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          <Check size={24} />
                        </UserActionButton>
                      </UserReviewButtonActionGroup>
                    </main>
                  </UserReviewForm>
                )}

                {bookReviews &&
                  bookReviews.data.map((review) => {
                    return (
                      <BookCardReview
                        key={review.id}
                        review={review.userReview}
                        reviewCreatedAt={dayjs(review.createdAt).toDate()}
                        starRating={review.rating}
                        userAvatarUrl={review.user.avatarUrl}
                        userName={review.user.name}
                        userEmail={review.user.email}
                        isOwnReview={
                          session?.data?.user.email === review.user.email
                        }
                        onlyShowReview
                      />
                    )
                  })}

                {!bookReviews && loadingReviews && (
                  <CenterItem>
                    <ReactLoading color="#303F73" type="bubbles" />
                  </CenterItem>
                )}
              </main>
            </BookReviews>
          </BookInfoMainContainer>
        )}
      </BookInfoContent>
    </BookInfoPortal>
  )
}

export function BookInfoModal() {
  return <>{createPortal(<BookInfoModalPortal />, document.body)}</>
}
