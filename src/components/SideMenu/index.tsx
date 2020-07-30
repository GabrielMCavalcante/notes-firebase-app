import React, { useState, useEffect } from 'react'

// Firebase
import { auth } from 'firebase/init'

// React redux connection
import { connect } from 'react-redux'

// Icons
import { Icon } from '@iconify/react'
import close from '@iconify/icons-mdi/close'
import user from '@iconify/icons-mdi/user'

// Components
import Dropdown from 'components/UI/Dropdown'
import Backdrop from 'components/UI/Backdrop'

// CSS styles
import './styles.css'

// Interfaces
import { Option } from 'interfaces'

function SideMenu(props: any) {

    const [classes, setClasses] = useState(props.classes)

    useEffect(() => {
        setClasses(props.classes)
    }, [props.classes])

    function optionSelected(option: Option) {
        if (option.click) {
            option.click()
            setClasses(["SideMenu", "Close"])
        }
    }

    const optionsEl = props.options.map((option: Option, i: number) => {
        if (option.type === 'normal') {
            return (
                <li key={i} className="NormalOption" onClick={() => optionSelected(option)}>
                    {option.text}
                    {option.icon}
                </li>
            )
        }
        else {
            return (
                <li key={i} className="DropdownOption">
                    {option.text}
                    <Dropdown 
                        onOptionSelect={option.onOptionSelect!} 
                        selected={option.first!} 
                        items={option.items!} 
                    />
                </li>
            )
        }
    })

    return (
        <>
            <div className={classes.join(' ')}>
                <div onClick={props.onClose}><Icon className="CloseIcon" icon={close} /></div>
                <div className="Logo"></div>
                <div className="CurrentUser">
                    <div className="User">
                        <Icon icon={user} />
                        <span>{props.currentUser?.email}</span>
                    </div>
                    <p onClick={() => auth.signOut()}>Logout</p>
                </div>
                <div className="Options">
                    <ul>{optionsEl}</ul>
                </div>
            </div>
            <Backdrop show={classes.includes('Open')} clicked={props.backdropClick} />
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        currentUser: state.navigation.currentUser,
        options: state.navigation.options
    }
}

export default connect(mapStateToProps)(SideMenu)