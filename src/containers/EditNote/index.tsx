import React, { useState, useEffect } from 'react'
import moment from 'moment'

// Firebase
import { database } from 'firebase/init'

// React redux connection
import { connect } from 'react-redux'

// Store actions
import navActions from 'store/actions/navigation'
import overviewActions from 'store/actions/overview'
import deletedNotesActions from 'store/actions/deletedNotes'

// Components
import Button from 'components/UI/Button'
import Spinner from 'components/UI/Spinner'

// Icons
import { Icon } from '@iconify/react'
import contentSaveIcon from '@iconify/icons-mdi/content-save'
import deleteEmptyIcon from '@iconify/icons-mdi/delete-empty'

// Global Functions
import { sendToTrash } from 'globalfn'

// CSS styles
import './styles.css'

// Interfaces
import { Note, Option } from 'interfaces'

const MAX_TITLE_LENGTH = 15

function EditNote(props: any) {

    const [title, setTitle] = useState(props.currentNote?.title)
    const [content, setContent] = useState(props.currentNote?.content)
    const [color, setColor] = useState(capitalize(props.currentNote?.color))
    const [titleClasses, setTitleClasses] = useState('')
    const [contentClasses, setContentClasses] = useState('')
    const [loading, setLoading] = useState(false) 

    function capitalize(string: string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1, string?.length)
    }

    const navOptions: Option[] = [
        {
            text: "Color",
            first: color,
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
            ],
            onOptionSelect: (color: string) => {
                if (color)
                    setColor(color.toLocaleLowerCase())
                else props.history.push('/home/overview')
            }
        },
        {
            text: "Save note",
            icon: <Icon icon={contentSaveIcon} />,
            type: "normal",
            click: saveNote
        },
        {
            text: "Delete note",
            icon: <Icon icon={deleteEmptyIcon} />,
            type: "normal",
            click: deleteNote
        }
    ]

    useEffect(() => {
        props.setOptions(navOptions)
        if (!props.currentNote) props.history.push('/home/overview')
    }, [props.currentNote]) // eslint-disable-line

    function titleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length <= MAX_TITLE_LENGTH)
            setTitle(event.target.value)
    }

    function contentChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
    }

    function saveNote(exitOnSave = false) {
        setLoading(true)
        database.collection('users').doc(props.currentNote.userId).get()
            .then(doc => {
                const newData = {
                    ...props.currentNote,
                    title: title ? title : 'untitled',
                    content,
                    color,
                    modification: Date.now()
                }
                const userNotes = doc.data()!.notes
                for (let i = 0; i < userNotes.length; i++) {
                    if (userNotes[i].id === newData.id) {
                        userNotes[i] = newData
                        break
                    }
                }
                database.collection('users').doc(newData.userId).update({
                    notes: userNotes
                }).then(() => {
                    props.setNotes(userNotes)
                    props.setCurrentNote(newData)
                    setLoading(false)
                    if(exitOnSave) props.history.push('/home/overview')
                })
            })
    }

    function deleteNote() {
        setLoading(true)
        sendToTrash([props.currentNote])
            .then((res: any) => {
                setLoading(false)
                props.setNotes(res.notes)
                props.setTrash(res.trash)
                props.history.push('/home/overview')
            })
    }

    return (
        <div className="EditNote">
            {
                loading
                ? <div className="SpinnerResizer"><Spinner /></div>
                : (
                    <>
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
                                />
                                <span
                                    className={[
                                        'LetterCounter',
                                        title?.length >= MAX_TITLE_LENGTH ? 'Limit' : ''
                                    ].join(' ')}
                                >{title?.length}/{MAX_TITLE_LENGTH}</span>
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
                            <Button onclick={()=>saveNote(false)}>Save Note</Button>
                            <Button onclick={()=>saveNote(true)}>Save and Exit</Button>
                            <Button
                                onclick={() => props.history.push('/home/overview')}
                            >Exit without saving</Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        currentNote: state.navigation.currentNote,
        trash: state.deletedNotes.trash
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: Option[]) { dispatch(navActions.setOptions(options)) },
        setCurrentNote(note: Note) { dispatch(navActions.setCurrentNote(note)) },
        setNotes(notes: Note[]) { dispatch(overviewActions.setNotes(notes)) },
        setTrash(trash: Note[]) { dispatch(deletedNotesActions.setTrash(trash))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)