const passDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[copy-Msg]");
const dataLength = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-Slider]");
const copyBtn = document.querySelector("[copyBtn]")
const dataIdicator = document.querySelector("[data-indicator]");
const uppercase = document.querySelector("#uppercase");
const lowercase= document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbols");
const generatePass = document.querySelector(".generatePass");
const checkbox = document.querySelectorAll(".checkbox");
const progress = document.querySelector(".progress")

const symbolArray = "!@#$%^&*(){}[]";
console.log(symbolArray.charAt(0))
let password = "";
let passwordLength = 10;
let checkCount = 1;

// set indicator color default to grey
setIndicator("#ccc");
handleSlider();

function handleSlider(){
    console.log("i am in handle slider")
    inputSlider.value = passwordLength;
    dataLength.innerText = passwordLength;
    console.log(inputSlider.value, inputSlider.min,inputSlider.max,passwordLength)
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = `${((passwordLength - min ) *100 / (max - min))}% 100%`;
}



function setIndicator(color){
    dataIdicator.style.backgroundColor = color;
    dataIdicator.style.boxShadow = `0px 0px 12px 1px ${color} `;

}


function getRanInt(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}

function getRanNumber(){
    return getRanInt(0,9);
}

function getRanLowercase(){
    console.log("i am in ran lower case")
    return  String.fromCharCode( getRanInt(97,123) )
}

function getRanUppercase(){
    console.log("i am in ran uppwr case")
    return  String.fromCharCode( getRanInt(65,91) )
}

function getRanSymbol(){
    console.log("i am in ran symbol case")
    return symbolArray.charAt(getRanNumber(0,symbolArray.length))
}



function strong(){

    let isupper = false;
    let islower = false;
    let isnumber = false;
    let issymbol = false;

    if(uppercase.checked) isupper = true;
    if(lowercase.checked) islower = true;
    if(number.checked) isnumber = true;
    if(symbol.checked) issymbol = true;

    if(isupper && islower && (isnumber || issymbol)){
        setIndicator("green")
    }
    else if((isupper || islower ) && (isnumber || issymbol))
    {
        setIndicator("yellow")
    }
    else{
        setIndicator("red")
    }
}




async function copyContext(){

    try {
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText = "Copied"
    } catch (error) {
        copyMsg.innerText = "Failed"
    }

    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);

}


function shufflePassword(array){

    
    for (var i = array.length - 1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
    
    
    let str = "";
    array.forEach((e)=>{

        str += e;
    })
    return str;
    
}


function handleCheckbox(){
    checkCount = 0;
    checkbox.forEach((e) =>{

        if(e.checked)
           checkCount++;
    })

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}


// eventlistener on checkbox
checkbox.forEach((e)=>{

    e.addEventListener("change",()=>{
        handleCheckbox();
    })
})


// event listener on slider
inputSlider.addEventListener("input", (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

// event listener on copy btn
copyBtn.addEventListener("click",() => {
    if(passDisplay.value)
         copyContext();
})


// event listener on generate password

generatePass.addEventListener("click",()=>{

    password = "";
    passDisplay.value = ""
    if(checkCount == 0) return ;

    let funArr = [];
    console.log(funArr.length)

    if(uppercase.checked)
        funArr.push(getRanUppercase);
    if(lowercase.checked)
        funArr.push(getRanLowercase);
    if(number.checked)
        funArr.push(getRanNumber);
    if(symbol.checked)
        funArr.push(getRanSymbol);

    for(let i = 0 ; i< funArr.length ; i++){
        password += funArr[i]();
    }
    
    for(let i = 0 ; i< passwordLength - funArr.length ; i++){
        let ranIndex = getRanInt(0,funArr.length)
        password += funArr[ranIndex]();
    }

    password = shufflePassword(Array.from(password));
    passDisplay.value = password

    handleSlider();
    strong();
})