const axios = require('axios')

const getPhone =(Apikey ,orderId)=>{
   const url =`https://api.rentcode.net/api/ig/orders/${orderId}/check-status?apiKey=${Apikey}`
   return axios.get(url).then(async (res) => {
    if (res.success !== true) {
        console.log("Lỗi lấy số điện thoại")
    }
    let response = res.data.results
    const phoneNumber =  response.phoneNumber
    
    return {
        mobile: phoneNumber,
    }
    
}).catch((err) => {
    console.log("Error: ", err);
}) 
}

const getOrderId =(Apikey)=>{
    const urlCr =`https://api.rentcode.net/api/ig/create-request?apiKey=${Apikey}`
    const data = { 
       "serviceProviderId": 11,
        "networkProvider": null
       }
    const headers = {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "2bd4f386-36c4-cd26-26a0-3c577f8e153e"
    }
    return new Promise(async(resolve, reject) => {
        await axios.post(urlCr, data, {
            headers: headers
        }).then(async(res) => {
            if (res.success !== true) {
                console.log("Error create request");
                console.log(res);
                
            }
            let response = res.data.results
            resolve(response)
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}

const GetData =(Apikey ,orderId)=>{
    const url =`https://api.rentcode.net/api/ig/orders/${orderId}/results?apiKey=${Apikey}`
    const data = { 
            "pageIndex": 0,
            "pageSize": 0,
            "sortColumnName": "string",
            "isAsc": true,
            "searchObject": {
              "additionalProp1": {},
              "additionalProp2": {},
              "additionalProp3": {}
            }
       }
    const headers = {
        "content-type": "application/json",
        "cache-control": "no-cache",
    }
    return new Promise(async(resolve, reject) => {
        await axios.post(url, data, {
            headers: headers
        }).then(async(res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}
module.exports={
    getOrderId,
    GetData,
    getPhone
}