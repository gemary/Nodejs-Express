const axios = require('axios')
const prompts = require('prompts');
const uuidv4 = require('uuid/v4');
const GetName = require('./getName')

const CODESIM = require('./codesim')
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')
const { isExistFile, readFile, appendFile } = require('./file')

async function sendVerifyCode(mobile, requestId, apiToken) {
    console.log("id" + requestId);

    let url = 'https://member.lazada.vn/user/api/sendVerificationSms';

    const deviceID = uuidv4()
    const randomThreeNumber = Math.floor(100 + Math.random() * (999 - 100 + 1))
    const randomFiveDigits = await ranDom(5)
    const randomFiveDigitsCap = await ranDomCap(5)
    const csrfToken = `567b311${randomFiveDigits}4`
    const collina = `158147242${randomThreeNumber}473852694797`
    const lzdSid = `13ea2e72769b3${randomFiveDigits}c75185af2b877b`
    const mh5Tk = `6075809f6e7959778${randomFiveDigits}b70dcdfd40_1581481414035`
    const mh4TkEnc = `b8ad2e71625597${randomFiveDigits}cf9a6b5bfd07f`
    const tSid = `gTwQpBLJylJjfkkzjG25kEL${randomFiveDigitsCap}G0bK`
    const fbp = `fb.1.15811${randomThreeNumber}18087.1706776247`
    const umidToken = `TB86A5A30DC25C332AA${randomThreeNumber}A670474C18618B7397CE5734CEDBED73CBF13`
    const cookie = `client_type=desktop; client_type=desktop; _uab_collina=${collina}; lzd_cid=${deviceID}; t_uid=${deviceID}; lzd_sid=${lzdSid}; _m_h5_tk=${mh5Tk}; _m_h5_tk_enc=${mh4TkEnc}; t_fv=1581472414326; t_sid=${tSid}; utm_channel=NA; hng=VN|vi|VND|704; cna=nkjKFv0ZaXgCAQE3cgDxgiU4; _tb_token_=${csrfToken}; _fbp=${fbp}; G_ENABLED_IDPS=google; _bl_uid=z8k9L6CXiz1nnRutjta5iqaw2mee; l=dBLpxQOHQYdbO4ZhBOfN5yo9377toIdfGsPzLDpviICPOWC95ytcWZVmK9TpCnHNn6lpv38GVa9JB78TjyzshZ6NHk5YzeC44dTh.; isg=BPr6GZrXcDZ8j_xabvxgd2MMSyYcq36FdnFQ6gTyLg1Y954x_Tl3lE1BQpsr5_Yd`
    const xua = `122#WYKnrJaDEE+pOEp${randomFiveDigitsCap}EJponDJE7SNEEP7rEJ+/dlUcFCQLpo7iEDp${randomFiveDigitsCap}K51HpyGZp9hBuDEEJFOPpC76EJponDJL7gNpEPXZpJRgu4Ep+FQLpoGUEELWn4yP7SQEEyuLpEM5Ex6nN4nHwShVVnFzKtIjL5RsgZ2kCd5o4Mx7amBKGtAwMlXE3iXOf34PEtqFDwqcXPOg+AxklgOKvhkdoFahvFBNal2KsF5LPohV2qVIkSy30E8m/XAKWz${randomFiveDigitsCap}IYmSkYPPopYMlw7xCO8Y97bew6FxPhBfKbzyZZFWzbXc5N5jS5kVV7viSWnKWEaTq8oL6+OaEBG3wF5m0HRvWngL4eY6E1rXlkVVtiRYIyBvmqM3bD5pMng+O5e23DLVr8oRfJDEERgMdt1+oEEpxkMp1ul5bDRXZ8oL6JNEEyBfDqMfbDDpanSL4ul0EDLVr8CpUJ4bEyF3mqW32E9vxnSpr8PIEDRVbuCkhJS6R0bcJygXsQ4ealVAsueBNrJnxBDsRO8UuIxDGfEBDPX+yc+oL36xXdUH/9krCFySSwzHGIHICe5dc3aPXa/3YUF1O${randomFiveDigitsCap}F4dzaACSwSMNoaD6ck0MQe0gjWWB/EIefsJOmE2gERR6XSg${randomFiveDigitsCap}QKsFE3ufnl6edFFwDPZwSwub5bscTwFqAONja7EqzvLlHhufWZ58Gdya24jNVcQjdujVrHCB+irYZAg1hZXK9EAraR79iCGkY7HznA6KENZE+eEtC5AfX60EjoMfkXUEU7bd1GJXfehOGKJ9CPWtP8Y1+J6Tsv328wTNx9iKsFqUHjkJZkjFd7xao119uqSog3KLuT42EyntFVuv+DqU62HgRmjeK6oB+SarPjSJO96uZ1oAKQ7b3mttYW4rSpfCRfyy9y86ffwDLlVMJTLyDEbj7GOj0nVjcxY12JR71oXngweuf6xo47g3McvhQkdcNAGE1V6fqrY0aqZXZEgeuAoGMDBwD43akyS0q7Lpo+LF5bgq/Wx${randomFiveDigitsCap}7moct7HHVr/UUG5I${randomFiveDigitsCap}tYHx/JmrQY4QCEbFhN+/GKOirA8z8r+W69avLBwt6N17YPbI7pIfXq/6BNMYT8Di2auapRnKRllkabonmjx/rwC6egcUqJPba8iYmHzTz6ayyBZIQQD0B5QTlX2DpMTKGlGWhQw/1WB38HrbPGRKm2ZWMJH8S7xyNo4b929ePruQNGlRbfdyKzVpj86TyHYoks8OJElNbnZ7PCxRoYMHPFu06aw7xRrr8vQGRM7AmQ4QGz4UHNoUYgJSUUcQ+5oqC2lIqerVJTkOML8hHiGFjLRPoLUlD48kROi6WCxbgonHXqX9dn0KibuwHY3W1VrL3wn4wYvKUjJ6jcsdx3paTvQoA+Y7zLjE98ooc62xA4yPnF22o30h2oRN/F4iwOWd2WfpUk5ByK3eondtKf3CTWPnkLO1WDHpiOG2s+0uXQSl5i0YBdN/y1oemuRpunO5aULiTHBZLEBnwwTeT/Pw3f3s2BuGg4/KW4WYx${randomFiveDigitsCap}oFHVYRdox7cFRv7ww6L/xH9wISdEoTyb1//VhlTJd6/tLZzd${randomFiveDigitsCap}4+CzkPqiKaW+aJBAt5=`
    let headers = {
        "x-umidtoken": umidToken,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "X-CSRF-TOKEN": csrfToken,
        "X-Requested-With": "XMLHttpRequest",
        "x-ua": xua,
        "Origin": "https://member.lazada.vn",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Referer": "https://member.lazada.vn/user/register?spm=a2o4n.home.header.d6.68b46afexVOYfh",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": cookie
    }

    let payload = { "phone": mobile, "type": "OTP_REGISTER", "lzdAppVersion": "1.0", "X-CSRF-TOKEN": csrfToken }

    return new Promise(async(resolve, reject) => {
        await axios.post(url, payload, {
            headers: headers,
        }).then(async(res) => {
            const response = res.data
            const success = response.success
            if (success) {

                const start = new Date()

                const getVerify = setIntervalAsync(async() => {
                    const end = new Date() - start

                    if (end === 120000) {
                        await clearIntervalAsync(getVerify)
                    } else {
                        let { otp } = await CODESIM.getData(requestId, apiToken)
                        console.log('Đang lấy mã số điện thoại', mobile)
                        if (otp !== null) {
                            let number = otp.match(/\d/g);
                            const otps = number.join("");
                            console.log("otp : " + otps);
                            if (otps !== null) {

                                let tmp = await registerByOTP(mobile, otps, umidToken, csrfToken, cookie)
                                console.log("tmp :" + tmp);
                                if (tmp === "200") {
                                    await clearIntervalAsync(getVerify)
                                }
                            }
                        }
                    }
                }, 10000)
            }
        }).catch((err) => {
            console.log("Error: ", err);
            reject(err.message)
        })
    })
}

