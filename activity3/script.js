/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('Hello INFSCI 2560!');


// Task 1 - Selecting Elements
function button_one_function() {
    console.log("Button one clicked!");
    //Put your code here
    let emList = document.querySelectorAll("em");
    let content = "";
    for (let i = 0; i < emList.length; i++) {
        content += emList[i].textContent + " ";
    }
    console.log(content);
    let buttons = document.getElementById("buttons-group");
    let para = document.createElement("p");
    let em = document.createElement("em");
    let text = document.createTextNode(content);
    em.appendChild(text);
    para.appendChild(em);
    buttons.appendChild(para);
}

const button1 = document.getElementById("button-one");
button1.addEventListener('click', button_one_function);


// Task 2 - Styling Tables
function button_two_function() {
    console.log("Button two clicked!");
    // Put your code here
    let trList = document.querySelectorAll("tr");
    for (let i = 1; i < trList.length; i++) { // i = 1 here, because I don't want to include the table column names
        if (i % 2 === 0) {
            trList[i].classList.add("even");
        }
    }
}

const button2 = document.getElementById("button-two");
button2.addEventListener('click', button_two_function);


//Task 3 - Modify Grocery List
let index = 0;

function button_three_function() {
    console.log("Button three clicked!");
    // Your code here
    let liList = document.querySelectorAll("li");
    if (index < liList.length)
        liList[index++].classList.add("cross-out");
    let list = document.getElementById("list");
    let item1 = document.createElement("li");
    item1.appendChild(document.createTextNode("Chocolate"));
    list.appendChild(item1);
    let item2 = document.createElement("li");
    item2.appendChild(document.createTextNode("Apples"));
    list.appendChild(item2);
}

const button3 = document.getElementById("button-three");
button3.addEventListener('click', button_three_function);


// Task 4 - Adding Interactivity
// Your code here

function button_four_function() {
    console.log("Button four clicked!");

    let random = Math.floor(Math.random() * 1001);
    if (document.getElementById("random-para"))
        document.getElementById("random-para").textContent = "Random number is " + random;
    else {
        let para = document.createElement("p");
        let text = document.createTextNode("Random number is " + random);
        para.style.color = "Red";
        para.setAttribute("id", "random-para");
        para.appendChild(text);
        let p = document.getElementById("p");

        p.insertAdjacentElement("afterend", para);
    }
}

const button4 = document.getElementById("button-four");
button4.addEventListener('click', button_four_function);