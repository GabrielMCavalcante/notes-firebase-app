import { AnyAction } from 'redux'

// Action Types
// import overviewTypes from 'store/actions/actionTypes/overviewTypes'

const initialState = {
    notes: [
        { title: 'First Note', content: 'I am the first dummy note created for testing purposes I am the first dummy note created for testing purposes', color: 'red', selected: false },
        { title: 'Second Note', content: 'I am the second dummy note created for testing purposes', color: 'blue', selected: false },
        { title: 'Third Note', content: 'I am the third dummy note created for testing purposes', color: 'green', selected: false },
        { title: 'Fourth Note', content: 'I am the fourth dummy note created for testing purposes', color: 'yellow', selected: false },
        { title: 'Fifth Note', content: 'I am the fifth dummy note created for testing purposes', color: 'purple', selected: false },
    ]
}

export default function OverviewReducer(state = initialState, action: AnyAction) {
    switch(action.type) {
        default: return state
    }
}