import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { urlFix } from '../../hooks/urlFix';

const Create = () => {

    const profileImgRef = useRef(null);
    const bannerImgRef = useRef(null);
    const [profileImgUrl, setProfileImgUrl] = useState("")
    const [bannerImgUrl, setBannerImgUrl] = useState("")

    const [profileImg, setProfileImg] = useState(null)

    const [name, setName] = useState("");
    const [biography, setBiography] = useState("");
    const [hometown, setHometown] = useState("");
    const [born, setBorn] = useState("");
    const [genre, setGenre] = useState("");

    const auth = useContext(AuthContext)

    useEffect(() => {
        
        if (!auth.uid) {window.location.replace("/login?redirect=" + window.location.pathname)}
    }, [auth])


    const createBannerImgUrl = (e) => {
        setBannerImgUrl(URL.createObjectURL(e.target.files[0]))
    }

    const createProfileImgUrl = (e) => {
        setProfileImgUrl(URL.createObjectURL(e.target.files[0]))
        setProfileImg(e.target.files[0])
    }

    const handleUploadArtist = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("profileImage", profileImg)
        formData.append("name", name)
        formData.append("biography", biography)
        formData.append("hometown", hometown)
        formData.append("born", born)
        formData.append("genre", genre)

        const response = await fetch('https://localhost:7018/api/Artists', {
            method: "POST",
            credentials: "include",
            body: /* JSON.stringify({name, biography, hometown, born, genre}) */ formData
            /* headers: {"Content-Type": "application/json"} */
        });
        

        const results = await response.json()

        if (response.ok) {
            window.location.replace(`/artist/${results.id}/${urlFix(results.name)}`)
        }

        console.log(response);
    }

  return (
    <div>
        <h1>Create a New Artist Page</h1>

        <form onSubmit={handleUploadArtist}>
            <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>

                <div style={{width: "50%", paddingRight: "50px"}}>
                    <div className='create-label-wrapper'>
                        <label htmlFor="name" className='create-label'>Name</label>
                        <input className='create-input' id='name' type='text' onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label htmlFor="biography" className='create-label' >Biography</label>
                        <textarea className='create-input' id='biography' style={{resize: "none", height: "100px"}} onChange={e => setBiography(e.target.value)}/>
                    </div>

                    <div className='create-label-wrapper'>
                        <label  htmlFor="hometown" className='create-label'>Hometown</label>
                        <input className='create-input' id='hometown' type='text' onChange={e => setHometown(e.target.value)}/>
                    </div>

                    <div className='create-label-wrapper'>
                        <label htmlFor="date"  className='create-label'>Born</label>
                        <input className='create-input' id='date' type='date' onChange={e => setBorn(e.target.value)}/>
                    </div>

                    <div className='create-label-wrapper'>
                        <label htmlFor="genre"  className='create-label'>Genre</label>
                        <input className='create-input' id='genre' type='text' onChange={e => setGenre(e.target.value)}/>
                    </div>
                    <button type='submit'>Submit</button>
                </div>

            
                <div style={{position: "relative", width: "50%", display: "flex", justifyContent: "center"}}>
                    <img src={profileImgUrl} style={{width: "100%", background: "black", aspectRatio: 1, objectFit: "cover"}}/>
                    
                    <input onChange={e => createProfileImgUrl(e)} ref={profileImgRef} accept='.jpg, .png, .jpeg' id='profileImg' type='file' style={{display: "none"}}/>
                    <input style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} onClick={() => {profileImgRef.current.click()}} type='button' value={"Upload Artist Image"}/>
                </div>
            

            
            </div>
            
            
            

            
        </form>
    </div>
  )
}

export default Create