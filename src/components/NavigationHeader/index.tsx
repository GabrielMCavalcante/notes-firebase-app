import React from 'react'

// React redux connection
import { connect } from 'react-redux'

// Store actions
import navActions from 'store/actions/navigation'

// Icons
import { Icon } from '@iconify/react'
import menu from '@iconify/icons-mdi/menu'
import magnify from '@iconify/icons-mdi/magnify'

// Logo
import logo from 'assets/logo.png'

// CSS styles
import './styles.css'

function NavigationHeader(props: any) { 
    function filterNotes(event: React.ChangeEvent<HTMLInputElement>) {
        props.setSearch(event.target.value)
    }

    return (
        <nav className="NavigationHeader">
            <div onClick={props.onOpen}>
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

function mapDispatchToProps(dispatch: any) {
    return {
        setSearch(search: string) { dispatch(navActions.setSearch(search))}
    }
}

export default connect(null, mapDispatchToProps)(NavigationHeader)