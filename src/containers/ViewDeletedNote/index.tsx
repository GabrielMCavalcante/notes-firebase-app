import React, { useState, useEffect } from 'react'
import moment from 'moment'

// Firebase
import { database, auth } from 'firebase/init'

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
import fileRestoreIcon from '@iconify/icons-mdi/file-restore'
import skullIcon from '@iconify/icons-mdi/skull'
import exitRunIcon from '@iconify/icons-mdi/exit-run'

// Global Functions
import { sendNotesTo } from 'globalfn'

// CSS styles
import './styles.css'

// Interfaces
import { Note, Option } from 'interfaces'

function EditNote(props: any) {
    const [loading, setLoading] = useState(false)

    const navOptions: Option[] = [
        {
            text: "Restore note",
            icon: <Icon icon={fileRestoreIcon} />,
            type: "normal", 
            click: restoreNote
        },
        {
            text: "Destroy note",
            icon: <Icon icon={skullIcon} />,
            type: "normal",
            click: destroyNote
        },
        {
            text: "Return to menu",
            icon: <Icon icon={exitRunIcon} />,
            type: "normal",
            click: () => props.history.push('/home/deleted-notes')
        }
    ]

    useEffect(() => {
        props.setOptions(navOptions)
        if (!props.currentNote) props.history.push('/home/deleted-notes')
    }, [props.currentNote]) // eslint-disable-line

    function restoreNote() {
        setLoading(true)
        sendNotesTo("trash", "notes", [props.currentNote])
            .then((res: any) => {
                setLoading(false)
                props.setNotes(res.notes)
                props.setTrash(res.trash)
                props.history.push('/home/deleted-notes')
            })
    }

    function destroyNote() {
        setLoading(true)
        const trash = props.trash.filter((note: Note) => note.id !== props.currentNote.id)
        database.collection('users').doc(auth.currentUser?.uid).update({ trash })
            .then(() => {
                setLoading(false)
                props.toggleMultiselection(false)
                props.setTrash(trash)
                props.history.push('/home/deleted-notes')
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
                                <p>Deleted on {moment(props.currentNote?.deleted).format('lll')}</p>
                                <p>Created on {moment(props.currentNote?.creation).format('lll')}</p>
                                <p>Last modified: {moment(props.currentNote?.modification).format('lll')}</p>
                            </div>
                            <form onSubmit={e => e.preventDefault()}>
                                <fieldset>
                                    <legend>Title</legend>
                                    <input
                                        value={props.currentNote?.title}
                                        readOnly
                                    />
                                </fieldset>
                                <fieldset>
                                    <legend>Content</legend>
                                    <textarea
                                        value={props.currentNote?.content}
                                        readOnly
                                    />
                                </fieldset>
                            </form>
                            <div className="NoteActions">
                                <Button onclick={() => restoreNote()}>Restore Note</Button>
                                <Button onclick={() => destroyNote()}>Destroy Note</Button>
                                <Button
                                    onclick={() => props.history.push('/home/deleted-notes')}
                                >Return to menu</Button>
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
        setTrash(trash: Note[]) { dispatch(deletedNotesActions.setTrash(trash)) },
        toggleMultiselection(mode?: boolean) { dispatch(navActions.toggleMultiselection(mode)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)