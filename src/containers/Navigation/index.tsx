import React, { useState, useEffect } from 'react'

// React Redux connection
import { connect } from 'react-redux'

// Firebase
import {auth} from 'firebase/init' 

// Components
import NavigationHeader from 'components/NavigationHeader'
import SideMenu from 'components/SideMenu'

// Store actions
import navActions from 'store/actions/navigation'

// CSS styles
import './styles.css'

function Navigation(props: any) {
    const [sideMenuClasses, setSideMenuClasses] = 
        useState<[string, string]>(["SideMenu", "Closed"])

    function openSideMenu() {
        setSideMenuClasses(["SideMenu", "Open"])
    }

    function closeSideMenu() {
        setSideMenuClasses(["SideMenu", "Close"])
    }

    useEffect(() => {
        auth.onAuthStateChanged(authentication => {
            if(authentication) props.setCurrentUser(auth.currentUser)
        })
        if(auth.currentUser) props.setCurrentUser(auth.currentUser)
    }, []) // eslint-disable-line

    return (
        <div className="Navigation">
            <NavigationHeader onOpen={openSideMenu}/>
            <SideMenu 
                classes={sideMenuClasses} 
                onClose={closeSideMenu} 
                backdropClick={closeSideMenu}
            />
        </div>
    )
}

function mapDispatchToProps(dispatch: any) { 
    return {
        setCurrentUser(currentUser: string) { dispatch(navActions.setCurrentUser(currentUser)) }
    }
}

export default connect(null, mapDispatchToProps)(Navigation)