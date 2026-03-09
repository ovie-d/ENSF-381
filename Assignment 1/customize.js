let time = 600;

function startTimer() {

    const timer = document.getElementById("timer");

    setInterval(function () {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.textContent = minutes + ":" + seconds;

        time--;

        if (time < 0) {
            window.location.href = "order_summary.html";
        }

    }, 1000);
}

window.onload = startTimer;


function calculatePrice() {

    const base = document.querySelector("input[name='type']:checked");
    const toppings = document.querySelectorAll("input[name='topping']:checked");

    if (!base) {
        alert("Please select Cup or Cone.");
        return;
    }

    if (toppings.length === 0) {
        alert("Please select at least one topping.");
        return;
    }

    let total = 6 + toppings.length * 1.5;

    document.getElementById("total-price").textContent =
        "Total Price: $" + total.toFixed(2);
}
