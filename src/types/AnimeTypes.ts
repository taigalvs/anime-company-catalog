export interface Titles {
  en?: string
  en_jp?: string
  ja_jp?: string
}

export interface PosterImage {
  tiny?: string
  small: string
  medium?: string
  large?: string
  original?: string
}

export interface CoverImage {
  tiny?: string
  small?: string
  large?: string
  original?: string
}

export interface AnimeAttributes {
  slug?: string
  synopsis?: string
  description?: string
  coverImageTopOffset?: number
  titles?: Titles
  canonicalTitle?: string
  abbreviatedTitles?: string[]
  averageRating?: string
  ratingFrequencies?: Record<string, string>
  userCount?: number
  favoritesCount?: number
  startDate?: string
  endDate?: string
  nextRelease?: string
  popularityRank?: number
  ratingRank?: number
  ageRating?: string
  ageRatingGuide?: string
  subtype?: string
  status?: string
  tba?: string
  posterImage: PosterImage
  coverImage?: CoverImage
}

export interface Anime {
  id: string
  type: string
  links?: Record<string, string>
  attributes: AnimeAttributes
  relationships?: Record<string, unknown>
}

export interface AnimeData {
  data: Anime[]
  meta?: Record<string, unknown>
  links?: Record<string, string>
}
