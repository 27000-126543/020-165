export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/packages/index',
    'pages/price-guide/index',
    'pages/mine/index',
    'pages/package-detail/index',
    'pages/questionnaire/index',
    'pages/reservation/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#36BFFA',
    navigationBarTitleText: '口腔诊疗比价',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F5F9FF'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#36BFFA',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/packages/index',
        text: '套餐'
      },
      {
        pagePath: 'pages/price-guide/index',
        text: '价格说明'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
