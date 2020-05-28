//this is a helper method to create a DOM node
function createNode(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}

const tb = document.getElementById('people');

//insert your code here to complete this activity
//feel free to use the helper code above ... or take a different approach

let tr = createNode('TR');
let th1 = createNode('TH');
let th2 = createNode('TH');
let th3 = createNode('TH');
append(th1, document.createTextNode("Profile"));
append(th2, document.createTextNode("FirstName"));
append(th3, document.createTextNode("LastName"));
append(tr, th1);
append(tr, th2);
append(tr, th3);
append(tb, tr);

fetch('https://randomuser.me/api/?results=10').then(res => res.json()).then(
    function (response) {
        for (let el of response.results) {
            let tr = createNode('TR');
            let td1 = createNode('TD');
            let td2 = createNode('TD');
            let td3 = createNode('TD');
            let img = createNode('IMG');

            img.setAttribute("src", el['picture']['large']);
            img.setAttribute("alt", "Profile Image");
            let firstName = document.createTextNode(el['name']['first']);
            let lastName = document.createTextNode(el['name']['last']);

            append(td1, img);
            append(td2, firstName);
            append(td3, lastName);
            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tb, tr);
        }
    }
);