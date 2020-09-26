let randomThreeNumber = Math.floor(9 + Math.random() * (9-1 + 1))
const {isExistFile, readFile, writeFile, appendFile} = require('./file')
const THUECODE = require('./thuecode')


function ranDom(string_length) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

function parseRes(result) {
    result = result.split("(")
    let a = result[1]
    a = a.split(");")
    let final = a[0]
    const abc = JSON.parse(final)
    console.log(abc)
    console.log(abc.success)
}


function ranDomCap(string_length) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

function parseToken(result) {
    result = result.split(" ")
    return result[0]
}

function parseTokenENG(result) {
    result = result.split(" ")
    let a = result[2]
    return a
}


function checkPhoneNumber(number) {
    return number.search("84")
}


function removePlus84(phoneNumberRequest) {
    phoneNumberRequest = phoneNumberRequest.split("+84")
    const tmpPhone = ""
    const phone = tmpPhone.concat("0", phoneNumberRequest[1])
    return phone
}
setImmediate(async () => {
    // const randomFiveDigitsCap = await ranDomCap(5)
    // const n = `122%23rAbo9J%2B%${randomFiveDigitsCap}X44pZCEpuEJponDJE7SNEEP7rEJ%2B%2FdlUcFC${randomFiveDigitsCap}iEDpWnDEeK51HpyGZp9hBu4RRQ4GHpCVfEJponDJL7gNpEP7ZpER%2FuDEE%2BFQLpoGUEELWn4yP7SQEEyGrpJ%2BgtJPE91dBJ4nT%2Fk1abqbQx8%2FYGVCVNJ35Mk2or%2B4t7LEB6yNG34nhxKwF7bnl7eUD%2F4OODmi5XKurmcUK1bb4e14cIo46OWp1uObkHrpz8oL6JI9HQomD7W3bEEpxngR4etqtn8tr8Cp6%2BDPEyFfOefMOwzVanSbWuOjb66qWooLwJ8EEyBfDqMfbDEpxnSp1eO5EELVr8CpUJ4bEyF3mqW32E5pangL4urgEELX4uFL6JJEqMF9Hqevf0aikMWtz3Je%2BJeAsueBNrJnxBS9ApMGvIBI9aX8vw8JJvxMx5SOs6azP5j8EKsdBPMQbrZ6bxGNUpMRPVXgjyo0JJMCsITRBPAWHHgCAuJ1fAwFZKhXuxGDmqTYyfHc6jgpL1sqf7NyOGHCCfXNh%2Bxk54VFHcYIBrRJY1TxUVMGp09R%2FXgCEwItSdIj8o4TBdMUuoiHaXPn2nx2f0j0PLFapfpwDFH%2Bm34%2Bepoc%2FscCJTbBPxRBFLyXqUCl8TpzK%2FHf1F6JsbmhGBcq9Q7GyCOvlkRiZ69Ri7ykIm2UHdLy%2BqTUM%2BY0eGBgB4RHMC2pu5Gpjm2BnB4z7eyBSm7u1z%2FipSSl5xnsXOubOGQo4g%2B33rNpOIcF7P3OjhITmqdQEOZGgv0v7MP4c8runyTR8cgKRzzBNPUbjh3vL%2FXugazMnrRzNr49ZVt0I1Oken9Gv64ca6HSb0gFAMzzTw5%2F6cjdO%2FqYsNSrCL8wDjFLvxLYAt4oaynJQNMuKuJNrJiMyifvgF2zogBJtoMLzqSbeEH8A6608WVu2Y%2F0NyxYTc%2FHHJrzo0b67YNjd43ymkpivekAVnppHGz%2F2Ok%2FQL0gO0pecO4z1sDGZ1ULpX8RU7nW96FG%2B7ZMN%2B6addl%2FzIxIUjqnlP1NmCQJKCUYv%2FPwv3C7Syz8RqZMAcPzJsc8aPUXYo2bZuQHhwbtRPAVNrrihd57LrNTcLa%2Bi2CxxAeFokMYywpjV20YuDrHXckdpxYXEwQLoTHJtChQ%2BR09fAJC4sxY9EFNYVNSkMvXkggE040VhBDo9gx%2B69XEuq9JU5qUiUskHVxqqr5IUbz%2FqiGUOBgNupLNtw2uUl9lSe%2BcoxaTSvaA2CnMxgup3veZ4E7pkNt2sW4Spf3nk0ru1SEsXDd7CfY7x26c92LyBCIkO9QY3i9yKepiK0XDy4GlJhZVOkq%2FeYPcAuyPCSHFM7KKWnV0p6BlqwskCgdhwa3zcnxJm6PtVfdKhFC3Wjg44UxtVK3u1OAHLDxIhMPLtmuf7z7oVB%2BxoWRfNE8LQcdEe4fCi4sazpBbz7jjEW3bd%2FBPqd5aqSoqzObfsADFyvW2pErn836%2FcwfP7UtTm1E%3D%3D`
    // const result = `jsonp_07761123732193137({"success":true,"result":{"csessionid":"01-4OebRe9s4qsqVuj4c1psHzJBBQNCwbbAKmoABGjiFNS6AITJcjZEgwHkv2Un4qJ0guSwCyL-M6JiICtRAJzB0Hzrwy86Xy1xTAvWk_gKd538KHyTAxbq3bGtV3GAboUrTV9nUwEOH4R0wlzHjmQL43qimr-_g_w-m3mW4nE4pY","code":0,"value":"05FfN4QaYXZFvQN1Nu5OvLwlTTF726tbWkLtGfDL7hvJ7O6Qec1io2Zml8KTw2TQHPI7C16PCnT5XdMRq2c4cZtcb_dBAYH68sXIVazwS74HN5e25KWdGKOWaJsJIrHH0MuMqHNCScdYTWdhuvTjuF0kj52G-ns3RqVHi3V7dyvWKsomcC00Xc3bB7XRNv01vABTi4gbEBR6z-RvI-6saTjrC_f7kh2lT7gz1EsMR8Ysws4_FJ7tggEKyVbPiXEqN19y5JkHJS3_1lYX3cD6WgF0-EAzY7KpUEGUQy5Low27WwgujumLXI1fw8bjddhFB5E8TiOKjKLgjTd35QwLv4pcpgRoO7kMqL3qRGLWMEKrOyZL1PbQ2OA7NICOn3I-JG"}});`
    // const result1 = `jsonp_07761123732193137({"success":true,"result":{"csessionid":"01-4OebRe9s4qsqVuj4c1psHzJBBQNCwbbAKmoABGjiFNS6AITJcjZEgwHkv2Un4qJ0guSwCyL-M6JiICtRAJzB0Hzrwy86Xy1xTAvWk_gKd45mCZ_PvuLJx4yGOjyxN3BrTV9nUwEOH4R0wlzHjmQL43qimr-_g_w-m3mW4nE4pY","code":0,"value":"05FfN4QaYXZFvQN1Nu5OvLwlTTF726tbWkLtGfDL7hvJ7O6Qec1io2Zml8KTw2TQHPI7C16PCnT5XdMRq2c4cZtcb_dBAYH68sXIVazwS74HN5e25KWdGKOWaJsJIrHH0MuMqHNCScdYTWdhuvTjuF0kj52G-ns3RqVHi3V7dyvWKsomcC00Xc3bB7XRNv01vAETiqccsDQGBhD0ALOodTjsbN11pOHDXAiT4APpd09OYu500qRu04Cwje4ZIq4-up9y5JkHJS3_1lYX3cD6WgFyzAOroR6-y-DlQa9EaPj9INTMWtFF8RwxiJJVkvB7kptNjuKVpeRaepo04AFVZ9bCyZIuqyaqpXzRFCaWP35iJtFVWXvI_e0C2eTSCR5oEa"}});`
    // // await parseRes(result)
    // const filePath = 'result.txt'
    // const content = `876068 là mã OTP cho Đăng ký tài khoản Lazada. Mã sẽ hết hạn trong`
    // const a = await parseToken(content)
    // console.log(a)
    // await appendFile(filePath, '0961782317\n')
    // console.log(n)

    // var start = new Date()
    // var simulateTime = 1000
    //
    // setInterval(function(argument) {
    //     // execution time simulated with setTimeout function
    //     var end = new Date() - start
    //     console.log(typeof end)
    //     console.info('Execution time: %dms', end)
    // }, simulateTime)

    const apiToken = `04AEEA72934BB153A8BCCAB2524CB887`
    const phone = `+84899371521`
    const number = `LAZADA : 437239 l� m� OTP cho ng k� t�i kho�n Lazada. M� s� h�t h�n trong`
    // const sessionID = await THUECODE.getPhoneNumber(apiToken)
    // console.log(sessionID)
    // const {phoneNumber, otp, description} = await THUECODE.getData(sessionID, apiToken)
    // console.log({phoneNumber})
    const a = await removePlus84(phone)
    console.log({a})

})
// console.log(randomThreeNumber)