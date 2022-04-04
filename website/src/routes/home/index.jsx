import React, { useState, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl'

import MarkerImage from '../../static/marker.png'

import 'mapbox-gl/dist/mapbox-gl.css'
import './index.scss'

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
          latitude: 55.3781,
          longitude: -3.4360,
          zoom: 4
        }}
        style={{ width: '100vw', height: '85vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken='pk.eyJ1IjoiY2pnNHQ4MXZqN3NvcTJxbXMyNzJueHdraiIsImEiOiJjbDFqbXR6bjgxeHF1M2NsbnZwY2czNXdmIn0.ys7kWJ0VGgCxxxXV52wgTA'
      >
      {
        data.Results.map((item, index) => {
          return (
            <Marker key={index} latitude={item.latitude} longitude={item.longitude} anchor='bottom' >
              <img
                src={MarkerImage}
                className='marker'
              />
            </Marker>
          )
        })
      }
      </Map>
    </section>
  )
}

export default Home
