if(localStorage['paused']){

}else{
	localStorage.setItem('paused', false);
}
function updateBadge(paused){
    if (paused){
        chrome.browserAction.setBadgeText({text:"AV"});
    } else {
        chrome.browserAction.setBadgeText({text:"PÅ"});
    }
}

chrome.browserAction.onClicked.addListener(
    function(tab){ 
        if (localStorage.getItem('paused') == 'true'){
           localStorage.setItem('paused', false);
           updateBadge(false);
        } else {
           localStorage.setItem('paused', true);
           updateBadge(true);
        }
        chrome.tabs.update(tab.id, {url: tab.url});
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.name == "isPaused")
            sendResponse({value: localStorage.getItem('paused')});
        
});
 
