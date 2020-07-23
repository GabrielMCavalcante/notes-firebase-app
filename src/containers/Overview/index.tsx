import React, { useState, useEffect } from 'react'

// Firebase
import { database, auth } from 'firebase/init'

// Note id
import { v4 as uuidv4 } from 'uuid'

// React redux connection
import { connect } from 'react-redux'

// Redux actions
import overviewActions from 'store/actions/overview'
import navActions from 'store/actions/navigation'
import deletedNotesActions from 'store/actions/deletedNotes'

// Components
import Button from 'components/UI/Button'
import Spinner from 'components/UI/Spinner'

// Icons
import { Icon } from '@iconify/react'
import selectAllIcon from '@iconify/icons-mdi/select-all'
import selectOffIcon from '@iconify/icons-mdi/select-off'
import selectInverseIcon from '@iconify/icons-mdi/select-inverse'
import deleteCircleIcon from '@iconify/icons-mdi/delete-circle'
import plusIcon from '@iconify/icons-mdi/plus'
import plus from '@iconify/icons-mdi/plus'
import vector_arrange_above from '@iconify/icons-mdi/vector-arrange-above'
import trashCanIcon from '@iconify/icons-mdi/trash-can'

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
    notes: Note[],
    multiselection: boolean,
    [key: string]: any
}

function Overview(props: Props) {
    const [allNotes, setAllNotes] = useState<Note[]>([])
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
    const [filter, setFilter] = useState('all')
    const [order, setOrder] = useState('title')
    const [loading, setLoading] = useState(true)

    // Order by
    useEffect(() => {
        if (filteredNotes.length > 0) {
            const newFilteredNotes = 
                filteredNotes.sort((a, b) => sortFunction(a, b, order))
            setFilteredNotes([...newFilteredNotes])
        }
    }, [order, filteredNotes.length]) // eslint-disable-line

    // Filter by color
    useEffect(() => {
        if (filter) {
            if (filter !== 'all')
                setFilteredNotes(allNotes.filter(note => note.color === filter))
            else setFilteredNotes([...allNotes])
        }
    }, [filter, allNotes])

    // Search notes
    useEffect(() => {
        if (props.search) {
            const searchRegExp = new RegExp(`^${props.search}[a-z0-9-_]?`, 'i')
            setFilteredNotes(
                filteredNotes.filter(
                    note => note.title.toLowerCase().match(searchRegExp)
                )
            )
        } else setFilteredNotes(allNotes)
    }, [props.search]) // eslint-disable-line

    function addNote() {
        const user = auth.currentUser?.uid
        setLoading(true)
        database.collection('users').doc(user).get()
            .then(doc => {
                const userNotes = doc.data()!.notes
                const userNote = {
                    id: uuidv4(),
                    userId: user,
                    title: 'untitled',
                    content: '',
                    color: 'grey',
                    selected: false,
                    creation: Date.now(),
                    modification: Date.now()
                }
                userNotes.push(userNote)
                database.collection('users').doc(user).update({
                    notes: userNotes
                }).then(() => {
                    setLoading(false)
                    props.setCurrentNote(userNote)
                    props.history.push('/home/edit-note')
                })
            })
    }

    const navOptions: Option[] = [
        {
            text: "Add note",
            icon: <Icon icon={plus} />,
            type: "normal",
            click: addNote
        },
        {
            text: "Order By",
            first: 'Title',
            type: "dropdown",
            items: ["Title", "Creation", "Modification"],
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
            icon: <Icon icon={vector_arrange_above} />,
            type: "normal",
            click: props.toggleMultiselection
        },
        {
            text: "Deleted notes",
            icon: <Icon icon={trashCanIcon} />,
            type: "normal",
            click: () => props.history.push("/home/deleted-notes")
        }
    ]

    useEffect(() => {
        props.toggleMultiselection(false)
        auth.onAuthStateChanged(authState => {
            if (authState) {
                const user = auth.currentUser?.uid
                database.collection('users').doc(user).get()
                    .then(doc => {
                        props.setNotes(doc.data()!.notes)
                        setLoading(false)
                    })
            }
        })
        props.setOptions(navOptions)
    }, []) // eslint-disable-line

    useEffect(() => {
        setAllNotes(props.notes)
        setFilteredNotes([...props.notes.sort((a, b) => sortFunction(a, b, order))])
    }, [props.notes]) // eslint-disable-line

    function onNoteCardClick(noteId: string) {
        if (props.multiselection) {
            const newNotes = filteredNotes.map(note => {
                if (note.id !== noteId) return note
                else return { ...note, selected: !note.selected }
            })
            setFilteredNotes(newNotes)
        } else {
            props.editNote(filteredNotes.filter(note => note.id === noteId)[0])
            props.history.push('/home/edit-note')
        }
    }

    function deleteSelected() {
        const delNotes = filteredNotes.filter(note => note.selected)
        setLoading(true)
        sendNotesTo("notes", "trash", delNotes)
            .then(res => {
                setLoading(false)
                props.setNotes(res.notes)
                props.setTrash(res.trash)
                props.toggleMultiselection()
            })
    }

    return (
        <div className="Overview">
            {
                loading
                    ? <div className="SpinnerResizer"><Spinner /></div>
                    : (
                        <>
                            <div className={[
                                "MultiselectionOptions",
                                props.multiselection && filteredNotes.length > 0
                                    ? "Show"
                                    : ""
                            ].join(' ')}>
                                <Button
                                    onclick={
                                        () => setFilteredNotes(
                                            selectAll(filteredNotes)
                                        )}>
                                    <Icon icon={selectAllIcon} />
                                    <span>Select All</span>
                                </Button>
                                <Button
                                    onclick={
                                        () => setFilteredNotes(
                                            unselectAll(filteredNotes)
                                        )}>
                                    <Icon icon={selectOffIcon} />
                                    <span>Unselect All</span>
                                </Button>
                                <Button
                                    onclick={() => setFilteredNotes(
                                        invertSelection(filteredNotes)
                                    )}>
                                    <Icon icon={selectInverseIcon} />
                                    <span>Invert Selection</span>
                                </Button>
                                <Button btnType="Danger" onclick={deleteSelected}>
                                    <Icon icon={deleteCircleIcon} />
                                    <span>Delete Selected</span>
                                </Button>
                            </div>

                            <div className="NotesOverview">
                                {filteredNotes.map(note => (
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
                                <div className="AddNoteCard" onClick={addNote}>
                                    <span>Add Note</span>
                                    <Icon icon={plusIcon} />
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        notes: state.overview.notes,
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
        editNote(note: Note) { dispatch(navActions.setCurrentNote(note)) },
        setNotes(notes: Note[]) { dispatch(overviewActions.setNotes(notes)) },
        setCurrentNote(note: Note) { dispatch(navActions.setCurrentNote(note)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)