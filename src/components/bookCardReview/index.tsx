import { Avatar } from '../avatar'
import { StarRating } from '../starRating'
import {
  BookCardContainer,
  BookReviewDescriber,
  ReviewerDetails,
  ReviewRating,
  ReviewText,
} from './styles'
import Image from 'next/image'

import { useReduceString } from '@/hooks/useReduceString'
import dayjs from '@/lib/dayjs'
import { captalizeFirstLetter } from '@/utils/captlizeFirstLetter'
import { useContext } from 'react'
import { ModalsContext } from '@/context/modalsContext'
import { useRouter } from 'next/router'

interface BookCardReviewProps {
  onlyShowReview?: boolean

  review: string
  reviewCreatedAt: Date
  userName: string
  userEmail: string
  userAvatarUrl: string | null
  starRating: number
  isOwnReview?: boolean

  bookName?: string
  bookCoverUrl?: string
  bookAuthor?: string
}

export function BookCardReview({
  onlyShowReview = false,
  bookAuthor,
  bookCoverUrl,
  bookName,
  isOwnReview = false,

  reviewCreatedAt,
  review,
  starRating,

  userAvatarUrl,
  userEmail,
  userName,
}: BookCardReviewProps) {
  const { value: bookReview, isTextModifield } = useReduceString(review, 229)
  const { changeModalBookReviewsVisibility, isModalBookReviewsVisible } =
    useContext(ModalsContext)

  const { push: redirect } = useRouter()

  async function handleClickInAvatar() {
    if (isModalBookReviewsVisible) {
      changeModalBookReviewsVisibility('')
    }

    redirect(`/profile/${userEmail}`)
  }

  return (
    <BookCardContainer isOwnReview={isOwnReview}>
      <header>
        <ReviewerDetails>
          <Avatar
            src={userAvatarUrl ?? undefined}
            alt={`${userName}'s avatar`}
            onUserClickInAvatar={handleClickInAvatar}
          />
          <div>
            <span>{userName}</span>
            <span>
              {captalizeFirstLetter(dayjs(reviewCreatedAt).fromNow())}
            </span>
          </div>
        </ReviewerDetails>

        <ReviewRating>
          <StarRating starsNumber={starRating} disableStarSelect />
        </ReviewRating>
      </header>

      <main>
        {!onlyShowReview && bookName && bookCoverUrl && bookAuthor && (
          <>
            <Image
              src={bookCoverUrl}
              alt="O Hobbit cover"
              width={108}
              height={152}
            />
            <BookReviewDescriber>
              <div>
                <span>{bookName}</span>
                <span>{bookAuthor}</span>
              </div>
              <ReviewText>
                {bookReview} {isTextModifield && <span>ver mais</span>}
              </ReviewText>
            </BookReviewDescriber>
          </>
        )}

        {(onlyShowReview || (!bookName && !bookCoverUrl && !bookAuthor)) && (
          <>
            <ReviewText>
              {bookReview} {isTextModifield && <span>ver mais</span>}
            </ReviewText>
          </>
        )}
      </main>
    </BookCardContainer>
  )
}
