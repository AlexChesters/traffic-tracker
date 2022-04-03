import React, { useState, useEffect } from 'react'

import Example from './components/Example'

const Home = () => {
  const [data, setData] = useState([])

  async function fetchData () {
    if (process.env.NODE_ENV !== 'production') {
      const response = await import('../../stub-data.json')
      setData(response.default)
    } else {
      const response = await import('../../data.json')
      setData(response.default)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section>
      {
        data.map((item, index) => (
          <p key={index}>
            {item.Timestamp}
          </p>
        ))
      }
    </section>
  )
}

export default Home
