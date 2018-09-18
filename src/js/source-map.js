var zip;
var sourceMap = window.sourceMap;
sourceMap.SourceMapConsumer.initialize({
    "lib/mappings.wasm": "js/libs/mappings.wasm"
});
function xhrSuccess() { 
  this.callback.apply(this, this.arguments); 
}

function xhrError() { 
  console.error(this.statusText); 
}

var get_filename = function(f){
  if (f) {
    var startIndex = (f.indexOf('\\') >= 0 ? f.lastIndexOf('\\') : f.lastIndexOf('/'));
    var filename = f.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    return filename;
  }
}

function loadFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText, get_filename(url));
      } else {
        document.getElementById("sourcemap_content").getElementsByClassName("error_message")[0].innerHTML = xhr.statusText + " An error occurred";
        console.error(xhr.statusText);
      }
    }else{
      document.getElementById("sourcemap_content").getElementsByClassName("error_message")[0].innerHTML = xhr.statusText + " An error occurred";
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}

var add_zip = function(uri, content){
  try {
    zip.file(uri, content);
  } catch (error) {
    console.log(error);
  }
}

var get_sourcemap = function(text, filename){
    const sm =String(text);
    new sourceMap.SourceMapConsumer(sm)
    .then(function(i){
      s = i.sources;
      for(x in s){
        if(s[x].match(/^webpack:\/{2,3}\.?\/?/g)){
              add_zip(s[x].replace(/^webpack:\/{2,3}\.?\/?/g, ""), i.sourcesContent[x]);
        }
      }
      downloader(filename);
    });
}
var downloader = function(filename){
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      objectURL = URL.createObjectURL(content);
      var f = filename.replace(/\.\w{1,5}$/,".zip");
      browser.downloads.download({url: objectURL, saveAs: true, filename:f});
  });

}
var get_source = function(){
    document.getElementById("sourcemap_content").getElementsByClassName("error_message")[0].innerHTML="";
    zip = new JSZip();
    if(document.getElementById("sourcemapsrc").value){
      loadFile(document.getElementById("sourcemapsrc").value, get_sourcemap);
    }
}