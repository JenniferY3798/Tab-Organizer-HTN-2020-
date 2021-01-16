// button for saving the link after all info in chosen
var addTab = document.querySelector('#add-tab');
let topics = [];

// saving info to storage
addTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
            let url = tabs[0].url;

        // get stored links for the specific topic
        chrome.storage.local.get(topic, links => {
            if (links[topic]) {
                links[topic].push(links);
            } else {
                links[topic] = [{ "url": url, "title": tabs[0].title }];
            }

            // set stored links
            chrome.storage.local.set(links);

            // send message (to be processed during runtime w listener)
            chrome.tabs.sendMessage(tabs[0].id,
                // following is the message to be processed
                {
                    action: "add",
                    links: [tab[0]] // should we send the tab itself or the id?
                                    // since we need to access the url & title
                }, _ => {
                    console.log("Added Link!");
                }
            );
        });
    });
    location.reload();
};