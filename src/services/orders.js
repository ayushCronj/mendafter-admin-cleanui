import axios from 'axios';

export async function getBlogList() {
    const url = "http://localhost:3002/api/orders/getAllOrders"
    return axios
        .get(url)
        .then(response => {
            if (response) {
                // console.log(response.data.product)
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}

export async function viewDetail(body) {
    const url = `http://localhost:3002/api/admin/getOrderItems/${body.payload.id}`
    return axios
        .get(url)
        .then(async response => {
            if (await response) {
                const promiseAr = []
                response.data.product.map((item) => {
                    if (!Array.isArray(item)) {
                        promiseAr.push(getName(item.vendorId))
                        // console.log(some)
                    }
                    return null
                })
                Promise.all(promiseAr).then(odata => {
                    // console.log(odata)
                    odata.map((item)=> {
                        console.log(item.data.data.vendorName)
                        return null
                    })
                    // response.data.odata = odata
                    return response
                })
                // return response
            }
            return response
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

    // console.log(body.payload)
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

export async function getName(body) {
    // console.log(body)
    const url = `http://localhost:3002/api/vendor/getVendorById/${body}`
    // console.log(url)
    return axios
        .get(url)
        .then(response => {
            if (response) {
                // console.log(response)
                // console.log("gename===>", response.data.data.vendorName)
                return response
            }
            return false
        })
        .catch(error => {
            return error
        })
}
