

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "start" ) {
        copyDiv();
        }else if(request.message === "dopass") {
        chrome.storage.local.get(['mydata'], function(data) {           
         
        var lines = data.mydata.split("\n");
        pasteData(lines);

        chrome.storage.local.remove('mydata',function() {});
        });       
        }
    });


function copyDiv() {
    let range = document.createRange();
    let referenceNode = document.getElementById("novel_honbun");
    range.selectNode(referenceNode);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range); 
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


function pasteData(line) {   
var linez = line; 
var element = document.querySelector('.novel_view');
document.getElementById("novel_honbun").innerHTML = "  ";
for(var i = 0 ; i < linez.length ; i++)
{
    var pElem = document.createElement('p');
    var space = document.createElement('p');
    pElem.innerHTML = linez[i];
         if(linez[i] == "")
        {
            space.innerHTML = "&nbsp;";
            element.appendChild(space);
        }
    element.appendChild(pElem);
}
}

