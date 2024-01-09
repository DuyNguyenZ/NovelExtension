
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      //start call the Translate function to translate the web novel data 
      if( request.message === "start" ) {             
        // Get the data from the Novel Page
        var novelData = document.getElementById("novel_honbun").innerText;
        //Send Back the Novel Data to Popup Page
        sendResponse({"Data": novelData });
      }else{
        document.getElementById("novel_honbun").innerText = request.message;
      }
  });

