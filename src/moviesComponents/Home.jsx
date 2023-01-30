import React from 'react'
import Header from "./HeaderComponent/Header"
import Banner from './BannerComponent/Banner';
import MovieList from './MovieListComponent/MovieList';
import './HeaderComponent/Header.css';
import "./BannerComponent/Banner.css";
import "./MovieListComponent/MoviesList.css"
import "./MovieListComponent/Pagination.css"


function Home() {
    
    let[pageNo,changePageno]=React.useState(1);

   function inc(){
    changePageno(function (prevState){
        return prevState+1
    })
   }

   function dec(){
    if(pageNo==1){return}
    changePageno(function (prevState){
        return prevState-1
    })
   }

  return (
  <>
       <Header></Header>
       <Banner></Banner>
       <MovieList pageNo={pageNo}></MovieList>

       <div className='pagination'>
        <button className='btn'onClick={dec}>Previous</button>
        <div className='text'>{pageNo}</div>
        <button className='btn'onClick={inc}>Next</button>
        
        </div>
       
  </>
  )
}

export default Home;