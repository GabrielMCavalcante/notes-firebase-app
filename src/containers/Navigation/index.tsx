import React, { useState } from 'react'

// Components
import NavigationHeader from 'components/NavigationHeader'
import SideMenu from 'components/SideMenu'

function Navigation() {
    const [sideMenuClasses, setSideMenuClasses] = 
        useState<[string, string]>(["SideMenu", "Closed"])

    function openSideMenu() {
        setSideMenuClasses(["SideMenu", "Open"])
    }

    function closeSideMenu() {
        setSideMenuClasses(["SideMenu", "Close"])
    }

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

export default Navigation