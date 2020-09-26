const axios = require('axios')

const id_group = 1
const id_app = 86
// OTP SIM
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

// setImmediate(async () => {
//     const token = `5fa534529007867c96d4e47da79d6495`
//     const sessionID = `14581581150736570`
//     const a = await getPhoneNumber(token)
//     // const {phoneNumber, content, status} = await getResult(sessionID, token)
//     console.log(a)
//     console.log(content)
//     console.log(status)
// })

// getPhoneNumber()

module.exports = {
    createRequest,
    getResult,
    getBalance,
}
