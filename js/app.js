
/**
 * Función de inicialización de la página. Se encarga de setear las variables globales y de 
 * formatear el documento en base a la plataforma.
 */
function init(){
    // -------- VARIABLES GLOBALES ---------
    // --- variable para cálculo de tiempo de bruteforce:
    mellt = new Mellt();

    //variable timer de manejo de la alerta
    timer = 0;

    //interfaz del DOM
    interfaz = {

        // --- variables de acceso al DOM:
        //_get es un wrapper para obtener el objeto
        //Elementos de cantidad en adiciones
        ncharcant : _get("nchar-count"),
        nletrasmayuscant : _get("nletrasmayus-count"),
        nletrasminuscant : _get("nletrasminus-count"),
        nnumscant : _get("nnums-count"),
        nsimboloscant : _get("nsimbolos-count"),
        nnumsentrecharscant : _get("nnumsentrechars-count"),
        reqscant : _get("reqs-count"),

        //Elementos de puntos bonus, para optimizar tiempo de acceso sobre memoria.
        ncharbonus : _get("nchar-bonus"),
        nletrasmayusbonus : _get("nletrasmayus-bonus"),
        nletrasminusbonus : _get("nletrasminus-bonus"),
        nnumsbonus : _get("nnums-bonus"),
        nsimbolosbonus : _get("nsimbolos-bonus"),
        nnumsentrecharsbonus : _get("nnumsentrechars-bonus"),
        reqsbonusdom : _get("reqs-bonus"),

        //Elementos de cantidad en deducciones
        sletrascant : _get("sololetras-count"),
        snumeroscant : _get("solonums-count"),
        repetidoscant : _get("repchars-count"),
        mayusconscant : _get("lmayusconsec-count"),
        minusconscant : _get("lminusconsec-count"),
        numconscant : _get("numsconsec-count"),
        letraseccant : _get("letrassecuencia-count"),
        nseccant : _get("numssecuencia-count"),
        simseccant : _get("simbolossecuencia-count"),

        //Elementos de valor de deducciones
        sletrasdeduct : _get("sololetras-deduct"),
        snumerosdeduct : _get("solonums-deduct"),
        repetidosdeduct : _get("repchars-deduct"),
        mayusconsdeduct : _get("lmayusconsec-deduct"),
        minusconsdeduct : _get("lminusconsec-deduct"),
        numconsdeduct : _get("numsconsec-deduct"),
        letrasecdeduct : _get("letrassecuencia-deduct"),
        nsecdeduct : _get("numssecuencia-deduct"),
        simsecdeduct : _get("simbolossecuencia-deduct"),

        //elementos de variedad bonus
        variedadbonus : _get("variedad-bonus"),

        //Elemento de bruteforce
        bruteforceElem : _get("dyToCrack"),

        //password + show/hide "checkbox"
        pwdElem : _get("passwordPwd"),
        visibilidad : _get("visibleCheck"),

        //medidor
        meter : _get("meter"),

        //alerta
        alert : _get("alert")
}

    //seteo de página
    //white/dark mode, inicializador. posiblemente innecesario!
    tema = window.localStorage.getItem("tema");
    if(!tema)
        window.localStorage.setItem("tema","white");
    else if(tema=="white"){
        document.getElementById("checkTema").checked = false;
        setTema(true);
    }else{
        document.getElementById("checkTema").checked = true;
        setTema(false);
    }

    let userAgent = navigator.userAgent.toLowerCase();
    let android = userAgent.indexOf("android") > -1;
    if(android){            //fix en teléfonos
        document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;
        let mainContainer = document.getElementById("mainContainer");
        mainContainer.style.setProperty("padding-left","0");
        mainContainer.classList.add("adnroid-text");
    }
    console.log("User agent: "+ userAgent + " android: "+android);

    /*de ultima intentar usar .androidText:
    var htmlEl = document.getElementsByClassName('my-nice-class'); 
    y hacer un for each con estas instrucciones
    htmlEl.classList.add("my-nice-class--dimensions_B");
    htmlEl.classList.remove("my-nice-class--dimensions_A");
    */
}

