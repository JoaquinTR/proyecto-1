// --- INICIALIZACIÓN --- //

document.getElementById("visibleCheck").checked = false;    //se me guardaba entre reloads
var mellt = new Mellt();

var userAgent = navigator.userAgent.toLowerCase();
var android = userAgent.indexOf("android") > -1;
if(android){
    document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;
}
console.log("User agent: "+ userAgent + " android: "+android);

/*de ultima intentar usar .androidText:
var htmlEl = document.getElementsByClassName('my-nice-class'); 
y hacer un for each con estas instrucciones
htmlEl.classList.add("my-nice-class--dimensions_B");
htmlEl.classList.remove("my-nice-class--dimensions_A");
*/

//Elementos de cantidad en adiciones
var ncharcant = document.getElementById("nchar-count");
var nletrasmayuscant = document.getElementById("nletrasmayus-count");
var nletrasminuscant = document.getElementById("nletrasminus-count");
var nnumscant = document.getElementById("nnums-count");
var nsimboloscant = document.getElementById("nsimbolos-count");
var nnumsentrecharscant = document.getElementById("nnumsentrechars-count");
var reqscant = document.getElementById("reqs-count");

//Elementos de puntos bonus, para optimizar tiempo de acceso sobre memoria.
var ncharbonus = document.getElementById("nchar-bonus");
var nletrasmayusbonus = document.getElementById("nletrasmayus-bonus");
var nletrasminusbonus = document.getElementById("nletrasminus-bonus");
var nnumsbonus = document.getElementById("nnums-bonus");
var nsimbolosbonus = document.getElementById("nsimbolos-bonus");
var nnumsentrecharsbonus = document.getElementById("nnumsentrechars-bonus");
var reqsbonusdom = document.getElementById("reqs-bonus");

//Elemento de bruteforce
var bruteforceElem = document.getElementById("dyToCrack");

// --- CÓDIGO --- //

function togglePwd(valorCheck){
    document.getElementById("passwordPwd").type = valorCheck ? 'text':'password';
}

