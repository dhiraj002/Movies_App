import React from 'react'

function MovieList(props){

    let[value,setValue]=React.useState("");
    function setText(e){
      let newValue=e.target.value;
      setValue(newValue);
    }
    let[Movie,settMovie]=React.useState("");
    let[favourites,setFavourites]=React.useState([]);

    function setToFavHandler(movieId){
        //add movied to fa
        for(let i=0;i<Movie.length;i++){
            let movieobj=Movie[i];
            if(movieobj.id==movieId){
                //copy fav to newFav
                let newFav=[...favourites,movieobj];
                setFavourites(newFav);
                break;
            }
        }
    }

    function deleteFavHandle(movieId){
        let filterFav=favourites.filter((movieobj)=>{
               return movieobj.id!=movieId;
        })
         setFavourites(filterFav);
    }

    function checkContainFav(movieId){
         for(let i=0;i<favourites.length;i++){
            if(favourites[i].id==movieId){
                return true;
            }
         }
         return false;
    }



    React.useEffect(function fn(){

        async function fetchdata(){
            let response=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=f429223fad1e8c839b551f454cd6b614&page=`+props.pageNo);

            let data=await response.json();
            
            let movie=data.results;
            // console.log(movies[0]);
            
            settMovie(movie)

        }
       fetchdata();
    },[props.pageNo]);

   

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

                       {
                          checkContainFav(movieobj.id)?
                          <i class="fa-sharp fa-solid fa-xmark" onClick={()=>{deleteFavHandle(movieobj.id)}}></i>:


                          <i class="fa-solid fa-face-grin-hearts" onClick={()=>{setToFavHandler(movieobj.id)}}></i>


                       }
                        
                    </div>
                  
                  
                )

              })}
           </div>
           }
        </>
    ) 
}

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

export default MovieList