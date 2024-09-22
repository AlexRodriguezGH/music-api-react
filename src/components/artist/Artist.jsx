import React from 'react'
import { urlFix } from '../../hooks/urlFix'

const Artist = ({name, imgPath, id}) => {
  return (
    <a href={`/artist/${id}/${urlFix(name)}`} style={{width: "calc(25% - 15px)", color: "rgb(206, 212, 218)", textDecoration: "none"}}>
        <img style={{width: "100%", borderRadius: "10px", aspectRatio: 1, objectFit: "cover"}} src={imgPath}/>
        <div>{name}</div>
    </a>
  )
}

export default Artist