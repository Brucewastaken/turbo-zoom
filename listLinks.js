var linkList = document.getElementById('meetLinks');
var savedLinksArray;

chrome.storage.sync.get(['listLinks'], function(result) {
    savedLinksArray = result.listLinks;
    console.log(savedLinksArray);

    if (savedLinksArray == undefined) {
        savedLinksArray = [];
    }

    for (var i = 0; i < savedLinksArray.length; i += 2) {
        listItem = document.createElement('li');
        listItemItem = document.createElement('a');
        listItemItem.setAttribute("href", savedLinksArray[i]);
        listItemItem.setAttribute('id','MYURL' + i);
        
        var zoomUrl = savedLinksArray[i];
        var zoomName = savedLinksArray[i+1];

        listItemItem.setAttribute('myurl', zoomUrl);

        listItemItem.addEventListener('click',  openTabFunction(zoomUrl), false);
       
        listItemItem.innerHTML = savedLinksArray[i+1];
        listItem.appendChild(listItemItem);
        listItemDelete = document.createElement('a');
        listItemDelete.setAttribute("href", '');
        listItemDelete.setAttribute("id", 'delete');
        listItemDelete.innerHTML = '     X';


        listItemDelete.addEventListener('click', deleteFunction(zoomUrl, zoomName));
        listItem.appendChild(listItemDelete);
        linkList.appendChild(listItem);
    }



 
});


function openTabFunction(myurl) {
    return function () {
        openTab(myurl);
    }
  }


function deleteFunction(zoomUrl, zoomName) {
    return function () {
        
        savedLinksArray = deleteArray(savedLinksArray, zoomUrl);
        savedLinksArray = deleteArray(savedLinksArray, zoomName);
        chrome.storage.sync.set({'listLinks': savedLinksArray}, function() {
            console.log('Updated array to ' + savedLinksArray);
        });
        location.reload();
    }
  }


function openTab(tabURL) {
    chrome.tabs.create({ url: tabURL });
}

function deleteArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return(arr);
}



