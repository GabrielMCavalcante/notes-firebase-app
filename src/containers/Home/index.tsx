import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

// Components
import Navigation from 'containers/Navigation'

// Containers
import Overview from 'containers/Overview'
import EditNote from 'containers/EditNote'

// CSS styles
import './styles.css'

function Home() {
    return (
        <div className="Home">
            <Navigation />
            <div>
                <Switch>
                    <Route exact path="/home/overview" component={Overview} />
                    <Route exact path="/home/edit-note" component={EditNote} />
                    <Redirect to="/home/overview" />
                </Switch>
            </div>
        </div>
    )
}

export default Home