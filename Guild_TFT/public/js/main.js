let i =0

const builderGroup = document.getElementsByClassName('builder-bonus-group');

const tempArr  =[]
const hexList = document.querySelectorAll('.hex');

const searchElement =document.getElementById('searchHero')

const listHero = document.querySelectorAll('.characters-item')

const miles = document.querySelectorAll('.builder-bonus-item');



searchElement.addEventListener('keyup',(e)=>{
    const searchText = searchElement.value;
  
    listHero.forEach(e=>{
        const item = JSON.parse(e.getAttribute('character'))
     
        const names  = item !== null? item.name : "";
        const cost  = item!== null? item.cost : "";
        const origin = item!== null? item.origin : "";
        const  classs = item!== null ?item.class :"" ;
     
        // let class1 ="", class2="" ;
        // if (item != null && typeof classs == "object" ) {
        //     class1 =classs.class[0];
        //     class2 = classs.class[1];
        // }  class1.toLowerCase().indexOf(searchText) || class2.toLowerCase().indexOf(searchText) 
      
        if (
        names.toLowerCase().indexOf(searchText) > -1 ||
        cost  == searchText ||
        origin.toLowerCase().indexOf(searchText) > -1 || classs.indexOf(searchText) > -1  )
        {
           
            e.classList.add('active')
        }
        else{
            
            e.classList.remove('active')
        }
    })

})

document.querySelectorAll('.character-icon').forEach(item=>{
    const src =item.getAttribute('src')
    const name =JSON.parse( item.getAttribute('data'))
    let class1, class2 ;

    if (name !== null&& typeof name.class == "object"  ) {
        class1 =name.class[0];
        class2 = name.class[1];
    }
        item.addEventListener('click',(event)=>{
            
            miles.forEach((e)=>{
                const searkey =  e.getAttribute('search');
               
             
                if (searkey == name.class || searkey == name.origin || searkey == class1 || searkey == class2) {
               
                    const counterElement =e.childNodes[1].childNodes[1].childNodes[0];
                    const counter =parseInt(counterElement.textContent) ;
                    const  milestone =e.childNodes[0].childNodes[1].textContent.trim();
                    const counst = counter+1;
                     if (counst ==  milestone[4]) {
                        e.classList.add('gold');
                    }
                    else if (counst  == parseInt(milestone[4]/3) && counst > 1) {
                        e.classList.add('bronze');
                    }else if (counst  == parseInt(milestone[4]/2) ) {
                        e.classList.add('silver');
                    }
                  
                    if (counst <= milestone[4]) {
                       const netext= milestone.replace(milestone[0],counst.toString());
                        e.childNodes[0].childNodes[1].innerHTML =netext;
                    }
                   
                    counterElement.innerHTML =`${counst}`; 
                    e.classList.add('active');
                }

              });

            if (tempArr.length > 0) {
                tempArr.sort((a,b)=>a-b);
                const index =tempArr.shift();
                hexList[index].setAttribute('style',`background-image: url("${src}");`)
            }
            else
            {
                hexList[i].setAttribute('style',`background-image: url("${src}");`)
                hexList[i].classList.add('c5')
                hexList[i].classList.add('filled')
                hexList[i].setAttribute('data',item.getAttribute('data'))
                hexList[i].innerHTML=` 
                <div class="characters-item builder-portrait c5 active" type="Champion"  character="">
                    <div class="character-wrapper" ></div>
                </div>
                <div class="hexTop"> </div>
                <div class="hexBottom"></div>`;
               i++;
            }
                
            
           
        });

});

hexList.forEach(e=>{

    e.addEventListener('contextmenu',(event)=>{
        event.preventDefault()
       
        const  position = e.getAttribute('position');
        e.classList.remove('filled');
        tempArr.push(position-1);
        e.setAttribute('style',`background-image: url("");`);

       const name  =JSON.parse(e.getAttribute('data'));

       let class1, class2 ;
       if (name != null&& typeof name.class == "object" ) {
           class1 =name.class[0];
           class2 = name.class[1];
       }
        miles.forEach((e)=>{
            const counterElement =e.childNodes[1].childNodes[1].childNodes[0];
            const counter =parseInt(counterElement.textContent) ;
            const  milestone =e.childNodes[0].childNodes[1].textContent.trim();
            const searkey =  e.getAttribute('search');
           
           
            if (searkey == name.class || searkey == name.origin || searkey == class1 || searkey == class2) {
               
                const counter2 =counter-1;
                counterElement.innerHTML = `${counter2}`
                if (counter2 < 1) {
                    e.classList.remove('active')
                }
                const netext= milestone.replace(milestone[0],counter2.toString());

                e.childNodes[0].childNodes[1].innerHTML =netext;
            }
           
          });

    })
 

})




