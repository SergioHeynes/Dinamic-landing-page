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

// Run
showTime();
setBgGreet();


