import React from 'react'
import { withRouter } from 'react-router-dom'

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
            <div style={{display: ["/home/edit-note", "/home/view-deleted-note"].includes(props.location.pathname) ? 'none' : 'block'}} className="SearchBar">
                <input value={props.search ? props.search : ''} onChange={filterNotes} type="text" placeholder="Search note..."/>
                <Icon className="SearchIcon" icon={magnify}/>
            </div>
        </nav>
    )
}

function mapStateToProps(state: any) {
    return {
        search: state.navigation.search
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setSearch(search: string) { dispatch(navActions.setSearch(search))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationHeader))