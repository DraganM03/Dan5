//a1

let list = document.getElementById("lista")

//d2

function loadJSON(){
    var loadingItems = localStorage.getItem("cookieWannaBe")
    if(loadingItems){
        var result = loadingItems.split("{")[1].split("}")[0].split(",")
        result.forEach(res => {
            //console.log(res.split(":")[1])
            list.innerHTML+=`<li><a>${res.split(":")[1]}</a><button>X</button></li>`
        });
    }
    

}

loadJSON()



//a2

let elements = list.querySelectorAll("li")

let form = document.getElementById("forma1")
let input = document.querySelector('#forma1 input[type="text"]')
let submit = document.getElementById("submit2")

let xButtons = document.querySelectorAll("li button")

//let findBtn = document.getElementById("submit2")
let search = document.getElementById("search")
let searchResults = document.getElementById("searchResults")

//d1

function updateCookie(){
    console.log("pozvana")

    let rez = "{"

    console.log(elements)

    elements.forEach((el, i) => {
        rez += `element${i+1}:`
        rez += `${el.firstChild.innerText}`
        if(i!=elements.length-1){
            rez +=","
        }
    });

    rez+="}"

    localStorage.setItem("cookieWannaBe", rez)
}


function removeEl(x){
    list = document.getElementById("lista")
    console.log("remove "+ x.parentElement.innerText)
    list.removeChild(x.parentElement)
    elements = list.querySelectorAll("li")
    xButtons = document.querySelectorAll("li button")
}


function addNew(event){
    //no refresh
    event.preventDefault()

    //novi element liste
    let newEl = document.createElement("li")
    newEl.innerHTML = "<a>"+input.value+"</a>" 
    input.value = ""
    console.log(newEl.innerText)
    //dugme od novog elementa liste
    let newX = document.createElement("button")
    newX.innerText = "X"
    newEl.appendChild(newX)
    list.appendChild(newEl)
    xButtons = document.querySelectorAll("li button")
    console.log(xButtons)
    list = document.getElementById("lista")
    elements = list.querySelectorAll("li")

    //dodavanje event listenera na novo dugme
    newX.addEventListener("click", ()=>{
        removeEl(newX)
    })

    newEl.addEventListener("click", ()=>{
        clickText(newEl)
    })

    updateCookie()

    
}

submit.addEventListener("click", addNew)

xButtons.forEach(x => {
    x.addEventListener("click",()=>{
        removeEl(x)
        updateCookie()
    })
});

//console.log(search)

function searchFun(){
    console.log("kliknut je search")
    elements = list.querySelectorAll("li")
    elements.forEach(e=> {
        //console.log(e.innerText)
        //console.log(search.value)
        if(e.innerText.includes(search.value)){
            e.style.display = "block"
        }else{
            e.style.display = "none"
        }
    });
}


search.addEventListener("input", searchFun)




//b

console.log(elements)

function clickText(el){
    search.value = el.innerText
    searchFun()
}


elements.forEach(el=>{
    el.firstChild.addEventListener("click",()=>{
        clickText(el.firstChild)
    })

})


//c

var pozicija = 0
var prviKlik = false



document.addEventListener("keydown", (event)=>{
    //console.log(event.code)
    let pomjeraj = 0
    let elementV = []
    elements.forEach(el => {
        if(el.style.display != "none"){
            elementV.push(el)
        }
    });

    //console.log(elementV)
    //naopak pomjeraj
    if(event.code == "ArrowUp"){
        pomjeraj--;
        console.log("strelica gore")
    }else if(event.code == "ArrowDown"){
        pomjeraj++;
        console.log("strelica dole")
    }else if(event.code == "Enter"){
        console.log("enetered")

        if(!elementV){
            return
        }
        if(prviKlik){
            clickText(elementV[pozicija].firstChild)
        }
        return
    }else{
        return
    }

    console.log(pomjeraj)

    if(!prviKlik){
        pozicija = 0
        prviKlik = true
    }else if(pomjeraj){
        pozicija+=pomjeraj
        if(pozicija == elementV.length){
            pozicija = 0
        }else if(pozicija<0){
            pozicija = elementV.length-1
        }
    }

    function selektujEl(pozicija){
        elements.forEach(el=>{
            el.classList.remove("selected")
        })
        elementV[pozicija].classList.add("selected")
    }

    selektujEl(pozicija)
    

    console.log(pozicija)

})





/*
function updateCookie2(){
    document.cookie = ""

    //document.cookie="expires=Thu, 01 Jan 1970 00:00:00 UTC"

    rez = ""
    elements.forEach((el,i)=>{
        rez+= `element${i+1}\=${el.firstChild.innerText}; `  
    })

    setTimeout(()=>{
        document.cookie = rez
        console.log(document.cookie)
    }, 3000)
    
}

*/
