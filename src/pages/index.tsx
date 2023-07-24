import React, { useEffect, useState } from 'react'
import { Card, Input, Pagination, Modal, Skeleton, Row, Col } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '~/styles/AnimeCatalog.module.less'

import { Anime } from '../types/AnimeTypes'
import { fetchAnimes } from '~/services/animeService'
import Image from 'next/image'
import AnimeDetail from '~/components/AnimeDetail'

const { Meta } = Card
const { Search } = Input

const AnimeCatalog = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [animes, setAnimes] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const showModal = (anime: Anime) => {
    setSelectedAnime(anime)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setSelectedAnime(null)
    setIsModalVisible(false)
  }

  const onSearch = (value: string) => setSearch(value)
  const onPageChange = (page: number) => setCurrentPage(page)

  const getAllAnimes = async () => {
    try {
      setIsLoading(true)
      const response = await fetchAnimes(currentPage, search, selectedGenre)
      const data = response.data

      if (!data || !Array.isArray(data.data)) {
        console.error('Error fetching data: unexpected response format', data)
        setAnimes([])
        return
      }

      setAnimes(data.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
      setAnimes([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllAnimes()
  }, [currentPage, search, selectedGenre])

  return (
    <main className={styles.main}>
      <Search placeholder="Search..." onSearch={onSearch} enterButton />
      <Row gutter={[22, 22]}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  data-testid={`anime-card-loading-${index}`}
                  className={styles.card}
                  key={index}
                  hoverable
                  bordered={false}
                >
                  <Skeleton.Image style={{ width: 200, height: 300 }} />
                </Card>
              </Col>
            ))
          : animes.map((anime) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  data-testid="anime-card"
                  className={styles.card}
                  key={anime.id}
                  hoverable
                  bordered={false}
                  cover={
                    <Image
                      src={anime.attributes.posterImage.original || ''}
                      alt={anime.attributes.canonicalTitle || ''}
                      width={200}
                      height={365}
                    />
                  }
                  onClick={() => showModal(anime)}
                >
                  <Meta
                    title={anime.attributes.canonicalTitle}
                    description={`Episodes: ${anime.attributes.episodeCount || 'N/A'}`}
                  />
                </Card>
              </Col>
            ))}
      </Row>
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        defaultPageSize={12}
        pageSizeOptions={['12', '24', '36', '48']}
        total={500}
        onChange={onPageChange}
      />
      <Modal
        footer={<div />}
        className={styles.modal}
        title={null}
        data-testid="anime-details-modal"
        open={isModalVisible}
        onCancel={closeModal}
        width={800}
      >
        <AnimatePresence mode="wait">
          {selectedAnime && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnimeDetail anime={selectedAnime} />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </main>
  )
}

export default AnimeCatalog
