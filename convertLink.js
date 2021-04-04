var convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', function(){
  convertLink();
});

function convertLink() {
  var helperdiv = document.createElement("div");
  document.body.appendChild(helperdiv);
  helperdiv.contentEditable = true;  
  helperdiv.focus();

  document.execCommand("Paste");

  var clipboardContents = helperdiv.innerHTML.trim();

  helperdiv.remove();
  
  if (clipboardContents.includes('>' || '<')) {
    clipboardContents = clipboardContents.split('>')[1].split('<')[0];
  } 

  if (!clipboardContents.includes('zoom.us')) {
    console.log(clipboardContents + ' is not a valid zoom link.');
    return alert('invalid zoom link :)');
  }

  var joinID = clipboardContents.split('/j/')[1];
  
  if (!joinID) {
    console.log(clipboardContents + ' is not a valid zoom link.');
    return alert('invalid zoom link :)');
  }

  joinID = "zoommtg://zoom.us/join?confno=" + joinID;
  console.log(joinID);
  //chrome.tabs.create({ url: joinID });
  alert('the smart zoom link is: ' + joinID);
}
