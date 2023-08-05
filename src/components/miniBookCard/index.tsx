import Image from 'next/image'
import {
  AlreadyReadLabel,
  MiniBookCardContainer,
  StarRatingGroup,
} from './styles'
import { StarRating } from '../starRating'
import { useReduceString } from '@/hooks/useReduceString'
import { useContext } from 'react'
import { ModalsContext } from '@/context/modalsContext'

interface MiniBookCardProps {
  name: string
  coverUrl: string
  authorName: string
  starsAmount: number
  isBookAlreadyRead?: boolean
  id: string

  imageWidth: number
  imageHeight: number
}

export function MiniBookCard({
  id,
  authorName,
  name,
  coverUrl,
  starsAmount,
  imageWidth,
  imageHeight,
  isBookAlreadyRead,
}: MiniBookCardProps) {
  const { value: titleFormatted } = useReduceString(name, 34)

  const { changeModalBookReviewsVisibility } = useContext(ModalsContext)

  return (
    <MiniBookCardContainer onClick={() => changeModalBookReviewsVisibility(id)}>
      <Image
        src={coverUrl}
        alt={`${name} cover`}
        width={imageWidth}
        height={imageHeight}
      />
      <main>
        <header>
          <span>{titleFormatted}</span>
          <span>{authorName}</span>
        </header>

        <StarRatingGroup>
          <StarRating starsNumber={starsAmount} disableStarSelect />
        </StarRatingGroup>
      </main>

      {isBookAlreadyRead && <AlreadyReadLabel>LIDO</AlreadyReadLabel>}
    </MiniBookCardContainer>
  )
}
