// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

// Redux Dispatch type
import { Dispatch } from 'redux'

// Interfaces
import { Note, Option } from 'interfaces'

const actions = {
    setOptions: (options: Option[]) => ({ type: navTypes.SET_OPTIONS, options }),
    toggleMultiselection: (mode?: boolean) => ({ type: navTypes.TOGGLE_MULTISELECTION, mode }),
    setCurrentNote: (currentNote: Note) => ({ type: navTypes.SET_CURRENT_NOTE, currentNote }),
    setCurrentUser: (currentUser: any) => ({ type: navTypes.SET_CURRENT_USER, currentUser }),
    setSearch: (search: string) => ({ type: navTypes.SET_SEARCH, search })
}

export default {
    setOptions(options: Option[]) {
        return function (dispatch: Dispatch) {
            dispatch(actions.setOptions(options))
        }
    },
    toggleMultiselection(mode?: boolean) {
        return function (dispatch: Dispatch) {
            dispatch(actions.toggleMultiselection(mode))
        }
    },
    setCurrentNote(currentNote: Note) {
        return function (dispatch: Dispatch) {
            dispatch(actions.setCurrentNote(currentNote))
        }
    },
    setCurrentUser(currentUser: any) {
        return function (dispatch: Dispatch) {
            dispatch(actions.setCurrentUser(currentUser))
        }
    },
    setSearch(search: string) {
        return function (dispatch: Dispatch) {
            dispatch(actions.setSearch(search))
        }
    }
}