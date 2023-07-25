import { Layout, Row } from 'antd'
import Image from 'next/image'
import styles from '~/styles/RootLayout.module.less'

const { Header } = Layout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Row justify="center">
          <Image src="/assets/logo.svg" alt="logo" width={120} height={120} />
        </Row>
      </Header>
      {children}
    </Layout>
  )
}
