import React from 'react'
import Favourites from './Favourites'
import Home from './Home'
import PageNotFound from './PageNotFound'
import { Route,Redirect,Switch} from 'react-router-dom'

function Movies() {
  return (
      <>
           <Switch>

            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/favourites">
              <Favourites></Favourites>
            </Route>
            
            <Redirect from='/' to="/home" exact></Redirect>

            <Route >
              <PageNotFound></PageNotFound>
            </Route>







           </Switch>
        
      </>
  )

}

export default Movies