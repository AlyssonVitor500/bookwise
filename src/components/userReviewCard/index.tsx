import { BookInfoAside, UserReviewCardContainer } from './styles'
import Image from 'next/image'
import { StarRating } from '../starRating'

interface UserReviewCardProps {
  review: string
  bookCoverUrl: string
  bookName: string
  bookAuthorName: string

  rating: number
}

export function UserReviewCard({
  bookAuthorName,
  bookCoverUrl,
  bookName,
  rating,
  review,
}: UserReviewCardProps) {
  return (
    <UserReviewCardContainer>
      <header>
        <Image src={bookCoverUrl} alt="Book cover" width={98} height={134} />

        <BookInfoAside>
          <div>
            <span>{bookName}</span>
            <span>{bookAuthorName}</span>
          </div>

          <div>
            <StarRating starsNumber={rating} disableStarSelect />
          </div>
        </BookInfoAside>
      </header>

      <main>{review}</main>
    </UserReviewCardContainer>
  )
}
