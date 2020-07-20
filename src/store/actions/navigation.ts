// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

// Redux Dispatch type
import { Dispatch } from 'redux'

const actions = {
    setOptions: (options: any) => ({type: navTypes.SET_OPTIONS, options}),
    toggleMultiselection: () => ({ type: navTypes.TOGGLE_MULTISELECTION })
}

export default {
    setOptions(options: any) { 
        return function(dispatch: Dispatch) {
            dispatch(actions.setOptions(options))
        }
    },
    toggleMultiselection() {
        return function(dispatch: Dispatch) { 
            dispatch(actions.toggleMultiselection())
        }
    }
}