import React from 'react'
import Hero from '../../components/hero/Hero'
import CardList from '../../components/CardList/CardList'

const Home = () => {

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "50px"}}>
        <div style={{position: "relative", display: "flex"}}>         
           <Hero/>
        </div>
        {/* <CardList title={"New Releases"}/>
        <CardList title={"Newly Added"}/> */}
        
    </div>
  )
}

export default Home