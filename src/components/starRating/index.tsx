import { useMemo, useState } from 'react'
import { Star } from './styles'

interface StarRatingProps {
  starsNumber?: number
  disableStarSelect?: boolean
  onHandleSelectStar?: (starNumber: number) => void
}

export function StarRating({
  onHandleSelectStar,
  starsNumber = 0,
  disableStarSelect = false,
}: StarRatingProps) {
  const [starHoverEffect, setStarHoverEffect] = useState(0)

  const starArray = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const newStarNumber = ++i
      return {
        starNumber: newStarNumber,
        isStarFilled:
          newStarNumber <= starsNumber || newStarNumber <= starHoverEffect,
      }
    })
  }, [starsNumber, starHoverEffect])

  function onSelectStar(starNumber: number) {
    if (!disableStarSelect && !!onHandleSelectStar)
      onHandleSelectStar(starNumber)
  }

  function onMouseOverStar(starNumber: number) {
    if (!disableStarSelect) setStarHoverEffect(starNumber)
  }

  return (
    <>
      {starArray.map(({ starNumber, isStarFilled }) => {
        if (isStarFilled) {
          return (
            <Star
              key={starNumber}
              onClick={() => onSelectStar(starNumber)}
              onMouseEnter={() => onMouseOverStar(starNumber)}
              onMouseLeave={() => onMouseOverStar(0)}
              weight="fill"
              canPress={!disableStarSelect}
            />
          )
        }

        return (
          <Star
            key={starNumber}
            onClick={() => onSelectStar(starNumber)}
            onMouseEnter={() => onMouseOverStar(starNumber)}
            onMouseLeave={() => onMouseOverStar(0)}
            canPress={!disableStarSelect}
          />
        )
      })}
    </>
  )
}
