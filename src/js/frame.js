function isvalidurl(i) {
    var res = i.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

function onError(error) {
    console.error(`Error: ${error}`);
  }
  
var frame_error = function(){
    document.getElementById("framebox").innerHTML = "<div style='color:red;'>Frame Error</div>"
}
var create_frame_sandbox = function(s){
    var src = document.getElementById("framesrc").value;
    var f = document.getElementById("framebox");
    if(isvalidurl(src)){
        f.innerHTML = "<iframe width='500' height='300' id='testframe' src='"+src+"' sandbox></iframe>"
        
    }
}
var create_frame = function(){
    var src = document.getElementById("framesrc").value;
    var f = document.getElementById("framebox");
    if(isvalidurl(src)){
        f.innerHTML = "<iframe width='500' height='300' id='testframe' src='"+src+"'></iframe>"
        
    }
}
var initialurl = function(){
    browser.tabs.query({
        currentWindow: true,
        active: true
      }).then(function(tabs){
        for(let t of tabs){
            document.getElementById("framesrc").value = isvalidurl(t.url) ? t.url : "";
        }
      }).catch(onError);
}

var checkframe = function(){
    try{
        var d = document.getElementById("f");
        if(d.contentDocument==null){
            return;
        }else{
            d.src="data:text/html;base64,PHNwYW4gc3R5bGU9InJlZCI+Q3Jvc3MgT3JpZ2luPC9zcGFuPg=="
        }
    
    }catch(E){
        var d = document.getElementById("f");
        d.src="data:text/html;base64,PHNwYW4gc3R5bGU9InJlZCI+Q3Jvc3MgT3JpZ2luPC9zcGFuPg=="
    }
}
initialurl();