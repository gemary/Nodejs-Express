const axios = require('axios')

const id_group = 1
const id_app = 58

const getPhoneNumber = (apiToken) => {
    let url = `https://otpsim.com/public/api/request?api_token=${apiToken}&id_group=${id_group}&id_app=${id_app}`;

    return axios.get(url).then(async (res) => {
        let response = res.data
        if (response.success !== true) {
            console.log("Lỗi lấy số điện thoại")
        }
        const mobile =  response.data.phone
        const sessionID = response.data.id_session
        return {
            mobile: mobile,
            sessionID: sessionID
        }
        
    }).catch((err) => {
        console.log("Error: ", err);
    })
}

const getResult = (mobile, sessionID, apiToken) => {
    let url = `https://otpsim.com/public/api/getcode?api_token=${apiToken}&session=${sessionID}`;

    return axios.get(url).then(async (res) => {
        const response = res.data
        return response
    }).catch((err) => {
        console.log("Error: ", err);
    })
}

const getBalance = (apiToken) => {
    let url = `https://otpsim.com/public/api/balance?api_token=${apiToken}`;

    return axios.get(url).then(async (res) => {
        const response = res.data.data.balance
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
    getPhoneNumber,
    getResult,
    getBalance,
}
