import React, { useState, useEffect } from 'react'

// Firebase
import { database, auth } from 'firebase/init'

// React redux connection
import { connect } from 'react-redux'

// Redux actions
import overviewActions from 'store/actions/overview'
import navActions from 'store/actions/navigation'
import deletedNotesActions from 'store/actions/deletedNotes'

// Components
import Button from 'components/UI/Button'
import Spinner from 'components/UI/Spinner'
import FeedbackModal from 'components/UI/FeedbackModal'

// Icons
import { Icon } from '@iconify/react'
import selectAllIcon from '@iconify/icons-mdi/select-all'
import selectOffIcon from '@iconify/icons-mdi/select-off'
import selectInverseIcon from '@iconify/icons-mdi/select-inverse'
import skullIcon from '@iconify/icons-mdi/skull'
import homeIcon from '@iconify/icons-mdi/home'
import vectorArrangeAboveIcon from '@iconify/icons-mdi/vector-arrange-above'
import fileRestoreIcon from '@iconify/icons-mdi/file-restore'
import magnifyIcon from '@iconify/icons-mdi/magnify'
import closeIcon from '@iconify/icons-mdi/close'
import successIcon from '@iconify/icons-mdi/checkbox-marked-circle-outline'
import errorIcon from '@iconify/icons-mdi/close-circle-outline'

// CSS styles
import './styles.css'

// Interfaces
import { Note, Option } from 'interfaces'

// Global functions
import {
    selectAll,
    unselectAll,
    sendNotesTo,
    sortFunction,
    invertSelection
} from 'globalfn'

interface Props {
    trash: Note[],
    multiselection: boolean,
    [key: string]: any
}

