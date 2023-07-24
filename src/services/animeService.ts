import axios, { AxiosResponse } from 'axios'

interface QueryParams {
  'page[limit]': number
  'page[offset]': number
  'filter[text]'?: string
  'filter[genres]'?: string
}

export interface Genre {
  id: string
  type: string
  links: {
    self: string
  }
  attributes: {
    createdAt: string
    updatedAt: string
    name: string
    slug: string
    description: string | null
  }
}

interface GenresResponse {
  data: Genre[]
}

export const fetchAnimes = async (
  page: number,
  title: string,
  genre: string,
): Promise<AxiosResponse> => {
  const params: QueryParams = {
    'page[limit]': 12,
    'page[offset]': page * 12,
  }

  if (title) params['filter[text]'] = title
  if (genre) params['filter[genres]'] = genre

  return await axios.get('https://kitsu.io/api/edge/anime', { params })
}
export const fetchGenre = async (id: string): Promise<Genre[]> => {
  const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}/genres`)
  return response.data.data
}
