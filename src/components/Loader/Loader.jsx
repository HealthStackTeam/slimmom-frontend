import React from 'react'
import { PacmanLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <PacmanLoader color="#FC842D" size={50} />
    </div>
  )
}

export default Loader
