// popupコンテンツのイベントリスナの管理
window.onload=function(){
    document.getElementById("button_expass").addEventListener('click', expass);
    document.getElementById("button_create_frame").addEventListener('click', create_frame);
    document.getElementById("button_create_frame_sandbox").addEventListener('click', create_frame_sandbox);
    //document.getElementById("button_hidepass").addEventListener('click', hidepass);
    document.getElementById("decode_text").addEventListener('keyup', decode_encode);
    document.getElementById("decode_text").addEventListener('keydown', decode_encode);
    document.getElementById("decode_text").addEventListener('change', decode_encode);
    document.getElementById("decode_typeoption").addEventListener('change', reset);
    document.getElementById("decoded_text").addEventListener('keyup', reset);
    document.getElementById("checkbox_encode").addEventListener('change', decode_encode);
    //document.getElementById("checkbox_encode").addEventListener('change', toggle_text);
    document.getElementById("minified_json_text").addEventListener('keyup', beautify_object);
    document.getElementById("minified_xml_text").addEventListener('keyup', beautify_xml);
}