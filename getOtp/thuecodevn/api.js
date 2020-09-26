const axios = require('axios')

const id_group = 1
const id_app = 86

const createRequest = (apiToken) => {
    let url = `http://thuecode.vn:1337/request/create?token=${apiToken}&service_id=16`;

    return axios.get(url).then(async (res) => {
        let response = res.data
        if (response.success !== true) {
            console.log("Lỗi lấy yêu cầu")
        }
        const sessionID = response.id
        return sessionID
    }).catch((err) => {
        console.log("Error: ", err);
    })
}

const getResult = (sessionID, apiToken) => {
    let url = `http://thuecode.vn:1337/request/check?token=${apiToken}&request_id=${sessionID}`;

    return axios.get(url).then(async (res) => {
        const response = res.data
        const phoneNumber = response.number
        const content = response.sms
        const status = response.status
        const timeout = response.timeout
        return {
            phoneNumber: phoneNumber,
            content: content,
            status: status,
            timeout: timeout
        }
    }).catch((err) => {
        console.log("Error: ", err);
    })
}

const getBalance = (apiToken) => {
    let url = `http://thuecode.vn:1337/balance?token=${apiToken}`;

    return axios.get(url).then(async (res) => {
        const response = res.data.balance
        const number = Math.floor(response/1000)
        return {
            balance: response,
            number: `Bạn còn ${number} lần lấy mã OTP`
        }
    }).catch((err) => {
        console.log("Error: ", err);
    })
}


module.exports = {
    createRequest,
    getResult,
    getBalance,
}
