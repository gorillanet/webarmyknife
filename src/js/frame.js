

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

document.getElementById("framesrc").value = isvalidurl(currentURL) ? currentURL : "";