import React from 'react'

function Banner(){

    let[firstMovie,setFirstMovie]=React.useState("");

    React.useEffect( function fn(){

        async function fetchData(){
        //it is used to make request
        let response=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=f429223fad1e8c839b551f454cd6b614`);

        //response will come in buffer we have to convert it into json
        let data=await response.json();
        console.log("data",data);
        let movies=data.results;
        // console.log(movies[0]);
        
        setFirstMovie(movies[0])
        }
        fetchData();
    },[]);
 

    return(
        <>
           {/* <h1>Banner</h1> */}

           {firstMovie===""?
           <h2>Loading....</h2> :
           <>
           {/* <h2>{firstMovie.original_title}</h2> */}
           <img src={"https://image.tmdb.org/t/p/original"+firstMovie.backdrop_path} alt="" className='banner_img'/>
           </>
           }
        
        </>
    )
}

export default Banner