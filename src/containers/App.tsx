import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Containers
import Register from './Register'
import Home from './Home' 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Register}/>
        <Route path="/home" component={Home}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App