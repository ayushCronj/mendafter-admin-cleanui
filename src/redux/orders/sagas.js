import { notification } from 'antd'
import { all, takeEvery, put, call } from 'redux-saga/effects'
import {
    getBlogList,
    viewDetail,
    getFilterOrder,
    updateShippingAddress
} from 'services/orders'
import actions from './actions'


export function* getBlogListSaga() {
    try {
        const result = yield call(getBlogList)
        const { data } = result
        console.log("HERE==>>>>", data)
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
        console.log(result)
        const { data } = result
        if (result.status === 200) {
            yield put({
                type: 'orders/SET_DETAIL',
                payload: {
                    orders: data.data.order,
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
        console.log(data)
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

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_LIST, getBlogListSaga),
        takeEvery(actions.VIEW_DETAIL, viewOrderDetail),
        takeEvery(actions.GET_FILTER_LIST, getFilterOrderSaga),
        takeEvery(actions.UPDATE_SHIPPING_ADDRESS, updateShippingAddressSaga)
    ])
}