function DeletedNotes(props: Props) {
    const [allTrash, setAllTrash] = useState<Note[]>([])
    const [filteredTrash, setFilteredTrash] = useState<Note[]>([])
    const [filter, setFilter] = useState('all')
    const [order, setOrder] = useState('title')
    const [loading, setLoading] = useState(true)
    const [feedbackModal, setFeedbackModal] = useState<JSX.Element | null>(null)

    // Order by
    useEffect(() => {
        if (filteredTrash.length > 0) {
            const newfilteredTrash =
                filteredTrash.sort((a, b) => sortFunction(a, b, order))
            setFilteredTrash([...newfilteredTrash])
        }
    }, [order, filteredTrash.length]) // eslint-disable-line

    // Filter by color
    useEffect(() => {
        if (filter) {
            if (filter !== 'all')
                setFilteredTrash(allTrash.filter(note => note.color === filter))
            else setFilteredTrash([...allTrash])
        }
    }, [filter, allTrash])

    // Search notes
    useEffect(() => {
        if (props.search) {
            const searchRegExp = new RegExp(`^${props.search}[a-z0-9-_]?`, 'i')
            setFilteredTrash(
                allTrash.filter(
                    note => note.title.toLowerCase().match(searchRegExp)
                )
            )
        } else setFilteredTrash(allTrash)
    }, [props.search]) // eslint-disable-line

    const navOptions: Option[] = [
        {
            text: "Notes",
            icon: <Icon icon={homeIcon} />,
            type: "normal",
            click: () => props.history.push('/home/overview')
        },
        {
            text: "Order By",
            first: 'Title',
            type: "dropdown",
            items: ["Title", "Creation", "Modification", "Deletion"],
            onOptionSelect: (ord: string) => {
                const parsedOrder = ord.toLowerCase()
                setOrder(parsedOrder)
            }
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
            onOptionSelect: (filter: string) => setFilter(filter.toLowerCase())
        },
        {
            text: "Multiselection",
            icon: <Icon icon={vectorArrangeAboveIcon} />,
            type: "normal",
            click: props.toggleMultiselection
        }
    ]

    useEffect(() => {
        props.toggleMultiselection(false)
        auth.onAuthStateChanged(authState => {
            if (authState) {
                const user = auth.currentUser?.uid
                database.collection('users').doc(user).get()
                    .then(doc => {
                        props.setTrash(doc.data()!.trash)
                        setLoading(false)
                    })
            }
        })
        props.setOptions(navOptions)
    }, []) // eslint-disable-line

    useEffect(() => {
        setAllTrash(props.trash)
        setFilteredTrash([...props.trash.sort((a, b) => sortFunction(a, b, order))])
    }, [props.trash]) // eslint-disable-line

    useEffect(() => {
        if(!props.multiselection) {
            const newTrash = filteredTrash.map(note => {
                if (!note.selected) return note
                else return { ...note, selected: false }
            })
            setFilteredTrash(newTrash)
        }
    }, [props.multiselection]) // eslint-disable-line

    function onNoteCardClick(noteId: string) {
        if (props.multiselection) {
            const newNotes = filteredTrash.map(note => {
                if (note.id !== noteId) return note
                else return { ...note, selected: !note.selected }
            })
            setFilteredTrash(newNotes)
        } else {
            props.seeDeletedNote(filteredTrash.filter(note => note.id === noteId)[0])
            props.history.push('/home/view-deleted-note')
        }
    }

    function destroySelectedProcess() {
        setLoading(true)
        const trash = filteredTrash.filter(note => !note.selected)
        database.collection('users').doc(auth.currentUser?.uid).update({ trash })
            .then(() => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback="All notes have been destroyed successfully."
                        icon={<Icon icon={successIcon} />}
                        hasAction
                        actionLabel={["Ok"]}
                        onModalAction={[() => {
                            props.toggleMultiselection(false)
                            props.setTrash(trash)
                            setFeedbackModal(null)
                        }]}
                    />
                ))
            }).catch(error => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback={`An error occurred while destroying the notes: ${error.message}`}
                        hasAction
                        icon={<Icon icon={errorIcon} />}
                        onModalAction={[() => setFeedbackModal(null)]}
                        actionLabel={["Ok"]}
                    />
                ))
            })
    }

    function destroySelected() {
        setFeedbackModal((
            <FeedbackModal
                feedback={`All notes selected will be destroyed. 
                This action cannot be undone. Continue?`}
                hasAction
                icon={<Icon icon={skullIcon} />}
                actionLabel={["Continue", "Cancel"]}
                onModalAction={[destroySelectedProcess, () => setFeedbackModal(null)]}
            />
        ))
    }

    function restoreSelectedProcess() {
        const delNotes = filteredTrash.filter(note => note.selected)
        setLoading(true)
        sendNotesTo("trash", "notes", delNotes)
            .then(res => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback="All notes selected have been restored successfully."
                        icon={<Icon icon={successIcon} />}
                        hasAction
                        actionLabel={["Ok"]}
                        onModalAction={[() => {
                            props.setNotes(res.notes)
                            props.setTrash(res.trash)
                            props.toggleMultiselection(false)
                            setFeedbackModal(null)
                        }]}
                    />
                ))
            }).catch(error => {
                setLoading(false)
                setFeedbackModal((
                    <FeedbackModal
                        feedback={`An error occurred while restoring the notes: ${error.message}`}
                        hasAction
                        icon={<Icon icon={errorIcon} />}
                        onModalAction={[() => setFeedbackModal(null)]}
                        actionLabel={["Ok"]}
                    />
                ))
            })
    }

    function restoreSelected() {
        setFeedbackModal((
            <FeedbackModal
                feedback="All notes selected will be restored. Continue?"
                hasAction
                icon={<Icon icon={fileRestoreIcon} />}
                actionLabel={["Continue", "Cancel"]}
                onModalAction={[restoreSelectedProcess, () => setFeedbackModal(null)]}
            />
        ))

    }

    const mainContent = (
        <>
            <div className={[
                "MultiselectionOptions",
                props.multiselection && filteredTrash.length > 0
                    ? "Show"
                    : ""
            ].join(' ')}>
                <Button
                    onclick={
                        () => setFilteredTrash(
                            selectAll(filteredTrash)
                        )}>
                    <Icon icon={selectAllIcon} />
                    <span>Select All</span>
                </Button>
                <Button
                    onclick={
                        () => setFilteredTrash(
                            unselectAll(filteredTrash)
                        )}>
                    <Icon icon={selectOffIcon} />
                    <span>Unselect All</span>
                </Button>
                <Button
                    onclick={() => setFilteredTrash(
                        invertSelection(filteredTrash)
                    )}>
                    <Icon icon={selectInverseIcon} />
                    <span>Invert Selection</span>
                </Button>
                {
                    filteredTrash.filter(note => note.selected).length > 0 && (
                        <>
                            <Button btnType="Success" onclick={restoreSelected}>
                                <Icon icon={fileRestoreIcon} />
                                <span>Restore Selected</span>
                            </Button>
                            <Button btnType="Danger" onclick={destroySelected}>
                                <Icon icon={skullIcon} />
                                <span>Destroy Selected</span>
                            </Button>
                        </>
                    )
                }
            </div>

            <div className="NotesOverview">
                {filteredTrash.map(note => (
                    <div
                        key={note.id}
                        className="NoteCard"
                        onClick={() => onNoteCardClick(note.id)}
                    >
                        <div
                            className="NoteCardSelector"
                            style={{ backgroundColor: note.color }}
                        >
                            {
                                props.multiselection &&
                                <input
                                    type="checkbox"
                                    readOnly
                                    checked={note.selected}
                                />
                            }
                        </div>
                        <div className="NoteCardContent">
                            <span>{note.title}</span>
                            <p>
                                {
                                    note.content &&
                                    (
                                        note.content.length <= 40
                                            ? note.content
                                            : note.content
                                                .substring(0, 39)
                                                .concat('...')
                                    )
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    const trashEmptyFeedback = (
        <FeedbackModal
            hasAction={false}
            feedback={`Deleted notes will appear here.`}
        />
    )

    const filteredTrashEmptyFeedback = (
        <FeedbackModal
            hasAction={false}
            feedback={`No notes found. Try another filter / search.`}
            icon={(
                <div className="NoNotesFound">
                    <Icon icon={magnifyIcon} />
                    <Icon icon={closeIcon} />
                </div>
            )}
        />
    )

    return (
        <div className="DeletedNotes">
            {
                loading
                    ? <div className="SpinnerResizer"><Spinner /></div>
                    : allTrash.length === 0
                        ? trashEmptyFeedback
                        : filteredTrash.length === 0
                            ? filteredTrashEmptyFeedback
                            : feedbackModal !== null
                                ? feedbackModal
                                : mainContent
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        trash: state.deletedNotes.trash,
        multiselection: state.navigation.multiselection,
        currentUser: state.navigation.currentUser,
        search: state.navigation.search
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: any) { dispatch(navActions.setOptions(options)) },
        toggleMultiselection(mode?: boolean) { dispatch(navActions.toggleMultiselection(mode)) },
        setTrash(trash: any) { dispatch(deletedNotesActions.setTrash(trash)) },
        seeDeletedNote(note: Note) { dispatch(navActions.setCurrentNote(note)) },
        setNotes(notes: Note[]) { dispatch(overviewActions.setNotes(notes)) },
        setCurrentNote(note: Note) { dispatch(navActions.setCurrentNote(note)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletedNotes)