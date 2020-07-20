import React, { useState, useEffect } from 'react'

// Components
import NavigationHeader from 'components/NavigationHeader'
import SideMenu from 'components/SideMenu'

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
            <SideMenu 
                classes={sideMenuClasses} 
                onToggle={toggleSideMenu} 
                backdropClick={toggleSideMenu}
            />
        </div>
    )
}

export default Navigation