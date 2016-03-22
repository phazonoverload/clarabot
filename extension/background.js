function navigate(url) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.update(tabs[0].id, {
            url: url
        });
    });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
    navigate('http://localhost:1337' + '/?q=' + text);
});
