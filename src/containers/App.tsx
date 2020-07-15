import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Containers
import Register from './Register'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Register}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App