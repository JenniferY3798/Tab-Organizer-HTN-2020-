/* For each tab, collect"
 * - topic
 * - date
 * - url (tab.url)
 * - title of page (tab.title)
 * 
 * Current data collection:
 * - links: dictionary of topics to links of the corresponding topic
 * - linkCount: total num of links
 */

// MOSTLY COPIED FROM WORKSHOP TEMPLATE
function add_link(links) {
//    var body = document.getElementByTagName("body")[0];
    
//    for (let i = 0; i < links.length; i++) {
//        linkCount += 1;
//        var linkNode = document.createElement("div");
//        linkNode.setAttribute("id", "link-" + sourceCount);
//        linkeNode.setAttribute("class", "link-class");
//        linkNode.innerText = links[i]
//        linkNode.setAttribute("size", links[i].length);
//        //linkNode.style.left = (noteCount - 1) * 200 + "px";
//        //linkNode.style.top = 10 + "px";
//        body.append(linkNode);
//        //draggable(document.getElementById("htn-sticky-note-" + noteCount));
//    }
}

//function add_entry() {
//    tabCount += 1;
//}

//TAKEN FROM WORKSHOP TEMPLATE
function init_links() {
    let url = document.URL; // idk what this does tbh
    let linksList = document.getElementById("links"); // element id still tbd
    chrome.storage.local.get(topic, links => {
        if (links[topic]) { // if there are links in for the specific topic
            add_link(links[topic]);
        }
    });
}

var linkCount = 0;
init_links()

// FOLLOWING IS TAKEN FROM WORKSHOP
// TODO: Add Message Event Listener to Prompt Sticky Note Functions
//chrome.runtime.onMessage.addListener(
//    (request, sender, sendResponse) => {
//        if (request.action == 'add') {
//            add_links(request.);
//            sendResponse({ status: "complete" });
//        } else if (request.action == 'clear') {
//            clear_notes();
//            sendResponse({ status: "complete" });
//        } else {
//            sendResponses({ status: "error" });
//        }
//    }
//)