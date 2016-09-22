function getMedia(){
    chrome.mediaGalleries.getMediaFileSystems({
        interactive: 'if_needed'
    }, listMediaGalleries);
}

function listMediaGalleries(fileSystemArray){
    document.getElementById('container').innerHTML = '';

    for(var i = 0; i < fileSystemArray.length; i++) {
        var info = chrome.mediaGalleries.getMediaFileSystemMetadata(fileSystemArray[i]);

        var item = document.createElement('span');
        item.className = 'item';
        item.title = info.name;
        document.getElementById('container').appendChild(item);

        var icon = document.createElement('span');
        icon.className = 'icon';
        icon.innerHTML = '&#xf00c5;';
        item.appendChild(icon);

        var text = document.createElement('span');
        text.className = 'text';
        text.innerHTML = info.name;
        item.appendChild(text);
    }
}

document.getElementById('edit').onclick = function(){
    document.getElementById('container').innerHTML = '';
    chrome.mediaGalleries.getMediaFileSystems({
        interactive: 'yes'
    }, listMediaGalleries);
}

getMedia();

var scanning = false;

document.getElementById('scan').onclick = function(){
    console.log('scan');

    scanning?
    chrome.mediaGalleries.startMediaScan&&chrome.mediaGalleries.startMediaScan():
    chrome.mediaGalleries.cancelMediaScan&&chrome.mediaGalleries.cancelMediaScan();
};

document.getElementById('error').onclick = function() {
    this.style.display = 'none';
};

chrome.mediaGalleries.onScanProgress&&chrome.mediaGalleries.onScanProgress.addListener(function(details){
    console.log(details.type);
    switch(details.type){
        case 'start':
            scanning = true;
            document.getElementById('loading').style.display = 'block';
            break;
        case 'cancel':
            scanning = false;
            document.getElementById('loading').style.display = 'none';
            break;
        case 'finish':
            scanning = false;
            document.getElementById('loading').style.display = 'none';
            chrome.mediaGalleries.addScanResults(listMediaGalleries);
            break;
        case 'error':
            scanning = false;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').style.display = 'block';
            break;
    }
});