function check(pwd){
    //tiempo necesario de crackeo
    var daysToCrack = mellt.CheckPassword(document.getElementById("passwordPwd").value);

    /***** Parseo ******/
    //vars
    let largoPwd = pwd.length;
    let cantLetrasMayus = 0;
    let cantLetrasMinus = 0;
    let cantNumeros = 0;
    let cantSimbolos = 0;
    let numsEntreChars = 0;
    let reqs = 0;

    //aux
    let EntreChars = 0;
    for (const c of pwd) {

        if(((c>='a' && c<='z') || (c === 'á') || (c === 'é') || (c === 'í') || (c === 'ó') || (c === 'ú'))){
            //minúscula
            cantLetrasMinus++;
            if(EntreChars)
                numsEntreChars++;
            EntreChars = 0;
        }else if ( ((c>='A' && c<='Z') || (c === 'Á') || (c === 'É') || (c === 'Í') || (c === 'Ó') || (c === 'Ú')) ){
            //mayúscula
            cantLetrasMayus++;
            EntreChars = 0;
        }
        else if( (c>='0' && c<='9') ){ //número
            cantNumeros++;
            if ((!EntreChars) && (cantLetrasMayus || cantLetrasMinus || cantSimbolos || cantNumeros))
                EntreChars = 1;
            else
                numsEntreChars++;
        }else{ //símbolo
            cantSimbolos++;
            if ((!EntreChars) && (cantLetrasMayus || cantLetrasMinus || cantSimbolos || cantNumeros))
                EntreChars = 1;
            else
                numsEntreChars++;
        }

    }

    /****** Decisiones ******/


    //------- Cálculo de bonus -------//
    //bonus total por categoría:
    let bonuschars = largoPwd * 4;                                              //cant caracteres
    let bonusmayus = (cantLetrasMayus) ? (largoPwd - cantLetrasMayus) * 2 : 0;  //cant mayusculas
    let bonusminus = (cantLetrasMinus) ? (largoPwd - cantLetrasMinus) * 2 : 0;  //cant minúsculas
    let bonusnum = cantNumeros * 4                                              //cant números
    let bonussim = cantSimbolos * 6;                                            //cant símbolos
    let bonusentrechars = numsEntreChars * 2;                                   //cant números/símbolos entre caracteres

    //Requerimientos: 
    let reqsBonus = 0;                                                          //bonus en función de requerimientos
    
    let tempReqs = 0;
    if(cantLetrasMinus){
        tempReqs++;
    }
    if(cantLetrasMayus){
        tempReqs++;
    }
    if(cantNumeros){
        tempReqs++;
    }
    if(cantSimbolos){
        tempReqs++;
    }
    reqs += tempReqs;

    if( (largoPwd >=8) && (tempReqs>=3) ){                                      //solo sumo si paso los requerimientos mínimos
        reqs++;
        reqsBonus = reqs * 2;
    }

    //dias de bruteforce:
    //automáticamente se pasan a años en caso de superar los 365 días
    if(daysToCrack == -1){
        bruteforceElem.innerHTML = "Dentro de las más comunes";
        bruteforceElem.classList = "";
        bruteforceElem.classList.add("center");
        bruteforceElem.classList.add("mellt-bad");
    }
    else if(daysToCrack == 0){
            bruteforceElem.innerHTML = "0 días";
            bruteforceElem.classList = "";
            bruteforceElem.classList.add("center");
            bruteforceElem.classList.add("mellt-bad");
        }
        else if(daysToCrack < 365){
            bruteforceElem.innerHTML = (daysToCrack === 1) ? daysToCrack + " día" : daysToCrack + " días";
            bruteforceElem.classList = "";
            bruteforceElem.classList.add("center");
            bruteforceElem.classList.add("mellt-mild");
            }
            else{
                daysToCrack = daysToCrack / 365;
                bruteforceElem.innerHTML = ""
                bruteforceElem.innerHTML = (daysToCrack < 2739726) ? Math.round(daysToCrack) + " años" : "Más de 27 millones de años";
                bruteforceElem.classList = "";
                bruteforceElem.classList.add("center");
                (daysToCrack > 25000) ? bruteforceElem.classList.add("mellt-exceptional"): bruteforceElem.classList.add("mellt-good");
            }

    //------- Cálculo de deducciones -------//


    /****** Impresión a usuario ******/

    //------- Adiciones -------//
    //---- Cantidad:
    ncharcant.innerHTML = largoPwd;
    nletrasmayuscant.innerHTML = cantLetrasMayus;
    nletrasminuscant.innerHTML = cantLetrasMinus;
    nnumscant.innerHTML = cantNumeros;
    nsimboloscant.innerHTML = cantSimbolos;
    nnumsentrecharscant.innerHTML = numsEntreChars;
    reqscant.innerHTML = reqs;

    //---- Bonus:
    ncharbonus.innerHTML = bonuschars;    //en 4 amarillo, en 8 verde, en 12 azul
    if( (bonuschars >= 4) && (bonuschars < 8)  ) ncharbonus.setAttribute("value","good"); 
    else if((bonuschars >= 8)) ncharbonus.setAttribute("value","excep"); 
    else ncharbonus.setAttribute("value","bad"); 

    nletrasmayusbonus.innerHTML = bonusmayus; // en 2 amarillo, en 4 verde, en 8 azul
    if( (bonusmayus >= 4) && (bonusmayus < 8)  ) nletrasmayusbonus.setAttribute("value","good"); 
    else if((bonusmayus >= 8) ) nletrasmayusbonus.setAttribute("value","excep"); 
    else nletrasmayusbonus.setAttribute("value","bad"); 

    nletrasminusbonus.innerHTML = bonusminus; // en 2 amarillo, en 4 verde, en 8 azul
    if( (bonusminus >= 2) && (bonusminus < 4)  ) nletrasminusbonus.setAttribute("value","good"); 
    else if((bonusminus >= 4)) nletrasminusbonus.setAttribute("value","excep"); 
    else nletrasminusbonus.setAttribute("value","bad"); 

    nnumsbonus.innerHTML = bonusnum;     //en 4 amarillo, 8 verde, 12 azul
    if( (bonusnum >= 4) && (bonusnum < 8)  ) nnumsbonus.setAttribute("value","good"); 
    else if((bonusnum >= 8)) nnumsbonus.setAttribute("value","excep"); 
    else nnumsbonus.setAttribute("value","bad"); 

    nsimbolosbonus.innerHTML = bonussim; //en 6 amarillo, 12 verde, 18 azul
    if( (bonussim >= 6) && (bonussim < 12)  ) nsimbolosbonus.setAttribute("value","good"); 
    else if((bonussim >= 12) ) nsimbolosbonus.setAttribute("value","excep"); 
    else nsimbolosbonus.setAttribute("value","bad"); 

    nnumsentrecharsbonus.innerHTML = numsEntreChars * 2; // en 2 amarillo, 8 verde, 12 azul
    if( (bonusentrechars >= 2) && (bonusentrechars < 8)  ) nnumsentrecharsbonus.setAttribute("value","good"); 
    else if((bonusentrechars >= 8) ) nnumsentrecharsbonus.setAttribute("value","excep"); 
    else nnumsentrecharsbonus.setAttribute("value","bad"); 

    reqsbonusdom.innerHTML = reqsBonus; //8 verde, 10 azul
    if( (reqsBonus >= 4) && (reqsBonus < 8)  ) reqsbonusdom.setAttribute("value","good"); 
    else if((reqsBonus >= 8) ) reqsbonusdom.setAttribute("value","excep"); 
    else reqsbonusdom.setAttribute("value","bad"); 

    //------- Deducciones -------//
    //---- Cantidad:

    //---- Deducción:

    //para los colores usar css en base al value ? lo que iba con []
}