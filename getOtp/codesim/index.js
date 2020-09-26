const axios = require('axios')
const CODESIM =require('./api')

const data  ={
    phoneNumber :'',
    otp:''
}

async function getPhone(apiToken){
    setImmediate(async() => {
    if (apiToken === "") {
        console.log("Bạn chưa điền token")
    } else {
        const requestId = await CODESIM.getRequest()
        setTimeout(async() => {
           const { phoneNumber } = await CODESIM.getData(requestId, apiToken)
            console.log(`Lấy thành công số điện thoại ${phoneNumber}`)
        }, 6000)
        
    }
    })
}


async function sendVerifyCode(mobile, requestId, apiToken) {
      setImmediate(async() => {
            setTimeout(async() => {
                let { otp } = await CODESIM.getData(requestId, apiToken)
                console.log('Đang lấy mã số điện thoại', mobile)
                if (otp !== null) {
                    let number = otp.match(/\d/g);
                    const otps = number.join("");
                    console.log("otp : " + otps);
                    if (otps !== null) {
                        data.phoneNumber =1234567897
                        data.otp =otps
                    }
                }
            },10000)
            
        })
}
module.exports = {
    getPhone,
    sendVerifyCode,
    data
}
