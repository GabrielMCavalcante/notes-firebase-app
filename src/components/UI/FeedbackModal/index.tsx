import React from 'react'

// Components
import Button from '../Button'

// CSS styles
import './styles.css'

interface Props {
    feedback: string,
    icon?: JSX.Element,
    hasAction: boolean,
    actionLabel?: string,
    onModalAction?: (...params: any[]) => void
}

function FeedbackModal(props: Props) {
    return (
        <div className="FeedbackModal">
            <span className="ModalContent">{props.feedback}</span>
            {props.icon && props.icon}
            {
                props.hasAction && (
                    <Button onclick={props.onModalAction}>
                        {props.actionLabel}
                    </Button>
                )
            }
        </div>
    )
}

export default FeedbackModal