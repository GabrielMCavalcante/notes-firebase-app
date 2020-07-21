import { AnyAction } from 'redux'

// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

// Interfaces
import { Note, Option } from 'interfaces'

interface State {
    options: Option[],
    multiselection: boolean,
    currentNote: Note | null
}

// Initial State
const initialState = {
    options: [],
    multiselection: false,
    currentNote: null
}

export default function NavigationReducer(state: State = initialState, action: AnyAction) {
    
    function toggleMultiselection(state: State) {
        return { ...state, multiselection: !state.multiselection }
    }

    function setOptions(state: State, options: Option[]) {
        return { ...state, options }
    }

    function setCurrentNote(state: State, currentNote: Note) {
        return { ...state, currentNote }
    }

    switch(action.type) {
        case navTypes.SET_OPTIONS: return setOptions(state, action.options)
        case navTypes.TOGGLE_MULTISELECTION: return toggleMultiselection(state)
        case navTypes.SET_CURRENT_NOTE: return setCurrentNote(state, action.currentNote)
        default: return state
    }
}