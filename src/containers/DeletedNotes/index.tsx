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
import fileRestoreOutlineIcon from '@iconify/icons-mdi/file-restore-outline'
import home from '@iconify/icons-mdi/home'
import vector_arrange_above from '@iconify/icons-mdi/vector-arrange-above'

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
    trash: Note[],
    multiselection: boolean,
    [key: string]: any
}

function DeletedNotes(props: Props) {

    const [filteredTrash, setFilteredTrash] = useState(props.trash)

    const navOptions = [
        {
            text: "Home",
            icon: <Icon icon={home} />,
            type: "normal",
            click: () => props.history.push('/home/overview')
        },
        {
            text: "Order By",
            first: 'Title',
            type: "dropdown",
            items: ["Title", "Creation", "Modification", "Deletion"],
            click: function () { }
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
            click: function () { }
        },
        {
            text: "Multiselection",
            icon: <Icon icon={vector_arrange_above}/>,
            type: "normal",
            click: props.toggleMultiselection
        }
    ]

    useEffect(() => {
        props.setOptions(navOptions)
    }, []) // eslint-disable-line

    function onNoteCardClick(noteIndex: number) {
        if (props.multiselection) {
            const newNotes = filteredTrash.map((note, i) => {
                if (i !== noteIndex) return note
                else return { ...note, selected: !note.selected }
            })
            setFilteredTrash(newNotes)
        } else console.log('card click')
    }

    function selectAll() {
        const newNotes = filteredTrash.map(note => ({ ...note, selected: true }))
        setFilteredTrash(newNotes)
    }

    function unselectAll() {
        const newNotes = filteredTrash.map(note => ({ ...note, selected: false }))
        setFilteredTrash(newNotes)
    }

    function invertSelection() {
        const newNotes = filteredTrash.map(note => {
            if (note.selected) return { ...note, selected: false }
            else return { ...note, selected: true }
        })
        setFilteredTrash(newNotes)
    }

    function deleteSelected() {
        const fltdNotes = filteredTrash.filter(note => !note.selected)
        setFilteredTrash(fltdNotes)
    }

    function restoreSelected() {
        const fltdNotes = filteredTrash.filter(note => note.selected)
        console.log('restoring following notes:', fltdNotes)
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
                <Button btnType="Success" onclick={restoreSelected}>
                    <Icon icon={fileRestoreOutlineIcon} />
                    <span>Restore Selected</span>
                </Button>
            </div>

            <div className="NotesOverview">
                {filteredTrash.map((note, i) => (
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
            </div>
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        trash: state.deletedNotes.trash,
        multiselection: state.navigation.multiselection
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setOptions(options: any) { dispatch(navActions.setOptions(options)) },
        toggleMultiselection() { dispatch(navActions.toggleMultiselection()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletedNotes)