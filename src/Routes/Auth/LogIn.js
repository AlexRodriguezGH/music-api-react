import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';

const urlParams = new URLSearchParams(window.location.search)
const redirectParam = urlParams.get("redirect")

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext)

    useEffect(() => {
        
        if (auth.uid) {window.location.replace("/")}
    }, [auth])

    const handleLogIn = async (e) => {

        e.preventDefault();

        const data = {email, password}

        const response = await fetch("https://localhost:7018/login?useCookies=true", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
        })

        console.log(response)

        if (response.status === 200) {

            const userData = await fetch("https://localhost:7018/uid", {
                credentials: "include"
            })

            const userDataJson = await userData.json()

            console.log(userDataJson)

            localStorage.setItem("uid", userDataJson.userId)
            localStorage.setItem("username", userDataJson.username)

            if (redirectParam) {
                window.location.replace(redirectParam)
            } else {
                window.location.replace("/")
            }
            
        } 
    }


  return (
    <div>
        <form onSubmit={handleLogIn}>
            <label htmlFor='email'>Email</label>
            <input onChange={e => setEmail(e.target.value)} id='email' type='email'/>
            <label htmlFor='password'>Password</label>
            <input onChange={e => setPassword(e.target.value)} id='password' type='password'/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default LogIn