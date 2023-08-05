export interface RecentBooksReviewsPaginationData {
  id: string
  createdAt: Date
  rating: number
  userReview: string
  user: {
    name: string
    avatarUrl: string | null
    email: string
  }
  book: {
    coverUrl: string
    name: string
    authorName: string
  }
}

export interface RecentBooksReviewsPagination {
  size: number
  page: number
  lastPage: boolean

  data: RecentBooksReviewsPaginationData[]
}