/** 
 * Wrapper de acceso al DOM por id 
 * @param {String}   id         Id del elemento del DOM.
 * @return {HTMLElement}        Elemento asociado al id pasado por parámetro.
*/
function _get(id){
    return document.getElementById(id);
}

/** 
 * Intercambia los estilos entre modo normal y oscuro.
 * @param {boolean}   checked         Valor actual del checkbox, true >> pasa a white, false >> pasa a dark.
*/
function setTema(checked){
    if(checked){
        document.getElementById("modeIcon").setAttribute("src","css/images/dark.png"); //ícono
        //aca seteo todos los estilos a blanco.
        window.localStorage.setItem("tema","white");
        document.body.classList.remove("dark");
        document.getElementById("bloqueInfo").classList.remove("dark");
        document.getElementById("bloquePassword").classList.remove("dark");
        document.getElementById("bloqueMetricas").classList.remove("dark");
        document.getElementById("titleContainer").classList.remove("dark");
        document.getElementById("passwordPwd").classList.remove("dark");
        let visible = document.getElementById("visibleCheck");
        visible.classList.remove("dark");
        if(visible.getAttribute("src") == "css/images/show-dark.png")
            visible.setAttribute("src","css/images/show.png");
        else if(visible.getAttribute("src") == "css/images/hide-dark.png")
            visible.setAttribute("src","css/images/hide.png");
        titulos = document.getElementsByClassName("titleForm");
        for(i = 0; i < titulos.length; i++) {
            titulos[i].classList.remove("dark");
        }

        subtitulos = document.getElementsByClassName("subtitleForm");
        for(i = 0; i < subtitulos.length; i++) {
            subtitulos[i].classList.remove("dark");
        }

        gridsep = document.getElementsByClassName("grid-separator");
        for(i = 0; i < gridsep.length; i++) {
            gridsep[i].classList.remove("dark");
        }

        celdas = document.getElementsByClassName("celda");
        for(i = 0; i < celdas.length; i++) {
            celdas[i].classList.remove("dark");
        }

        bcontent = document.getElementsByClassName("basicContent");
        for(i = 0; i < bcontent.length; i++) {
            bcontent[i].classList.remove("dark");
        }
    }
    else{
        document.getElementById("modeIcon").setAttribute("src","css/images/bright.png"); //ícono
        //aca seteo todos los estilos a oscuro.
        window.localStorage.setItem("tema","black");
        document.body.classList.add("dark");
        document.getElementById("bloqueInfo").classList.add("dark");
        document.getElementById("bloquePassword").classList.add("dark");
        document.getElementById("bloqueMetricas").classList.add("dark");
        document.getElementById("titleContainer").classList.add("dark");
        document.getElementById("passwordPwd").classList.add("dark");
        
        let visible = document.getElementById("visibleCheck");
        visible.classList.add("dark");
        if(visible.getAttribute("src") == "css/images/show.png")
            visible.setAttribute("src","css/images/show-dark.png");
        else
            visible.setAttribute("src","css/images/hide-dark.png");
            
        titulos = document.getElementsByClassName("titleForm");
        for(i = 0; i < titulos.length; i++) {
            titulos[i].classList.add("dark");
        }

        subtitulos = document.getElementsByClassName("subtitleForm");
        for(i = 0; i < subtitulos.length; i++) {
            subtitulos[i].classList.add("dark");
        }

        gridsep = document.getElementsByClassName("grid-separator");
        for(i = 0; i < gridsep.length; i++) {
            gridsep[i].classList.add("dark");
        }

        celdas = document.getElementsByClassName("celda");
        for(i = 0; i < celdas.length; i++) {
            celdas[i].classList.add("dark");
        }

        bcontent = document.getElementsByClassName("basicContent");
        for(i = 0; i < bcontent.length; i++) {
            bcontent[i].classList.add("dark");
        }
    }
}


/**
 * Intercambia la visibilidad del campo contraseña. Contempla el tema actual seleccionado.
*/
function togglePwd(){
    
    if (interfaz.pwdElem.type === 'text') {
        interfaz.pwdElem.type = 'password';
        (window.localStorage.getItem("tema")=="white") ? interfaz.visibilidad.setAttribute("src","css/images/show.png")
            : interfaz.visibilidad.setAttribute("src","css/images/show-dark.png");
    }
    else{
        interfaz.pwdElem.type = 'text';
        (window.localStorage.getItem("tema")=="white") ? interfaz.visibilidad.setAttribute("src","css/images/hide.png")
            : interfaz.visibilidad.setAttribute("src","css/images/hide-dark.png")
    }
    
}

