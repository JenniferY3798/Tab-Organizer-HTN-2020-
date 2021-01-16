// button for saving the link after all info in chosen
var addTab = document.querySelector('#add-tab');
var topic = document.querySelector('#topic')
//var links = document.querySelector('#links') // get list of links

// saving info to storage
addTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
            //let url = tabs[0].url;
            let link = {
                "id": tabs[0].id,
                "url": tabs[0].url,
                "title": tabs[0].title
                }

            // get stored links for the specific topic and add new link
            chrome.storage.local.get(topic, links => {
                if (links[topic]) {
                    links[topic].push(link);
                } else {
                    links[topic] = [link];
                }

                // set stored links to include added link
                chrome.storage.local.set(links);

                // send message (to be processed during runtime w listener)
                chrome.tabs.sendMessage(tabs[0].id,
                    // following is the message to be processed
                    {
                        action: "add",
                        links: [link] // should we send the tab itself or the id?
                        // since we need to access the url & title
                    }, _ => {
                        console.log("Added Link!");
                    }
                );
            });
        });
        location.reload();
    };
