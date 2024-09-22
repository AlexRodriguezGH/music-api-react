import React, { useEffect, useState } from 'react'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Routes/Home/Home';
import Layout from './Layout/Layout';
import Album from './Routes/Album/Album';
import Artist from './Routes/Artist/Artist';
import Create from './Routes/Create/Create';
import Artists from './Routes/Artists/Artists';
import LogIn from './Routes/Auth/LogIn';
import Join from './Routes/Auth/Join';
import {AuthContext} from './Context/AuthContext';
import { DarkBgContext } from './Context/DarkBgContext';
import getUserInfo from './hooks/getUserInfo';
import { SetDarkBgContext } from './Context/SetDarkBgContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/album/:id",
    element: <Album/>
  },
  {
    path: "/album/:id/:albumName",
    element: <Album/>
  },
  {
    path: "/artist/:id/:name",
    element: <Artist/>
  },
  {
    path: "/artist/:id",
    element: <Artist/>
  },
  {
    path: "/create",
    element: <Create/>
  },
  {
    path: "/artists",
    element: <Artists/>
  },
  {
    path:"/login",
    element: <LogIn/>
  },
  {
    path: "/join",
    element: <Join/>
  }
])

const App = () => {

    const [uid, setUid] = useState("")
    const [username, setUsername] = useState("")

    const [auth, setAuth] = useState(getUserInfo())

    const [darkBg, setDarkBg] = useState(false)

  return (
    <AuthContext.Provider value={auth}>
      <SetDarkBgContext.Provider value={setDarkBg}>
        <DarkBgContext.Provider value={darkBg}>
          <Layout>
            <RouterProvider router={router}/>
          </Layout>
        </DarkBgContext.Provider>
      </SetDarkBgContext.Provider>
  </AuthContext.Provider>
  )
}

export default App