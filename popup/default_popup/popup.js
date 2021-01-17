// button for saving the link after all info in chosen
var addTabButton = document.querySelector('#add-tab-button');
var addTab = document.querySelector('#add-tab');
var removeTab = document.querySelector('#remove-tab');
//var removeTopic = document.querySelector('#remove-topic');
var clearAll = document.querySelector('#clear-all');

//// get clicked button w jquery
//$("#element").click(function () {
//    $(this).data('clicked', true);
//});
//if ($('#element').data('clicked')) {
//    window.alert('yes');
//}

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

            // add topic title
            var div = document.createElement("div");
            div.setAttribute("class", "topic_list");

            // add topic name
            var topicName = document.createElement("p");
            topicName.innerText = topic;
            topicName.setAttribute("class", "topic-names");
            div.appendChild(topicName);

            // add button
            //btn.setAttribute("id", topic + "-link-list");
            //var btn = document.createElement("BUTTON");
            var delete_links = document.createElement('input');
            delete_links.type = "image";
            delete_links.alt = "Delete Links";
            delete_links.src = '../../img/delete.png';
            delete_links.className = "delete-topic";
            delete_links.id = topic + "-link-list";
            //btn.className = "delete-topic";
            //btn.innerHTML = "delete topic";

            //button.setAttribute("onclick", "delete_single_link(li.id)");
            div.appendChild(delete_links);

            links.appendChild(div);

            // add links under this topic
            for (var i = 0; i < topic_links.length; i++) {
                var li = document.createElement("li");
                var linking = document.createElement("a");
                var linkText = document.createTextNode(topic_links[i].title + ' - ' + topic_links[i].url);
                linking.setAttribute('href',topic_links[i].url);
                linking.appendChild(linkText);
                //li.setAttribute("class", "link-class");
                li.appendChild(linking); // add title
                var linebreak = document.createElement('br');
                li.appendChild(linebreak);

                // add link info
                li.appendChild(document.createTextNode('\n' + 'Time: ' + topic_links[i].date_string)); // add date
                li.appendChild(document.createTextNode('\n' + '  |  Comment: ' + topic_links[i].comment + ' '));
                li.appendChild(document.createTextNode('\n' + '  |  Rating: ' + topic_links[i].rating + ' '));

                li.setAttribute("id", topic + "-link-item-" + topic_links[i].id.toString());

                // add placeholder delete button
                //var button = document.createElement("BUTTON");
                //button.innerHTML = "Delete Link";
                //button.setAttribute("onclick", "delete_single_link(li.id)");
                var delete_link = document.createElement('input');
                delete_link.type = "image";
                delete_link.src = '../../img/delete.png';
                delete_link.alt = "Delete Link";
                delete_link.class = "link-delete-button-class";
                delete_link.id = topic + "-link-delete-item-" + topic_links[i].id.toString();
                li.appendChild(delete_link);

                div.appendChild(li);
            }
        }
    });
});

// delete all links for a specific topic


// delete this specific link
var buttons = document.querySelectorAll("input.link-delete-button-class");
const button_str = "-link-delete-item-";
for (var button in buttons) {
    button.onclick = function () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
                var end_i = button.id.lastIndexOf(button_str);
                var topic = button.id.substring(0, end_i);
                var id = button.id.substring(end_i + button_str.length - 1);
                var link_element_id = topic + "-link-item-" + id;

                var li = document.getElementById(link_element_id);
                li.remove();


                chrome.storage.local.get(null, all_links => {
                    var topic_list = all_links[topic];
                    if (all_links[topic]) {
                        for (var i = 0; i < topic_list.length; i++) {
                            var tab = topic_list[i];
                            if (tab.id == id) {
                                all_links[topic].splice(i, 1);
                            }
                        }
                    }
                    // remove from storage
                    if (all_links[topic].length <= 0) {
                        delete all_links[topic];
                        li.remove();
                    }

                    chrome.storage.local.set(all_links);
                })


            })
    };
}

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
            if (topic in all_links) {
                // check if link is already added in that topic
                for (var topic_link in all_links[topic]) {
                    if (topic_link.id == tabs[0].id) {
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

//// delete info from storage
// function delete_single_link (id) {
//    chrome.tabs.query({
//        active: true,
//        currentWindow: true
//    }, function (tabs) {
//            // get tab/list item to be deleted
//            // TODO: insert stuff

//            // get data from html
//            //chrome.storage.local.get(null, all_links => {
//            //    all_links[topic];
//            //})

//            //var remove_lst = {}
//            //chrome.storage.local.get(null, all_links => {
//            //    //for (var topic in all_links) {
//            //    //    //all_links.delete(topic);
//            //    //    //all_links[topic] = [];
//            //    //    delete all_links[topic];

//            //    //}
//            //    //chrome.storage.local.set(all_links, function () { console.log("yes") });
//            //    ////chrome.tabs.sendMessage(tabs[0].id, { action: "clear" }, _ => {
//            //    ////    console.log("Cleared page");
//            //    ////});
//            //    lst = all_links;
//            //});
//            //for (var topic in remove_lst) {
//            //    //all_links.delete(topic);
//            //    //all_links[topic] = [];
//            //    delete remove_lst[topic];

//            //}
//            //chrome.storage.local.set(remove_lst);
//        })
//    };

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

