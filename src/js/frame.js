function isvalidurl(i) {
    var res = i.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
var frame_error = function(){
    document.getElementById("framebox").innerHTML = "<div style='color:red;'>Frame Error</div>"
}
var create_frame = function(){
    var src = document.getElementById("framesrc").value;
    var f = document.getElementById("framebox");
    if(isvalidurl(src)){
        f.innerHTML = "<iframe width='500' height='300' id='testframe' src='"+src+"'></iframe>"
        
    }
}
