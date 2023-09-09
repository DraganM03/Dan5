let inputNum = document.getElementById("inputNum")
let incBtn = document.getElementById("incBtn")
let decBtn = document.getElementById("decBtn")
let fields = document.querySelector("div.fields")

var index = -1
var prvi = true
var popunjen = []

inputNum.addEventListener("change" , ()=>{
    if(inputNum.value<0){
        inputNum.value = 0
        console.log("change")
    }
})

incBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    inputNum.value++
    addField()
})

decBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    if(inputNum.value>0){
        inputNum.value--
        delField()
    }
})

function fieldInp(field){

    let inpField = field.firstElementChild
    let rez = validate(inpField.value[0])
    let allFields = fields.querySelectorAll("div")
    let localIndex
    allFields.forEach((f,i) => {
        if(f == field){
            localIndex = i
        }
    });

    if(!rez){
        inpField.value = ""
        popunjen[localIndex] = false
    }else{
        popunjen[localIndex] = true
    }
    
    console.log(popunjen)

    if(inpField.value.length >= 2){
        var temp = inpField.value.split(rez)[1]
        if(!temp){
            temp = rez
        }

        inpField.value = rez
        console.log(temp)
        switchToNextInp(field, temp)
    }
}

function switchToNextInp(field , temp){
    let allFields = fields.querySelectorAll("div")
    
    allFields.forEach((f,i) => {
        if(f == field){
            index = i
        }
    });
    
    if(index<allFields.length-1){
        index++

        var skip = false
        while(allFields[index].firstChild.value && index<=allFields.length-1){
            if(index==allFields.length-1){
                skip == true
                break
            }
            index++
        }

        allFields[index].firstElementChild.focus()
        if(!skip){
            allFields[index].firstElementChild.value = validate(temp)
        }
    }

    console.log(index)
}

function addField(){
    let newDiv = document.createElement("div")
    newDiv.classList.add("field")
    let newInp = document.createElement('input')
    newInp.setAttribute("type", "text")
    newDiv.appendChild(newInp)
    fields.appendChild(newDiv)
    popunjen.push(false)
    if(prvi){
        index=0
        prvi = false
    }

    newDiv.addEventListener("input", ()=>{
        fieldInp(newDiv)
    })

}

function delField(){
    let lastChild = fields.lastElementChild
    console.log(lastChild)
    popunjen.splice(fields.length-1, 1)
    console.log(popunjen)
    if(index==fields.length-1){
        index--
    }


    fields.removeChild(lastChild)
}

function validate(str){

    if(!str){
        return ""
    }

    let a = str.toString()[0]



    if(a>='A' && a<='Z'){
        console.log("veliko slovo")
    }else if(a>='a' && a<='z'){
        console.log("malo slovo")
    }else if(a==" "){
        console.log("space")
    }else{
        console.log("snj karakter")
        a=""
    }

    console.log(a)
    return a
}



