import React, { useState } from 'react'

// Components
import Button from 'components/UI/Button'

// Icons
import { Icon } from '@iconify/react'
import selectAllIcon from '@iconify/icons-mdi/select-all'
import selectOffIcon from '@iconify/icons-mdi/select-off'
import selectInverseIcon from '@iconify/icons-mdi/select-inverse'
import deleteCircleOutlineIcon from '@iconify/icons-mdi/delete-circle-outline'
import plusIcon from '@iconify/icons-mdi/plus'

// CSS styles
import './styles.css'

const dummyNotesFromRedux = [
    { title: 'First Note', content: 'I am the first dummy note created for testing purposes', color: 'red', selected: false },
    { title: 'Second Note', content: 'I am the second dummy note created for testing purposes', color: 'blue', selected: false },
    { title: 'Third Note', content: 'I am the third dummy note created for testing purposes', color: 'green', selected: false },
    { title: 'Fourth Note', content: 'I am the fourth dummy note created for testing purposes', color: 'yellow', selected: false },
    { title: 'Fifth Note', content: 'I am the fifth dummy note created for testing purposes', color: 'purple', selected: false },
]

function Overview() {

    const [multiselection,] = useState(false) // Settar este estado 
    // no redux!!
    const [notes, setNotes] = useState(dummyNotesFromRedux)

    function onNoteCardClick(noteIndex: number) {
        if (multiselection) {
            const newNotes = notes.map((note, i) => {
                if (i !== noteIndex) return note
                else return { ...note, selected: !note.selected }
            })
            setNotes(newNotes)
        } else console.log('card click')
    }

    function selectAll() {
        const newNotes = notes.map(note => ({ ...note, selected: true }))
        setNotes(newNotes)
    }

    function unselectAll() {
        const newNotes = notes.map(note => ({ ...note, selected: false }))
        setNotes(newNotes)
    }

    function invertSelection() {
        const newNotes = notes.map(note => {
            if (note.selected) return { ...note, selected: false }
            else return { ...note, selected: true }
        })
        setNotes(newNotes)
    }

    function deleteSelected() {
        const filteredNotes = notes.filter(note => !note.selected)
        setNotes(filteredNotes)
    }

    return (
        <div className="Overview">
            <div className={["MultiselectionOptions", multiselection && "Show"].join(' ')}>
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
                {/*render dynamically created cards from server*/}
                {notes.map((note, i) => (
                    <div key={i} className="NoteCard" onClick={() => onNoteCardClick(i)}>
                        <div className="NoteCardSelector" style={{ backgroundColor: note.color }}>
                            {
                                multiselection && 
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
                                    note.content.length <= 100
                                    ? note.content
                                    : note.content.substring(0, 99).concat('...')
                                }
                            </p>
                        </div>
                    </div>
                ))}
                <div className="AddNoteCard">
                    <span>Add Note</span>
                    <Icon icon={plusIcon} />
                </div>
            </div>
        </div>
    )
}

export default Overview