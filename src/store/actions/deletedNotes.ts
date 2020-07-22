// Action Types
import deletedNotesTypes from 'store/actions/actionTypes/deletedNotesTypes'

// Redux Dispatch type
import { Dispatch } from 'redux'

// Interfaces
import { Note } from 'interfaces'

const actions = {
    setTrash: (trash: Note[]) => ({ type: deletedNotesTypes.SET_TRASH, trash })
}

export default {
    setTrash: (trash: Note[]) => (dispatch: Dispatch) => dispatch(actions.setTrash(trash))
}