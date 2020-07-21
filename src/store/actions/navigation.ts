// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

// Redux Dispatch type
import { Dispatch } from 'redux'

// Interfaces
import { Note, Option } from 'interfaces'

const actions = {
    setOptions: (options: Option[]) => ({type: navTypes.SET_OPTIONS, options}),
    toggleMultiselection: () => ({ type: navTypes.TOGGLE_MULTISELECTION }),
    setCurrentNote: (currentNote: Note) => ({ type: navTypes.SET_CURRENT_NOTE, currentNote}),
    setCurrentUser: (currentUser: any) => ({ type: navTypes.SET_CURRENT_USER, currentUser})
}

export default {
    setOptions(options: Option[]) { 
        return function(dispatch: Dispatch) {
            dispatch(actions.setOptions(options))
        }
    },
    toggleMultiselection() {
        return function(dispatch: Dispatch) { 
            dispatch(actions.toggleMultiselection())
        }
    },
    setCurrentNote(currentNote: Note) {
        return function(dispatch: Dispatch) {
            dispatch(actions.setCurrentNote(currentNote))
        }
    },
    setCurrentUser(currentUser: any) {
        return function(dispatch: Dispatch) {
            dispatch(actions.setCurrentUser(currentUser))
        }
    }
}