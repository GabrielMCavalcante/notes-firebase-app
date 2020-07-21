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

// Icons
import { Icon } from '@iconify/react'
import selectAllIcon from '@iconify/icons-mdi/select-all'
import selectOffIcon from '@iconify/icons-mdi/select-off'
import selectInverseIcon from '@iconify/icons-mdi/select-inverse'
import deleteCircleOutlineIcon from '@iconify/icons-mdi/delete-circle-outline'
import plusIcon from '@iconify/icons-mdi/plus'
import plus from '@iconify/icons-mdi/plus'
import vector_arrange_above from '@iconify/icons-mdi/vector-arrange-above'
import trash_can_outline from '@iconify/icons-mdi/trash-can-outline'

// CSS styles
import './styles.css'

// Interfaces
import { Note, Option } from 'interfaces'

interface Props {
    notes: Note[],
    multiselection: boolean,
    [key: string]: any
}

function Overview(props: Props) {

    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

    function addNote() {
        const user = auth.currentUser?.uid
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
            items: ["Title", "Creation", "Modification"]
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
            ]
        },
        {
            text: "Multiselection",
            icon: <Icon icon={vector_arrange_above} />,
            type: "normal",
            click: props.toggleMultiselection
        },
        {
            text: "Deleted notes",
            icon: <Icon icon={trash_can_outline} />,
            type: "normal",
            click: () => props.history.push("/home/deleted-notes")
        }
    ]

    useEffect(() => {
        auth.onAuthStateChanged(authState => {
            if (authState) {
                const user = auth.currentUser?.uid
                database.collection('users').doc(user).get()
                    .then(doc => {
                        props.setNotes(doc.data()!.notes)
                    })
            }
        })
        props.setOptions(navOptions)
    }, []) // eslint-disable-line

    useEffect(() => {
        setFilteredNotes(props.notes)
    }, [props.notes])

    function onNoteCardClick(noteIndex: number) {
        if (props.multiselection) {
            const newNotes = filteredNotes.map((note, i) => {
                if (i !== noteIndex) return note
                else return { ...note, selected: !note.selected }
            })
            setFilteredNotes(newNotes)
        } else {
            props.editNote(filteredNotes[noteIndex])
            props.history.push('/home/edit-note')
        }
    }

    function selectAll() {
        const newNotes = filteredNotes.map(note => ({ ...note, selected: true }))
        setFilteredNotes(newNotes)
    }

    function unselectAll() {
        const newNotes = filteredNotes.map(note => ({ ...note, selected: false }))
        setFilteredNotes(newNotes)
    }

    function invertSelection() {
        const newNotes = filteredNotes.map(note => {
            if (note.selected) return { ...note, selected: false }
            else return { ...note, selected: true }
        })
        setFilteredNotes(newNotes)
    }

    function deleteSelected() {
        const delNotes = filteredNotes.filter(note => note.selected)
        const fltdNotes = filteredNotes.filter(note => !note.selected)

        const user = auth.currentUser?.uid
        database.collection('users').doc(user).get()
            .then(snapshot => {
                const notes: Note[] = snapshot.data()!.notes
                const trash: Note[] = snapshot!.data()!.trash

                delNotes.forEach(delNote => {
                    notes.forEach((note, index) => {
                        if (delNote.id === note.id) {
                            notes.splice(index, 1)
                            Object.assign(delNote, { deleted: Date.now(), selected: false })
                            trash.push(delNote)
                        }
                    })
                })

                database.collection('users').doc(user).update({ notes, trash })
                    .then(() => {
                        props.setNotes(notes)
                        props.sendToTrash(trash)
                    })
            })

        delNotes.forEach(note => {
            note.deleted = Date.now()
            note.selected = false
        })

        props.sendToTrash(delNotes)
        props.toggleMultiselection()

        setFilteredNotes(fltdNotes)
    }

    return (
        <div className="Overview">
            <div className={["MultiselectionOptions", props.multiselection ? "Show" : ""].join(' ')}>
                <Button onclick={selectAll}>
                    <Icon icon={selectAllIcon} />
                    <span>Select All</span>
                </Button>
                <Button onclick={unselectAll}>
                    <Icon icon={selectOffIcon} />
                    <span>Unselect All</span>
                </Button>
                <Button onclick={invertSelection}>
                    <Icon icon={selectInverseIcon} />
                    <span>Invert Selection</span>
                </Button>
                <Button btnType="Danger" onclick={deleteSelected}>
                    <Icon icon={deleteCircleOutlineIcon} />
                    <span>Delete Selected</span>
                </Button>
            </div>

            <div className="NotesOverview">
                {filteredNotes.map((note, i) => (
                    <div key={i} className="NoteCard" onClick={() => onNoteCardClick(i)}>
                        <div className="NoteCardSelector" style={{ backgroundColor: note.color }}>
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
                                    note.content && (note.content.length <= 80
                                        ? note.content
                                        : note.content.substring(0, 79).concat('...'))
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
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        notes: state.overview.notes,
        multiselection: state.navigation.multiselection,
        currentUser: state.navigation.currentUser
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: any) { dispatch(navActions.setOptions(options)) },
        toggleMultiselection() { dispatch(navActions.toggleMultiselection()) },
        sendToTrash(trash: any) { dispatch(deletedNotesActions.setTrash(trash)) },
        editNote(note: Note) { dispatch(navActions.setCurrentNote(note)) },
        setNotes(notes: Note[]) { dispatch(overviewActions.setNotes(notes)) },
        setCurrentNote(note: Note) { dispatch(navActions.setCurrentNote(note))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)