import React from 'react'
import {Link} from "react-router-dom"

export default function Header() {
  return (
    <>
            <div className='flex'>
            <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png" alt="" />

            <Link to="./home"> <h2>Movies</h2></Link>
           
            <Link to="./favourites">  <h2>Favorites</h2></Link>
           
            </div> 

        </>
  )
}

