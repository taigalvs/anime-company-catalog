import React, { useEffect, useState } from 'react'
import { Card, Input, Pagination, Modal, Skeleton, Row, Col, Select, Empty } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import styles from '~/styles/AnimeCatalog.module.less'
import { CloseCircleFilled } from '@ant-design/icons'

import { Anime } from '../types/AnimeTypes'
import { fetchAnimes } from '~/services/animeService'
import Image from 'next/image'
import AnimeDetail from '~/components/AnimeDetail'

const { Meta } = Card
const { Search } = Input
const { Option } = Select

const AnimeCatalog = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [animes, setAnimes] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Romance',
    'Sci-Fi',
  ]
  const statuses = ['current', 'finished', 'tba', 'unreleased', 'upcoming']

  const currentYear = new Date().getFullYear()
  const startYear = 1980
  const numberOfYears = currentYear - startYear + 1

  const years = Array.from({ length: numberOfYears }, (_, index) => String(currentYear - index))

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
      const response = await fetchAnimes(
        currentPage,
        search,
        selectedGenre,
        selectedStatus,
        selectedYear,
      )
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
  }, [currentPage, search, selectedGenre, selectedStatus, selectedYear])

  return (
    <main className={styles.main}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Search placeholder="Search..." onSearch={onSearch} enterButton />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Select
            allowClear={true}
            showSearch={true}
            clearIcon={<CloseCircleFilled color="#F4893B" />}
            placeholder="Select Genre"
            style={{ width: '100%' }}
            onChange={setSelectedGenre}
          >
            {genres.map((genre) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Select
            allowClear={true}
            showSearch={true}
            clearIcon={<CloseCircleFilled color="#F4893B" />}
            placeholder="Select Status"
            style={{ width: '100%' }}
            onChange={setSelectedStatus}
          >
            {statuses.map((status) => (
              <Option className={styles.option} key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Select
            className={styles.select}
            allowClear={true}
            showSearch={true}
            clearIcon={<CloseCircleFilled color="#F4893B" />}
            placeholder="Select Year"
            style={{ width: '100%' }}
            onChange={setSelectedYear}
          >
            {years.map((year) => (
              <Option className={styles.option} key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
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
        ) : animes.length > 0 ? (
          animes.map((anime) => (
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
                    objectFit="cover"
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
          ))
        ) : (
          <Row className={styles.emptyContent}>
            <Empty description="No animes found" />
          </Row>
        )}
      </Row>
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        defaultPageSize={12}
        showSizeChanger={false}
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
