import { AnyAction } from 'redux'

// Action Types
import navTypes from 'store/actions/actionTypes/navigationTypes'

const initialState = {
    options: [],
    multiselection: false,
    mode: 'overview'
}

export default function NavigationReducer(state = initialState, action: AnyAction) {
    
    function toggleMultiselection(state: any) {
        return { ...state, multiselection: !state.multiselection }
    }

    function setOptions(state: any, options: any) {
        return { ...state, options }
    }

    switch(action.type) {
        case navTypes.SET_OPTIONS: return setOptions(state, action.options)
        case navTypes.TOGGLE_MULTISELECTION: return toggleMultiselection(state)
        default: return state
    }
}