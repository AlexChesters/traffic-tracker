import React, { useState, useEffect } from 'react'
import Map from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

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
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken='pk.eyJ1IjoiY2pnNHQ4MXZqN3NvcTJxbXMyNzJueHdraiIsImEiOiJjbDFqbXR6bjgxeHF1M2NsbnZwY2czNXdmIn0.ys7kWJ0VGgCxxxXV52wgTA'
      />
      {
        data.Results.map((item, index) => {
          console.log(item)
          return (
            <p key={index}>{item.title}</p>
          )
        })
      }
    </section>
  )
}

export default Home
