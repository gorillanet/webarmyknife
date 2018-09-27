function randomize() {
    var len =  parseInt(document.getElementById("random_text_length").value);
    document.getElementById("randomizedtext").innerText ="";
    //document.getElementById("text_strength").innerText="";
    var exspecial = document.getElementById("exspecial").checked;
    if (exspecial) {
        if (len <= 100 && 0 < len) {
            console.log("Exclude special chars");
            while (document.getElementById("randomizedtext").innerText.length < len) {
                var codepoint = getrandom(false);
                if ((57 < codepoint && codepoint < 65) || (90 < codepoint && codepoint < 97) ) {
                    
                }else{
                    document.getElementById("randomizedtext").innerText += String.fromCharCode(codepoint);
                }
            }
        }
    //put_strength(62, document.getElementById("randomizedtext").innerText.length);        
    }else{
        if (len <= 100 && 0 < len) {
            while (document.getElementById("randomizedtext").innerText.length < len) {
                document.getElementById("randomizedtext").innerText += String.fromCharCode(getrandom(true));    
            }
        }
    //put_strength(94, document.getElementById("randomizedtext").innerText.length);
    }
}
function getrandom (all){
    if(all){
        return Math.floor(Math.random()*(127-33))+33;
    }
    else{
        return Math.floor(Math.random()*(123-48))+48;
    }
}
function put_strength(n, len) {
    document.getElementById("text_strength").innerText=Math.log(n ** len) / Math.log(2);
}