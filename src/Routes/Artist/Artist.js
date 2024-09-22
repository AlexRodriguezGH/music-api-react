import React, { useContext, useEffect, useState } from 'react'
import CardList from '../../components/CardList/CardList'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { DarkBgContext } from '../../Context/DarkBgContext';
import { SetDarkBgContext } from '../../Context/SetDarkBgContext';
import { urlFix } from '../../hooks/urlFix';

const Artist = () => {

  const [artistData, setArtistData] = useState({});
  const [calledFailed, setCallFailed] = useState(true);

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const [albumImageUrl, setAlbumImageUrl] = useState("");
  const [albumImage, setAlbumImage] = useState(null);

  const {id} = useParams()

  const showArtist = true;

  const darkBg = useContext(DarkBgContext)
  const setDarkBg = useContext(SetDarkBgContext)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getArtistData = async () => {


      try {
        /* const response = await fetch("https://localhost:7018/api/Artists/" + id); */
        const response = await fetch("https://musicapi20240920134416.azurewebsites.net/api/Artists/" + id);
        console.log(response)
        const results = await response.json();

        console.log(results.profileImagePath)
        console.log(results)

        if (results) {
          setCallFailed(false)
        }

        if (location.pathname !== `/artist/${id}/${urlFix(results.name)}`) {navigate(`/artist/${id}/${urlFix(results.name)}`)}

        setArtistData(results);
        /* navigate(window.location.pathname + "/" + results.name) */

      } catch (e) {
        setCallFailed(true)
        console.log(e);
      }

      
    }

    getArtistData();

  }, [id])

  
  const handleUploadAlbum = async (e) => {

    e.preventDefault()

    try {

      const formData = new FormData();
      formData.append("albumImage", albumImage)
      formData.append("title", title);
      formData.append("releaseDate", releaseDate);
      formData.append("artistId", id)
      console.log(formData)

      const response = await fetch("https://localhost:7018/api/Albums", {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const results = await response.json()

      setDarkBg(false)

      navigate("/album/" + results.id + '/' + title.replace(/\s+/g, ''))

      console.log(response)

    } catch (e) {
      console.error(e)
    }
  }

  const createAlbumImageUrl = e => {
    setAlbumImageUrl(URL.createObjectURL(e.target.files[0]))
    setAlbumImage(e.target.files[0])
  }

  return (
    <>

<form onSubmit={handleUploadAlbum} style={{width: "100%", maxWidth: "600px", display: "flex", padding: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3}}>
  <div style={{gap: "20px", width:"100%", display: darkBg ? "flex" : "none", background: "rgb(52, 58, 64)", borderRadius: "10px", padding: "20px", flexDirection: "column"}}>
     <div style={{display: "flex", justifyContent: "space-between"}}>
      <h3>Add Album</h3>
       <svg onClick={() => {setDarkBg(false)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
     </div>
    <div style={{display: "flex"}}>
      <div style={{width: "50%", paddingRight: "40px"}}>
        <div className='create-label-wrapper'>
          <label className='create-label' htmlFor='title'>Title</label>
          <input style={{width: "100%"}} id='title' type='text' required onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className='create-label-wrapper'>
          <label className='create-label' htmlFor='releaseDate'>Release Date</label>
          <input style={{width: "100%"}} id='releaseDate' type='date' required onChange={e => setReleaseDate(e.target.value)}/>
        </div>
      </div>
      <div style={{width: "50%", display: "flex",  flexDirection: "column"}}>
        
          <label style={{}} className='create-label' htmlFor='albumImage'>Album Image</label>
          <input style={{display: "none"}} id='albumImage' type='file' onChange={e => createAlbumImageUrl(e)}/>
        
        <img style={{aspectRatio: 1, width: "100%", background: "black"}} src={albumImageUrl}/>
      </div>
    </div>
    
    <button type='submit' style={{width: "fit-content", margin: "0 auto"}}>Submit</button>
  </div>
  
</form>

      {calledFailed ? 
      <div>Unable to find artist.</div> : 
      
      <div style={{position: "relative"}}>
        <header style={{ display: "flex", marginBottom: "50px"}}>
          <div style={{position: "relative"}}>
          <img src={`https://localhost:7018${artistData.bannerImagePath}`} style={{width: "100%",  objectFit: "cover", borderRadius: "10px", aspectRatio: 16/9}}/>
          <h1 style={{position: "absolute", left: 0, bottom: 0, marginBottom: "10px", marginLeft: "10px"}}>{artistData.name}</h1>
          </div>
            
        </header>
          <div style={{display: "flex", gap: "5px"}}>
            <h3 style={{marginBottom: "20px"}}>Albums</h3>
            <svg onClick={() => {setDarkBg(true)}} style={{"cursor" : "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          </div>
            <CardList  showArtist={showArtist} albums={artistData.albums}/>
            
            <div>
            
        </div>

        <div>
          <h3>About</h3>
          <p>{artistData.biography}</p>

        </div></div>}
    </>

  )
}

export default Artist