import React, { useState, useEffect } from 'react'

// Components
import NavigationHeader from 'components/NavigationHeader'
import SideMenu from 'components/SideMenu'
import Backdrop from 'components/UI/Backdrop' 

function Navigation() {

    const [showSideMenu, setShowSideMenu] = useState(false)
    const [sideMenuClasses, setSideMenuClasses] = 
        useState<[string, string]>(["SideMenu", "Closed"])

    function toggleSideMenu() {
        setShowSideMenu(!showSideMenu)
    }

    useEffect(() => {
        if(showSideMenu) 
            setSideMenuClasses(["SideMenu", "Open"])
        else if(sideMenuClasses.includes("Open")) 
            setSideMenuClasses(["SideMenu", "Close"])
    }, [showSideMenu]) // eslint-disable-line

    return (
        <div className="Navigation">
            <NavigationHeader onToggle={toggleSideMenu}/>
            <SideMenu classes={sideMenuClasses}/>
            <Backdrop show={showSideMenu} clicked={toggleSideMenu}/>
        </div>
    )
}

export default Navigation