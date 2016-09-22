function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            callback(true);
        }
    };
    xhr.onerror = function () {
        callback(false);
    };
    xhr.send();
}

// 设置徽章
/*chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'});
 chrome.browserAction.setBadgeText({text: 'Dog'});*/

/*// 设置菜单项
 chrome.contextMenus.create({
 type: 'normal',
 title: 'Menu A',
 id: 'a',
 //contexts: ['link']
 /!*onclick: function(info, tab) {
 alert(info);
 alert(tab);
 }*!/
 });*/

/*// 桌面提醒
 var notification = chrome.notifications.create("abc", {
 type: "basic",
 iconUrl: 'images/offline.png',
 title: 'Notification Demo',
 message: 'Merry Christmas'
 }, function() {});
 notification.show();*/

// 设置地址栏默认建议
//chrome.omnibox.setDefaultSuggestion({'description':'hahahaha.'});

/*// 创建书签
 chrome.bookmarks.create({
 parentId: '1',
 index: 0,
 title: '大 Google',
 url: 'http://www.google.com/'
 }, function (bookmark) {
 console.log(bookmark);
 // 删除书签
 chrome.bookmarks.remove(bookmark.id, function () {
 console.log('删除书签' + bookmark.id);
 });
 });

 // 获取全部书签
 chrome.bookmarks.getTree(function(bookmarkArray){
 console.log(bookmarkArray);

 });*/

/*// 获取cookie
 chrome.cookies.getAll({}, function(cookies){
 console.log(cookies);
 });*/

/*// 查询历史记录
 chrome.history.search({
 text: '',
 startTime: new Date().getTime()-24*3600*1000,
 endTime: new Date().getTime(),
 maxResults: 20
 }, function(historyArray) {
 console.log(historyArray);
 });*/

/*
 // 查询所有扩展与应用
 chrome.management.getAll(function(extArr){
 console.log(extArr);
 });
 */

// 获取标签页
/*chrome.tabs.query({
 active: true
 }, function(tabArray){
 console.log(tabArray);
 });*/

/*
 chrome.tabs.create({
 // windowId: wId,
 index: 0,
 url: 'http://www.google.com',
 active: true,
 pinned: false,
 // openerTabId: tId
 }, function(tab){
 console.log(tab);
 chrome.tabs.captureVisibleTab(tab.id, {
 format: 'jpeg',
 quality: 50
 }, function(dataUrl){
 window.open(dataUrl, 'tabCapture');
 });
 });
 */

/*// url重定向
 chrome.webRequest.onBeforeRequest.addListener(
 function(details){
 return {redirectUrl: details.url.replace( "www.baidu.com", "www.google.com")};
 },
 {
 urls: [
 "*://www.baidu.com/!*"
 ]
 },
 [
 "blocking"
 ]
 );*/

/*// 获取代理设置
 chrome.proxy.settings.get(
 {},
 function(config) {
 console.log(config.value);
 }
 );*/

chrome.system.cpu.getInfo(function (info) {
    console.log('cpu:', info);
});

chrome.system.memory.getInfo(function (info) {
    console.log('memory:', info);
});

chrome.system.storage.getInfo(function (info) {
    console.log('storage', info);
});


setInterval(function () {
    /*httpRequest('http://www.google.cn/', function (status) {
     console.log(status);

     var picPath = 'images/' + (status ? 'online.png' : 'offline.png');

     console.log(picPath);
     chrome.browserAction.setIcon({
     path: 'images/' + (status ? 'online.png' : 'offline.png')
     });
     });*/

    httpRequest('http://www.google.cn/', function (status) {
        chrome.browserAction.setIcon({path: 'images/' + (status ? 'online.png' : 'offline.png')});
    });
}, 5000);
