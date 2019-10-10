const csv = require('csv-parser');
const fs = require('fs');
var Papa = require('papaparse');
let arr = []
const file = fs.createReadStream('Copy of PHASE 2 PRODUCTS AND COPY - CONSOLIDATED.csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'products1.csv',
    header: [
        { id: 'type', title: "type" },
        { id: 'name', title: "name" },
        { id: 'slug', title: "slug" },
        { id: 'sku', title: "sku" },
        { id: 'category1', title: "category1" },
        { id: 'subCategory1', title: "subCategory1" },
        { id: 'category2', title: "category2" },
        { id: 'subCategory2', title: "subCategory2" },
        { id: 'category3', title: "category3" },
        { id: 'subCategory3', title: "subCategory3" },
        { id: 'vendorProductId', title: "vendorProductId" },
        { id: 'vendorId', title: "vendorId" },
        { id: 'vendorName', title: "vendorName" },
        { id: 'description', title: "description" },
        { id: 'manage_stock', title: "manage_stock" },
        { id: 'status', title: "status" },
        { id: 'attributes', title: 'attributes' },
        { id: 'tags', title: 'tags' },
        { id: 'collection', title: 'collection' },
        { id: 'commodity_type', title: "commodity_type" },
        { id: 'price', title: "price" },
    ]
});

fs.createReadStream('vendors - vendors.csv')
    .pipe(csv())
    .on('data', (row) => {
        arr.push(row)
        // console.log(row);
    })
    .on('end', () => {
        // console.log(arr);
    });

