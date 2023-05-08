
//===================================
function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}


document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("CopyZ").addEventListener("click", popup);
});

//========================================================================


function popup2() {
    var textArea = document.getElementById("texta").value;
     
    chrome.storage.local.set({'mydata': textArea}, function() { });


    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "dopass"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
document.getElementById("PasteZ").addEventListener("click", popup2);
});
