// button for saving the link after all info in chosen
var addTab = document.querySelector('#add-tab');
var removeTab = document.querySelector('#remove-tab');
var clearAll = document.querySelector('#clear-all');
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
                li.appendChild(document.createTextNode(topic_links[i].title)); // add title
                div.appendChild(li);
            }

            
            //}
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
        let topic = document.getElementById('topic_box'); // or however topics are gotten
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
            if (all_links[topic]) {
                all_links[topic].push(link);
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

// delete info from storage
removeTab.onclick = function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        //// get data from html
        //let topic = document.querySelector('#topic'); // or however topics are gotten
        //let rating = ""; // however star ratings are gotten
        //let comment = ""; // however comments are gotten
        //let link = {
        //    "id": tabs[0].id,
        //    "url": tabs[0].url,
        //    "title": tabs[0].title,
        //    "rating": rating,
        //    "comment": comment,
        //};

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
