import React, { useState, useEffect } from 'react'
import moment from 'moment'

// React redux connection
import { connect } from 'react-redux'

// Store actions
import navActions from 'store/actions/navigation'

// Components
import Button from 'components/UI/Button'

// Icons
import { Icon } from '@iconify/react'
import contentSaveIcon from '@iconify/icons-mdi/content-save'
import deleteEmptyIcon from '@iconify/icons-mdi/delete-empty'

// CSS styles
import './styles.css'

// Interfaces
import { Option } from 'interfaces'

function EditNote(props: any) {

    const [title, setTitle] = useState(props.currentNote?.title)
    const [content, setContent] = useState(props.currentNote?.content)
    const [titleClasses, setTitleClasses] = useState('')
    const [contentClasses, setContentClasses] = useState('')

    const navOptions: Option[] = [
        {
            text: "Save note",
            icon: <Icon icon={contentSaveIcon} />,
            type: "normal",
            click: () => console.log('save note')
        },
        {
            text: "Color",
            first: 'Grey',
            type: "dropdown",
            items: [
                "Orange",
                "Green",
                "Purple",
                "Grey",
                "Red",
                "Yellow",
                "Blue",
                "Black",
                "White"
            ]
        },
        {
            text: "Delete note",
            icon: <Icon icon={deleteEmptyIcon} />,
            type: "normal",
            click: () => console.log('delete note')
        }
    ]

    useEffect(() => {
        props.setOptions(navOptions)
        if(!props.currentNote) props.history.push('/home/overview')
    }, []) // eslint-disable-line

    function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function contentChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
    }

    return (
        <div className="EditNote">
            <div className="NoteDates">
                <p>Created on {moment(props.currentNote?.creation).format('lll')}</p>
                <p>Last modified: {moment(props.currentNote?.modification).format('lll')}</p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <fieldset className={titleClasses}>
                    <legend>Title</legend>
                    <input
                        onBlur={() => setTitleClasses('')}
                        onFocus={() => setTitleClasses('Focus')}
                        value={title}
                        onChange={titleChangeHandler}
                        maxLength={30}
                    />
                </fieldset>
                <fieldset className={contentClasses}>
                    <legend>Content</legend>
                    <textarea
                        onBlur={() => setContentClasses('')}
                        onFocus={() => setContentClasses('Focus')}
                        value={content}
                        onChange={contentChangeHandler}
                    />
                </fieldset>
            </form>
            <div className="NoteActions">
                <Button>Save Note</Button>
                <Button>Save and Exit</Button>
                <Button>Exit without saving</Button>
            </div>
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        currentNote: state.navigation.currentNote
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: Option[]) { dispatch(navActions.setOptions(options)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)