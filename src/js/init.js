// popupコンテンツのイベントリスナの管理
window.onload=function(){
    document.getElementById("button_expass").addEventListener('click', expass);
    document.getElementById("button_hidepass").addEventListener('click', hidepass);
    document.getElementById("decode_text").addEventListener('keyup', decode_encode);
    document.getElementById("decoded_text").addEventListener('keyup', reset);
    document.getElementById("checkbox_encode").addEventListener('change', decode_encode);
    //document.getElementById("checkbox_encode").addEventListener('change', toggle_text);
    document.getElementById("decode_typeoption").addEventListener('change', decode_encode);
}