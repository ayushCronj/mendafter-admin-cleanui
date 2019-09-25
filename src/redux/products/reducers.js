import types from './actions'

const initialState = {
    products: [],
    details: [],
    // detail: []
}

export default function blogReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_STATE:
            console.log(action.payload)
            return { ...state, ...action.payload }
        case types.SET_DETAIL:
            return {
                ...state,
                details: action.payload,
            }
        default:
            return state
    }
}