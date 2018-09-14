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

function loadFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
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

var get_sourcemap = function(text){
    const sm =String(text);
    new sourceMap.SourceMapConsumer(sm)
    .then(function(i){
      s = i.sources;
      console.log(i.sources[0]);
      for(x in s){
        if(s[x].match(/^webpack:\/{2,3}\.?\/?/g)){
              console.log(s[x]);
              console.log(i.sourcesContent[x]);
              add_zip(s[x].replace(/^webpack:\/{2,3}\.?\/?/g, ""), i.sourcesContent[x]);
        }
      }
      downloader();
    });
}
var downloader = function(){
  zip.generateAsync({type:"blob"})
  .then(function(content) {
      // see FileSaver.js
      objectURL = URL.createObjectURL(content);
      browser.downloads.download({url: objectURL, saveAs: true, filename:"zip.zip"});
  });

}
var get_source = function(){
    zip = new JSZip();
    if(document.getElementById("sourcemapsrc").value){
      loadFile(document.getElementById("sourcemapsrc").value, get_sourcemap);
    }
}