async function registerByOTP(mobile, otp, umidToken, csrfToken, cookie) {
    let url = 'https://member.lazada.vn/user/api/registerByOTP';

    const randomFiveDigitsCap = await ranDomCap(5)
    const xua = `122#GxKps4ynEEJ6gEp${randomFiveDigitsCap}EJponDJE7SNEEP7rEJ+/dlUcFCQLpo7iEDp${randomFiveDigitsCap}K51HpyGZp9hBuDEEJFOPpC76EJponDJL7gNpEPXZpJRgu4Ep+FQLpoGUEELWn4yP7SQEEyuLpEMWEFzOADaHwShVVnFzK3ILeUgfEpRnC+aza+db9HHfgltqCQo0YM0HlXJZ+SNoFXckS/CpSK9uLcIacZkP602bRjB${randomFiveDigitsCap}mqQ7UcZsWjd2kMrzEIoiUY/kCTwr54KdOAo9MgXBK${randomFiveDigitsCap}apjM9ikKrFEOJb7ZWr9lvDOdFGFocfrnILdtjer2+/lCfYECIVDz5tTGteLx${randomFiveDigitsCap}wYz2+ZZMfZfhtHv48DW9hjoL8arwjP0BkfVJSwvK4viS1gGQ6NOx4ofpPjb+v0CGi3Mpzrkt8OMyRTrxU7ubob8AlLbjTA7KKXvhGYgx3ZxKiSMsVyOtZ+aISZr99eZnXFcDrkmNuFXUmsJxCOFa0Exy08oL6+laEBG3wF5m0HRvW1nVLuOIED3frrfptUHPo6q+h/imgD5VanS${randomFiveDigitsCap}bDL7wIzj4J4bEyBAkqM3bDNTQFpAlulIEThXZ8CLwJ8EEyBfDqMfbDEpxnSp1eO5EELVr8CpUJ4bEyF3mqW32E5pangL4urgEELXgeoL6JJEqMB2Hqevf0aikMWmrUJeC5uO6ueBNrJnxBDsRO8UuIxDGfEBDPX+te9+f3ZaF2njMnpWZKaP0McJw29F21IRe67ehLHDUJ+nDwGU3GpAtSmWM/5+9R670cLTIe6moyaTO0VFmj7iktz9kpxvPx7FJrAC/U1W/YxeoRAMhEGnveAtbdFx5em9rgGOhDkdo/W8m20p9MkFRDZ901pB+VWcUSIm+HnoDTXR5iC7nqmWQiVvddBmb9opzL5z7pKhukGtSLOH18d2+2iZanq2SjTcZvS740WiZCoGDi1uA6eC22FXKCFVQRtSAlVQ9lSYzsNqMOiebchEucldCO/uo0tlZWZU2ZRoeGX4cQy9zUEy3Jp5J1sbzGeoOckx6nJyb4CSYFKGoPTWpmuWySP/sG7LL40E26VDSIg/5+Eeu9BIwbj/LinKhAPRPeCrsYL69hwKAT1Y2K4nh44CdBXAVfhsXPpwGO/YM59BJNPicgExy1BMjizCa75ERQpToMZtmzVGApRfESbzDwp7RkHromvOsBuZ63L7pAzTZC4rI9wKht1h8vU1M2W6PFxXevban3vWcpCaBpjwiAaAZwfDhM7uVDmhxHVRlIDRLUbzL606KX9oFivuGvj7fy0ym0GQEAevtXY07eOVyYM+vSW/2ie/EPLLTWVVsTnj4evwNIHIVm9W5nv9jCAZgr46phEPKw+p1tssVQr7Ok463p28P+7HbB/zUbMdTblU7TfrQJh1zbfyOtyvI1c7WFo0a2aIVEQasz${randomFiveDigitsCap}098TV/Jl7irvhDT8SETMAJpUgUU5+Db8kZoz6nPnP02HYOypvN+Ujna08wYmHPHj2f3+5IsGbOu9RieaSM3+CS32ekjWXLmaAAWwCQIhQxql3ehiKRDhlBf6G8VoqpRMMZ71Qnen46cXJDE0ciwK1kZ3kHtKuwSAW57fyHfwpebYNk3HWh6xaZjOnY8jCWKBRjWrCfeINuGoMJHaoL+HRayzzvPIFQVDwCxkqq5Or4ZrkVzP30siuscODDtq+oOJ38YE7mZD2A1mAW${randomFiveDigitsCap}3Mbtcaa6ScOa1CVxP+JLoHIUYM7R6OFzh20hXHB5zb9ynINFzuyhRJ=`
    let headers = {
        "x-umidtoken": umidToken,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "X-CSRF-TOKEN": csrfToken,
        "X-Requested-With": "XMLHttpRequest",
        "x-ua": xua,
        "Origin": "https://member.lazada.vn",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Referer": "https://member.lazada.vn/user/register?spm=a2o4n.home.header.d6.68b46afexVOYfh",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": cookie
    }

    const name = await GetName()
    const randomDay = Math.floor(9 + Math.random() * (9 - 1 + 1))
    console.log({ name })
        //123456ab
    let payload = { "lzdAppVersion": "1.0", "ncToken": { "csessionid": "019DMAcExCPsLjJS6exjDwBZ1QiASREp5lByln02IymHWadc6LkvFkzRbig7kenT8v_SACvQ7y0gh3d0xIxWmtGGCPTxLVPmFVWgNrJfbz2Inb3CdkiiCXt9oQe4yON2V09vNSGh3wE9KSThZMZS07U2sGKUvcuMnbQ2Vij1rs8Mc", "sig": "05u6sppyzhwlI-J7DU9Z2njFBlB4tcUfY8ZUNckJ2G0gUdnooZjoDz7bXKp9PE8e4b2Ynqbu-gq_QD2sEI4vKZ_81leZM6MhdMH8I3f9_JgYt8SACF5OpD_Vuq-IV5eLqf0ogeL4Lal-j_38ygw91sL1YVssiLsUG6V3lq6JT0G9XuSDCV-8-LXtZvs7hfhYwXALmRoA59uTk2abIoEB_782KhsZra_BKbWUeZp5m_aNbruAltT69oIStL_cnNDI8e84QPqMpoUe7TncYoq3rO0aNazodtqYxwwTKPiKuqfhLkCqs3KoPuKy162wvjd9wYZCncttaTX1D607OyMokV7EdR8jYzbgyAlE5gSP8v5yiMq8Z7L7AWOl-_otkxIPcO", "token": "QPXW:1581472447557:0.09706778935468541" }, "phone": mobile, "password": "123456ab", "name": name, "enableNewsletter": true, "month": "3", "day": 10, "year": 2000, "birthday": `2000-3-10`, "gender": "female", "sms": otp, "code": otp }

    return await axios.post(url, payload, {
        headers: headers,
    }).then(async(res) => {
        const response = res.data
        const success = response.success
        if (success) {
            console.log("Tạo acc thành công số điện thoại: ", mobile)
            await appendFile('result.txt', mobile + "\n")
            return "200"
        } else {
            console.log("Lỗi tạo số điện thoại: ", mobile)
            return "500"
        }

    }).catch((err) => {
        console.log("Error: ", err);
    })
}



function ranDom(string_length) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxtz";
    let randomstring = '';
    for (let i = 0; i < string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

function ranDomCap(string_length) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let randomstring = '';
    for (let i = 0; i < string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

async function getToken(filePath) {
    try {
        const exists = await isExistFile(filePath)

        if (!exists) {
            return 'File token.txt không tồn tại'
        }
        const file = await readFile(filePath)

        return file
    } catch (e) {
        throw e.message
    }
}
setImmediate(async() => {

    const apiToken = await getToken('codesimApikey.txt')

    if (apiToken === "") {
        console.log("Bạn chưa điền token")
    } else {
        const requestId = await CODESIM.getRequest()
        setTimeout(async() => {
            const { phoneNumber } = await CODESIM.getData(requestId, apiToken)
            console.log(`Lấy thành công số điện thoại ${phoneNumber}`)
            await sendVerifyCode(phoneNumber, requestId, apiToken)
        }, 6000)
    }
})