import React from 'react'

// CSS styles
import './styles.css'

function Backdrop(props: { show: boolean, clicked: () => void }) {
    return props.show 
        ? <div onClick={props.clicked} className="Backdrop"></div> 
        : null
}

export default Backdrop