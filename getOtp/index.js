const expreess =require('express')
const CODESIM =require('./codesim/api')
const THUECODE =require('./thuecodexyz/api')
const THUECODEVN =require('./thuecodevn/api')
const OTPSIM =require('./otpsim/api')
const RENTCODE =require('./rentcode/api')
const app = expreess()
app.use(expreess.json()) 
app.use(expreess.urlencoded({ extended: true })) 
app.set('view engine','pug')
app.set('views','./views')
const port = 8000

const dataRentcode ={
    RentCode_ApiKey:'',
    RentCode_Number:'',
    Rentcode_Otp:'',
    Rentcode_RequestId:''
}

const dataCodesim ={
    codesim_Apikey:'',
    codesim_Number:'',
    codesim_Otp:'',
    codesim_requestID :''
   
}
const datathuecodeXyz={
    thuecodexyz_Apikey:'',
    thuecodexyz_Number:'',
    thuecodexyz_Otp:'',
    thuecodexyz_requestId :''
}
const datathuecodeVn ={
    thuecodeVn_Apikey:'',
    thuecodeVn_Number:'',
    thuecodeVn_Otp:'',
    thuecodeVN_requestId :''
}
const dataotpsim ={
    Otpsim_Apikey:'',
    Otpsim_Number:'',
    Otpsim_Otp:'',
    Otpsim_requestId :''
}

app.get('/',(req,res)=>{

    res.render("index")
})
//rentcode
app.get('/rentcode',(req,res)=>{
    res.render("retncode")
})
app.post('/rentcode',(req,res)=>{
    const apikey =req.body.apikey
    if (apikey =="") {
        
    }
    else{
        setImmediate(async () => {

            if (apikey === "") {
                console.log("Bạn chưa điền token")
            } else {
                const data  = await RENTCODE.getOrderId(apikey)
                let requestId = data.id
                const getphone =setInterval(async()=>{
                    const {mobile} =await RENTCODE.getPhone(apikey,requestId)
                    console.log(mobile);
                    if (mobile !== null) {
                        clearInterval(getphone)
                        dataRentcode.RentCode_ApiKey =apikey
                        dataRentcode.RentCode_Number =mobile
                        dataRentcode.Rentcode_RequestId =requestId
                        res.render("retncode",dataRentcode)
                      
                    }
                   
                },4000)
                
                    
            }
        })
    }
})
app.post('/otprentcode',(req,res)=>{
    const apikey =req.body.apikey
    const mobile =req.body.phone
    const requestIds =req.body.id
    console.log(requestIds);
    
    const getVerify =  setInterval(async() => {
           
        let result = await RENTCODE.GetData(apikey,requestIds)
      
        console.log('Đang lấy mã số điện thoại', mobile)
        if (result.data.total == 1) {
            const otp = result.data.results[0].message
            console.log(otp);
            if (otp !=undefined) {
                let number = otp.match(/\d/g);
                const otps = number.join("");
                clearInterval(getVerify)
                dataRentcode.RentCode_ApiKey =apikey
                dataRentcode.RentCode_Number =mobile
                dataRentcode.Rentcode_Otp =otps
                res.render("retncode",dataRentcode)
            }
           
        }
   
},4000)
})
//otpsim
app.get('/otpsim',(req,res)=>{
    res.render("otpsim")
})
app.post('/otpsim',(req,res)=>{
    const apikey =req.body.apikey
    if (apikey =="") {
        
    }
    else{
        setImmediate(async () => {

            if (apikey === "") {
                console.log("Bạn chưa điền token")
            } else {
                let {mobile, sessionID} = await OTPSIM.getPhoneNumber(apikey)
                console.log(`Lấy thành công số điện thoại ${mobile}`)
                const {balance, number} = await OTPSIM.getBalance(apikey)
                console.log({balance, number})
                dataotpsim.Otpsim_Number =mobile
                dataotpsim.Otpsim_requestId =sessionID
                dataotpsim.Otpsim_Apikey =apikey
                res.render("otpsim",dataotpsim)
            }
        })
    }
 
})
app.get('/Otpotpsim',(req,res)=>{
    res.redirect("/otpsim")
})
app.post('/Otpotpsim',(req,res)=>{
    const apikey =req.body.apikey
    const mobile =req.body.phone
    const requestIds =req.body.id
    function parseToken(result) {
        result = result.split(" ")
        return result[0]
    }
    
    if (requestIds != "" && mobile != "" && apikey !="") {
        const getVerify =  setInterval(async() => {
           
                let result = await OTPSIM.getResult(mobile, requestIds, apikey)
                console.log('Đang lấy mã số điện thoại', mobile)
                if (result.success === true) {
                    clearInterval(getVerify)
                    const content = result.data.content
                    console.log({content})
                    const otp = await parseToken(content)
                    dataotpsim.Otpsim_Number =mobile
                    dataotpsim.Otpsim_Apikey =apikey
                    dataotpsim.Otpsim_Otp =otp
                    res.render("otpsim",dataotpsim)
                }
           
        },4000)
    }
})
//thuecodevn
app.get('/thuecodevn',(req,res)=>{
    res.render("thuecodevn")
})
app.post('/thuecodevn',(req,res)=>{

    const apikey =req.body.apikey
    function removePlus84(phoneNumberRequest) {
        phoneNumberRequest = phoneNumberRequest.split("+84")
        const tmpPhone = ""
        const phone = tmpPhone.concat("0", phoneNumberRequest[1])
        return phone
    }
    
    if (apikey =="" && mobile !="") {
        console.log("Bạn chưa điền token")
    }
    else{
        setImmediate(async() => {
            const sessionID = await THUECODEVN.createRequest(apikey)
            setTimeout(async () => {
                const {phoneNumber, content, status, timeout} = await THUECODEVN.getResult(sessionID, apikey)
                if (status === "WAITINGPHONENO") {
                    console.log("Xin lỗi Thuecode.vn đang hết số")
                    return
                } else {
                    const mobile = await removePlus84(phoneNumber)
                    console.log(`Lấy thành công số điện thoại ${mobile}`)
                    datathuecodeVn.thuecodeVn_Number =mobile
                    datathuecodeVn.thuecodeVn_Apikey =apikey
                    datathuecodeVn.thuecodeVN_requestId =sessionID
                    res.render('thuecodevn',datathuecodeVn)
                }
            }, 5000)  
        })
    }
})