/** 
 * Instancia el documento con los resultados del análisis de la contraseña provista por el usuario.
 * Se compone de tres etapas, parseo de la contraseña, decisiones en base a los resultados (cálculos)
 * y instanciación del documento con los resultados.
 * Por una cuestión de optimalidad, los objetos receptores de los resultados y aprovechando su inmutabilidad
 * son accedidos solo una vez durante la carga de este archivo y presentados como variables globales,
 * ahorrando tiempo de acceso innecesario.
 * @param {String}   pwd         Contraseña ingresada en el campo password dentro del bloque "Input".
*/
function check(pwd){

    /***** Parseo ******/

    let largoPwd = pwd.length;
    let cantLetrasMayus = 0;
    let cantLetrasMinus = 0;
    let cantNumeros = 0;
    let cantSimbolos = 0;
    let numsEntreChars = 0;
    let reqs = 0;

    let consecMayus = 0;
    let consecMinus = 0;
    let consecNums = 0;
    let secuenciaLetras = 0;
    let secuenciaNumeros = 0;
    let secuenciaSimbolos = 0;

    //aux
    let cantidadAnalizada = 0;
    let EntreChars = 0;                 //control de ocurrencia de números/símbolos entre caracteres.
    let lastTipo = 0;                   //control de último caracter : 0=> inicial ; 1=> minúscula ; 2=> mayúscula ; 3=> número ; 4=> símbolo.
    
    let last = '';                      //utlimo caracter analizado.
    let caracteresEnSecuencia = -1;     //cantidad de caracteres del mismo tipo en cadena.
    let counts = Object();              //Objeto usado como "mapeo" para contar las apariciones de letras. 
    for (const c of pwd) {
        if(((c>='a' && c<='z') || (c === 'á') || (c === 'é') || (c === 'í') || (c === 'ó') || (c === 'ú'))){
            //minúscula
            cantLetrasMinus++;

            if( (lastTipo == 1)){
                consecMinus ++;     //si el ultimo era de este tipo lo cuento como repetido

                //control de secuencia
                //si tengo un caracter del mismo tipo y es el anterior a este sumo 1 a cadena repetidos.
                if((c.charCodeAt(0) == last.charCodeAt(0)+1) && ((lastTipo == 2) || (lastTipo == 1)))
                    caracteresEnSecuencia ++;
                else if(caracteresEnSecuencia >= 1){
                    secuenciaLetras += caracteresEnSecuencia;
                    caracteresEnSecuencia = -1;
                }else
                    caracteresEnSecuencia = -1;

            } else if((lastTipo == 2) && (c.charCodeAt(0) == last.charCodeAt(0) + 33)){ // + 32 me lleva a las minúsculas + 1 a la siguiente
                caracteresEnSecuencia ++;
            }
            else if( (lastTipo == 2) && (caracteresEnSecuencia >= 1)){
                secuenciaLetras += caracteresEnSecuencia;
                caracteresEnSecuencia = -1;
            }else
                caracteresEnSecuencia = -1;

            tipoActual = 1;


            if(EntreChars)
                numsEntreChars++;
            EntreChars = 0;
        }else if ( ((c>='A' && c<='Z') || (c === 'Á') || (c === 'É') || (c === 'Í') || (c === 'Ó') || (c === 'Ú')) ){
            //mayúscula
            cantLetrasMayus++;

            if(lastTipo == 2){
                consecMayus ++;     //si el ultimo era de este tipo lo cuento como repetido

                //control de secuencia
                //si tengo un caracter del mismo tipo y es el anterior a este sumo 1 a cadena repetidos.
                if((c.charCodeAt(0) == last.charCodeAt(0)+1) && ((lastTipo == 1) || (lastTipo == 2)))
                    caracteresEnSecuencia ++;
                else if(caracteresEnSecuencia >= 1){
                    secuenciaLetras += caracteresEnSecuencia;
                    caracteresEnSecuencia = -1;
                }else
                    caracteresEnSecuencia = -1;

            }else if((lastTipo == 1) && (c.charCodeAt(0) == last.charCodeAt(0) - 31)){ // - 31 me lleva a las mayúsculas + 1 a la siguiente
                caracteresEnSecuencia ++;
            }
            else if( (lastTipo == 1) && (caracteresEnSecuencia >= 1)){
                secuenciaLetras += caracteresEnSecuencia;
                caracteresEnSecuencia = -1;
            }else
                caracteresEnSecuencia = -1;

            tipoActual = 2;
            EntreChars = 0;
        }
        else if( (c>='0' && c<='9') ){ //número
            cantNumeros++;

            if(lastTipo == 3){
                consecNums ++;     //si el ultimo era de este tipo lo cuento como repetido

                //control de secuencia
                //si tengo un caracter del mismo tipo y es el anterior a este sumo 1 a cadena repetidos.
                if(c.charCodeAt(0) == last.charCodeAt(0)+1)
                    caracteresEnSecuencia ++;
                else if(caracteresEnSecuencia >= 1){
                    secuenciaNumeros += caracteresEnSecuencia;
                    caracteresEnSecuencia = -1;
                }else
                    caracteresEnSecuencia = -1;

            }
            else
                caracteresEnSecuencia = - 1;
                
            tipoActual = 3;

            if ((!EntreChars) && (cantLetrasMayus || cantLetrasMinus || cantSimbolos || cantNumeros))
                EntreChars = 1;
            else
                numsEntreChars++;
        }else{ //símbolo
            cantSimbolos++;

            //control de secuencia
            //si tengo un caracter del mismo tipo y es el anterior a este sumo 1 a cadena repetidos.
            if(lastTipo == 4){
                if (c.charCodeAt(0) == last.charCodeAt(0)+1)
                    caracteresEnSecuencia ++;
                else if(caracteresEnSecuencia >= 1){
                    secuenciaLetras += caracteresEnSecuencia;
                    caracteresEnSecuencia = -1;
                }else
                    caracteresEnSecuencia = -1;
            }
            else
                caracteresEnSecuencia = -1;
            

            if ((!EntreChars) && (cantLetrasMayus || cantLetrasMinus || cantSimbolos || cantNumeros))
                EntreChars = 1;
            else
                numsEntreChars++;
            
            tipoActual = 4;
        }

        last = c;
        cantidadAnalizada ++;

        lastTipo = tipoActual;
        counts[c.toLowerCase()] = (counts[c.toLowerCase()] || 0) + 1    //agrego al objeto de cuenta de apariciones el caracter analizado.
    }
    //terminé de analizar y tenía caracteres en secuencia
    if(caracteresEnSecuencia >= 1 ){  
        switch(lastTipo){
            case 1:
            case 2:
                secuenciaLetras += caracteresEnSecuencia;
                break;
            case 3:
                secuenciaNumeros += caracteresEnSecuencia;
                break;
            case 4:
                secuenciaSimbolos += caracteresEnSecuencia;
                break;
        }
    }

    /****** Decisiones ******/

    let total = 0;

    //------- Cálculo dias de bruteforce -------//
    //automáticamente se pasan a años en caso de superar los 365 días

    var daysToCrack = mellt.CheckPassword(interfaz.pwdElem.value); //tiempo necesario de crackeo en base al análisis propuesto por Mellt.
    if(daysToCrack == -1){  //contraseña común/obvia
        interfaz.bruteforceElem.innerHTML = "Dentro de las más comunes";
        interfaz.bruteforceElem.setAttribute("mellt","bad");
    }
    else if(daysToCrack == 0){
            interfaz.bruteforceElem.innerHTML = "0 días";
            interfaz.bruteforceElem.setAttribute("mellt","bad");
        }
        else if(daysToCrack < 365){
            interfaz.bruteforceElem.innerHTML = (daysToCrack === 1) ? daysToCrack + " día" : daysToCrack + " días";
            interfaz.bruteforceElem.setAttribute("mellt","mild");
            }
            else{
                daysToCrack = daysToCrack / 365;
                interfaz.bruteforceElem.innerHTML = ""
                interfaz.bruteforceElem.innerHTML = (daysToCrack < 2739726) ? Math.round(daysToCrack) + " años" : "Más de 27 millones de años";
                (daysToCrack > 25000) ? interfaz.bruteforceElem.setAttribute("mellt","excep") : interfaz.bruteforceElem.setAttribute("mellt","good");
            }

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

    //adiciones al total
    total += reqsBonus + bonusentrechars + bonussim + bonusnum + bonusminus + bonusmayus + bonuschars;
    
    //------- Cálculo de deducciones -------//
    //Calculo de valores de cantidad:
    //repetidos: si la cantidad es menor que largo/2, n*2, sino n*3.
    let cantidadRepeticiones = 0;
    for (const letra in counts) {
        if(counts[letra]>1)
            cantidadRepeticiones += counts[letra];
    }
    let sololetras = ( (!cantNumeros) && (!cantSimbolos) ) ? largoPwd : 0;
    let solonum = ( (!cantLetrasMayus) && (!cantLetrasMinus) && (!cantSimbolos) ) ? largoPwd : 0;

    //Deducción total por categoría:
    let deductSoloLetras = sololetras * 2;
    let deductSoloNum = solonum * 2;
    let deductMayusConsec = consecMayus * 2;
    let deductMinusConsec = consecMinus * 2;
    let deductNumsConsec = consecNums * 2;
    let deductLetrasSec = secuenciaLetras * 3;
    let deductNumerosSec = secuenciaNumeros * 3;
    let deductSimbolosSec = secuenciaSimbolos * 3;

    //caracteres repetidos, si la cantidad de caracteres repetidos supera la mitad de la contraseña
    //entonces peno la seguridad multiplicando por dos el cálculo de deducción, caso contrario lo dejo como está
    let diferencial = largoPwd - cantidadRepeticiones;
    let deductRepeticiones = (cantidadRepeticiones) ? (largoPwd/((diferencial)+1))*2 : 0;
    if(diferencial > largoPwd/2) deductRepeticiones /=2;
    deductRepeticiones = Math.round(deductRepeticiones);

    console.log(cantidadRepeticiones, largoPwd, diferencial, deductRepeticiones);
    //deducciones al total
    total -= deductSoloLetras + deductSoloNum + deductMayusConsec + deductMinusConsec + deductNumsConsec + deductLetrasSec + deductNumerosSec + deductSimbolosSec + deductRepeticiones;

    //------- Ajuste final de total -------//
    if(total<0) total = 0;
    else if(total>100) total = 100;

    //las contraseñas comunes son una falla grave de seguridad
    if(daysToCrack == -1)
        total = 0;

    /****** Impresión a usuario ******/

    //------- Adiciones -------//
    //---- Cantidad:
    interfaz.ncharcant.innerHTML = largoPwd;
    interfaz.nletrasmayuscant.innerHTML = cantLetrasMayus;
    interfaz.nletrasminuscant.innerHTML = cantLetrasMinus;
    interfaz.nnumscant.innerHTML = cantNumeros;
    interfaz.nsimboloscant.innerHTML = cantSimbolos;
    interfaz.nnumsentrecharscant.innerHTML = numsEntreChars;
    interfaz.reqscant.innerHTML = reqs;

    //---- Bonus:
    interfaz.ncharbonus.innerHTML = (bonuschars) ? "+ " + bonuschars : 0;    //en 4 amarillo, en 8 verde, en 12 azul
    if( (bonuschars >= 4) && (bonuschars < 12)  ) interfaz.ncharbonus.setAttribute("value","good"); 
    else if((bonuschars >= 12)) interfaz.ncharbonus.setAttribute("value","excep"); 
    else interfaz.ncharbonus.setAttribute("value","bad"); 

    interfaz.nletrasmayusbonus.innerHTML = (bonusmayus) ? "+ " + bonusmayus : 0; // en 2 amarillo, en 4 verde, en 8 azul
    if( (bonusmayus >= 4) && (bonusmayus < 8)  ) interfaz.nletrasmayusbonus.setAttribute("value","good"); 
    else if((bonusmayus >= 8) ) interfaz.nletrasmayusbonus.setAttribute("value","excep"); 
    else interfaz.nletrasmayusbonus.setAttribute("value","bad"); 

    interfaz.nletrasminusbonus.innerHTML = (bonusminus) ? "+ " + bonusminus : 0; // en 2 amarillo, en 4 verde, en 8 azul
    if( (bonusminus >= 2) && (bonusminus < 4)  ) interfaz.nletrasminusbonus.setAttribute("value","good"); 
    else if((bonusminus >= 4)) interfaz.nletrasminusbonus.setAttribute("value","excep"); 
    else interfaz.nletrasminusbonus.setAttribute("value","bad"); 

    interfaz.nnumsbonus.innerHTML = (bonusnum) ? "+ " + bonusnum : 0;     //en 4 amarillo, 8 verde, 12 azul
    if( (bonusnum >= 4) && (bonusnum < 8)  ) interfaz.nnumsbonus.setAttribute("value","good"); 
    else if((bonusnum >= 8)) interfaz.nnumsbonus.setAttribute("value","excep"); 
    else interfaz.nnumsbonus.setAttribute("value","bad"); 

    interfaz.nsimbolosbonus.innerHTML = (bonussim) ? "+ " + bonussim : 0; //en 6 amarillo, 12 verde, 18 azul
    if( (bonussim >= 6) && (bonussim < 12)  ) interfaz.nsimbolosbonus.setAttribute("value","good"); 
    else if((bonussim >= 12) ) interfaz.nsimbolosbonus.setAttribute("value","excep"); 
    else interfaz.nsimbolosbonus.setAttribute("value","bad"); 

    interfaz.nnumsentrecharsbonus.innerHTML = (bonusentrechars) ? "+ " + bonusentrechars : 0; // en 2 amarillo, 8 verde, 12 azul
    if( (bonusentrechars >= 2) && (bonusentrechars < 8)  ) interfaz.nnumsentrecharsbonus.setAttribute("value","good"); 
    else if((bonusentrechars >= 8) ) interfaz.nnumsentrecharsbonus.setAttribute("value","excep"); 
    else interfaz.nnumsentrecharsbonus.setAttribute("value","bad"); 

    interfaz.reqsbonusdom.innerHTML = (reqsBonus) ? "+ " + reqsBonus : 0; //8 verde, 10 azul
    if( (reqsBonus >= 4) && (reqsBonus < 8)  ) interfaz.reqsbonusdom.setAttribute("value","good"); 
    else if((reqsBonus >= 8) ) interfaz.reqsbonusdom.setAttribute("value","excep"); 
    else interfaz.reqsbonusdom.setAttribute("value","bad"); 

    //------- Deducciones -------//
    //---- Cantidad:
    interfaz.sletrascant.innerHTML = sololetras;
    interfaz.snumeroscant.innerHTML = solonum;
    interfaz.repetidoscant.innerHTML = 0;
    interfaz.mayusconscant.innerHTML = consecMayus;
    interfaz.minusconscant.innerHTML = consecMinus;
    interfaz.numconscant.innerHTML = consecNums;
    interfaz.letraseccant.innerHTML = secuenciaLetras;
    interfaz.nseccant.innerHTML = secuenciaNumeros;
    interfaz.simseccant.innerHTML = secuenciaSimbolos;
    interfaz.repetidoscant.innerHTML = cantidadRepeticiones;
    
    //---- Deducción:
    interfaz.sletrasdeduct.innerHTML = (deductSoloLetras) ? "- " + deductSoloLetras : 0;
    if((deductSoloLetras >= 1)) interfaz.sletrasdeduct.setAttribute("value","bad"); 
    else interfaz.sletrasdeduct.setAttribute("value","good"); 
    

    interfaz.snumerosdeduct.innerHTML = (deductSoloNum) ? "- " + deductSoloNum : 0;
    if((deductSoloNum >= 1)) interfaz.snumerosdeduct.setAttribute("value","bad"); 
    else interfaz.snumerosdeduct.setAttribute("value","good"); 


    interfaz.repetidosdeduct.innerHTML = (deductRepeticiones) ? "- " + deductRepeticiones : 0;
    if( (deductRepeticiones >= 2) && (deductRepeticiones < 12)  ) interfaz.repetidosdeduct.setAttribute("value","mild"); 
    else if((deductRepeticiones >= 12)) interfaz.repetidosdeduct.setAttribute("value","bad"); 
    else interfaz.repetidosdeduct.setAttribute("value","good"); 


    interfaz.mayusconsdeduct.innerHTML = (deductMayusConsec) ? "- " + deductMayusConsec : 0;
    if( (deductMayusConsec >= 2) && (deductMayusConsec < 8)  ) interfaz.mayusconsdeduct.setAttribute("value","mild"); 
    else if((deductMayusConsec >= 1)) interfaz.mayusconsdeduct.setAttribute("value","bad"); 
    else interfaz.mayusconsdeduct.setAttribute("value","good"); 


    interfaz.minusconsdeduct.innerHTML = (deductMinusConsec) ? "- " + deductMinusConsec : 0;
    if( (deductMinusConsec >= 2) && (deductMinusConsec < 12)  ) interfaz.minusconsdeduct.setAttribute("value","mild"); 
    else if((deductMinusConsec >= 12)) interfaz.minusconsdeduct.setAttribute("value","bad"); 
    else interfaz.minusconsdeduct.setAttribute("value","good"); 


    interfaz.numconsdeduct.innerHTML = (deductNumsConsec) ? "- " + deductNumsConsec : 0;
    if( (deductNumsConsec >= 2) && (deductNumsConsec < 8)  ) interfaz.numconsdeduct.setAttribute("value","mild"); 
    else if((deductNumsConsec >= 8)) interfaz.numconsdeduct.setAttribute("value","bad"); 
    else interfaz.numconsdeduct.setAttribute("value","good"); 


    interfaz.letrasecdeduct.innerHTML = (deductLetrasSec) ? "- " + deductLetrasSec : 0;
    if( (deductLetrasSec >= 3) && (deductLetrasSec < 6)  ) interfaz.letrasecdeduct.setAttribute("value","mild"); 
    else if((deductLetrasSec >= 6)) interfaz.letrasecdeduct.setAttribute("value","bad"); 
    else interfaz.letrasecdeduct.setAttribute("value","good"); 


    interfaz.nsecdeduct.innerHTML = (deductNumerosSec) ? "- " + deductNumerosSec : 0;
    if( (deductNumerosSec >= 3) && (deductNumerosSec < 6)  ) interfaz.nsecdeduct.setAttribute("value","mild"); 
    else if((deductNumerosSec >= 6)) interfaz.nsecdeduct.setAttribute("value","bad"); 
    else interfaz.nsecdeduct.setAttribute("value","good"); 


    interfaz.simsecdeduct.innerHTML = (deductSimbolosSec) ? "- " + deductSimbolosSec : 0;
    if( (deductSimbolosSec >= 3) && (deductSimbolosSec < 6)  ) interfaz.simsecdeduct.setAttribute("value","mild"); 
    else if((deductSimbolosSec >= 6)) interfaz.simsecdeduct.setAttribute("value","bad"); 
    else interfaz.simsecdeduct.setAttribute("value","good");

    //------- TOTAL -------//
    interfaz.meter.value = total;

}

//***** Generación de PDF *****/

/**
 * Muestra o esconde la alerta por pantalla. Se agregó un timeout para mejorar la experiencia de usuario.
 * @param {boolean} valor   true ==> muestra la alerta, false ==> esconde la alerta. 
 */
function toggleAlert(valor){
    if(valor){
        document.getElementById("alert").classList.remove("hidden");
        interfaz.alert.children[0].classList.remove("hidden");
        timer = setTimeout(function(){
            interfaz.alert.classList.add("hidden");
            setTimeout(function(){
                interfaz.alert.children[0].classList.add("hidden");
            },300);
        },3500);
    }
    else{
        clearTimeout(timer);
        interfaz.alert.classList.add("hidden");
        setTimeout(function(){
            interfaz.alert.children[0].classList.add("hidden");
        },300);
    }
}

/**
 * Genera un archivo PDF utilizando los datos calculados en la página.
 */
function generarPdf(){
    if(interfaz.pwdElem.value == ""){   //si no tengo nada cargado en la contraseña lanzo la alerta
        toggleAlert(true);
        return;
    }

}