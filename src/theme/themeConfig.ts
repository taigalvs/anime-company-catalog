import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: 'Righteous, sans-serif',
    colorPrimary: '#F4893B',
    colorPrimaryHover: '#FFD585',
    colorText: '#fff',
    colorBorder: 'rgba(255, 255, 255, 0.20)',
    colorPrimaryBorder: 'rgba(255, 255, 255, 0.20)',
    borderRadius: 19,
    colorIcon: '#fff',
  },
  components: {
    Button: {
      colorPrimary: '#F4893B',
    },
    Layout: {
      colorBgHeader: '#11052C',
      colorBgBody:
        'radial-gradient(99.26% 58.11% at 50.03% -31.11%, #11052C 0%, #11052C 2.08%, #11052C 84.38%)',
    },
    Card: {
      margin: 0,
      padding: 0,
      colorBgContainer: 'rgba(38, 27, 62, 0.80)',
      colorTextDescription: 'rgba(255, 255, 255, 0.60)',
    },
    Input: {
      controlHeight: 56,
      colorBorder: 'transparent',
      colorText: '#fff',
      colorBgContainer: 'rgba(38, 27, 62, 0.80)',
      colorTextPlaceholder: '#fff',
      colorPrimaryHover: 'rgba(255, 255, 255, 0.20)',
    },
    Pagination: {
      itemActiveBg: 'rgba(38, 27, 62, 0.80)',
      itemSize: 40,
      colorPrimary: '#fff',
      colorPrimaryHover: 'rgba(255, 255, 255, 0.20)',
    },
    Select: {
      controlHeight: 60,
      colorBorder: 'transparent',
      colorText: '#F4893B',
      fontSizeIcon: 24,
      colorBgContainer: 'rgba(38, 27, 62, 0.80)',
      colorTextPlaceholder: '#fff',
      colorPrimaryHover: 'rgba(255, 255, 255, 0.20)',
    },

    Modal: {
      contentBg: 'transparent',
      colorBgContainer: 'red',
      colorBgBase: 'red',
    },
    Rate: {
      colorPrimary: '#F4893B',
      colorPrimaryHover: '#FFD585',
      colorBgContainerDisabled: 'rgba(255, 255, 255, 0.20)',
      colorTextDisabled: 'red',
    },
  },
}

export default theme
