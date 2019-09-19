import { notification } from 'antd'
import { all, takeEvery, call } from 'redux-saga/effects'
// import {
//     getBlogList,
//     viewDetail,
//     getFilterOrder
// } from 'services/orders'
import {
    getProductList
} from 'services/products'
import actions from './actions'


export function* getProductListSaga() {
    try {
        const result = yield call(getProductList)
        console.log(result)
        // const { data } = result
        // console.log("HERE==>>>>", data)
        // if (result.status === 200) {
        //     yield put({
        //         type: 'orders/SET_STATE',
        //         payload: {
        //             orders: data.data.order,
        //             detail: data.data.orders
        //         },
        //     })
        // }
        // else {
        //     notification.warning({
        //         message: 'Error',
        //         description: 'Some Error Occured',
        //     })
        // }
    } catch (err) {
        notification.warning({
            message: 'Error',
            description: 'Some Error Occured',
        })
    }
}

// export function* viewOrderDetail(payload) {
//     try {
//         const result = yield call(viewDetail, payload)
//         console.log(result)
//         const { data } = result
//         if (result.status === 200) {
//             yield put({
//                 type: 'orders/SET_DETAIL',
//                 payload: {
//                     orders: data.data.order,
//                 },
//             })
//         }
//         else {
//             notification.warning({
//                 message: 'Error',
//                 description: 'Some Error Occured',
//             })
//         }
//     } catch (err) {
//         notification.warning({
//             message: 'Error',
//             description: 'Some Error Occured',
//         })
//     }
// }

// export function* getFilterOrderSaga(payload) {
//     try {
//         const result = yield call(getFilterOrder, payload)
//         const { data } = result
//         if (result.status === 200) {
//             yield put({
//                 type: 'orders/SET_STATE',
//                 payload: {
//                     orders: data.data,
//                 },
//             })
//         }
//         else {
//             notification.warning({
//                 message: 'Error',
//                 description: 'Some Error Occured',
//             })
//         }
//     } catch (err) {
//         notification.warning({
//             message: 'Error',
//             description: 'Some Error Occured',
//         })
//     }
// }

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_LIST, getProductListSaga),
        // takeEvery(actions.VIEW_DETAIL, viewOrderDetail),
        // takeEvery(actions.GET_FILTER_LIST, getFilterOrderSaga)
    ])
}