function reset() {
    document.getElementById("decoded_text").innerText="";
    decode_encode();
    console.log("reset");
}

function b64(str, isencode) {
    if(isencode){
        try { 
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        } catch (E) {
            return E;
        }
    }
    else{
        try {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        } catch (E) {
            return E;
        }
    }
    
}

function html10(str, isencode) {
    result = "";
    if (isencode) {
        try{
            for(let val of str){
                result += "&#x" + val.codePointAt(0).toString(10) + ";";
            }
            return result;
        } catch(E){
            return E;
        }
    }
    else{
        try {
            return str.replace(/&#(\d+);/ig, function(match, $1, idx, all) {
                return String.fromCharCode($1);
            });
        } catch (E) {
            return E;
        }
    }
}

function html16(str, isencode) {
    result = "";
    if (isencode) {
        try{
            for(let val of str){
                result += "&#x" + val.codePointAt(0).toString(16) + ";";
            }
            return result;
        } catch(E){
            return E;
        }
    }
    else{
        try {
            return str.replace(/&#x([0-9a-f]+);/ig, function(match, $1, idx, all) {
                return String.fromCharCode('0x' + $1);
            });
        } catch (E) {
            
        }
    }
}

var decode_encode = function(){
    var text = document.getElementById("decode_text").value;
    decode_type = document.getElementById("decode_typeoption").value;
    is_encode = document.getElementById("checkbox_encode").checked;
    var decoded_text="not implemented yet";
    switch (decode_type) {
        case "base64":
            decoded_text = b64(text, is_encode);
            break;
        case "URL":
            decoded_text = is_encode ? encodeURIComponent(text) : decodeURIComponent(text);
            break;
        case "URLburp":
            
            break;

        case "html16":
            decoded_text = html16(text, is_encode);
            break;
            
        case "html10":
            decoded_text = html10(text, is_encode);
        break;

        case "unicode":
            
            break;

        default:
            break;
    }
    document.getElementById("decoded_text").value=decoded_text;
}

var toggle_text = function(){
    var temp = document.getElementById("decoded_text").value
    document.getElementById("decoded_text").value = document.getElementById("decode_text").value;
    document.getElementById("decode_text").value = temp;

}
decode_encode();