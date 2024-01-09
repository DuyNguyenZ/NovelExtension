//Popup.js where will do the request tranlate to deepl and send it back to Content.js  

//When the Trnaslate button onClick it will make the request to Content.js for Novel Data and start tranlate it. Then send the tranlate text back 
$(document).ready(function() {
  // Attach a click event listener to the Translate button
  $("#Translate").on("click", startTranlate);
});

//Function for communicate with the Content.js for request the novel data 
function startTranlate() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    
    // Send a message to the content script to start the translation
    chrome.tabs.sendMessage(activeTab.id, { "message": "start" }, function (response) {
      translateNovelPage(response.Data);
    });
  });
}

//function for send the message/data back to Content.js after finish tranlasted
function tranlatedMessage(message){
  var messagez = message; 
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": messagez});
  });
}

//Request to Deepl api for tranlate the novel
async function translateNovelPage(DataNovel) {  

  //api key
  const apiKey = "[3fcd8b27-c555-1d7f-6712-3061c0ec5fae]";
  const targetLang = "EN";
  const novelData = DataNovel;

  const payload = {
    text: [novelData],
    target_lang: targetLang
  };

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Authorization":  "DeepL-Auth-Key 3fcd8b27-c555-1d7f-6712-3061c0ec5fae:fx",
        "User-Agent": "YunaNove/1.0" ,
        "Content-Length": 100,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      const translatedText = data.translations[0].text;
      console.log(translatedText);
      tranlatedMessage(translatedText);
    } else {
      tranlatedMessage(response.statusText);
    }
  } catch (error) {
    tranlatedMessage(error);
  }
}

