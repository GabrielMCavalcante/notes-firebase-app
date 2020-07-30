import React from 'react'

// CSS styles
import './styles.css'

function Button(props: any) {
    return (
        <button 
            onClick={props.onclick} 
            className={["Button", props.btnType || ''].join(' ')}
        >{props.children}</button>
    )
}

export default Button