import React, { useState, useEffect } from 'react'

const Home = () => {
  const [data, setData] = useState([])

  async function fetchData () {
    let rawData = []

    if (process.env.NODE_ENV !== 'production') {
      const response = await import('../../stub-data.json')
      rawData = response.default
    } else {
      const response = await import('../../data.json')
      rawData = response.default
    }

    const adapted = rawData.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp))
    setData(adapted)
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
