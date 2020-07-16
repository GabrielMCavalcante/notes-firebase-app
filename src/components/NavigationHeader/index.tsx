import React from 'react'

// Icons
import { Icon } from '@iconify/react'
import menu from '@iconify/icons-mdi/menu'
import magnify from '@iconify/icons-mdi/magnify'

// Logo
import logo from 'assets/logo.png'

// CSS styles
import './styles.css'

function NavigationHeader(props: { onToggle: () => void }) { 

    function filterNotes(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value)
        // Filtrar notas pelo nome aqui!
    }

    return (
        <nav className="NavigationHeader">
            <div onClick={props.onToggle}>
                <Icon className="MenuToggler" icon={menu} />
            </div>
            <img src={logo} alt="Logo"/>
            <div className="SearchBar">
                <input onChange={filterNotes} type="text" placeholder="Search note..."/>
                <Icon className="SearchIcon" icon={magnify}/>
            </div>
        </nav>
    )
}

export default NavigationHeader 