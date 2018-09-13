sourceMap.SourceMapConsumer.initialize({
    "lib/mappings.wasm": "js/libs/mappings.wasm"
});
var sourceMap = window.sourceMap;
function xhrSuccess() { 
    this.callback.apply(this, this.arguments); 
}

function xhrError() { 
    console.error(this.statusText); 
}

function loadFile(url, callback /*, opt_arg1, opt_arg2, ... */) {
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

var get_text = function(){

}

var get_sourcemap = function(text){
    //sourcemap.mapの取得
      const sm = sources;
      var consumer = new sourceMap.SourceMapConsumer(sm);
      console.log(consumer.then(function(i){
        for(let x of i.sources){
          if(x.match(/.*\.(js|vue|css)$/g)){
              //console.log(x);
          }
        }
        console.log(i.sourcesContent[0]);
      }));
 /*     
    const whatever = window.sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {

        console.log(consumer.sources);
        // [ 'http://example.com/www/js/one.js',
        //   'http://example.com/www/js/two.js' ]
      
        console.log(consumer.originalPositionFor({
          line: 2,
          column: 28
        }));
        // { source: 'http://example.com/www/js/two.js',
        //   line: 2,
        //   column: 10,
        //   name: 'n' }
      
        console.log(consumer.generatedPositionFor({
          source: 'http://example.com/www/js/two.js',
          line: 2,
          column: 10
        }));
        // { line: 2, column: 28 }
      
        consumer.eachMapping(function (m) {
          // ...
        });
      
        return computeWhatever();
      });
      */
}
var downloader = function(){
    //テスト用

}
var get_source = function(){
    var js = '{"hello": "json"}';
    var blob = new Blob([js], {type: "application/json"});
    objectURL = URL.createObjectURL(blob);
    browser.downloads.download({url: objectURL, saveAs: true});
    //loadFile("https://jsonplaceholder.typicode.com/todos/1", get_sourcemap);
}