"use strict";

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendExposePasswordMessageToTabs(tabs) {
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {command: "expose"}
      ).catch(onError);
    }
  }
  function sendHidePasswordMessageToTabs(tabs) {
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {command: "hide"}
      ).catch(onError);
    }
  }
var expass = function(){
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendExposePasswordMessageToTabs).catch(onError);
}
var hidepass = function(){
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendHidePasswordMessageToTabs).catch(onError);
}