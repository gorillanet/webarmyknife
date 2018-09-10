"use strict";

var pw_forms = [];

function expose_password(t){
    for(var i = 0; i<document.forms.length; i++){
        for(var j = 0; j<document.forms[i].length; j++){
            if(document.forms[i][j].type =="password"){
                document.forms[i][j].type = "text";
                pw_forms.push(document.forms[i][j]);
            }
        }
    }
    console.log("Password exposed for "+1000*parseInt(t,10)+" secs.");
    setTimeout(hide_password, 1000*parseInt(t,10));
}

function hide_password(){
    for(var i = 0; i<pw_forms.length; i++){
        pw_forms[i].type = "password";
    }
    pw_forms = [];
    console.log("Hide again exposed form");
}

browser.runtime.onMessage.addListener(request => {
    if (request.command == "expose") {
        expose_password(request.t);
    }else if(request.command == "hide"){
        hide_password();
    }
});