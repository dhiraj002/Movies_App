import React from 'react'
import Header from "./HeaderComponent/Header"

function Favourites() {
  let [favourites,setFavourites]=React.useState([]);
  let [ratingOrder,setRatingOrder]=React.useState(null); 
  let [popularityOrder,setPopularityOrder]=React.useState(null);
  const [genres, setGenres] = React.useState([])

  //page no. change
  let [currPage,setPage]=React.useState(1);
 

  //searchbar implimentation
  let[searchText,setValue]=React.useState("");
  function setTextHandler(e){
    let newValue=e.target.value;
    setValue(newValue);
    setPage(1);
  }

  //no. of elements change
  let [noOfElems,setElems]=React.useState(5);
  function setnoHandler(e){
    let newValue=e.target.value;
    setElems(newValue);
  }

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music',
    9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
}


React.useEffect(function () {
  // favoruites update -> new genre 
  let temp = favourites.map((movie) => genreids[movie.genre_ids[0]])
  console.log(temp)
  // unique value hold
  temp = new Set(temp);
  setGenres(["All Genres", ...temp]);

}, [favourites])

function deleteFavMovie(){
  console.log("Movies to be deleted")
}

 //data from movies stored in local storage and getting that data into favourites arry using local storage....
  React.useEffect(function(){
       let favStrArr=localStorage.getItem("favourites")||"[]";
       let favArr=JSON.parse(favStrArr);
       setFavourites(favArr);
  },[])

  function inc(){
    setPage(function (prevState){
       return prevState+1;
   })
  }
  function dec(){
   if(currPage==1){return}
   setPage(function (prevState){
       return prevState-1;
   })
  }
   
  function setRatingHandler(order){
    setPopularityOrder(null);
       setRatingOrder(order)
       
  }

  function setPopularityHandler(order){
          setRatingOrder(null);
         setPopularityOrder(order);
  }

  let searchedMovie= searchText==""?favourites: filterLogic(searchText,favourites);

  let ratedMovies= ratingOrder==null? searchedMovie: sortFavourites(ratingOrder,searchedMovie);

  let sortByrateAndPop= popularityOrder==null?ratedMovies: sortByPop(popularityOrder,ratedMovies)

  //PAgination
  //currPage->pageNO.
  let sIdx=(currPage-1)*noOfElems;
  let eIdx=sIdx+noOfElems;
  let paginatedResult=sortByrateAndPop.slice(sIdx,eIdx);

  return (
   <>
   <Header></Header>
   <GenreBox genres={genres}></GenreBox>

   <div className='border_bottom'>
   <input type="text" value={searchText} onChange={setTextHandler} placeholder="Search"/>
      <input type="number" min="1" value={noOfElems} onChange={setnoHandler}/>  
   </div>

       <table>
        <thead>
          <tr> 
            <th>Name</th>

          <th><i className="fa-solid fa-angle-up" onClick={()=>{setRatingHandler(true)}}></i>Rating<i className="fa-solid fa-angle-down" onClick={()=>{setRatingHandler(false)}}></i></th>

          <th><i className="fa-solid fa-angle-up" onClick={()=>{setPopularityHandler(true)}}></i>Popularity<i className="fa-solid fa-angle-down" onClick={()=>{setPopularityHandler(false)}}></i></th>

          <th>Genre</th>
          <th>Remove</th>
          </tr>
         
        </thead>

        <tbody>
          {paginatedResult.map((movieobj,idx)=>{
            return(
              <tr key={idx}>
                <td>
                <img src={"https://image.tmdb.org/t/p/w500"+movieobj.poster_path} alt="" className='poster_img' key={idx}
                style={{height:"10rem"}}/>
                 <h4>{movieobj.original_title}</h4>
                </td>
                <td>
                  {movieobj.vote_average}
                </td>

                <td>
                {movieobj.popularity}
                </td>
                <td></td>
                <td><button style={{backgroundColor:"lightPink"}} onClick={deleteFavMovie}>Delete </button></td>
              </tr>
            )

          })}
            
             
        </tbody>
 

       </table>
    
    {/* //pagination */}
    <div className='pagination'>
        <button className='btn'onClick={dec}>Previous</button>
        <div className='text'>{currPage}</div>
        <button className='btn'onClick={inc}>Next</button>
        
        </div>
  </>

  )
}

function GenreBox(props) {
  return (
      < div className="flex border-bottom"
      >
          
          {props.genres.map((genre, idx) => {
              return (
                  <h4 key={idx}>{genre}</h4>
              )
          })}

      </div >)

}

function sortFavourites(ratingOrder,favourites){
  if(ratingOrder==null){
    return favourites;
  }
   function helper(a,b){
    if(ratingOrder){
      if(a.vote_average>b.vote_average){
        return +1
      }else if(a.vote_average==b.vote_average){
        return 0
      }else if(a.vote_average<b.vote_average){
        return -1;
      }
     }else{
      if(a.vote_average>b.vote_average){
        return -1
      }else if(a.vote_average==b.vote_average){
        return 0
      }else if(a.vote_average<b.vote_average){
        return +1;
      }

     }
   }

 let ratedFav= favourites.sort( helper)
 return ratedFav;
}

function sortByPop(popularityOrder,ratedMovies){
  if(popularityOrder==null){
    return ratedMovies;
  }
   function helper(a,b){
    if(popularityOrder){
      if(a.popularity>b.popularity){
        return +1
      }else if(a.popularity==b.popularity){
        return 0
      }else if(a.popularity<b.popularity){
        return -1;
      }
     }else{
      if(a.popularity>b.popularity){
        return -1
      }else if(a.popularity==b.popularity){
        return 0
      }else if(a.popularity<b.popularity){
        return +1;
      }

     }
   }

 let ratedPop= ratedMovies.sort( helper)
 return ratedPop;
}

function filterLogic(searchText,Favourites){
  let filteredMovieArray=[];
  for(let i=0;i<Favourites.length;i++){
      let upperSearchText=searchText.toUpperCase();
      let movieName=Favourites[i].original_title;
      let upperText=movieName.toUpperCase();
      let ans=upperText.includes(upperSearchText);

      if(ans==true){
          filteredMovieArray.push(Favourites[i]);
      }
  }
  return filteredMovieArray;
}

export default Favourites