import React, { useEffect, useState } from 'react'
import { Tag, Rate, Skeleton, Typography, Space } from 'antd'
import { Anime } from '~/types/AnimeTypes'
import { Genre, fetchGenre } from '~/services/animeService'
import styles from '~/styles/AnimeDetail.module.less'

const { Title, Paragraph } = Typography

interface AnimeDetailProps {
  anime: Anime
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime }) => {
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [animeGenres, setAnimeGenres] = useState<Genre[] | null>(null)

  useEffect(() => {
    setIsLoadingDetails(true)
    setTimeout(async () => {
      try {
        const genres = await fetchGenre(anime.id)
        setAnimeGenres(genres)
      } catch (error) {
        console.error('Error fetching details: ', error)
      } finally {
        setIsLoadingDetails(false)
      }
    }, 1000)
  }, [anime])

  const { canonicalTitle, synopsis, youtubeVideoId, averageRating } = anime.attributes

  const starRating = averageRating ? (parseFloat(averageRating) / 100) * 5 : 0

  if (isLoadingDetails) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical">
      <Title level={3}>{canonicalTitle}</Title>
      <Rate className={styles.rate} disabled value={starRating} />
      <Paragraph style={{ letterSpacing: '0px' }}>{synopsis}</Paragraph>
      {youtubeVideoId && (
        <>
          <Title level={4}>Trailer:</Title>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="Anime Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      )}
      <Space direction="vertical">
        <Title level={4}>Genres:</Title>
        <Space direction="horizontal">
          {animeGenres?.map((genre: Genre, index: number) => (
            <Tag className={styles.tag} key={index} color="blue">
              {genre.attributes.name}
            </Tag>
          ))}
        </Space>
      </Space>
    </Space>
  )
}

export default AnimeDetail
