// button for saving the link after all info in chosen
var addTabButton = document.querySelector('#add-tab-button');
var addTab = document.querySelector('#add-tab');
var removeTab = document.querySelector('#remove-tab');
//var removeTopic = document.querySelector('#remove-topic');
var clearAll = document.querySelector('#clear-all');

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
            //if (all_links[topic]) {

            // add topic title
            var div = document.createElement("div");
            div.setAttribute("class", "topic_list");
            div.appendChild(document.createTextNode(topic));
            links.appendChild(div);

            // add links under this topic
            for (var i = 0; i < topic_links.length; i++) {
                var li = document.createElement("li");
                //li.setAttribute("class", "link-class");
                li.appendChild(document.createTextNode(topic_links[i].title + ' - ' + topic_links[i].url)); // add title
                li.appendChild(document.createTextNode('Time: ' + topic_links[i].date_string)); // add date
                div.appendChild(li);
            }

            
            //}
        }
    });
});

// move to add tab page
addTabButton.onclick = function () {
    document.getElementById('default__page').style.display = "none";
    document.getElementById('add__page').style.display = "initial";
}

// saving info to storage
addTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // get data from html
        let topic = document.getElementById('input-topic').value;
        let rating = document.getElementById('input-rating').value;
        let comment = document.getElementById('input-comment').value;
        let date = new Date();
        let date_string = date.toTimeString().slice(0, 5);
        if (date.getHours() > 12) {
            date_string += ' PM';
        } else {
            date_string += ' AM';
        }
        let link = {
            "id": tabs[0].id,
            "url": tabs[0].url,
            "title": tabs[0].title,
            "rating": rating,
            "comment": comment,
            "date": date,
            "date_string": date_string
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

            } else {
                all_links[topic] = [link];
            }

            // set stored links to include added link
            chrome.storage.local.set(all_links);
            });
    });

    // switch to default page
    document.getElementById('add__page').style.display = "none";
    document.getElementById('default__page').style.display = "initial";
    location.reload();
};

// delete info from storage
removeTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
            // get tab/list item to be deleted
            // TODO: insert stuff

            // get data from html
            //chrome.storage.local.get(null, all_links => {
            //    all_links[topic];
            //})

            //var remove_lst = {}
            //chrome.storage.local.get(null, all_links => {
            //    //for (var topic in all_links) {
            //    //    //all_links.delete(topic);
            //    //    //all_links[topic] = [];
            //    //    delete all_links[topic];

            //    //}
            //    //chrome.storage.local.set(all_links, function () { console.log("yes") });
            //    ////chrome.tabs.sendMessage(tabs[0].id, { action: "clear" }, _ => {
            //    ////    console.log("Cleared page");
            //    ////});
            //    lst = all_links;
            //});
            //for (var topic in remove_lst) {
            //    //all_links.delete(topic);
            //    //all_links[topic] = [];
            //    delete remove_lst[topic];

            //}
            //chrome.storage.local.set(remove_lst);
        })
    };

// clear all data
clearAll.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {

            // remove from html
            document.querySelectorAll('div.topic_list').forEach(e => e.remove());

            // remove from storage
            chrome.storage.local.clear(() => { console.log("done"); });
                    
    }),
    location.reload();
}
