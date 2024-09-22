import React from 'react'

const Hero = ({img}) => {
  return (
    <><img style={{borderRadius: "10px", maxWidth: "100%", width: "auto", height: "100%"}} src='img/laufey-hero.png'/>
    <div style={{borderRadius: "0 0 10px 10px", background: "rgb(0, 0, 0, 0.6)", width: "100%", height: "50px", position: "absolute", left: 0, bottom: 0}}></div>
    <h2 style={{position: "absolute", left: 0, bottom: 0, marginBottom: "10px", marginLeft: "10px"}}>Laufey - Goddess</h2></>
    
  )
}

export default Hero