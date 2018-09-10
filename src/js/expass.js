"use strict";

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendExposePasswordMessageToTabs(tabs) {
    var tt = parseInt(document.getElementById("timeforexpass").value);
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {command: "expose", t:tt}
      ).catch(onError);
    }
  }
  var expass = function(){
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(sendExposePasswordMessageToTabs).catch(onError);
  }