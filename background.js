var pageConditions = {
    conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
            schemes: ["https", "http"]
        }
    })],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}


// Background.js
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
});