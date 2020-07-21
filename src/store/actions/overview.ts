// Action Types
import overviewTypes from 'store/actions/actionTypes/overviewTypes'

// Redux Dispatch type
import { Dispatch } from 'redux'

// Interfaces
import { Note } from 'interfaces'

const actions = {
    setNotes: (notes: Note[]) => ({ type: overviewTypes.SET_NOTES, notes })
}

export default {
    setNotes(notes: Note[]) { 
        return function(dispatch: Dispatch) {
            dispatch(actions.setNotes(notes))
        }
    }
}