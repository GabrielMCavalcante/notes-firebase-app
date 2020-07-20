import React, { useState, useEffect } from 'react'

// React redux connection
import { connect } from 'react-redux' 

// Redux actions
import navActions from 'store/actions/navigation'

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

interface Note {
    title: string,
    content: string,
    creation: number,
    modification: number,
    selected: boolean,
    color: string
}

interface Props {
    notes: Note[],
    multiselection: boolean,
    [key: string]: any
}

function Overview(props: Props) {

    const [filteredNotes, setFilteredNotes] = useState(props.notes)

    const navOptions = [
        {
            text: "Add note",
            icon: <Icon icon={plus} />,
            type: "normal",
            click: () => console.log('add note')
        },
        {
            text: "Order By",
            first: 'Title',
            type: "dropdown",
            items: ["Title", "Creation", "Modification"],
            click: () => console.log('order by')
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
            click: () => console.log('filter by')
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
            click: () => console.log('deleted notes')
        }
    ]

    useEffect(() => {
        props.setOptions(navOptions)
    }, []) // eslint-disable-line

    function onNoteCardClick(noteIndex: number) {
        if (props.multiselection) {
            const newNotes = filteredNotes.map((note, i) => {
                if (i !== noteIndex) return note
                else return { ...note, selected: !note.selected }
            })
            setFilteredNotes(newNotes)
        } else console.log('card click')
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
        const fltdNotes = filteredNotes.filter(note => !note.selected)
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
                {/*render dynamically created cards from server*/}
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
                                    note.content.length <= 80
                                    ? note.content
                                    : note.content.substring(0, 79).concat('...')
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

function mapStateToProps(state: any) {
    return {
        notes: state.overview.notes,
        multiselection: state.navigation.multiselection
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: any) { dispatch(navActions.setOptions(options)) },
        toggleMultiselection() { dispatch(navActions.toggleMultiselection()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)