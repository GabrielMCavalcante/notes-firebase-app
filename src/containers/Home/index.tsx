import React, { useEffect } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router'

// Firebase
import { auth } from 'firebase/init'

// Components
import Navigation from 'containers/Navigation'

// Containers
import Overview from 'containers/Overview'
import EditNote from 'containers/EditNote'
import DeletedNotes from 'containers/DeletedNotes'
import ViewDeletedNote from 'containers/ViewDeletedNote'

// CSS styles
import './styles.css'

function Home(props: any) {
    
    useEffect(() => {
        auth.onAuthStateChanged(authentication => {
            if(!authentication) props.history.push('/')
        })
    }, []) // eslint-disable-line

    return (
        <div className="Home">
            <Navigation />
            <div>
                <Switch>
                    <Route exact path="/home/overview" component={Overview} />
                    <Route exact path="/home/edit-note" component={EditNote} />
                    <Route exact path="/home/deleted-notes" component={DeletedNotes} />
                    <Route exact path="/home/view-deleted-note" component={ViewDeletedNote} />
                    <Redirect to="/home/overview" />
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Home)