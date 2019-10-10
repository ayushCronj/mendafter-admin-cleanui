import axios from 'axios';

export async function getProductList() {
    const url = "http://localhost:3002/api/dashboard/getAllProducts"
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

export async function editProductDetail(body) {
    // console.log(body.payload)
    const url = `http://localhost:3002/api/dashboard/updateProduct/${body.payload.data.productId}`
    // const data = {
    //     data: {
    //         sku: body.payload[0].sku,
    //         productId: body.payload[0].productId,
    //         description: body.payload[0].description,
    //         name: body.payload[0].name
    //     }
    // }
    return axios
        .post(url, body.payload)
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

export async function getVendorName(body) {
    // console.log(body)
    const url = `http://localhost:3002/api/vendor/getVendorById/${body.payload}`
    // console.log(url)
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
