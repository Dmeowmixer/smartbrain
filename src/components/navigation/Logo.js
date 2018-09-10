import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner pa3"> 
          <img style={{paddingTop: '5px', height: '200px', width: '200px'}} alt='Logo' src="https://png.icons8.com/metro/50/000000/brain.png"/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo