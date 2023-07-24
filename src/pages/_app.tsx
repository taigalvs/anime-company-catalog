import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import theme from '../theme/themeConfig'
import RootLayout from '~/layout'
import '~/styles/global.css'

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </ConfigProvider>
)

export default App
