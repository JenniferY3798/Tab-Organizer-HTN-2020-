// button for saving the link after all info in chosen
var addTab = document.querySelector('#add-tab');
//var links = document.querySelector('#links') // get list of links

// display links
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, tabs => {
    let links = document.getElementById("links");

    // grab dictionary of all stored topics to list of links
    chrome.storage.local.get(null, all_links => {
        for (var topic in all_links) {
            topic_links = all_links[topic]; // list of links for specific topic
            if (all_links[topic]) {
                //var hi = document.createElement("hi");
                //hi.appendChild(document.createTextNode("Should add")); 
                //links.appendChild(hi);
                for (var i = 0; i < topic_links.length; i++) {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(topic_links[i].title)); // add title
                    links.appendChild(li);
                }
            }
        }
    });
});

// saving info to storage
addTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // get data from html
        let topic = document.querySelector('#topic'); // or however topics are gotten
        let rating = ""; // however star ratings are gotten
        let comment = ""; // however comments are gotten
        let link = {
            "id": tabs[0].id,
            "url": tabs[0].url,
            "title": tabs[0].title,
            "rating": rating,
            "comment": comment,
        };

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
                    links: [link]
                }, _ => {
                    console.log("Added Link!");
                }
            );
        });
    });
    location.reload();
};