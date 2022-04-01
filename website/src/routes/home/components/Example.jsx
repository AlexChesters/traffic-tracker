import React from 'react'
import PropTypes from 'prop-types'

import './Example.scss'

const Example = (props) => {
  return (
    <section className='example'>
      <h1>{props.title}</h1>
      <h4>{props.subtitle}</h4>
    </section>
  )
}

Example.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Example
