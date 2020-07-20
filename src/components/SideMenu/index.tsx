import React from 'react'

// React redux connection
import { connect } from 'react-redux'

// Icons
import { Icon } from '@iconify/react'
import close from '@iconify/icons-mdi/close'
import user from '@iconify/icons-mdi/user'

// Components
import Dropdown from 'components/UI/Dropdown'

// CSS styles
import './styles.css'

interface Option {
    text: string,
    icon: JSX.Element,
    type: "normal" | "dropdown",
    click: () => void,
    first?: string,
    items?: string[]
}

function SideMenu(props: any) {

    function onLogout() {
        console.log('logout')
    }

    const optionsEl = props.options.map((option: Option, i: number) => {
        if (option.type === 'normal') {
            return (
                <li key={i} className="NormalOption" onClick={option.click}>
                    {option.text}
                    {option.icon}
                </li>
            )
        }
        else {
            return (
                <li key={i} className="DropdownOption">
                    {option.text}
                    <Dropdown selected={option.first!} items={option.items!} />
                </li>
            )
        }
    })

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
            <div className="Options">
                <ul>{optionsEl}</ul>
            </div>
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        options: state.navigation.options
    }
}

export default connect(mapStateToProps)(SideMenu)