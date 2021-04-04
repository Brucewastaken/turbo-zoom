var savedLinksArray = [];
chrome.storage.sync.get(['listLinks'], function(result) {
    savedLinksArray = result.listLinks;
    if (savedLinksArray == undefined) {
        savedLinksArray = [];
    }
});
var form = document.getElementById('form');
var zoomUrl = document.getElementById('zoomUrl');
var zoomName = document.getElementById('zoomName');
    
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (zoomUrl.value) {
        var zoomUrlValue = zoomUrl.value;
        if (zoomUrlValue.includes('://')) {
            savedLinksArray.push(zoomUrl.value);
        } else {
            savedLinksArray.push('http://' + zoomUrl.value);
        }
        zoomUrl.value = '';
    } else {
        console.log(zoomUrl);
        return alert('you must include a url!');
    }

    if (zoomName.value) {
        if (zoomName.value == undefined || zoomName.value == 'undefined') {
            zoomName.value = 'zoom/google meet';
        }
        savedLinksArray.push(zoomName.value);
        zoomName.value = '';
    }
    chrome.storage.sync.set({'listLinks': savedLinksArray}, function() {
        console.log('Updated array to ' + savedLinksArray);
        location.reload();
    });
});
