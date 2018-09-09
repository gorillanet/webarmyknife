"use strict";

function expose_password(){
    for(var i = 0; i<document.forms.length; i++){
        for(var j = 0; j<document.forms[i].length; j++){
            if(document.forms[i][j].type =="password"){
                document.forms[i][j].type = "text";
            }
        }
    }
    console.log("Password exposed");
}

function hide_password(){
    for(var i = 0; i<document.forms.length; i++){
        for(var j = 0; j<document.forms[i].length; j++){
            if(document.forms[i][j].type =="password"){
                document.forms[i][j].type = "text";
            }
        }
    }
    console.log("Hide exposed");
}

browser.runtime.onMessage.addListener(request => {
    if (request.command == "expose") {
        expose_password();
    }else if(request.command == "hide"){
        hide_password();
    }
});