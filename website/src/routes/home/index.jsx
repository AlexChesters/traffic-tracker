import React, { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'

import MarkerImage from '../../static/marker.png'

import 'mapbox-gl/dist/mapbox-gl.css'
import './index.scss'

const Home = () => {
  const [data, setData] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [popupInfo, setPopupInfo] = useState(null)

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr)

    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()
    let hours = dateObj.getHours()
    let minutes = dateObj.getMinutes()

    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes

    return `${year}-${month}-${date} ${hours}:${minutes}`
  }

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
          data[selectedIndex].Results.map((item, index) => {
            return (
              <Marker
                key={index}
                latitude={item.latitude}
                longitude={item.longitude}
                anchor='bottom'
                onClick={() => setPopupInfo(item)}
              >
                <img
                  src={MarkerImage}
                  className='marker'
                />
              </Marker>
            )
          })
        }
        {
          popupInfo && (
            <Popup
              className='popup'
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              anchor='bottom'
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                <h1>{popupInfo.title}</h1>
              </div>
            </Popup>
          )
        }
      </Map>
      <div className='timeline'>
        {
          data.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
              >
                {formatDate(item.Timestamp)}
              </button>
            )
          })
        }
      </div>
    </section>
  )
}

export default Home
