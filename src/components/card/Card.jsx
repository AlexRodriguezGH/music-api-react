import React from 'react'
import { urlFix } from '../../hooks/urlFix'

const Card = ({img, showArtist, title, id}) => {
  return (
    <a href={`/album/${id}/${urlFix(title)}`} style={{width: "calc(25% - 15px)", color: "rgb(206, 212, 218)", textDecoration: "none"}}>
                    <img style={{width: "100%", borderRadius: "10px", aspectRatio: 1/1, objectFit: 'cover'}} src={"https://localhost:7018" + img}/>
                    <div>{title}</div>

                    {showArtist ? null : <a href='/artist'>Tatiana Eva-Marie</a >}

                    
                </a>
  )
}

export default Card