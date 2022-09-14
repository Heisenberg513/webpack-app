import React from 'react'
import '@/App.less'
import test from '@/assets/test.jpg'

const App = () => {
  const title = '测试数据类型'
  return (
    <>
      <div>bad webpack SHIT</div>
      <h1>{title}</h1>
      <img src={test} alt='test' />
    </>
  )
}

export default App
