import React, { useEffect, useState } from 'react'
import Card from '../card/Card'

const CardList = ({showArtist, albums}) => {

  const [sortedAlbums, setSortedAlbums] = useState([]);

  useEffect(() => {

    setSortedAlbums(albums.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)))

  }, [albums])

  return (
    <div>
            
            <div style={{display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "50px"}}>
                
                {/* <Card showArtist={showArtist} img={"/img/ajb-nr.jpg"}/> */}
                {sortedAlbums.map((album, index) => {
                  return (
                    <Card id={album.id} key={index} showArtist={showArtist} img={album.albumImagePath} title={album.title}/>
                  )
                })}
                
            </div>
        </div>
  )
}

export default CardList