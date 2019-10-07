import { notification } from 'antd'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
    getBlogList,
    viewDetail,
    getFilterOrder,
    updateShippingAddress,
    getName,
    // getName
} from 'services/orders'
import actions from './actions'


export function* getBlogListSaga() {
    try {
        const result = yield call(getBlogList)
        const { data } = result
        // console.log("HERE==>>>>", data)
        if (result.status === 200) {
            yield put({
                type: 'orders/SET_STATE',
                payload: {
                    orders: data.data.order,
                    detail: data.data.orders
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

export function* viewOrderDetail(payload) {
    try {
        const result = yield call(viewDetail, payload)
        // console.log(result)
        const { data } = result
        if (result.status === 200) {
            // console.log(data.product)
            // data.product.map((item) => {
            //     if (!Array.isArray(item)) {
            //         const result2 = getName1(item.vendorId)
            //         console.log(result2)
            //     }
            //     return null
            // })
            // data.product.map((item) => {
            //     if (!Array.isArray(item)) {
            //         // const result2 = yield put({
            //         //     type: 'getname',
            //         //     payload: { id: item.vendorId }
            //         // })
            //         const result2 = yield call(getName , item.vendorId)
            //         console.log(result2)
            //     }
            //     return null
            // })
            yield put({
                type: 'orders/SET_DETAIL',
                payload: {
                    orders: data,
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

export function* getFilterOrderSaga(payload) {
    try {
        const result = yield call(getFilterOrder, payload)
        const { data } = result
        if (result.status === 200) {
            yield put({
                type: 'orders/SET_STATE',
                payload: {
                    orders: data.data,
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

export function* updateShippingAddressSaga(payload) {
    try {
        const result = yield call(updateShippingAddress, payload)
        const { data } = result
        // console.log(data)
        if (result.status === 200) {
            yield put({
                type: 'orders/UPDATE_LIST',
                payload: {
                    orders: data.data,
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

export function* getName1(payload) {
    try {
        const result = yield call(getName, payload)
        const { data } = result
        // console.log(data)
        // console.log(data)
        if (result.status === 200) {
            yield put({
                type: 'orders/SET_VENDOR_DETAIL',
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
        takeEvery(actions.GET_LIST, getBlogListSaga),
        takeEvery(actions.VIEW_DETAIL, viewOrderDetail),
        takeEvery(actions.GET_FILTER_LIST, getFilterOrderSaga),
        takeEvery(actions.UPDATE_SHIPPING_ADDRESS, updateShippingAddressSaga),
        takeEvery(actions.GET_NAME, getName1)
    ])
}