import { AnyAction } from 'redux'

// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

// Interfaces
import { Note, Option } from 'interfaces'

interface State {
    options: Option[],
    multiselection: boolean,
    currentNote: Note | null,
    currentUser: any | null,
    search: string | null
}

// Initial State
const initialState = {
    options: [],
    multiselection: false,
    currentNote: null,
    currentUser: null,
    search: null
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

    function setCurrentUser(state: State, currentUser: any) {
        return { ...state, currentUser }
    }

    function setSearch(state: State, search: string) {
        return { ...state, search }
    }

    switch(action.type) {
        case navTypes.SET_OPTIONS: return setOptions(state, action.options)
        case navTypes.TOGGLE_MULTISELECTION: return toggleMultiselection(state)
        case navTypes.SET_CURRENT_NOTE: return setCurrentNote(state, action.currentNote)
        case navTypes.SET_CURRENT_USER: return setCurrentUser(state, action.currentUser)
        case navTypes.SET_SEARCH: return setSearch(state, action.search)
        default: return state
    }
}