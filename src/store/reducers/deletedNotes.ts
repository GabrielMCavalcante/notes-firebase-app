import { AnyAction } from 'redux'

// Action Types
import deletedNotesTypes from 'store/actions/actionTypes/deletedNotesTypes'

// Interfaces
import { Note } from 'interfaces'
interface State {
    trash: Note[]
}

// Initial State
const initialState = {
    trash: []
}

export default function DeletedNotesReducer(state: State = initialState, action: AnyAction) {
    
    function setTrash(state: State, trash: Note[]) {
        return { ...state, trash }
    }

    switch(action.type) {
        case deletedNotesTypes.SET_TRASH: return setTrash(state, action.trash)
        default: return state
    }
}