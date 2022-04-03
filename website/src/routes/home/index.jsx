import React, { useState, useEffect } from 'react'

const Home = () => {
  const [data, setData] = useState(null)

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
    setData(adapted[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) return null

  return (
    <section>
      {
        data.Results.map((item, index) => {
          console.log(item)
          return (
            <p key={index}>
              {item.title}
            </p>
          )
        })
      }
    </section>
  )
}

export default Home
