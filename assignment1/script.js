/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

console.log('Assignment One');

const button1 = document.getElementById("button-one");
if (button1)
    button1.addEventListener('click', button_one_function);

function button_one_function() {
    let pList = document.querySelectorAll('p');
    for (let i = 0; i < pList.length; i++) {
        pList[i].style.textTransform = "";
    }
    button1.className += " disabled";
}

const button2 = document.getElementById("button-roman");
if (button2)
    button2.addEventListener('click', button_two_function);

function button_two_function() {
    let ol = document.getElementById("ordered-list");
    ol.className = "a";
    button2.className += " disabled";
    button3.className = "button button1";
}

const button3 = document.getElementById("button-alpha");
if (button3)
    button3.addEventListener('click', button_three_function);

function button_three_function() {
    let ol = document.getElementById("ordered-list");
    ol.className = "b";
    button3.className += " disabled";
    button2.className = "button button1";
}