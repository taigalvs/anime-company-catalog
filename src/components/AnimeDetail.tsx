import React, { useEffect, useState } from 'react'
import { Tag, Rate, Skeleton, Typography, Space, Row, Col } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
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

  const getAnimeGenres = async () => {
    try {
      const genres = await fetchGenre(anime.id)
      setAnimeGenres(genres)
    } catch (error) {
      console.error('Error fetching details: ', error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  useEffect(() => {
    setIsLoadingDetails(true)
    setTimeout(async () => {
      getAnimeGenres()
    }, 1000)
  }, [anime])

  const { canonicalTitle, synopsis, youtubeVideoId, averageRating, startDate, status } =
    anime.attributes

  const year = startDate ? new Date(startDate).getFullYear() : 'N/A'
  const starRating = averageRating ? (parseFloat(averageRating) / 100) * 5 : 0

  if (isLoadingDetails) {
    return (
      <Row>
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </Row>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Row>
          <Col xs={24}>
            <Title level={3}>{canonicalTitle}</Title>
            <Paragraph className={styles.stats}>
              Year: {year} | Status: {status || 'N/A'}
            </Paragraph>

            <Space direction="vertical">
              <Rate className={styles.rate} disabled value={starRating} />

              <Paragraph style={{ letterSpacing: '0px' }}>{synopsis}</Paragraph>
            </Space>
            {youtubeVideoId && (
              <>
                <Title level={4}>Trailer:</Title>
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="Anime Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </>
            )}

            <Title level={4}>Genres:</Title>
            <Row gutter={[12, 12]}>
              {animeGenres?.map((genre: Genre, index: number) => (
                <Tag className={styles.tag} key={index} color="blue">
                  {genre.attributes.name}
                </Tag>
              ))}
            </Row>
          </Col>
        </Row>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimeDetail
