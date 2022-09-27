//------------------IMPORTS---------------------//

import './App.css';
import React from 'react';
import { Route,  Switch  } from 'react-router-dom';

//----------------IMPORT COMPONENTS--------------//
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Create from './Create/Create';
import Detail from './Detail/Detail';

//-----------------FUNCTION--------------//
function App() {
  return (
    <div className="App">
      
       <Switch>

         <Route path='/home/create' component={ Create } ></Route>
         <Route exact path='/home/:id' component={ Detail }></Route>
         <Route path='/home' component={ Home } ></Route>
         <Route path='/' component={ Landing } ></Route>

      </Switch>  

    </div>
  );
}

export default App;
