var addTab = document.querySelector('#add-tab-button');

// saving info to storage
addTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // get data from html
        let topic = document.getElementById('topic_box').value; // or however topics are gotten
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
        chrome.storage.local.get(null, all_links => {
            var to_be_added = true;
            if (all_links[topic]) {
                // check if link is already added in that topic
                for (var topic_link in all_links[topic]) {
                    if (topic_link.id == link.id) {
                        to_be_added = false;
                    }
                }

                // add link if not already added
                if (to_be_added) {
                    all_links[topic].push(link);
                }
                //if (all_links[topic].includes(link)) {
                //    // insert text saying it's already been added
                //} else {
                //    all_links[topic].push(link);
                //}

            } else {
                all_links[topic] = [link];
            }

            // set stored links to include added link
            chrome.storage.local.set(all_links);

            // send message (to be processed during runtime w listener)
            //chrome.tabs.sendMessage(tabs[0].id,
            //    // following is the message to be processed
            //    {
            //        action: "add",
            //        links: [link]
            //    }, _ => {
            //        console.log("Added Link!");
            //    });
        });
    });
    location.reload();
};