import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';

const Join = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext)

    useEffect(() => {
        
        if (auth.uid) {window.location.replace("/")}
    }, [auth])

    const handleJoin = async (e) => {

        e.preventDefault();

        const data = {email, password}

        const response = await fetch("https://localhost:7018/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
        })

        if (response.status === 200) {
            window.location.replace("/login")
        } else {
            console.log(await response.json())
        }
    }

  return (
    <div>
        <form onSubmit={handleJoin}>
            <label htmlFor='email'>Email</label>
            <input onChange={e => setEmail(e.target.value)} id='email' type='email'/>
            <label htmlFor='password'>Password</label>
            <input onChange={e => setPassword(e.target.value)} id='password' type='password'/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Join