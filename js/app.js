var mellt = new Mellt();

function togglePwd(valorCheck){
    document.getElementById("passwordPwd").type = valorCheck ? 'text':'password';
}

function check(pwd){
    var daysToCrack = mellt.CheckPassword(document.getElementById("passwordPwd").value);
    let doc = document.getElementById("dyToCrack");
    //console.log(daysToCrack);

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
    
}