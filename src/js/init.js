// popupコンテンツのイベントリスナの登録
window.onload=function(){
    document.getElementById("button_expass").addEventListener('click', expass);
    document.getElementById("button_create_frame").addEventListener('click', create_frame);
    document.getElementById("button_create_frame_sandbox").addEventListener('click', create_frame_sandbox);
    document.getElementById("button_get_source").addEventListener('click', get_source);
    document.getElementById("decode_text").addEventListener('keyup', decode_encode);
    document.getElementById("decode_text").addEventListener('keydown', decode_encode);
    document.getElementById("decode_text").addEventListener('change', decode_encode);
    document.getElementById("decode_typeoption").addEventListener('change', reset);
    document.getElementById("decoded_text").addEventListener('keyup', reset);
    document.getElementById("qrtext").addEventListener('keyup', makeCode);
    document.getElementById("button_random").addEventListener('click', randomize);
    document.getElementById("checkbox_encode").addEventListener('change', decode_encode);
    //document.getElementById("checkbox_encode").addEventListener('change', toggle_text);
    document.getElementById("minified_json_text").addEventListener('keyup', beautify_object);
    document.getElementById("minified_xml_text").addEventListener('keyup', beautify_xml);
    makeCode();
}
var isvalidurl = function (v) {
    var res = v.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
var currentURL = "";
browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function(tabs){
    for(let t of tabs){
        currentURL = t.url;
        console.log("Current URL: "+currentURL);
        document.getElementById("framesrc").value = isvalidurl(currentURL) ? currentURL : "";
        document.getElementById("qrtext").value = isvalidurl(currentURL) ? currentURL : "";
    }
}).catch();
