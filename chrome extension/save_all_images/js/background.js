chrome.runtime.onInstalled.addListener(function(){

    console.log('step0');
    chrome.contextMenus.create({
        'id': 'saveall',
        'type': 'normal',
        'title': '保存所有图片'
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    console.log('step1', info);

    if(info.menuItemId == 'saveall') {
        chrome.tabs.executeScript(tab.id, {file:'js/main.js'}, function(results){
            console.log('step2', results);

            if(results && results[0] && results[0].length) {
                results[0].forEach(function(url) {
                    //alert(url);
                    chrome.downloads.download({
                        url: url,
                        conflictAction: 'uniquify',
                        saveAs: true
                    });
                });
            }
        });
    }
});

