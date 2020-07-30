import React from 'react'

// Components
import Button from '../Button'

// CSS styles
import './styles.css'

interface Props {
    feedback: string,
    icon?: JSX.Element,
    hasAction: boolean,
    actionLabel?: string[],
    onModalAction?: ((...params: any[]) => void)[]
}

function FeedbackModal(props: Props) {
    let actions: JSX.Element[] | null = null

    if (props.hasAction) {
        actions = props.onModalAction!.map((action, i) => (
            <Button key={i} onclick={action}>
                {props.actionLabel![i]}
            </Button>
        ))
    }

    return (
        <div className="FeedbackModal">
            <span className="ModalContent">{props.feedback}</span>
            {props.icon && props.icon}
            <div className="ModalActions">
                {props.hasAction && actions}
            </div>
        </div>
    )
}

export default FeedbackModal