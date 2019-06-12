// DOM ELEMENTS
const time = document.getElementById('time'),
greeting = document.getElementById('greeting'), 
name = document.getElementById('name'),
focus = document.getElementById('focus');


// Show Time
function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    // Set AM or PM
    const AmPm = (hour >= 12) ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    time.innerHTML = `${hour}<span>:</span>${addZeros(min)}<span>:</span>${addZeros(sec)}`;

    setTimeout(showTime, 1000);
}


// Add Zeros
function addZeros(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet(){
    let today = new Date(),
    hour = today.getHours();

    // Morning
    if (hour < 12) {
        document.body.style.backgroundImage = "url('/assets//images/morning_1920.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('/assets//images/afternoon2_1920.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        // Night
        document.body.style.backgroundImage = "url('/assets//images/night_1920.jpg')";
        greeting.textContent = 'Good Night';
        document.body.style.color = "white";
    }
}

// Get name
function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set name
function setName(e){
    if(e.type === 'keypress') {
        // Make sure enter is press
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set focus
function setFocus(e){
    if(e.type === 'keypress') {
        // Make sure enter is press
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);



// Run
showTime();
setBgGreet();
getName();
getFocus();

