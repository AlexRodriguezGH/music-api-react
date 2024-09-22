import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { DarkBgContext } from '../Context/DarkBgContext'
import { SetDarkBgContext } from '../Context/SetDarkBgContext'

const Layout = ({children}) => {

    const auth = useContext(AuthContext)
    const darkBg = useContext(DarkBgContext)
    const setDarkBgContext = useContext(SetDarkBgContext)

    const handleLogout = async () => {
        const response = await fetch("https://localhost:7018/logout", {
            method: "POST",
            body: JSON.stringify({}),
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok) {
            localStorage.removeItem("username")
            localStorage.removeItem("uid")
            window.location.replace(window.location.pathname)
        }
        else {console.log(response)}
    }

  return (
    <div style={{position: "relative"}}>
        <div onClick={() => {setDarkBgContext(false)}} style={{display: darkBg ? "block" : "none", height: "100vh", "width": "100vw", background: "rgb(0,0,0,0.5)", position: "absolute", top: 0, left: 0, zIndex: 2}}></div>
            <nav style={{background: "rgb(52, 58, 64)", height: "60px", display: "flex", justifyContent: 'center', alignItems: "center", marginBottom: "100px"}}>
                <div style={{width: "900px", display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center"}}>
            
                    <div style={{display: "flex", gap: "10px"}}>
                        <a className='nav-a' href='/'>Home</a>
                        <a className='nav-a' href=''>Genres</a>
                        <a className='nav-a' href=''>Albums</a>
                        <a className='nav-a' href='/artists'>Artists</a>
                        
                    </div>
                    <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            
            
                        {!auth.uid ? <><a className='nav-a' href='/login'>Log In</a>
                            <a className='nav-a' href='/join'>Join</a></> : <><a href='/create'><svg style={{cursor: "pointer", display: "flex"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></a><div>{auth.username}</div>
                        <button onClick={handleLogout}>Log Out</button></>}
            
                    </div>
            
                </div>
            
            </nav>
            <div style={{margin: "0 auto", maxWidth: "900px", padding: "10px", position: "relative"}}>
                {children}
            </div>
        
    </div>
  )
}

export default Layout