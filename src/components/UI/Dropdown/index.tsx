import React, { useState, useEffect } from 'react'

// Icons
import { Icon } from '@iconify/react'
import caretDown from '@iconify/icons-mdi/caret-down'

// CSS styles
import './styles.css'

function Dropdown(props: { selected: string, items: string[] }) {

    const [classes, setClasses] = useState(["Dropdown", "Close"])
    const [selected, setSelected] = useState(props.selected)

    function toggleDropdown() {
        const newClasses = [...classes]
        if (newClasses.includes("Open")) {
            newClasses.pop()
            newClasses.push("Close")
        }
        else {
            newClasses.pop()
            newClasses.push("Open")
        }
        setClasses(newClasses)
    }

    function setSelection(item: string) {
        const newClasses = [...classes]
        newClasses.pop()
        newClasses.push("Close")
        setClasses(newClasses)
        setSelected(item)
    }

    useEffect(() => {
        console.log(selected)
        // Fazer filtragem de notas aqui!
    }, [selected])

    return (
        <div className={classes.join(' ')}>
            <div onClick={toggleDropdown} className="DropdownSelector">
                <span>{selected}</span>
                <Icon icon={caretDown} />
            </div>
            <ul>{
                props.items.map((item, i) => (
                    <li
                        className={item === selected ? 'Selected' : ''}
                        key={i}
                        onClick={() => setSelection(item)}
                    >{item}</li>
                ))
            }</ul>
        </div>
    )
}

export default Dropdown