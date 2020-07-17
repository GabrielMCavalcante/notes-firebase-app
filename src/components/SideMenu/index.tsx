import React from 'react'

// Icons
import { Icon } from '@iconify/react'
import close from '@iconify/icons-mdi/close'
import user from '@iconify/icons-mdi/user'
import plus from '@iconify/icons-mdi/plus'
import vector_arrange_above from '@iconify/icons-mdi/vector-arrange-above'
import trash_can_outline from '@iconify/icons-mdi/trash-can-outline'

// Components
import Dropdown from 'components/UI/Dropdown'

// CSS styles
import './styles.css'

const currOptionsFromRedux = [
    {
        text: "Add note",
        icon: <Icon icon={plus} />,
        type: "normal",
        click: () => console.log('add note')
    },
    {
        text: "Order By",
        first: 'Title',
        type: "dropdown",
        items: ["Title", "Creation", "Modification"],
        click: () => console.log('order by')
    },
    {
        text: "Filter",
        first: 'All',
        type: "dropdown",
        items: [
            "All",
            "Orange",
            "Green",
            "Purple",
            "Grey",
            "Red",
            "Yellow",
            "Blue",
            "Black",
            "White"
        ],
        click: () => console.log('filter by')
    },
    {
        text: "Multiselection",
        icon: <Icon icon={vector_arrange_above} />,
        type: "normal",
        click: () => console.log('multiselection')
    },
    {
        text: "Deleted notes",
        icon: <Icon icon={trash_can_outline} />,
        type: "normal",
        click: () => console.log('deleted notes')
    }
]

function SideMenu(props: { classes: [string, string], onToggle: () => void }) {

    function onLogout() {
        console.log('logout')
    }

    const optionsEl = currOptionsFromRedux.map((option, i) => {
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

export default SideMenu