app.post('/otpthuecodevn',(req,res)=>{
    const apikey =req.body.apikey
    const mobile =req.body.phone
    const requestIds =req.body.id
    function parseTokenENG(result) {
        result = result.split(" ")
        let a = result[2]
        return a
    }
    
    if (requestIds != "" && mobile != "" && apikey !="") {
        const getVerify =  setInterval(async() => {
                let {phoneNumber, content, status, timeout} = await THUECODEVN.getResult(requestIds, apikey)
                console.log('Đang lấy mã số điện thoại', phoneNumber)
                if (timeout === "timeout") {
                    console.log("Hết thời gian đợi")
                    resolve('timeout')
                }
                if (status === "OK") {
                    console.log({content})
                    clearInterval(getVerify)
                    const otp = await parseTokenENG(content)
                    datathuecodeVn.thuecodeVn_Number =mobile
                    datathuecodeVn.thuecodeVn_Otp =otp
                    datathuecodeVn.thuecodeVn_Apikey =apikey
                    res.render('thuecodevn',datathuecodeVn)
                }
        },5000)
    }

})

//thue code
app.get('/thuecode',(req,res)=>{
    res.render("thuecodexyz")
})
app.post('/thuecode',(req,res)=>{
    const apikey =req.body.apikey
  
    if (apikey =="" && mobile !="" && requestIds !="") {
        console.log("Bạn chưa điền token")
        console.log(` requestid  ${requestId}`)
    }
    else{
        setImmediate(async() => {
                const requestId = await THUECODE.getRequest(apikey)
                setTimeout(async() => {
                    const { phoneNumber } = await THUECODE.getData(requestId, apikey)
                    console.log(`Lấy thành công số điện thoại ${phoneNumber}`)
                    datathuecodeXyz.thuecodexyz_Number = phoneNumber
                    datathuecodeXyz.thuecodexyz_Apikey = apikey
                    datathuecodeXyz.thuecodexyz_requestId =requestId
                    res.render("thuecodexyz",datathuecodeXyz)
                }, 5000)
            
        })

    }
  
    
})
app.get('/optthuecodexyz',(req,res)=>{
    res.redirect('/thuecode')
})
app.post('/optthuecodexyz',(req,res)=>{
    const apikey =req.body.apikey
    const mobile =req.body.phone
    const requestIds =req.body.id
    if (requestIds != "" && mobile != "" && apikey !="") {
      
        const getVerify =  setInterval(async() => {
                    let { otp } = await THUECODE.getData(requestIds, apikey)
                    console.log('Đang lấy mã số điện thoại', mobile)
                    if (otp !== null) {

                        console.log("Otp: "+otp);
                        
                        clearInterval(getVerify)
                        datathuecodeXyz.thuecodexyz_Number = mobile
                        datathuecodeXyz.thuecodexyz_Apikey = apikey
                        datathuecodeXyz.thuecodexyz_Otp =otp
                        res.render("thuecodexyz",datathuecodeXyz)
                    }
            },5000)
    }
    else{

    }
})
//
app.get('/codesim',(req,res)=>{

    res.render("codesim")
})

app.post('/codesim',(req,res)=>{
   
    const apikey =req.body.apikey
  
    if (apikey =="") {
        
    }
    else{
        setImmediate(async() => {
            if (apikey === "") {
                console.log("Bạn chưa điền token")
            } else {
                const requestIds = await CODESIM.getRequest()
                console.log(` requestid  ${requestIds}`)
                setTimeout(async() => {
                   const { phoneNumber } = await CODESIM.getData(requestIds, apikey)
                   console.log(`Lấy thành công số điện thoại ${phoneNumber}`)
                   dataCodesim.codesim_Number = phoneNumber
                   dataCodesim.codesim_Apikey = apikey
                   dataCodesim.codesim_requestID =requestIds
                   res.render("codesim",dataCodesim)
                }, 6000)
                
            }
            })
    }
   
    
   
})
app.post('/otp',(req,res)=>{
    
    const apikey =req.body.apikey
    const mobile =req.body.phone
    const requestId =req.body.id
    if (mobile != "" && requestId !="") {
        const getVerify =  setInterval(async() => {
              setTimeout(async() => {
                  let { otp } = await CODESIM.getData(requestId, apikey)
                  console.log('Đang lấy mã số điện thoại', mobile)
                  if (otp !== null) {
                      let number = otp.match(/\d/g);
                      const otps = number.join("");
                   
                      if (otps !== null) {
                        console.log("otp : " + otps);
                        clearInterval(getVerify)
                        dataCodesim.codesim_Number = mobile
                        dataCodesim.codesim_Otp =otps
                        dataCodesim.codesim_Apikey = apikey
                        res.render("codesim",dataCodesim)
                      }
                     
                  }
              },5000)
          },10000)
   }
})

app.listen(port,()=>{
    console.log("server listen in port: "+port);
    
})