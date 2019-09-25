import axios from 'axios';

export async function getBlogList() {
    const url = "http://localhost:3002/api/orders/getAllOrders"
    return axios
        .get(url)
        .then(response => {
            if (response) {
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}

export async function viewDetail(body) {
    const url = `http://localhost:3002/api/orders/getOrderItems/${body.payload.id}`
    return axios
        .get(url)
        .then(response => {
            if (response) {
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}

export async function getFilterOrder(body) {
    const url = 'http://localhost:3002/api/orders/filterOrder'
    return axios
        .post(url, body.payload.values)
        .then(response => {
            if (response) {
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}

export async function updateShippingAddress(body) {
    const url = 'http://localhost:3002/api/orders/updateShippingAddress'
    console.log("HI")
    console.log(body.payload)
    return axios
        .post(url, body.payload.data)
        .then(response => {
            if (response) {
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}