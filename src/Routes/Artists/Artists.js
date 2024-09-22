import React, { useEffect, useState } from 'react'
import Artist from '../../components/artist/Artist'


const Artists = () => {

    const [artistList, setArtistList] = useState([])
    const [callFailed, setCallFailed] = useState(false)

    useEffect(() => {
        
        const getArtistList = async () => {

            try {
                const response = await fetch('https://localhost:7018/api/Artists');
                const results = await response.json();
            
                setArtistList(results)
            } catch (e) {
                setCallFailed(true);
                console.log(e);
            }

            
        }

        getArtistList();
    }, [])

  return (
    <div style={{display: "flex", width: "100%", gap: "20px", flexWrap: "wrap"}}>

        {callFailed ? <div>Unable to find artists.</div> : artistList.map((artist, index) => {
                return (
                    <Artist key={index} id={artist.id} imgPath={`https://localhost:7018${artist.profileImagePath}`} name={artist.name}/>
                )
                
            })}

        
    </div>
  )
}

export default Artists