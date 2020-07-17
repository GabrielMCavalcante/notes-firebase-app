import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

// Components
import Navigation from 'containers/Navigation'

// Containers
import Overview from 'containers/Overview'

function Home() {
    return (
        <div className="Home">
            <Navigation />
            <Switch>
                <Route exact path="/home/overview" component={Overview}/>
                <Redirect to="/home/overview" />
            </Switch>
        </div>
    )
}

export default Home