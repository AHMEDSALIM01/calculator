// Variables globales
const ecranElt = document.querySelector("#ecran");
const theme = document.querySelector("#toggle");

let previous = 0;

let display = "";

let operation = null;

let memoire;

window.onload = () => {
    let touches = document.querySelectorAll(".btn");

    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }

    document.addEventListener("keydown", gererTouches);
    
}

//-------------functions---------------
function gererTouches(event){
    let touche;

    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape","%"];

    if(event.type === "keydown"){
       
        if(listeTouches.includes(event.key)){
          
            event.preventDefault();
           
            touche = event.key;
        }
    }else{
        touche = this.innerText;
    }

    if(parseFloat(touche) >= 0){
        display = (display === "") ?  touche.toString() : display + touche.toString();
        ecranElt.innerText = display;
    }else if(parseFloat(touche) >= 0 || touche === "+/-"){
        display = (display === "") ? "-".toString() : display *(-1);
        ecranElt.innerText = display;
    }else{
        switch(touche){
            case "C":
            case "Escape":
                previous = 0;
                display = "";
                operation = null
                ecranElt.innerText = 0;
                break;
            case "🠔" :
                display = display.slice(0,-1);
                ecranElt.innerText = display;
                break;  
            case ".":
                if(!display.includes(".")){
                    display = display + ".";  
                }
                ecranElt.innerText = display;
                break;     
            case "%":
                display= display/100;
                ecranElt.innerText = display;
                break;
            case "√":
                if(display>=0){
                    display= Math.sqrt(display);
                    ecranElt.innerText = display;
                    
                }else{
                    ecranElt.innerText = "error";
                    display="";
                }
                
                break;
            case "+":
            case "-":
            case "x":
            case "*":
            case "÷":
            case "/":
                previous = (previous !== 0) ? calculer(previous, parseFloat(display), operation) : parseFloat(display);
                ecranElt.innerText = previous;
                operation = touche;
                display = "";
                break;
            case "=":
            case "Enter":
                if((previous >0 || previous <0) && (parseFloat(display)>0 || parseFloat(display)<0) && operation != ""){
                    previous = (previous === 0) ? parseFloat(display) : calculer(previous, parseFloat(display), operation);
                    ecranElt.innerText = parseFloat(previous).toLocaleString("en");
                    display = previous;
                    previous = 0;
                }else{
                    if(previous>0){
                        ecranElt.innerText = previous;
                        display=previous;
                        previous=0;
                    }else
                    ecranElt.innerText = display;
                }
                
                break;
            default:
                break;
        }
    }
}

/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "x" || operation === "*") return nb1 * nb2;
    if(operation === "/" || operation === "÷") return nb1 / nb2;
}

theme.addEventListener('click', () => {
    let button=document.getElementsByClassName('btn');
    let calc=document.getElementsByClassName('calcul');
    let ecran=document.getElementsByClassName('ecrans');
    let dp=document.getElementsByClassName('display');
    let drk=document.getElementsByTagName('body');
    let tgl=document.getElementById('toggle');
    let bck=document.getElementById('backspace');
    
    for(i=0 ; i<button.length ; i++){
        button[i].classList.toggle("dark");
    }

    for(i=0 ; i<button.length ; i++){
        button[i].classList.toggle("hover");
    }

    for(i=0 ; i<calc.length ; i++){
        calc[i].classList.toggle("calculdark");
    }

    for(i=0 ; i<ecran.length ; i++){
        ecran[i].classList.toggle("ecransdark");
    }
    
    for(i=0 ; i<dp.length ; i++){
        dp[i].classList.toggle("ecrandark");
    }

    for(i=0 ; i<drk.length ; i++){
        drk[i].classList.toggle("dar");
    }

    tgl.classList.toggle("mover");
    bck.classList.toggle("mover");
    
})
