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

export async function viewDetail() {
    // const url = `http://localhost:3002/api/orders/getOrderItems/${body.payload.id}`
    // return axios
    //     .get(url)
    //     .then(response => {
    //         if (response) {
    //             return response
    //         }
    //         return false
    //     })
    //     .catch(error => {
    //         return error
    //     })
}
