function reset() {
    document.getElementById("decoded_text").innerText="";
    decode_encode();
    console.log(document.getElementById("decode_typeoption").value+": reset");
}

function storeText(text){
    chrome.storage.local.set(
        {"decodeText": text}
    )
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
                result += "&#" + val.codePointAt(0).toString(10) + ";";
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
            return E;
        }
    }
}

function utf8_16(str, isencode) {
    if (isencode) {
        try {
            var code, pref = {1: '\\u000', 2: '\\u00', 3: '\\u0', 4: '\\u'};
            return str.replace(/\W/g, function(c) {
                return pref[(code = c.charCodeAt(0).toString(16)).length] + code;
            });
        } catch (E) {
            return E
        }
    }else{
        try {
            var r = /\\u([\d\w]{1,6})/gi;
            x = str.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16)); } );
            return unescape(x);
        } catch (E) {
            return E;
        }
    }
}


function utf8_16_plus(str, isencode) {
    if (isencode) {
        try {
            var code, pref = {1: 'U+000', 2: 'U+00', 3: 'U+0', 4: 'U+'};
            return str.replace(/\W/g, function(c) {
                return pref[(code = c.charCodeAt(0).toString(16)).length] + code;
            });
        } catch (E) {
            return E
        }
    }else{
        try {
            var r = /U\+([\d\w]{1,6})/gi;
            x = str.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16)); } );
            return unescape(x);
        } catch (E) {
            return E;
        }
    }
}

function isspcial(val) {
    
}

function url_all(str, isencode) {
    if (isencode) {
        try{
            result = "";
            for(let val of str){
                if(val.match(/[a-zA-Z0-9'!\(\)\~\-\*_\.]/g)){
                    result += "%" + val.codePointAt(0).toString(16);
                }else{
                    result += encodeURIComponent(val);
                }
            }
            return result;
        } catch(E){
            return E;
        }
    }else{
        try {
            return decodeURIComponent(str);
        } catch (E) {
            return E;
        }
    }
}

function js(str, isencode) {
    //たまに動かねえウンコード
    if (isencode) {
        try {
            result="";
            for(let val of str){
                result += "\\" + val.codePointAt(0).toString(8);
            }
            return result;
        } catch (E) {
            return E
        }
    }else{
        try {
            if (str!=undefined) {
                var x="";
                var test_i = 0;
                for (let i = 0; i < str.length; i++) {
                    if (str[i] == "\\") {
                        var nums = "";
                        for(let j = 1; str[j]!="\\" && j < str.length; j++){
                            nums += str[i+j];
                        }
                        x += String.fromCharCode(parseInt(nums, 8));
                    }
                }
            }
            return x;
        } catch (E) {
            return E;
        }
    }
}

function htmlspecialchars(str, is_encode){
    if (is_encode) {
        try {
            return str
            .replace(/'/g, "&#039;")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        } catch (error) {
            return "";
        }
    }else{
        try {
            return str
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        } catch (error) {
            return "";
        }
    }
}

var decode_encode = function(){
    var text = document.getElementById("decode_text").value;
    storeText(text);
    var decode_type = document.getElementById("decode_typeoption").value;
    is_encode = document.getElementById("checkbox_encode").checked;
    var decoded_text="not implemented yet";
    switch (decode_type) {
        case "base64":
            decoded_text = b64(text, is_encode);
            break;
        case "URL":
            decoded_text = is_encode ? encodeURIComponent(text)
                .replace(/'/g, "%27")
                .replace(/!/g, "%21")
                .replace(/\(/g, "%28")
                .replace(/\)/g, "%29")
                .replace(/\~/g, "%7E")
                .replace(/\-/g, "%2D")
                .replace(/\*/g, "%2A")
                .replace(/_/g, "%5F")
                .replace(/\./g, "%2E")
                                    : decodeURIComponent(text);
            break;
        case "URLburp":
            decoded_text = url_all(text, is_encode);
            break;
        case "html16":
            decoded_text = html16(text, is_encode);
            break;
        case "html10":
            decoded_text = html10(text, is_encode);
            break;
        case "unicode":
            decoded_text = utf8_16(text, is_encode);
            break;
        case "js":
            decoded_text = js(text, is_encode); 
            break;   
        case "unicodeplus":
            decoded_text = utf8_16_plus(text, is_encode);
            break;
        case "htmlspecialchars":
            decoded_text = htmlspecialchars(text, is_encode);
            break;
        default:
            break;
    }
    document.getElementById("decoded_text").value=decoded_text;
}

var toggleText = function(){
    var temp = document.getElementById("decoded_text").value
    document.getElementById("decoded_text").value = document.getElementById("decode_text").value;
    document.getElementById("decode_text").value = temp;
    var c = document.getElementById("checkbox_encode");
    if (c.checked) {
        c.checked = false;
    }else{
        c.checked = true;
    }
}
decode_encode();