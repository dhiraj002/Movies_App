import React from 'react'
import './Header.css';
import "./Banner.css";
import "./MoviesList.css"


function Home() {
  return (
  <>
       <Header></Header>
       <Banner></Banner>
       <MoviesList></MoviesList>
  </>
  )
}


function Header(){
    return(
        <>
            <div className='flex'>
            <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png" alt="" />

            <h2>Movies</h2>
            <h2>Favorites</h2>
            </div> 

        </>
    )
}

function Banner(){

    let[firstMovie,setFirstMovie]=React.useState("");

    React.useState(async function(){
        //it is used to make request
        let response=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=f429223fad1e8c839b551f454cd6b614`);

        //response will come in buffer we have to convert it into json
        let data=await response.json();
        console.log("data",data);
        let movies=data.results;
        // console.log(movies[0]);
        
        setFirstMovie(movies[0])
    },[]);
 

    return(
        <>
           <h1>Banner</h1>

           {firstMovie===""?
           <h2>Loading....</h2> :
           <>
           <h2>{firstMovie.original_title}</h2>
           <img src={"https://image.tmdb.org/t/p/original"+firstMovie.backdrop_path} alt="" className='banner_img'/>
           </>
           }
        
        </>
    )
}

function MoviesList(){

    let[value,setValue]=React.useState("");
    function setText(e){
      let newValue=e.target.value;
      setValue(newValue);
    }


    let[Movie,settMovie]=React.useState("");

    React.useState(async function(){
        let response=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=f429223fad1e8c839b551f454cd6b614`);

        let data=await response.json();
        
        let movie=data.results;
        // console.log(movies[0]);
        
        settMovie(movie)
    },[]);

    function filterLogic(searchText,moviesArray){
        let filteredMovieArray=[];
        for(let i=0;i<moviesArray.length;i++){
            let upperSearchText=searchText.toUpperCase();
            let movieName=moviesArray[i].original_title;
            let upperText=movieName.toUpperCase();
            let ans=upperText.includes(upperSearchText);

            if(ans==true){
                filteredMovieArray.push(moviesArray[i]);
            }
        }
        return filteredMovieArray;
    }

   let searchedMovie= filterLogic(value,Movie);

    return(
        <>
            <h2>Trending Movies</h2>
            <input type="text" value={value} onChange={setText}/>

            {Movie===""?
           <h2>Loading Movies....</h2> :
           <div className='trending_Box'>
             { searchedMovie.map((movieobj,idx)=>{
                return(
                    <div key={idx} className="poster_box">
                        <h2>{movieobj.original_title}</h2>

                        <img src={"https://image.tmdb.org/t/p/w500"+movieobj.poster_path} alt="" className='poster_img'/>

                        
                        
                    </div>
                )

              })}
           </div>
           }
        </>
    ) 
}





export default Home;