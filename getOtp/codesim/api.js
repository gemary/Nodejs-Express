const axios = require('axios')
const getRequest = () => {
    let url = `http://codesim.net/api/CodeSIM/Reg`;
    const data = { dichvu_id: '8', phoneNum: '' }
    const headers = {
        "token": "b0257f86-7709-4aeb-bad1-6e29aa29eec4",
        "content-type": "application/json",
        "cache-control": "no-cache"
    }
    return new Promise(async(resolve, reject) => {

        await axios.post(url, data, {
            headers: headers
        }).then(async(res) => {
            let response = res.data
            const requestId = response.data.id
            console.log(response.requestId)
            resolve(requestId)
        }).catch((err) => {
            reject(err)
            console.log("Error: ", err);
        })
    })
}

const getData = (requestID, apiToken) => {
    let url = `http://codesim.net/api/CodeSIM/KiemTraGiaoDich?apikey=${apiToken}&id=${requestID}`;

    return new Promise(async(resolve, reject) => {

        await axios.get(url).then(async(res) => {
            const response = res.data
            const phoneNumber = response.data.phoneNum
            const otp = response.data.sms_text
            const description = response.data.status
           
            
            console.log("optss: " + otp);

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

module.exports = {
    getRequest,
    getData,

}