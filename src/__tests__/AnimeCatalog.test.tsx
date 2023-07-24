import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { fetchAnimes } from '../services/animeService'
import { Anime } from '~/types/AnimeTypes'

import { act } from 'react-dom/test-utils'
import AnimeCatalog from '~/pages'

const mockedAnimeData: Anime[] = [
  {
    id: '1',
    type: 'anime',
    attributes: {
      canonicalTitle: 'Test Anime 1',
      synopsis: 'Test Synopsis 1',
      posterImage: {
        small: 'https://test-url.com/test1.jpg',
      },
      ratingFrequencies: {
        '2': '10',
        '3': '15',
      },
      averageRating: '2.5',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  } as Anime,
  {
    id: '2',
    type: 'anime',
    attributes: {
      canonicalTitle: 'Test Anime 2',
      synopsis: 'Test Synopsis 2',
      posterImage: {
        small: 'https://test-url.com/test2.jpg',
      },
      ratingFrequencies: {
        '2': '20',
        '3': '30',
      },
      averageRating: '2.75',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  } as Anime,
]

jest.mock('../services/animeService')

describe('AnimeCatalog', () => {
  test('renders AnimeCatalog component', () => {
    render(<AnimeCatalog />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  test('fetches animes from the service and displays them', async () => {
    ;(fetchAnimes as jest.Mock).mockResolvedValueOnce({ data: { data: mockedAnimeData } })

    await act(async () => {
      render(<AnimeCatalog />)
      await waitFor(() => expect(fetchAnimes).toHaveBeenCalled())
    })

    const animeCards = await screen.findAllByAltText(/Test Anime/i)
    expect(animeCards).toHaveLength(mockedAnimeData.length)
  })

  test('open modal on card click', async () => {
    ;(fetchAnimes as jest.Mock).mockResolvedValueOnce({ data: { data: mockedAnimeData } })

    await act(async () => {
      render(<AnimeCatalog />)
      await waitFor(() => expect(fetchAnimes).toHaveBeenCalled())
    })

    const animeCards = await screen.findAllByTestId('anime-card')
    fireEvent.click(animeCards[0])

    await screen.findByTestId('anime-details-modal')
  })
})
