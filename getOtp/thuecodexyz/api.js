const axios = require('axios')

const id_group = 1
const id_app = 28
    // OTP SIM
const getRequest = (apiToken) => {
    let url = `http://api.thuecode.xyz/create?api_key=${apiToken}&service_id=28`;

    return new Promise(async(resolve, reject) => {
        await axios.get(url).then(async(res) => {
            let response = res.data
            console.log(res.data);
            
            if (response.message !== "Success") {
                console.log(response.message)
            }
           
            const requestId = response.request_id
            resolve(requestId)
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}

const getData = (requestID, apiToken) => {
    let url = `http://api.thuecode.xyz/detail?api_key=${apiToken}&request_id=${requestID}`;

    return new Promise(async(resolve, reject) => {
        await axios.get(url).then(async(res) => {
            const response = res.data
            const phoneNumber = response.phone
            const otp = response.otp
            const description = response.description
            resolve({
                phoneNumber: phoneNumber,
                otp: otp,
                description: description
            })
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}

const getBalance = (apiToken) => {
    let url = `http://api.thuecode.xyz/money?api_key=${apiToken}`;
    return new Promise(async(resolve, reject) => {
        await axios.get(url).then(async(res) => {
            const response = res.data.money
            const number = Math.floor(response / 1000)

            resolve({
                balance: response,
                number: `Bạn còn ${number} lần lấy mã OTP`
            })
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}
module.exports = {
    getRequest,
    getData,
    getBalance,
}