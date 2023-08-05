import { Binoculars } from '@phosphor-icons/react'
import {
  BooksGroup,
  ExplorerContainer,
  ExplorerHeaderText,
  TagsGroup,
} from './styles'
import { Input } from '@/components/inputText'
import { Tag } from '@/components/tags'
import { MiniBookCard } from '@/components/miniBookCard'
import { DefaultMainContainer } from '@/components/globalContainerStyled'
import { SidebarMenu } from '../../components/sidebarMenu'
import { ModalsContext } from '@/context/modalsContext'
import { useContext, useState } from 'react'
import { BookInfoModal } from '../../components/bookInfoModal'
import { LoginModal } from '../../components/loginModal'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { CenterItem } from '@/components/bookInfoModal/styles'
import ReactLoading from 'react-loading'
import { Genres } from '@/interfaces/genres-dto'

interface BooksInterface {
  books: {
    id: string
    name: string
    cover_url: string
    author_name: string
    starsAmount: number
    bookAlreadyRead: boolean
  }[]
}

export default function Explorer() {
  const { isModalBookReviewsVisible, isModalLoginVisible } =
    useContext(ModalsContext)

  const [searchText, setSearchText] = useState<string>('')

  const [genreState, setGenreState] = useState<Genres | null>(null)

  const { data: books, isFetching: booksIsLoading } = useQuery<BooksInterface>(
    [searchText, genreState],
    async ({ queryKey }) => {
      const [text, genre] = queryKey as [typeof searchText, typeof genreState]
      const response = await api.get('/books', {
        params: {
          bookName: text,
          genre: genre ? genre.id : null,
        },
      })

      return response.data
    },
  )

  const { data: genres } = useQuery<Genres[]>(['genres'], async () => {
    const response = await api.get('/genres')

    if (response.data?.genres) {
      return response.data.genres
    }

    return []
  })

  function onHandleClickLabel(tag: Genres) {
    if (tag.id === genreState?.id) {
      setGenreState(null)
      return
    }

    setGenreState(tag)
  }

  return (
    <>
      {isModalBookReviewsVisible && <BookInfoModal />}
      {isModalLoginVisible && <LoginModal />}

      <DefaultMainContainer>
        <SidebarMenu tabActive="Explorer" />

        <ExplorerContainer>
          <header>
            <ExplorerHeaderText>
              <Binoculars size={32} />
              <span>Explorar</span>
            </ExplorerHeaderText>

            <Input
              onSearch={setSearchText}
              enableEmitNoData
              placeholder="Digite o nome de um livro"
            />
          </header>
          <main>
            <TagsGroup>
              <Tag
                text="Tudo"
                isActive={!genreState}
                onClick={() => setGenreState(null)}
              />
              {genres?.map((genre) => {
                return (
                  <Tag
                    text={genre.name}
                    key={genre.id}
                    isActive={genre.id === genreState?.id}
                    onClick={() => onHandleClickLabel(genre)}
                  />
                )
              })}
            </TagsGroup>

            {!books && booksIsLoading && (
              <CenterItem>
                <ReactLoading color="#303F73" type="bubbles" />
              </CenterItem>
            )}

            <BooksGroup>
              {books?.books &&
                books.books.map((book) => {
                  return (
                    <MiniBookCard
                      key={book.id}
                      id={book.id}
                      authorName={book.author_name}
                      coverUrl={book.cover_url}
                      name={book.name}
                      starsAmount={book.starsAmount}
                      imageHeight={152}
                      imageWidth={108}
                      isBookAlreadyRead={book.bookAlreadyRead}
                    />
                  )
                })}
            </BooksGroup>
          </main>
        </ExplorerContainer>
      </DefaultMainContainer>
    </>
  )
}