// let arr1 = []
// fs.createReadStream('Copy of PHASE 2 PRODUCTS AND COPY - CONSOLIDATED.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         arr1.push(row)
//         // console.log(row);
//     })
//     .on('end', () => {
//         console.log(arr1);
//     });
data = []
let arr2 = []
new Promise(//create one promise
    (resolve, reject) =>
        Papa.parse(file, {
            // header: true,
            // delimiter: ',',
            // dynamicTyping: true,
            complete: resolve,//resolve the promise when complete
            error: reject
        })
).then(
    function (results) {
        // results.data.map(item => {
        //     // if (item.find("Radiation-Blocking Headphones\n")) {
        //     //     console.log("hi")
        //     // }
        //     console.log(item[5])
        //     // item.map((item2)=>{
        //     //     console.log(item2)
        //     // })

        // }
        // )
        // const newobj = {}
        // results.data.map((item, index) => {
        //     newobj[index] = item

        // })
        var objs = results.data.map(function (x) {
            return (Object.assign({}, x))
        });
        // console.log(objs);
        //         newobj.filter(e => e['vendorId (S)'] === item.vendorId).length > 0)
        // console.log(newobj)
        fs.createReadStream('products.csv')
            .pipe(csv())
            .on('data', (row) => {
                arr2.push(row)
            })
            .on('end', () => {
                arr2.map(item => {
                    if (item.hasOwnProperty('name') && item.name != '') {
                        // console.log('hi')
                        item.manage_stock = "FALSE"
                        // console.log(item.price)
                    }
                    if (arr.filter(e => e['vendorId (S)'] === item.vendorId).length > 0) {
                        let index = arr.findIndex(e => e['vendorId (S)'] === item.vendorId)
                        item.vendorName = arr[index]['vendorName (S)']
                    }
                    else if (item.hasOwnProperty('vendorId') && item.vendorId !== '') {
                        item.vendorName = 'n/a'
                    }
                    if (objs.filter(e => e[1] === item.name).length > 0) {
                        let index = objs.findIndex(e => e[1] === item.name)
                        if (index !== 1) {
                            item.category1 = objs[index][5]
                            item.subCategory1 = objs[index][6]
                            item.category2 = objs[index][7]
                            item.subCategory2 = objs[index][8]
                            item.category3 = objs[index][9]
                            item.subCategory3 = objs[index][10]
                            // item.description = objs[index][11]
                            let priceobj = {}
                            // console.log(objs[index][13])
                            if (!isNaN(objs[index][13])) {
                                priceobj = {
                                    amount: objs[index][13] * 100,
                                    includes_tax: false,
                                    currency: "USD"
                                }
                            }
                            else if (objs[index][13].charAt(0) === '$') {
                                // console.log(parseFloat(objs[index][13].slice(1) * 100))
                                priceobj = {
                                    amount: parseFloat(objs[index][13].slice(1) * 100),
                                    includes_tax: false,
                                    currency: "USD"
                                }
                            }
                            else {
                                let index1 = objs[index][13].indexOf(',')
                                if (index1 !== -1) {
                                    priceobj = {
                                        amount: parseFloat(parseFloat(objs[index][13].slice(0, index1) * 100)),
                                        includes_tax: false,
                                        currency: "USD"
                                    }
                                }
                                // console.log(parseFloat(objs[index][13].slice(0, index1) * 100))
                            }
                            console.log(objs[index][18])
                            console.log("\n")
                            let somearr = []
                            if (objs[index][35] === 'x') {
                                somearr.push("Breast")
                            }
                            if (objs[index][36] === 'x') {
                                somearr.push("Prostrate")
                            }
                            if (objs[index][37] === 'x') {
                                somearr.push("Ovarian")
                            }
                            if (objs[index][38] === 'x') {
                                somearr.push("Lung")
                            }
                            if (objs[index][39] === 'x') {
                                somearr.push("Skin")
                            }
                            if (objs[index][40] === 'x') {
                                somearr.push("Other")
                            }
                            let tagarr = []
                            if (objs[index][41] === 'x') {
                                tagarr.push("Breast Surgery")
                            }
                            if (objs[index][42] === 'x') {
                                tagarr.push("Prostrate Cancer")
                            }
                            if (objs[index][43] === 'x') {
                                tagarr.push("Surgery")
                            }
                            if (objs[index][44] === 'x') {
                                tagarr.push("Radiation")
                            }
                            if (objs[index][45] === 'x') {
                                tagarr.push("Chemo")
                            }
                            if (objs[index][46] === 'x') {
                                tagarr.push("Hormone Suppression Therapy")
                            }
                            if (objs[index][47] === 'x') {
                                tagarr.push("Stress/Anxiety")
                            }
                            if (objs[index][48] === 'x') {
                                tagarr.push("Cognitive Difficulty")
                            }
                            if (objs[index][49] === 'x') {
                                tagarr.push("Damaged Nails")
                            }
                            if (objs[index][50] === 'x') {
                                tagarr.push("Burns/Sensitive Skin")
                            }
                            if (objs[index][51] === 'x') {
                                tagarr.push("Hair loss")
                            }
                            if (objs[index][52] === 'x') {
                                tagarr.push("dry skin")
                            }
                            if (objs[index][53] === 'x') {
                                tagarr.push("Mood Support")
                            }
                            if (objs[index][54] === 'x') {
                                tagarr.push("Lack of energy")
                            }
                            if (objs[index][55] === 'x') {
                                tagarr.push("Menopause/Hot Flashes")
                            }
                            if (objs[index][56] === 'x') {
                                tagarr.push("Sleep challenges")
                            }
                            if (objs[index][57] === 'x') {
                                tagarr.push("Lymphedema")
                            }
                            if (objs[index][58] === 'x') {
                                tagarr.push("Neuropathy")
                            }
                            if (objs[index][59] === 'x') {
                                tagarr.push("Nausea")
                            }
                            if (objs[index][60] === 'x') {
                                tagarr.push("Pain")
                            }
                            if (objs[index][61] === 'x') {
                                tagarr.push("Sexual Function")
                            }
                            if (objs[index][62] === 'x') {
                                tagarr.push("Relationship Challenges")
                            }
                            if (objs[index][63] === 'x') {
                                tagarr.push("Identity/ Spiritual Crisis")
                            }
                            if (objs[index][64] === 'x') {
                                tagarr.push("Weight Management")
                            }
                            let collarr = []
                            if (objs[index][79] === 'x') {
                                collarr.push("Specifically For Men")
                            }
                            if (objs[index][80] === 'x') {
                                collarr.push("Specifically For Women")
                            }
                            if (objs[index][81] === 'x') {
                                collarr.push("Specifically For Kids")
                            }
                            //json
                            item.attributes = JSON.stringify(somearr)
                            item.tags = JSON.stringify(tagarr)
                            item.collection = JSON.stringify(collarr)
                            //may have to send priceobj as string
                            item.price = JSON.stringify(priceobj)
                        }
                    }
                    else if (item.hasOwnProperty('name') && item.name != '') {
                        item.category1 = 'n/a'
                        item.subCategory1 = 'n/a'
                        item.category2 = 'n/a'
                        item.subCategory2 = 'n/a'
                        item.category3 = 'n/a'
                        item.subCategory3 = 'n/a'
                        item.attributes = '[]'
                        item.tags = '[]'
                        item.collection = '[]'
                    }
                })
                csvWriter
                    .writeRecords(arr2)
                    .then(() => console.log('The CSV file was written successfully'));
            })
    }

)
// Papa.parse(file, {
//     // header: true,
//     // delimiter: ',',
//     // dynamicTyping: true,
//     complete: function (results) {
//         // data = results;
//         // console.log(results.data)
//         data = results.data
//         // console.log("Hi")
//         console.log(data)
//     }
// });
// console.log(data)

// let arr2 = []
// fs.createReadStream('products - products.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         arr2.push(row)
//     })
//     .on('end', () => {
//         arr2.map(item => {
//             if (arr.filter(e => e['vendorId (S)'] === item.vendorId).length > 0) {
//                 let index = arr.findIndex(e => e['vendorId (S)'] === item.vendorId)
//                 item.vendorName = arr[index]['vendorName (S)']
//             }
//             else if (item.hasOwnProperty('vendorId') && item.vendorId !== '') {
//                 item.vendorName = 'NA'
//             }
//         })
//         csvWriter
//             .writeRecords(arr2)
//             .then(() => console.log('The CSV file was written successfully'));
//     });
