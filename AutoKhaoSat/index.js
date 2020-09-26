const {Builder, By, Key, until} = require('selenium-webdriver');

const email ='ducdang12k11@viendong.edu.vn';
const password ='Trungduc123$$';
(async function main (){
    const driver = await new Builder().forBrowser('chrome').build();
     driver.manage().window().maximize();
    
    await driver.get('https://infoq.vn/');
    const email_input =await driver.wait(until.elementLocated({id:"login_id_home"}),3000);
    email_input.sendKeys(email);
    const password_input =await driver.wait(until.elementLocated({id:"password_home"}),3000);
    password_input.sendKeys(password);
    const btn_login =await driver.wait(until.elementLocated({className:'btn-dn-home'}),3000);
   
    
   await driver.sleep(1000)
    let isenable =undefined
    btn_login.click()
  
    try {
      await driver.wait(until.elementLocated({id:"modal_update"}),10000)
        isenable = true
    } catch (error) {
        isenable = false
    }
  
   await driver.sleep(1000)
   
    if (isenable) {
      
        await driver.navigate().to('https://infoq.vn/quicksurvey/listgeneral/page/2');
        await driver.sleep(2000)

        await ClickItem(driver,0)
        await driver.sleep(2000)

        await ClickItem(driver,1)
        await driver.sleep(2000)

        await ClickItem(driver,2)
        await driver.sleep(2000)

        await ClickItem(driver,3)
        await driver.sleep(2000)

        await ClickItem(driver,4)
        await driver.sleep(2000)

        await ClickItem(driver,5)
        await driver.sleep(2000)

        await ClickItem(driver,6)
        await driver.sleep(2000)

        await ClickItem(driver,7)
        await driver.sleep(2000)

        await ClickItem(driver,8)
        await driver.sleep(2000)

        await ClickItem(driver,9)
        await driver.sleep(2000)

        await ClickItem(driver,10)
        await driver.sleep(2000)

        await ClickItem(driver,11)
        
              
    }
   
})();   


const ClickItem=async (driver,indexs)=>{
    const btnReply =await driver.findElements({className:"btn-reply"});
   
    await btnReply[indexs].click();

    const listRadio =await driver.wait(until.elementsLocated({xpath:'//*[@name="quickanswer"]'}),5000) 
        
    const index= Math.floor(Math.random() * listRadio.length) + 1
    await listRadio[index-1].click()
    let isPresent =true
    try {
        await driver.findElement({className:"bnt-info5"})
    } catch (error) {
        isPresent =false
    }
    
    if (isPresent) {
      await driver.sleep(2000)
      await driver.navigate().back()
    
    }
    else{
       
        const btninfo4 =await driver.findElement({className:"bnt-info4"})
        await btninfo4.click();
        await driver.sleep(2000)
        
        await driver.navigate().to('https://infoq.vn/quicksurvey/listgeneral/page/2');
       // await driver.navigate().to('https://infoq.vn/quicksurvey/listgeneral/page/1');
    }
  
}