const button = document.getElementById("rectangle");

function turnBlue() {
    button.classList.toggle("clicked");
    console.log("clicked rectangle");
}

// Add an event listener to the button
button.addEventListener("click", turnBlue);
