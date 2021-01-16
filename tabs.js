/* For each tab, collect"
 * - topic
 * - date
 * - url (tab.url)
 * - title of page (tab.title)
 * Each link/tab is in a dictionary w "id", "url", "title"
 * 
 * Current data collection:
 * - links: dictionary of topics to links of the corresponding topic
 * - linkCount: total num of links
 */

// MOSTLY COPIED FROM WORKSHOP TEMPLATE
function add_links(links) {
    //var body = document.getElementByTagName("body")[0];

    //var linkNode = document.createElement("div");
    //var textNode = document.createTextNode("Success!");
    //linkNode.appendChild(textNode);
    //var element = document.getElementById("tab-item");
    //element.appendChild(linkNode);
    //linkNode.setAttribute("id", "link-1");
    //linkNode.setAttribute("class", "link-class");
    //linkNode.innerText = "Success!";
    //body.prepend(linkNode);
    
    //for (let i = 0; i < links.length; i++) {
    //    linkCount += 1;
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

function clear_links() {
    document.querySelectorAll('.link-class').forEach(e => e.remove());
    linkCount = 0;
}

//TAKEN FROM WORKSHOP TEMPLATE
function init_links() {
    //let url = document.URL; // idk what this does tbh
    let topic = document.querySelector('#topic')
    //let linksList = document.getElementById("links"); // element id still tbd
    let tabsList = []
    chrome.storage.local.get(null, all_links => {
        for (var topic in all_links) {
            if (all_links[topic]) { // if there are links in for the specific topic
                add_links(all_links[topic]);
            }
        }
    });
}

var linkCount = 0;
init_links()

// FOLLOWING IS TAKEN FROM WORKSHOP
// TODO: Add Message Event Listener to Prompt Sticky Note Functions
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action == 'add') {
            add_links(request.links);
            sendResponse({ status: "complete" });
        } else if (request.action == 'clear') {
            clear_links();
            sendResponse({ status: "complete" });
        } else {
            sendResponses({ status: "error" });
        }
    })