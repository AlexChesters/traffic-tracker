import React, { useState, useEffect } from 'react'

import Example from './components/Example'

const Home = () => {
  const [data, setData] = useState({})

  async function fetchData () {
    if (process.env.NODE_ENV !== 'production') {
      const response = await import('../../stub-data.json')
      setData(JSON.parse(JSON.stringify(response)))
    } else {
      setData(await import('../../data.json'))
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(data)

  return (
    <Example
      title={data.title}
      subtitle={data.subtitle}
    />
  )
}

export default Home
