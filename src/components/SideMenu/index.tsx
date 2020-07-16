import React from 'react'

// Icons
import { Icon } from '@iconify/react'
import close from '@iconify/icons-mdi/close'
import user from '@iconify/icons-mdi/user'

// CSS styles
import './styles.css'

function SideMenu(props: { classes: [string, string], onToggle: () => void }) {

    function onLogout() {
        console.log('logout')
    }

    return (
        <div className={props.classes.join(' ')}>
            <div onClick={props.onToggle}><Icon className="CloseIcon" icon={close} /></div>
            <div className="Logo"></div>
            <div className="CurrentUser">
                <div className="User">
                    <Icon icon={user} />
                    <span>gabriel__xx@hotmail.com</span>
                </div>
                <p onClick={onLogout}>Logout</p>
            </div>
        </div>
    )
}

export default SideMenu