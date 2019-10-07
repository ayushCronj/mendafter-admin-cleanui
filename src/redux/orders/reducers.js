import types from './actions'

const initialState = {
    orders: [],
    details: [],
    detail: []
}

export default function blogReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_STATE:
            // console.log(action.payload)
            return { ...state, ...action.payload }
        case types.SET_DETAIL:
            // console.log(action.payload)
            return {
                ...state,
                details: { ...state.details, ...action.payload },
                // detail: [action.payload,...state.tasks]
                detail: { ...action.payload.orders.data }
                // details: action.payload,
            }
        case types.UPDATE_DETAIL: {
            // console.log(state)
            // console.log(action.payload)
            const somear = [...state.orders.data]
            const obj1 = somear.find(o => o.id === action.payload.orders.order.data.id)
            // console.log(obj1)
            obj1.shipping_address = action.payload.orders.order.data.shipping_address
            // console.log(obj1)
            // console.log("HHHHHHHHHHHHHH")
            // console.log(somear)
            // obj1.quantity = parseInt(e.target.value, 10)
            // console.log(obj1)
            return state
        }
        case types.SET_VENDOR_DETAIL: {
            // console.log(action.payload)
            return { ...state, ...action.payload }
        }
        default:
            return state

    }
}