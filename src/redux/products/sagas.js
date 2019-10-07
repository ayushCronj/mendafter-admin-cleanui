import { notification } from 'antd'
import { all, takeEvery, call, put } from 'redux-saga/effects'
import {
    getProductList,
    getVendorName
} from 'services/products'
import actions from './actions'


export function* getProductListSaga() {
    try {
        const result = yield call(getProductList)
        // console.log(result)
        const { data } = result
        if (result.status === 200) {
            yield put({
                type: 'products/SET_STATE',
                payload: {
                    products: data.data.products,
                },
            })
        }
        else {
            notification.warning({
                message: 'Error',
                description: 'Some Error Occured',
            })
        }
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

export function* getVendorNameSaga(payload) {
    try {
        const result = yield call(getVendorName, payload)
        const { data } = result
        if (result.status === 200) {
            yield put({
                type: 'products/SET_VENDOR_DETAIL',
                payload: {
                    vendordetails: data.data,
                },
            })
        }
        else {
            notification.warning({
                message: 'Error',
                description: 'Some Error Occured',
            })
        }
    } catch (err) {
        notification.warning({
            message: 'Error',
            description: 'Some Error Occured',
        })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_LIST, getProductListSaga),
        takeEvery(actions.GET_VENDOR_NAME, getVendorNameSaga)
    ])
}