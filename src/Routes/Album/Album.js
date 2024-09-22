import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { urlFix } from '../../hooks/urlFix';
import { DarkBgContext } from '../../Context/DarkBgContext';
import { SetDarkBgContext } from '../../Context/SetDarkBgContext';

const UploadSongForm = () => {

    const darkBg = useContext(DarkBgContext)
    const setDarkBg = useContext(SetDarkBgContext)
    const {id} = useParams()
    
    const [songTitle, setSongTitle] = useState("")
    const [songDuration, setSongDuration] = useState(0)
    const [trackNumber, setTrackNumber] = useState(0)
    const [musicVideoUrl, setMusicVideoUrl] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const handleUploadSong = async (e) => {

        e.preventDefault()

        const bodyData = {title: songTitle, duration: songDuration, albumId: id, trackNumber, musicVideoUrl}

        console.log(bodyData)

        const response = await fetch("https://localhost:7018/api/Songs", {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        if (response.ok) {
            console.log(response)
            setDarkBg(false)
            setSongTitle("")
            setMusicVideoUrl("")
            setSongDuration("")
            setTrackNumber("")
            navigate(location.pathname, {replace: true})
        } else {
            console.log(response)
        }
    }

    return (
        <form onSubmit={handleUploadSong} style={{width: "100%", maxWidth: "300px", display: "flex", padding: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3}}>
            <div style={{gap: "20px", width:"100%", display: darkBg ? "flex" : "none", background: "rgb(52, 58, 64)", borderRadius: "10px", padding: "20px", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>Add Song</h3>
                <svg onClick={() => {setDarkBg(false)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <div >
                    <div className='create-label-wrapper'>
                        <label className='create-label'>Track Number</label>
                        <input required value={trackNumber} onChange={(e) => {setTrackNumber(e.target.value)}} style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>Track Title</label>
                        <input required value={songTitle} onChange={(e) => {setSongTitle(e.target.value)}} style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>Track Duration (Seconds)</label>
                        <input required value={songDuration} onChange={(e) => {setSongDuration(e.target.value)}} style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>Music Video URL</label>
                        <input value={musicVideoUrl} onChange={(e) => {setMusicVideoUrl(e.target.value)}} style={{width: "100%"}} type='text'/>
                    </div>
                    
                </div>
                
                <button type='submit' style={{width: "fit-content", margin: "0 auto"}}>Submit</button>
            </div>
        </form>
    )
}

const UpdateSongForm = ({song}) => {

    //console.log(song)

    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const darkBg = useContext(DarkBgContext)
    const setDarkBg = useContext(SetDarkBgContext)

    const [newSongTitle, setNewSongTitle] = useState(song.title)
    const [newSongDuration, setNewSongDuration] = useState(song.duration)
    const [newTrackNumber, setNewTrackNumber] = useState(song.trackNumber)
    const [newMusicVideoUrl, setNewMusicVideoUrl] = useState(song.musicVideoUrl)

    useEffect(() => {
        setNewSongTitle(song.title)
        setNewSongDuration(song.duration)
        setNewTrackNumber(song.trackNumber)
        setNewMusicVideoUrl(song.musicVideoUrl)
    }, [song])

    const handleUpdateSong = async (e) => {

        e.preventDefault()
        const bodyData = {id: song.id, title: newSongTitle, duration: newSongDuration, albumId: id, trackNumber: newTrackNumber, musicVideoUrl: newMusicVideoUrl}

    const response = await fetch("https://localhost:7018/api/Songs/" + song.id, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    })

    console.log(response)

    if (response.ok) {
        console.log(location)
        navigate(location.pathname, {replace: true});
        setDarkBg(false)
        console.log("success");
        
    }
    }

    return (<form onSubmit={handleUpdateSong} style={{width: "100%", maxWidth: "300px", display: "flex", padding: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3}}>
            <div style={{gap: "20px", width:"100%", display: darkBg ? "flex" : "none", background: "rgb(52, 58, 64)", borderRadius: "10px", padding: "20px", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>Update Song</h3>
                <svg onClick={() => {setDarkBg(false)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <div >
                    <div className='create-label-wrapper'>
                        <label className='create-label'>New Track Number</label>
                        <input value={newTrackNumber} onChange={(e) => {setNewTrackNumber(e.target.value)}} required  style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>New Track Title</label>
                        <input value={newSongTitle} onChange={(e) => {setNewSongTitle(e.target.value)}} required  style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>New Track Duration (Seconds)</label>
                        <input value={newSongDuration} onChange={(e) => {setNewSongDuration(e.target.value)}} required  style={{width: "100%"}} type='text'/>
                    </div>
                    <div className='create-label-wrapper'>
                        <label className='create-label'>New Music Video URL</label>
                        <input value={newMusicVideoUrl} onChange={(e) => {setNewMusicVideoUrl(e.target.value)}}style={{width: "100%"}} type='text'/>
                    </div>
                    
                </div>
                
                <button type='submit' style={{width: "fit-content", margin: "0 auto"}}>Submit</button>
            </div>
        </form>)
}

const ListItem = ({song, setCurrentForm, darkBg, setDarkBg}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const minutes = parseInt(song.duration / 60)

    let seconds = song.duration % 60;

    if (seconds < 10) {
        seconds = "0" + seconds
    }

    const [visible, setVisible] = useState(false)

    const handleDeleteSong = async () => {
        const response = await fetch("https://localhost:7018/api/Songs/" + song.id, {
            method: "DELETE",
            credentials: "include"
        })

        console.log(response);
        if (response.ok) {
            navigate(location.pathname)
        }
        
    }

    return (

        <tr className='album-tr' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <td style={{padding: "10px 0"}}>{song.trackNumber}</td>
            <td style={{padding: "10px 0"}}><div style={{position: "relative"}}><a className='nav-a' target='_blank' href={song.musicVideoUrl}>{song.title}</a>
            <svg style={{display: visible ? "block" : "none", position: "absolute", right: 300, top: 0}} onClick={() => {setCurrentForm(<UpdateSongForm song = {song}/>); setDarkBg(true);}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            <svg onClick={handleDeleteSong} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></div></td>
            <td style={{textAlign: "end", padding: "10px 0"}}>{minutes}:{seconds}</td>
        </tr>
    )
}

const UpdateAlbumForm = ({albumData}) => {
    const darkBg = useContext(DarkBgContext)
    const setDarkBg = useContext(SetDarkBgContext)

    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [newTitle, setNewTitle] = useState(albumData.title)
    const [newReleaseDate, setNewReleaseDate] = useState(albumData.releaseDate)

    const bodyData = {id, title: newTitle, releaseDate: newReleaseDate, artistId: albumData.artistId, albumImagePath: albumData.albumImagePath, songs: albumData.songs}

    const handleUpdateAlbum = async (e) => {
        e.preventDefault()

        const response = await fetch("https://localhost:7018/api/Albums/" + id, {
            method: "PUT",
            body: JSON.stringify(bodyData),
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        console.log(response)

        if (response.ok) {
            setDarkBg(false)
            navigate(location.pathname)
        }
    }

    return (
        <form onSubmit={handleUpdateAlbum} style={{width: "100%", maxWidth: "300px", display: "flex", padding: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3}}>
        <div style={{gap: "20px", width:"100%", display: darkBg ? "flex" : "none", background: "rgb(52, 58, 64)", borderRadius: "10px", padding: "20px", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <h3>Update Album</h3>
            <svg onClick={() => {setDarkBg(false)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
            <div >
                <div className='create-label-wrapper'>
                    <label className='create-label'>Album Title</label>
                    <input required value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}} style={{width: "100%"}} type='text'/>
                </div>
                <div className='create-label-wrapper'>
                    <label className='create-label'>Album Release Date</label>
                    <input required value={newReleaseDate} onChange={(e) => {setNewReleaseDate(e.target.value)}} style={{width: "100%"}} type='date'/>
                </div>
                
                
            </div>
            <button type='submit' style={{width: "fit-content", margin: "0 auto"}}>Submit</button>
        </div>
    </form>
    )
}

const Album = () => {

    const [albumData, setAlbumData] = useState({})
    const [sortedSongs, setSortedSongs] = useState([])

    const [currentForm, setCurrentForm] = useState(null)

    const auth = useContext(AuthContext)
    
    const darkBg = useContext(DarkBgContext)
    const setDarkBg = useContext(SetDarkBgContext)

    const {id} = useParams()
    let location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleGetAlbumData = async () => {
            const response = await fetch("https://localhost:7018/api/Albums/" + id);

            const results = await response.json();

            if (location.pathname !== `/album/${id}/${urlFix(results.title)}`) {navigate(`/album/${id}/${urlFix(results.title)}`)}
            setAlbumData(results)

            setSortedSongs(results.songs.sort((a, b) => new Number(a.trackNumber) - new Number(b.trackNumber)))
        }

        handleGetAlbumData();

    

    }, [id, location, navigate])

    const formatDate = (date) => {

        const months = [
            {number: "01", month: "January"},
            {number: "02", month: "February"},
            {number: "03", month: "March"},
            {number: "04", month: "April"},
            {number: "05", month: "May"},
            {number: "06", month: "June"},
            {number: "07", month: "July"},
            {number: "08", month: "August"},
            {number: "09", month: "September"},
            {number: "10", month: "October"},
            {number: "11", month: "November"},
            {number: "12", month: "December"},
        ]

        const year = date.substring(0, 4)
        const monthNumber = date.substring(5, 7)
        const day = date.substring(8)
        let month = ""

        months.forEach(m => {
            if (m.number.localeCompare(monthNumber) === 0) {
                month = m.month
            }
        })
        
        return (`${month} ${day}, ${year}`)
    }

    const handleDeleteAlbum = async () => {
        const response = await fetch("https://localhost:7018/api/Albums/" + id, {
            method: "DELETE",
            credentials: 'include'
        })

        console.log(response)

        if (response.ok) {
            navigate("/artist/" + albumData.artistId)
        }
    }

  return (
    <>
    {currentForm}
        <div style={{display: "flex", marginBottom: "50px", flexWrap: "wrap"}}>
            <div style={{width: "100%", maxWidth: "300px"}}><img src={"https://localhost:7018" + albumData.albumImagePath} style={{aspectRatio: 1, width: "100%", borderRadius: "10px", objectFit: "cover"}}/></div>

            <div style={{padding: "30px", display: "flex", flexDirection: "column", gap: "5px"}}>
                <h1>{albumData.title} 
                    <svg onClick={() => {setCurrentForm(<UpdateAlbumForm albumData={albumData}/>); setDarkBg(true)}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    <svg onClick={handleDeleteAlbum} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </h1>

                {albumData && albumData.artistName && (
                    <h2><a className='nav-a' href={"/artist/" + albumData.artistId + '/' + urlFix(albumData.artistName)}>{albumData.artistName}</a></h2>
                )}

                <h3>{albumData && albumData.releaseDate && (formatDate(albumData.releaseDate.substring(0, 10)))} • {albumData?.songs?.length ?? 0} songs </h3>
                
            </div>
        </div>
        
            <div style={{display: "flex", gap: "5px"}}>
                <h4>Track List</h4>
                <svg onClick={() => {setCurrentForm(<UploadSongForm/>); setDarkBg(true)}} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>

            <table style={{width: "100%", borderCollapse: "separate", borderSpacing: "0 1em", marginBottom: "100px"}}>
                <thead>
                    <tr>
                        <th style={{textAlign: "start"}}>#</th>
                        <th style={{textAlign: "start"}}>Title</th>
                        <th style={{textAlign: "end"}}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSongs ? sortedSongs.map((song, index) => {
                        return (
                            <ListItem key={index} song={song} id={id} darkBg={darkBg} setDarkBg={setDarkBg} setCurrentForm={setCurrentForm}/>
                        )
                    }): null}
                </tbody>
            </table>
   </>
  )
}

export default Album