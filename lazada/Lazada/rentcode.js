const axios = require('axios')

const getRequest = (apiKey) => {
        let url = `https://api.rentcode.net/api/ig/create-request?apiKey=${apiKey}`;
        const data = {
            "serviceProviderId": 8,
            "networkProvider": 3
        }
        const headers = {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "b0c36d99-f096-dbc4-d118-bf41f823b3da"
        }
        return new Promise(async(resolve, reject) => {

            await axios.post(url, data, {
                headers: headers
            }).then(async(res) => {
                let response = res.results

                console.log(response.msg)



                const requestId = response.id

                resolve(requestId)
            }).catch((err) => {
                reject(err)
                console.log("Error: ", err);
            })
        })
    }
    //2812276
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
    let url = `https://api.rentcode.net/api/ig/balance?apiKey=${apiToken}`;
    return new Promise(async(resolve, reject) => {
        await axios.get(url).then(async(res) => {
            const response = res.results.balance
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

// getPhoneNumber()

module.exports = {
    getRequest,
    getData,
    getBalance,
}