import { AnyAction } from 'redux'

// Action Types
import overviewTypes from 'store/actions/actionTypes/overviewTypes'

// Interfaces
import { Note } from 'interfaces'
interface State {
    notes: Note[]
}

// Initial State
const initialState = {
    notes: []
}

export default function OverviewReducer(state = initialState, action: AnyAction) {
    
    function setNotes(state: State, notes: Note[]) {
        return { ...state, notes }
    }

    switch(action.type) {
        case overviewTypes.SET_NOTES: return setNotes(state, action.notes)
        default: return state
    }
}