var mellt = new Mellt();

var userAgent = navigator.userAgent.toLowerCase();
var android = userAgent.indexOf("android") > -1;
if(android){
    document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;
}

/*de ultima intentar usar .androidText:
var htmlEl = document.getElementsByClassName('my-nice-class'); 
y hacer un for each con estas instrucciones
htmlEl.classList.add("my-nice-class--dimensions_B");
htmlEl.classList.remove("my-nice-class--dimensions_A");
*/

console.log("User agent: "+ userAgent + " android: "+android);

function togglePwd(valorCheck){
    document.getElementById("passwordPwd").type = valorCheck ? 'text':'password';
}

function check(pwd){
    var daysToCrack = mellt.CheckPassword(document.getElementById("passwordPwd").value);
    let doc = document.getElementById("dyToCrack");

    let largoPwd = pwd.length;
    let cantLetrasMayus = 0;
    let cantLetrasMinus = 0;
    let cantNumeros = 0;
    let cantSimbolos = 0;
    let numsEntreChars = 0;
    let reqs = 0;

    /***** Parseo ******/
    let EntreChars = 0;
    let type = "";
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

    //Requerimientos: solo suma si hay al menos 3 de los tipos de caracteres y el largo es >= 8
    let reqsBonus = 0;
    
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

    if( (largoPwd >=8) && (tempReqs>=3) ){
        reqs++;
        reqsBonus = reqs * 2;
    }
    

    if(daysToCrack == -1){
        doc.innerHTML = "Dentro de las más comunes";
        doc.classList = "";
        doc.classList.add("center");
        doc.classList.add("mellt-bad");
    }
    else if(daysToCrack == 0){
            doc.innerHTML = "0 días";
            doc.classList = "";
            doc.classList.add("center");
            doc.classList.add("mellt-bad");
        }
        else if(daysToCrack < 365){
            doc.innerHTML = daysToCrack + " días";
            doc.classList = "";
            doc.classList.add("center");
            doc.classList.add("mellt-mild");
            }
            else{
                daysToCrack = daysToCrack / 365;
                doc.innerHTML = ""
                doc.innerHTML = (daysToCrack < 2739726) ? Math.round(daysToCrack) + " años" : "Más de 27 millones de años";
                doc.classList = "";
                doc.classList.add("center");
                (daysToCrack > 25000) ? doc.classList.add("mellt-exceptional"): doc.classList.add("mellt-good");
            }


    /****** Impresión a usuario ******/

    //------- Adiciones
    //---- Cantidad
    document.getElementById("nchar-count").innerHTML = largoPwd;
    document.getElementById("nletrasmayus-count").innerHTML = cantLetrasMayus;
    document.getElementById("nletrasminus-count").innerHTML = cantLetrasMinus;
    document.getElementById("nnums-count").innerHTML = cantNumeros;
    document.getElementById("nsimbolos-count").innerHTML = cantSimbolos;
    document.getElementById("nnumsentrechars-count").innerHTML = numsEntreChars;
    document.getElementById("nnumsentrechars-count").innerHTML = numsEntreChars;
    document.getElementById("reqs-count").innerHTML = reqs;

    //---- Bonus
    document.getElementById("reqs-bonus").innerHTML = reqsBonus;


    //para los colores usar css en base al value ? lo que iba con []
}