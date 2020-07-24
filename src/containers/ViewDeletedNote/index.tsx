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
import successIcon from '@iconify/icons-mdi/checkbox-marked-circle-outline'
import errorIcon from '@iconify/icons-mdi/close-circle-outline'

// Global Functions
import { sendNotesTo } from 'globalfn'

// Components
import FeedbackModal from 'components/UI/FeedbackModal'

// CSS styles
import './styles.css'

// Interfaces
import { Note, Option } from 'interfaces'

function EditNote(props: any) {
    const [loading, setLoading] = useState(false)
    const [feedbackModal, setFeedbackModal] = useState<JSX.Element | null>(null)

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

    function restoreNoteProcess() {
        setLoading(true)
        sendNotesTo("trash", "notes", [props.currentNote])
            .then((res: any) => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback="Note restored successfully."
                        icon={<Icon icon={successIcon} />}
                        hasAction
                        onModalAction={[() => {
                            props.setNotes(res.notes)
                            props.setTrash(res.trash)
                            props.history.push('/home/deleted-notes')
                        }]}
                        actionLabel={["Ok"]}
                    />
                ))
            }).catch(error => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback={`An error occurred while 
                        restoring the note: ${error.message}`}
                        hasAction
                        icon={<Icon icon={errorIcon} />}
                        onModalAction={[() => setFeedbackModal(null)]}
                        actionLabel={["Ok"]}
                    />
                ))
            })
    }

    function restoreNote() {
        setFeedbackModal((
            <FeedbackModal
                feedback="The note will be restored. Continue?"
                hasAction
                actionLabel={["Continue", "Cancel"]}
                onModalAction={[restoreNoteProcess, () => setFeedbackModal(null)]}
            />
        ))
    }

    function destroyNoteProcess() {
        setLoading(true)
        const trash = props.trash.filter((note: Note) => note.id !== props.currentNote.id)
        database.collection('users').doc(auth.currentUser?.uid).update({ trash })
            .then(() => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback="Note destroyed successfully."
                        icon={<Icon icon={successIcon} />}
                        hasAction
                        onModalAction={[() => {
                            props.toggleMultiselection(false)
                            props.setTrash(trash)
                            props.history.push('/home/deleted-notes')
                        }]}
                        actionLabel={["Ok"]}
                    />
                ))
            }).catch(error => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback={`An error occurred while 
                        destroying the note: ${error.message}`}
                        hasAction
                        icon={<Icon icon={errorIcon} />}
                        onModalAction={[() => setFeedbackModal(null)]}
                        actionLabel={["Ok"]}
                    />
                ))
            })
    }

    function destroyNote() {
        setFeedbackModal((
            <FeedbackModal
                feedback={`The note will be destroyed. 
                This action cannot be undone. Continue?`}
                hasAction
                actionLabel={["Continue", "Cancel"]}
                onModalAction={[destroyNoteProcess, () => setFeedbackModal(null)]}
            />
        ))
    }

    const mainContent = (
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

    return (
        <div className="ViewDeletedNote">
            {
                loading
                    ? <div className="SpinnerResizer"><Spinner /></div>
                    : feedbackModal !== null
                        ? feedbackModal
                        : mainContent
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